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

// ---------------------------------------------------------------------------
// OpenSky Network fallback. The community networks above refuse Cloudflare's servers,
// OpenSky may not. Anonymous use allows 400 credits a day (1 credit per call here);
// add OPENSKY_CLIENT_ID and OPENSKY_CLIENT_SECRET as Worker secrets for 4,000 a day.
// Results are reused for 20 s so the app's 4 s polling doesn't burn credits.
// ---------------------------------------------------------------------------
const refusedUntil = {};
const OPENSKY_CACHE_MS = 20000;
const openskyCache = new Map();
let openskyToken = null;

async function getOpenSkyToken(env) {
  if (!env || !env.OPENSKY_CLIENT_ID || !env.OPENSKY_CLIENT_SECRET) return null;
  if (openskyToken && openskyToken.expires > Date.now() + 60000) return openskyToken.value;
  const resp = await fetch("https://auth.opensky-network.org/auth/realms/opensky-network/protocol/openid-connect/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: env.OPENSKY_CLIENT_ID,
      client_secret: env.OPENSKY_CLIENT_SECRET
    })
  });
  if (!resp.ok) throw new Error(`login HTTP ${resp.status}`);
  const data = await resp.json();
  openskyToken = { value: data.access_token, expires: Date.now() + (data.expires_in || 1800) * 1000 };
  return openskyToken.value;
}

async function fetchOpenSky(lat, lon, env) {
  // 4.8 x 4.8 degree box (about 140 NM each way) stays within OpenSky's 1-credit size
  const key = `${lat.toFixed(1)},${lon.toFixed(1)}`;
  const cached = openskyCache.get(key);
  if (cached && Date.now() - cached.time < OPENSKY_CACHE_MS) return cached.ac;

  const box = 2.4;
  const url = `https://opensky-network.org/api/states/all?lamin=${(lat - box).toFixed(3)}&lomin=${(lon - box).toFixed(3)}&lamax=${(lat + box).toFixed(3)}&lomax=${(lon + box).toFixed(3)}`;
  const headers = { "User-Agent": "ACS-EFIS-relay (personal hobby EFIS)" };
  const token = await getOpenSkyToken(env);
  if (token) headers.Authorization = `Bearer ${token}`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 6000);
  let data;
  try {
    const resp = await fetch(url, { headers, signal: controller.signal });
    if (!resp.ok) throw new Error(resp.status === 429 ? "HTTP 429 (daily limit used up)" : `HTTP ${resp.status}`);
    data = await resp.json();
  } catch (e) {
    throw new Error(e && e.name === "AbortError" ? "timed out" : (e && e.message) || "failed");
  } finally {
    clearTimeout(timer);
  }

  // Convert OpenSky state vectors to the ADSBexchange v2 fields the app reads; skip aircraft on the ground
  const ac = (data.states || [])
    .filter(st => st[5] != null && st[6] != null && st[0] && !st[8])
    .map(st => ({
      hex: st[0],
      flight: (st[1] || "").trim(),
      lat: st[6],
      lon: st[5],
      alt_baro: st[7] != null ? Math.round(st[7] * 3.28084) : (st[13] != null ? Math.round(st[13] * 3.28084) : 0),
      gs: st[9] != null ? Math.round(st[9] * 1.94384) : 0,
      track: st[10] != null ? Math.round(st[10]) : 0,
      baro_rate: st[11] != null ? Math.round(st[11] * 196.85) : 0,
      squawk: st[14] || ""
    }));
  openskyCache.set(key, { time: Date.now(), ac });
  if (openskyCache.size > 50) openskyCache.delete(openskyCache.keys().next().value);
  return ac;
}

export default {
  async fetch(request, env) {
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

    // Ask all networks at once and answer with the first that works. A network that
    // refuses this server (HTTP 403) is skipped for 10 minutes rather than asked every poll.
    const tried = {};
    const now = Date.now();
    const attempts = Object.entries(sources).map(([name, src]) => {
      if ((refusedUntil[name] || 0) > now) {
        tried[name] = "HTTP 403 (refused recently, skipped)";
        return Promise.reject(new Error("skipped"));
      }
      return fetchNetwork(src).then(
        ac => ({ name, ac }),
        err => {
          tried[name] = err.message;
          if (err.message === "HTTP 403") refusedUntil[name] = now + 10 * 60 * 1000;
          throw err;
        }
      );
    });
    try {
      const { name, ac } = await Promise.any(attempts);
      return json({ ac, source: name }, 200, origin);
    } catch (e) {
      // All community networks refused: fall back to OpenSky
      try {
        const ac = await fetchOpenSky(lat, lon, env);
        return json({ ac, source: "OpenSky", tried }, 200, origin);
      } catch (osErr) {
        tried.OpenSky = osErr.message;
      }
      const reasons = Object.entries(tried).map(([n, r]) => `${n} ${r}`).join(", ");
      return json({ error: `no ADS-B network answered (${reasons})`, tried }, 502, origin);
    }
  }
};
