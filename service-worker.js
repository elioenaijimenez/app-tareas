const CACHE_NAME = 'mi-pwa-cache-v3'; // ¡Cambiamos a v3!
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icono.png' // Asegúrate que este nombre sea igual al de tu archivo
];

// 1. INSTALACIÓN: Forzamos a que no espere y se active ya.
self.addEventListener('install', event => {
  self.skipWaiting(); // <--- ESTA LÍNEA ES MÁGICA
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Abriendo caché');
        return cache.addAll(urlsToCache);
      })
  );
});

// 2. ACTIVACIÓN: Reclamamos el control de las pestañas abiertas.
self.addEventListener('activate', event => {
  event.waitUntil(clients.claim()); // <--- ESTA TAMBIÉN
});

// 3. FETCH: La estrategia de siempre (Cache o Internet)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
