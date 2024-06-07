// Service worker code (service-worker.js)

const CACHE_NAME = "offline-cache-v1";
const urlsToCache = [
  "/",
  "/recent",
  // Add more routes and assets as needed
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});
