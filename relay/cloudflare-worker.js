/**
 * ACS EFIS ADS-B traffic relay (Cloudflare Worker).
 *
 * The public ADS-B networks refuse browser requests from static hosts such as GitHub Pages
 * (no CORS headers). This Worker fetches them server-side and returns the standard
 * ADSBexchange v2 JSON ({ "ac": [...] }) with CORS headers the app accepts.
 *
 * Request: GET https://<your-worker>.workers.dev/?lat=-31.89&lon=152.51&dist=100
 * Opening the bare address in a browser runs a test near Taree and shows which networks answer.
 */

// Sites allowed to use this relay. Add your own if you host the app elsewhere.
const ALLOWED_ORIGINS = [
  "https://lloyd-widdowson.github.io",
  "http://localhost:8080",
  "http://127.0.0.1:8080"
];

function corsHeaders(origin) {
  // No Origin header means the address was opened directly in a browser tab (a manual test)
  return origin
    ? { "Access-Control-Allow-Origin": origin, "Access-Control-Allow-Methods": "GET, OPTIONS", "Vary": "Origin" }
    : {};
}

function json(body, status, origin) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders(origin), "Content-Type": "application/json", "Cache-Control": "no-store" }
  });
}

// Fetch one network with a time limit; resolves to its aircraft list or throws with the reason
async function fetchNetwork(source) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 4000);
  try {
    const resp = await fetch(source, {
      signal: controller.signal,
      headers: { "User-Agent": "ACS-EFIS-relay (personal hobby EFIS)", "Accept": "application/json" }
    });
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const data = await resp.json();
    if (!data || !Array.isArray(data.ac)) throw new Error("unexpected response");
    return data.ac;
  } catch (e) {
    throw new Error(e && e.name === "AbortError" ? "timed out" : (e && e.message) || "failed");
  } finally {
    clearTimeout(timer);
  }
}

export default {
  async fetch(request) {
    const origin = request.headers.get("Origin") || "";
    if (origin && !ALLOWED_ORIGINS.includes(origin)) {
      return new Response("Forbidden", { status: 403 });
    }
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders(origin) });
    }

    const url = new URL(request.url);
    // Defaults let a bare browser visit run a test around Taree
    const lat = parseFloat(url.searchParams.get("lat") ?? "-31.9");
    const lon = parseFloat(url.searchParams.get("lon") ?? "152.5");
    const dist = Math.max(1, Math.min(250, parseFloat(url.searchParams.get("dist")) || 100));
    if (!Number.isFinite(lat) || !Number.isFinite(lon) || Math.abs(lat) > 90 || Math.abs(lon) > 180) {
      return json({ error: "lat and lon are required" }, 400, origin);
    }

    const la = lat.toFixed(4), lo = lon.toFixed(4);
    const sources = {
      "adsb.lol": `https://api.adsb.lol/v2/lat/${la}/lon/${lo}/dist/${dist}`,
      "adsb.fi": `https://opendata.adsb.fi/api/v3/lat/${la}/lon/${lo}/dist/${dist}`,
      "airplanes.live": `https://api.airplanes.live/v2/point/${la}/${lo}/${dist}`
    };

    // Ask all networks at once and answer with the first that works
    const tried = {};
    const attempts = Object.entries(sources).map(([name, src]) =>
      fetchNetwork(src).then(
        ac => ({ name, ac }),
        err => { tried[name] = err.message; throw err; }
      )
    );
    try {
      const { name, ac } = await Promise.any(attempts);
      return json({ ac, source: name }, 200, origin);
    } catch (e) {
      const reasons = Object.entries(tried).map(([n, r]) => `${n} ${r}`).join(", ");
      return json({ error: `no ADS-B network answered (${reasons})`, tried }, 502, origin);
    }
  }
};
