const CACHE_NAME = "golu-dairy-v1";

const FILES_TO_CACHE = [
  "/golu-dairy-registration/",
  "/golu-dairy-registration/index.html",
  "/golu-dairy-registration/manifest.json",
  "/golu-dairy-registration/icon-192.png",
  "/golu-dairy-registration/icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response =>
      response || fetch(event.request)
    )
  );
});
