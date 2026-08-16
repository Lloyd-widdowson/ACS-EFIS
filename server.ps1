$port = 8080
$baseDir = $PSScriptRoot

$mimeTypes = @{
  ".html" = "text/html; charset=utf-8"
  ".css"  = "text/css; charset=utf-8"
  ".js"   = "application/javascript; charset=utf-8"
  ".json" = "application/json; charset=utf-8"
  ".png"  = "image/png"
  ".jpg"  = "image/jpeg"
  ".jpeg" = "image/jpeg"
  ".svg"  = "image/svg+xml"
  ".ico"  = "image/x-icon"
}

$endpoint = New-Object System.Net.IPEndPoint([System.Net.IPAddress]::Any, $port)
$server = New-Object System.Net.Sockets.TcpListener($endpoint)
$server.Start()

Write-Host "============================================================"
Write-Host "AVIATION EFIS SUITE SERVER RUNNING (TCP SOCKET)"
Write-Host "Phone URL (Same Wi-Fi): http://192.168.2.43:$port/index.html"
Write-Host "PC URL:                 http://localhost:$port/index.html"
Write-Host "============================================================"

$cachedAdsbJson = ""
$cachedAdsbTime = 0

while ($true) {
  try {
    $client = $server.AcceptTcpClient()
    $client.ReceiveTimeout = 6000
    $client.SendTimeout = 6000
    $stream = $client.GetStream()
    $stream.ReadTimeout = 6000
    $stream.WriteTimeout = 6000
    $reader = New-Object System.IO.StreamReader($stream)
    $writer = New-Object System.IO.BinaryWriter($stream)

    $requestLine = $reader.ReadLine()
    if ([string]::IsNullOrWhiteSpace($requestLine)) {
      $client.Close()
      continue
    }

    # Safely consume remaining HTTP headers
    try {
      while ($true) {
        $h = $reader.ReadLine()
        if ([string]::IsNullOrWhiteSpace($h)) { break }
      }
    } catch {}

    $parts = $requestLine.Split(" ")
    $method = $parts[0]
    $rawUrl = if ($parts.Length -gt 1) { $parts[1] } else { "/index.html" }

    if ($rawUrl -eq "/" -or $rawUrl -eq "") {
      $rawUrl = "/index.html"
    }

    # Handle OPTIONS preflight
    if ($method -eq "OPTIONS") {
      $headerStr = "HTTP/1.1 200 OK`r`nAccess-Control-Allow-Origin: *`r`nAccess-Control-Allow-Methods: GET, POST, OPTIONS`r`nAccess-Control-Allow-Headers: *`r`nContent-Length: 0`r`nConnection: close`r`n`r`n"
      $hBytes = [System.Text.Encoding]::UTF8.GetBytes($headerStr)
      $writer.Write($hBytes)
      $writer.Flush()
      $client.Close()
      continue
    }

    # Handle /api/adsb -> Direct High-Speed CORS Proxy to api.adsb.lol with In-Memory Caching
    if ($rawUrl.StartsWith("/api/adsb")) {
      try {
        $now = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
        $needFetch = ($cachedAdsbJson -eq "" -or ($now - $cachedAdsbTime) -gt 3500)
        
        if ($needFetch) {
          $lat = "-31.8986"
          $lon = "152.5142"
          $dist = "250"
          
          if ($rawUrl.Contains("?")) {
            $qStr = $rawUrl.Split("?")[1]
            $pairs = $qStr.Split("&")
            foreach ($pair in $pairs) {
              $kv = $pair.Split("=")
              if ($kv[0] -eq "lat" -and $kv.Length -gt 1) { $lat = $kv[1] }
              if ($kv[0] -eq "lon" -and $kv.Length -gt 1) { $lon = $kv[1] }
              if ($kv[0] -eq "dist" -and $kv.Length -gt 1) { $dist = $kv[1] }
            }
          }
          
          $remoteUrl = "https://api.adsb.lol/v2/lat/$lat/lon/$lon/dist/$dist"
          [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
          $req = [System.Net.WebRequest]::Create($remoteUrl)
          $req.UserAgent = "AviationEFIS/1.0"
          $req.Timeout = 4000
          $resp = $req.GetResponse()
          $streamResp = $resp.GetResponseStream()
          $readerResp = New-Object System.IO.StreamReader($streamResp)
          $fetchedJson = $readerResp.ReadToEnd()
          $readerResp.Close()
          $resp.Close()

          if ($fetchedJson -and $fetchedJson.Length -gt 20) {
            $cachedAdsbJson = $fetchedJson
            $cachedAdsbTime = $now
          }
        }

        $responseJson = if ($cachedAdsbJson) { $cachedAdsbJson } else { '{"total":0,"ac":[]}' }
        $bodyBytes = [System.Text.Encoding]::UTF8.GetBytes($responseJson)

        $headerStr = "HTTP/1.1 200 OK`r`nAccess-Control-Allow-Origin: *`r`nAccess-Control-Allow-Methods: GET, OPTIONS`r`nAccess-Control-Allow-Headers: *`r`nCache-Control: no-cache, no-store, must-revalidate`r`nContent-Type: application/json; charset=utf-8`r`nContent-Length: $($bodyBytes.Length)`r`nConnection: close`r`n`r`n"
        $hBytes = [System.Text.Encoding]::UTF8.GetBytes($headerStr)
        $writer.Write($hBytes)
        $writer.Write($bodyBytes)
      } catch {
        $fallback = if ($cachedAdsbJson) { $cachedAdsbJson } else { '{"error":"Proxy Fetch Error","total":0,"ac":[]}' }
        $errBytes = [System.Text.Encoding]::UTF8.GetBytes($fallback)
        $headerStr = "HTTP/1.1 200 OK`r`nAccess-Control-Allow-Origin: *`r`nContent-Type: application/json; charset=utf-8`r`nContent-Length: $($errBytes.Length)`r`nConnection: close`r`n`r`n"
        $hBytes = [System.Text.Encoding]::UTF8.GetBytes($headerStr)
        $writer.Write($hBytes)
        $writer.Write($errBytes)
      }
      $writer.Flush()
      $client.Close()
      continue
    }

    # Parse path for static file
    $uriPath = $rawUrl.Split("?")[0]
    $cleanPath = ($uriPath.TrimStart("/").Replace("/", "\")) -replace '[^\w\.\-\\]', ''
    if ([string]::IsNullOrWhiteSpace($cleanPath)) { $cleanPath = "index.html" }
    $localFile = Join-Path $baseDir $cleanPath

    $fileExists = $false
    try {
      if (Test-Path -LiteralPath $localFile -PathType Leaf) { $fileExists = $true }
    } catch {
      $fileExists = $false
    }

    if ($fileExists) {
      $ext = [System.IO.Path]::GetExtension($localFile).ToLower()
      $contentType = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { "application/octet-stream" }
      $fileBytes = [System.IO.File]::ReadAllBytes($localFile)

      $headerStr = "HTTP/1.1 200 OK`r`nAccess-Control-Allow-Origin: *`r`nCache-Control: no-cache, no-store, must-revalidate`r`nPragma: no-cache`r`nExpires: 0`r`nContent-Type: $contentType`r`nContent-Length: $($fileBytes.Length)`r`nConnection: close`r`n`r`n"
      $hBytes = [System.Text.Encoding]::UTF8.GetBytes($headerStr)
      $writer.Write($hBytes)
      $writer.Write($fileBytes)
    } else {
      $errText = "404 Not Found: " + $uriPath
      $errBytes = [System.Text.Encoding]::UTF8.GetBytes($errText)
      $headerStr = "HTTP/1.1 404 Not Found`r`nAccess-Control-Allow-Origin: *`r`nContent-Type: text/plain`r`nContent-Length: $($errBytes.Length)`r`nConnection: close`r`n`r`n"
      $hBytes = [System.Text.Encoding]::UTF8.GetBytes($headerStr)
      $writer.Write($hBytes)
      $writer.Write($errBytes)
    }

    $writer.Flush()
    $client.Close()
  } catch {
    # Client disconnected
  }
}
