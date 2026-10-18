/**
 * Vercel serverless route /api/adsb: the same ADS-B relay as relay/cloudflare-worker.js,
 * run on Vercel because the ADS-B networks refuse requests from Cloudflare's servers.
 * Optional OPENSKY_CLIENT_ID / OPENSKY_CLIENT_SECRET come from the project's environment variables.
 */
import relay from "../relay/cloudflare-worker.js";

export function GET(request) {
  return relay.fetch(request, process.env);
}

export function OPTIONS(request) {
  return relay.fetch(request, process.env);
}
