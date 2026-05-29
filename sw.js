const CACHE_NAME = "cfs-homepage-v1";
const CACHE_ASSETS = [
  "./",
  "./index.html",
  "./contact.html",
  "./privacy-policy.html",
  "./information-security-policy.html",
  "./antisocial-policy.html",
  "./aml-cft-policy.html",
  "./assets/cfs-logo-mark.png",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CACHE_ASSETS))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
