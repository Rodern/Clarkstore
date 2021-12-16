var cacheName = 'ClexAn Foods';
var staticAssets = [
    '/',
    '/index.html',
    '/styles/index.css',
    '/scripts/index.js',
    '/manifest.json',
    '/images/logo.png',
    '/serviceWorkers/sw.js'];

//Demand to install
self.addEventListener('install', async e => {
    const cache = await caches.open(cacheName);
    await cache.addAll(staticAssets);
    return self.skipWaiting();
});

/* Serve cached content when offline */
self.addEventListener('active', e => {

});

self.addEventListener('fetch', e => console.log("fetch"));