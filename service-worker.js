const CACHE_NAME = 'ast-pwa-v1.8.22';
const CORE_FILES = [
  './', './index.html', './style.css', './script.js', './manifest.webmanifest',
  './assets/pwa/icon-192.png', './assets/pwa/icon-512.png', './assets/pwa/icon-maskable-512.png',
  './assets/logo-latest.jpg', './assets/conference-audience.jpg', './assets/conference-speaker.jpg',
  './assets/conference-ceremony.jpg', './assets/conference-stage.jpg', './assets/conference-delegates.jpg',
  './assets/conference-hall.jpg'
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(CORE_FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('ast-pwa-') && key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return; // Never intercept membership submissions or uploads.
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return; // Keep Google Apps Script and other services online-only.
  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).then(response => {
      const copy = response.clone(); caches.open(CACHE_NAME).then(cache => cache.put('./index.html', copy));
      return response;
    }).catch(async () => (await caches.match(request)) || (await caches.match('./index.html'))));
    return;
  }
  if (['style','script','image','font'].includes(request.destination) || /\.(?:json|csv|webmanifest)$/.test(url.pathname)) {
    event.respondWith(caches.match(request).then(cached => {
      const fresh = fetch(request).then(response => {
        if (response && response.ok) { const copy=response.clone(); caches.open(CACHE_NAME).then(cache=>cache.put(request,copy)); }
        return response;
      }).catch(()=>cached);
      return cached || fresh;
    }));
  }
});
// Push delivery is prepared for a future VAPID-backed subscription service.
// No push subscription is created until the Association configures and approves a push backend.
self.addEventListener('push', event => {
  let data = { title: 'The Association of Science Teachers', body: 'There is a new Association update.', url: './#notices' };
  try { if (event.data) data = { ...data, ...event.data.json() }; } catch (_) {
    if (event.data) data.body = event.data.text();
  }
  event.waitUntil(self.registration.showNotification(data.title, {
    body: data.body, icon: './assets/pwa/icon-192.png', badge: './assets/pwa/icon-192.png',
    data: { url: data.url || './#notices' }
  }));
});
self.addEventListener('notificationclick', event => {
  event.notification.close();
  const target = new URL((event.notification.data && event.notification.data.url) || './#notices', self.location.origin).href;
  event.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
    for (const client of list) if (client.url.startsWith(self.location.origin) && 'focus' in client) { client.navigate(target); return client.focus(); }
    return clients.openWindow(target);
  }));
});
