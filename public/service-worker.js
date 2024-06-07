// Service worker code (service-worker.js)

const CACHE_NAME = "offline-cache-v1";
const urlsToCache = [
  "/",
  "/recent",
  "/app/globals.css",
  "/app/page.module.css",
  "/styles/theme.css",
  // Add more routes and assets as needed
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches
      .match(event.request)
      .then(function (response) {
        return (
          response ||
          fetch(event.request).then(function (response) {
            return caches.open(CACHE_NAME).then(function (cache) {
              cache.put(event.request, response.clone());
              return response;
            });
          })
        );
      })
      .catch(function () {
        return caches.match("/");
      })
  );
});

self.addEventListener("activate", function (event) {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
