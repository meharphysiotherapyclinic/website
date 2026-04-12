const CACHE_NAME = "mehar-vcard-v2";
const urlsToCache = [
  "/vcard/",
  "/vcard/index.html",
  "/vcard/logo.png",
  "/vcard/qr_vcard.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
