// Self-destroying service worker.
//
// This site used to ship a Workbox service worker via vite-plugin-pwa. That
// worker precached index.html and answered every navigation from the cache, so
// visitors kept loading a stale build until they hard-refreshed.
//
// The PWA plugin is gone, but browsers that already registered /sw.js will keep
// running their cached copy until something explicitly tears it down. They only
// fetch this file as part of their update check, so it has to stay deployed at
// this exact path to reach them. Once traffic has cycled through (a few weeks of
// normal visits, or whatever covers your returning-visitor tail), delete this
// file and the <script> tag in index.html that registers it.
//
// See: https://developer.chrome.com/docs/workbox/remove-buggy-service-workers

self.addEventListener("install", () => {
  // Replace the old worker immediately rather than waiting for every tab to close.
  self.skipWaiting();
});

self.addEventListener("activate", async () => {
  // Drop the precached build so nothing can be served from it.
  const keys = await caches.keys();
  await Promise.all(keys.map((key) => caches.delete(key)));

  await self.registration.unregister();

  // Reload open tabs so they leave the now-uncontrolled page and fetch fresh
  // assets from the network.
  const clients = await self.clients.matchAll({ type: "window" });
  for (const client of clients) {
    client.navigate(client.url);
  }
});
