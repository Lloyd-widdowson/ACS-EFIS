const CACHE_NAME = 'efis-suite-v29';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './offline-tiles.js',
  './app.js',
  './test-suite.js',
  './manifest.json',
  './favicon.ico',
  './favicon-16x16.png',
  './favicon-32x32.png',
  './favicon-48x48.png',
  './apple-touch-icon.png',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-192.png',
  './icon-maskable-512.png',
  './app-store-thumbnail.png',
  './og-image.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // cache: 'reload' bypasses the browser HTTP cache so a new version never precaches stale files
      return cache.addAll(ASSETS.map(url => new Request(url, { cache: 'reload' }))).catch(err => console.warn('PWA Cache addAll warning:', err));
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;

  // Network-First with Cache Fallback for instantaneous updates on reload. App files are
  // revalidated with the server ('no-cache') so GitHub Pages' 10-minute HTTP cache can't
  // serve old CSS/JS alongside a new index.html.
  const sameOrigin = new URL(e.request.url).origin === self.location.origin;
  e.respondWith(
    fetch(sameOrigin ? new Request(e.request, { cache: 'no-cache' }) : e.request)
      .then(response => {
        if (response && response.status === 200) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(e.request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        return caches.match(e.request);
      })
  );
});
