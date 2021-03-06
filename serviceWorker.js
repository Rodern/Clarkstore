var cacheName = 'ClexAn';
var staticAssets = [
    '/',
    '/index.html',
    '/styles/index.css',
    '/scripts/index.js',
    '/manifest.json',
    '/images/logo.png',
    '/serviceWorkers/sw.js'
];

//Demand to install
self.addEventListener('install', async e => {
    const cache = await caches.open(cacheName);
    //await cache.addAll(staticAssets);
    return self.skipWaiting();
});

// self.addEventListener('fetch', e => {
//     const req = e.request;
//     const url = new URL(req.url);

//     if(url.origin === loacation.origin) {
//         e.respondWith(cacheFirst(req));
//     } else {
//         e.respondWith(networkAndCache(req));
//     }
// });

/* Serve cached content when offline */
self.addEventListener('active', e => {
    self.clients.claim();
});

async function cacheFirst(req) {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(req);
    return cached || fetch(req);
}

async function networkAndCache(req) {
    const cache = await caches.open(cacheName);
    try {
        const fresh = await fetch(req);
        await cache.put(req, fresh.clone());
        return fresh;
    } catch (e) {
        const cached = await cache.match(req);
        return cached;
    }
}
