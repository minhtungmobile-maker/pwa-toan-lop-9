const CACHE_NAME = 'toan9-pwa-v1';
const urlsToCache = [
  './',
  'index.html',
  'css/style.css',
  'lessons/ds-ch1-bai1.html',
  'lessons/hh-ch1-bai1.html',
  'lessons/ds-ch2-bai1.html',
  'lessons/ds-ch3-bai1.html',
  'lessons/ds-ch4-bai1.html',
  'lessons/hh-ch2-bai1.html',
  'exercises/de-on-thi-vao-10-mau-1.html',
  'exercises/de-on-thi-vao-10-mau-2.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});