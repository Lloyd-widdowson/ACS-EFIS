$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://127.0.0.1:8088/")
try {
  $listener.Start()
  Write-Host "Local ADS-B Proxy running on http://127.0.0.1:8088/"
  
  while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response
    
    # Add CORS headers
    $response.Headers.Add("Access-Control-Allow-Origin", "*")
    $response.Headers.Add("Access-Control-Allow-Methods", "GET, OPTIONS")
    $response.Headers.Add("Access-Control-Allow-Headers", "Content-Type")
    
    if ($request.HttpMethod -eq "OPTIONS") {
      $response.StatusCode = 200
      $response.Close()
      continue
    }
    
    $lat = "-31.8986"
    $lon = "152.5142"
    $dist = "250"
    
    if ($request.QueryString["lat"]) { $lat = $request.QueryString["lat"] }
    if ($request.QueryString["lon"]) { $lon = $request.QueryString["lon"] }
    if ($request.QueryString["dist"]) { $dist = $request.QueryString["dist"] }
    
    $targetUrl = "https://api.adsb.lol/v2/lat/$lat/lon/$lon/dist/$dist"
    
    try {
      $webReq = [System.Net.HttpWebRequest]::Create($targetUrl)
      $webReq.Timeout = 5000
      $webReq.UserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Aviation-EFIS"
      $webRes = $webReq.GetResponse()
      $stream = $webRes.GetResponseStream()
      $reader = New-Object System.IO.StreamReader($stream)
      $jsonText = $reader.ReadToEnd()
      $buffer = [System.Text.Encoding]::UTF8.GetBytes($jsonText)
      
      $response.ContentType = "application/json"
      $response.ContentLength64 = $buffer.Length
      $response.OutputStream.Write($buffer, 0, $buffer.Length)
    } catch {
      $errJson = '{"error":"Failed to reach adsb.lol","total":0,"ac":[]}'
      $buffer = [System.Text.Encoding]::UTF8.GetBytes($errJson)
      $response.StatusCode = 502
      $response.ContentType = "application/json"
      $response.ContentLength64 = $buffer.Length
      $response.OutputStream.Write($buffer, 0, $buffer.Length)
    } finally {
      $response.Close()
    }
  }
} catch {
  Write-Host "Proxy Error:" $_.Exception.Message
} finally {
  $listener.Stop()
}
