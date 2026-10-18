# ADS-B traffic relay

GitHub Pages can't proxy requests, and the public ADS-B networks (adsb.lol, adsb.fi, airplanes.live) don't accept requests made directly from a browser on another site. Because of that, the app shows "ADS-B --" when it's hosted on Pages.

`cloudflare-worker.js` is a tiny relay that fetches those networks for the app. It runs free on Cloudflare Workers; the free plan allows 100,000 requests a day, and the app makes about one request every 4 s while it's open.

1. Sign up at https://dash.cloudflare.com (free plan).
2. Go to **Workers & Pages → Create → Create Worker**, name it (e.g. `efis-adsb`), and click **Deploy**.
3. Click **Edit code**, replace everything with the contents of `cloudflare-worker.js`, and click **Deploy**.
4. Copy the Worker's address (e.g. `https://efis-adsb.<you>.workers.dev`).
5. In the app, open **Settings → Traffic Relay URL**, paste the address, and tap outside the box.

Within a few seconds the header should read `ADS-B <count>`, and Map Controls should show `Live: N AC (Relay)`.

The relay only answers requests from the sites listed in `ALLOWED_ORIGINS`. Add yours there if you host the app somewhere else.
