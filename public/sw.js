const CACHE_NAME = 'orma-v1'

self.addEventListener('install', (event) => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  // Clear all caches unconditionally to fix stale dev assets
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => caches.delete(k)))
    ).then(() => {
      self.registration.unregister();
    })
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  // Always fetch from network, bypass cache completely
  event.respondWith(fetch(event.request));
})
