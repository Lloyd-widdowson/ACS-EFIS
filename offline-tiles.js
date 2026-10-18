/**
 * OFFLINE MAP TILE CACHE (IndexedDB)
 * Pre-downloads base map tiles along the planned route corridor so the moving map
 * keeps working in flight without mobile data. Cached tiles are served cache-first
 * by OfflineAwareTileLayer, falling back to the network for anything not stored.
 */

const OfflineTileCache = (() => {
  const DB_NAME = "efis-offline-tiles";
  const STORE = "tiles";
  const DB_VERSION = 1;
  const MAX_TILES_PER_DOWNLOAD = 4000;
  const MAX_MERCATOR_LAT = 85.05112878;

  let dbPromise = null;

  function isSupported() {
    return typeof indexedDB !== "undefined";
  }

  function openDb() {
    if (!isSupported()) return Promise.reject(new Error("IndexedDB unavailable"));
    if (dbPromise) return dbPromise;
    dbPromise = new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE);
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => { dbPromise = null; reject(req.error); };
    });
    return dbPromise;
  }

  function txRequest(mode, fn) {
    return openDb().then(db => new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, mode);
      const req = fn(tx.objectStore(STORE));
      tx.oncomplete = () => resolve(req ? req.result : undefined);
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error);
    }));
  }

  // --------------------------------------------------------------------------
  // Slippy-map tile math (Web Mercator, 256 px tiles)
  // --------------------------------------------------------------------------
  function lonToTileX(lon, z) {
    const n = 1 << z;
    const x = Math.floor(((lon + 180) / 360) * n);
    return Math.min(n - 1, Math.max(0, x));
  }

  function latToTileY(lat, z) {
    const n = 1 << z;
    const clamped = Math.max(-MAX_MERCATOR_LAT, Math.min(MAX_MERCATOR_LAT, lat));
    const rad = clamped * Math.PI / 180;
    const y = Math.floor(((1 - Math.log(Math.tan(rad) + 1 / Math.cos(rad)) / Math.PI) / 2) * n);
    return Math.min(n - 1, Math.max(0, y));
  }

  function tileKey(layerKey, z, x, y) {
    return `${layerKey}/${z}/${x}/${y}`;
  }

  function haversineNm(lat1, lon1, lat2, lon2) {
    const toRad = Math.PI / 180;
    const dLat = (lat2 - lat1) * toRad;
    const dLon = (lon2 - lon1) * toRad;
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * toRad) * Math.cos(lat2 * toRad) * Math.sin(dLon / 2) ** 2;
    return 3440.065 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  /**
   * Returns every tile {z, x, y} within corridorNm of the route legs, for zooms minZoom..maxZoom.
   * Each leg is sampled at intervals no longer than the corridor width so the boxes overlap.
   */
  function tilesForRoute(waypoints, corridorNm, minZoom, maxZoom) {
    const seen = new Set();
    const tiles = [];
    if (!Array.isArray(waypoints) || waypoints.length === 0) return tiles;

    const points = [];
    const stepNm = Math.max(1, corridorNm);
    for (let i = 0; i < waypoints.length; i++) {
      const a = waypoints[i];
      points.push([a.lat, a.lon]);
      const b = waypoints[i + 1];
      if (!b) break;
      const legNm = haversineNm(a.lat, a.lon, b.lat, b.lon);
      const steps = Math.ceil(legNm / stepNm);
      for (let s = 1; s < steps; s++) {
        const f = s / steps;
        points.push([a.lat + (b.lat - a.lat) * f, a.lon + (b.lon - a.lon) * f]);
      }
    }

    const dLat = corridorNm / 60;
    for (let z = minZoom; z <= maxZoom; z++) {
      for (const [lat, lon] of points) {
        const dLon = corridorNm / (60 * Math.max(0.01, Math.cos(lat * Math.PI / 180)));
        const x0 = lonToTileX(lon - dLon, z), x1 = lonToTileX(lon + dLon, z);
        const y0 = latToTileY(lat + dLat, z), y1 = latToTileY(lat - dLat, z);
        for (let x = x0; x <= x1; x++) {
          for (let y = y0; y <= y1; y++) {
            const k = `${z}/${x}/${y}`;
            if (seen.has(k)) continue;
            seen.add(k);
            tiles.push({ z, x, y });
          }
        }
      }
    }
    return tiles;
  }

  function expandUrl(template, z, x, y) {
    const subdomains = "abc";
    return template
      .replace("{s}", subdomains[Math.abs(x + y) % subdomains.length])
      .replace("{z}", z)
      .replace("{x}", x)
      .replace("{y}", y)
      .replace("{r}", "");
  }

  // --------------------------------------------------------------------------
  // Storage
  // --------------------------------------------------------------------------
  function getTile(key) {
    return txRequest("readonly", store => store.get(key)).then(v => v || null);
  }

  function hasTile(key) {
    return txRequest("readonly", store => store.getKey(key)).then(v => v !== undefined);
  }

  function putTile(key, blob) {
    return txRequest("readwrite", store => store.put(blob, key));
  }

  function deleteTile(key) {
    return txRequest("readwrite", store => store.delete(key));
  }

  function clear() {
    return txRequest("readwrite", store => store.clear());
  }

  function countTiles(layerKey) {
    if (!layerKey) return txRequest("readonly", store => store.count());
    const range = IDBKeyRange.bound(`${layerKey}/`, `${layerKey}/￿`);
    return txRequest("readonly", store => store.count(range));
  }

  /**
   * Downloads the route corridor for one base layer. Tiles already cached are skipped.
   * Resolves to { total, fetched, skipped, failed, aborted }.
   */
  async function downloadRoute({ layerKey, template, waypoints, corridorNm, minZoom, maxZoom, onProgress, signal, concurrency = 4 }) {
    const tiles = tilesForRoute(waypoints, corridorNm, minZoom, maxZoom);
    if (tiles.length > MAX_TILES_PER_DOWNLOAD) {
      throw new Error(`Route needs ${tiles.length} tiles (limit ${MAX_TILES_PER_DOWNLOAD}). Reduce max zoom or corridor width.`);
    }

    const stats = { total: tiles.length, fetched: 0, skipped: 0, failed: 0, aborted: false };
    let next = 0;

    const report = () => { if (onProgress) onProgress(stats); };

    async function worker() {
      while (next < tiles.length) {
        if (signal && signal.aborted) { stats.aborted = true; return; }
        const t = tiles[next++];
        const key = tileKey(layerKey, t.z, t.x, t.y);
        try {
          if (await hasTile(key)) {
            stats.skipped++;
          } else {
            const res = await fetch(expandUrl(template, t.z, t.x, t.y), { signal });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            await putTile(key, await res.blob());
            stats.fetched++;
          }
        } catch (e) {
          if (signal && signal.aborted) { stats.aborted = true; return; }
          stats.failed++;
        }
        report();
      }
    }

    report();
    await Promise.all(Array.from({ length: Math.max(1, concurrency) }, worker));
    return stats;
  }

  return {
    MAX_TILES_PER_DOWNLOAD,
    isSupported,
    lonToTileX,
    latToTileY,
    tileKey,
    tilesForRoute,
    expandUrl,
    getTile,
    hasTile,
    putTile,
    deleteTile,
    clear,
    countTiles,
    downloadRoute
  };
})();

/**
 * Leaflet tile layer that serves tiles from OfflineTileCache first and the network second.
 * Falls back to a plain L.tileLayer when IndexedDB is unavailable.
 */
let OfflineAwareTileLayerClass = null;

function createOfflineAwareTileLayer(layerKey, urlTemplate, options) {
  if (typeof L === "undefined") return null;
  if (!OfflineTileCache.isSupported()) return L.tileLayer(urlTemplate, options);

  if (!OfflineAwareTileLayerClass) {
    OfflineAwareTileLayerClass = L.TileLayer.extend({
      createTile(coords, done) {
        const tile = document.createElement("img");
        tile.alt = "";
        tile.setAttribute("role", "presentation");

        const loadFromNetwork = () => {
          L.DomEvent.on(tile, "load", L.Util.bind(this._tileOnLoad, this, done, tile));
          L.DomEvent.on(tile, "error", L.Util.bind(this._tileOnError, this, done, tile));
          tile.src = this.getTileUrl(coords);
        };

        const key = OfflineTileCache.tileKey(this.options.offlineLayerKey, coords.z, coords.x, coords.y);
        OfflineTileCache.getTile(key).then(blob => {
          if (!blob) return loadFromNetwork();
          const objectUrl = URL.createObjectURL(blob);
          tile.onload = () => { URL.revokeObjectURL(objectUrl); done(null, tile); };
          tile.onerror = () => { URL.revokeObjectURL(objectUrl); tile.onload = tile.onerror = null; loadFromNetwork(); };
          tile.src = objectUrl;
        }).catch(loadFromNetwork);

        return tile;
      }
    });
  }

  return new OfflineAwareTileLayerClass(urlTemplate, Object.assign({}, options, { offlineLayerKey: layerKey }));
}
