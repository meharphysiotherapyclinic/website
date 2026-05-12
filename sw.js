// Bumped to v2 since we are adding new files
const CACHE_NAME = "mehar-main-v2"; 

const urlsToCache = [
  "./",
  "./index.html",
  "./global-style.css", // Added missing CSS
  "./style.css",
  "./theme.css",
  "./logo.webp",
  "./logo.png",         // Added for iOS (Make sure you upload this!)
  "./doctor.webp"
];

// 1. Install Event (Caches files)
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// 2. Fetch Event (Serves from cache when offline)
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// 3. Activate Event (Deletes old caches automatically)
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log("Deleting old cache:", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
