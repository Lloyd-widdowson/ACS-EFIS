# ADS-B traffic relay

GitHub Pages can't proxy requests, and the public ADS-B networks (adsb.lol, adsb.fi, airplanes.live) don't accept requests made directly from a browser on another site. Because of that, the app shows "ADS-B --" when it's hosted on Pages.

`cloudflare-worker.js` is a tiny relay that fetches those networks for the app. It runs free on Cloudflare Workers; the free plan allows 100,000 requests a day, and the app makes about one request every 4 s while it's open.

1. Sign up at https://dash.cloudflare.com (free plan).
2. Go to **Workers & Pages → Create → Create Worker**, name it (e.g. `efis-adsb`), and click **Deploy**.
3. Click **Edit code**, replace everything with the contents of `cloudflare-worker.js`, and click **Deploy**.
4. Copy the Worker's address (e.g. `https://efis-adsb.<you>.workers.dev`).
5. In the app, open **Settings → Traffic Relay URL**, paste the address, and tap outside the box.

Within a few seconds the header should read `ADS-B <count>`, and Map Controls should show `Live: N AC (Relay)`.

**Networks that refuse Cloudflare:** adsb.lol, adsb.fi and airplanes.live refuse requests from Cloudflare's servers (HTTP 403 or 503), so the relay falls back to the OpenSky Network. Anonymous OpenSky use allows about 400 requests a day, and the relay reuses each answer for 20 s. For more than that, create a free account at https://opensky-network.org. Make an API client under **Account → API Client**, then add `OPENSKY_CLIENT_ID` and `OPENSKY_CLIENT_SECRET` as secrets in the Worker's **Settings → Variables and Secrets**. That raises the limit to 4,000 a day.

**Testing:** open the Worker's address in a browser. You should see either aircraft JSON (`{"ac":[...]}`) or an error naming which network failed and why. Seeing "Hello World!" means the code wasn't pasted in, and you need to deploy it again. Under **Traffic Relay URL**, Settings shows the result of the app's last attempt with each source.

The relay answers direct browser visits and web pages from the sites listed in `ALLOWED_ORIGINS`. Add yours there if you host the app somewhere else.
