// Service Worker para PWA offline-first
const CACHE_NAME = 'pajarito-saltador-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/public/manifest.json',
  '/src/game.js',
  '/src/input.js',
  '/src/physics.js',
  '/src/renderer.js',
  '/src/utils.js',
  '/public/assets/bird.png',
  '/public/assets/pipe.png',
  '/public/assets/background.png',
  '/public/assets/icon-192.png',
  '/public/assets/icon-512.png'
];

// Instalación: cachear assets estáticos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .catch((err) => {
        console.error('Error al cachear assets:', err);
      })
  );
  self.skipWaiting();
});

// Activación: limpiar caches antiguos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Estrategia: Cache First (offline-first)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Si está en cache, devolverlo
        if (response) {
          return response;
        }
        // Si no, intentar fetch de red
        return fetch(event.request)
          .then((response) => {
            // Si la respuesta es válida, cachearla
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
            return response;
          })
          .catch(() => {
            // Si falla la red y no está en cache, devolver página offline si es navegación
            if (event.request.mode === 'navigate') {
              return caches.match('/index.html');
            }
          });
      })
  );
});

