var cacheName = 'ClexAn-foods-application';
var staticAssets = [
    '/',
    '/index.html',
    '/styles/index.css',
    '/styles/dashboard.css',
    '/styles/popups-modals.css',
    '/styles/welcome.css',
    '/styles/media-queries.css',
    '/scripts/init.js',
    '/scripts/index.js',
    '/manifest.json',
    '/images/logo.png',
    '/serviceWorkers/sw.js'];

//Demand to install
self.addEventListener('install', async e => {
    const cache = await caches.open(cacheName);
    //await cache.addAll(staticAssets);
    return self.skipWaiting();
});


/* Serve cached content when offline */
self.addEventListener('active', e => {

});

self.addEventListener('fetch', e => console.log("fetch"));

// /* Serve cached content when offline */
// self.addEventListener('active', e => {
//     self.clients.claim();
// });

 
// self.addEventListener('fetch', e => {
//     const req = e.request;
//     const url = new URL(req.url);

//     if(url.origin === loacation.origin) {
//         e.respondWith(cacheFirst(req));
//     } else {
//         e.respondWith(networkAndCache(req));
//     }
// });

// async function cacheFirst(req) {
//     const cache = await caches.open(cacheName);
//     const cached = await cache.match(req);
//     return cached || fetch(req);
// }

// async function networkAndCache(req) {
//     const cache = await caches.open(cacheName);
//     try {
//         const fresh = await fetch(req);
//         await cache.put(req, fresh.clone());
//         return fresh;
//     } catch (e) {
//         const cached = await cache.match(req);
//         return cached;
//     }
// }
