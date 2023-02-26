const CACHE_NAME = 'my-site-cache-v1';
const urlsToCache = [

];

self.addEventListener('install', function(event) {
 
});

self.addEventListener('fetch', function(event) {
  event.respondWith(fetch(event.request));
});
