const CACHE_NAME = "mehar-main-v4"; // Bumped: theme.css removed
const DYNAMIC_CACHE = "mehar-dynamic-v1";

const urlsToCache = [
  "./",
  "./index.html",
  "./faq.html",
  "./gallery.html",
  "./appointment.html",
  "./blog.html",
  "./global-style.css",
  "./style.css",
  "./logo.webp",
  "./logo.png",
  "./doctor.webp"
];

// Install: Cache the core UI
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Fetch: Serve from cache, and dynamically cache new pages (like blogs)
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cacheRes => {
      return cacheRes || fetch(event.request).then(fetchRes => {
        // Only cache successful responses and internal pages (blogs)
        if (event.request.url.includes('.html') || event.request.url.includes('.webp')) {
          return caches.open(DYNAMIC_CACHE).then(cache => {
            cache.put(event.request.url, fetchRes.clone());
            return fetchRes;
          });
        }
        return fetchRes;
      });
    })
  );
});

// Activate: Clean up old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME && key !== DYNAMIC_CACHE)
            .map(key => caches.delete(key))
      );
    })
  );
});
