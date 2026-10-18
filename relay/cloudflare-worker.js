/**
 * ACS EFIS ADS-B traffic relay (Cloudflare Worker).
 *
 * The public ADS-B networks refuse browser requests from static hosts such as GitHub Pages
 * (no CORS headers). This Worker fetches them server-side and returns the standard
 * ADSBexchange v2 JSON ({ "ac": [...] }) with CORS headers the app accepts.
 *
 * Request: GET https://<your-worker>.workers.dev/?lat=-31.89&lon=152.51&dist=100
 */

// Sites allowed to use this relay. Add your own if you host the app elsewhere.
const ALLOWED_ORIGINS = [
  "https://lloyd-widdowson.github.io",
  "http://localhost:8080",
  "http://127.0.0.1:8080"
];

function corsHeaders(origin) {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Vary": "Origin"
  };
}

function json(body, status, origin) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders(origin), "Content-Type": "application/json", "Cache-Control": "no-store" }
  });
}

export default {
  async fetch(request) {
    const origin = request.headers.get("Origin") || "";
    if (!ALLOWED_ORIGINS.includes(origin)) {
      return new Response("Forbidden", { status: 403 });
    }
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders(origin) });
    }

    const url = new URL(request.url);
    const lat = parseFloat(url.searchParams.get("lat"));
    const lon = parseFloat(url.searchParams.get("lon"));
    const dist = Math.max(1, Math.min(250, parseFloat(url.searchParams.get("dist")) || 100));
    if (!Number.isFinite(lat) || !Number.isFinite(lon) || Math.abs(lat) > 90 || Math.abs(lon) > 180) {
      return json({ error: "lat and lon are required" }, 400, origin);
    }

    const la = lat.toFixed(4), lo = lon.toFixed(4);
    const sources = [
      `https://api.adsb.lol/v2/lat/${la}/lon/${lo}/dist/${dist}`,
      `https://opendata.adsb.fi/api/v3/lat/${la}/lon/${lo}/dist/${dist}`,
      `https://api.airplanes.live/v2/point/${la}/${lo}/${dist}`
    ];

    for (const source of sources) {
      try {
        const resp = await fetch(source, { headers: { "User-Agent": "ACS-EFIS-relay" } });
        if (!resp.ok) continue;
        const data = await resp.json();
        if (data && Array.isArray(data.ac)) {
          return json({ ac: data.ac, source: new URL(source).hostname }, 200, origin);
        }
      } catch (e) {
        // try the next network
      }
    }
    return json({ error: "no ADS-B network answered" }, 502, origin);
  }
};
