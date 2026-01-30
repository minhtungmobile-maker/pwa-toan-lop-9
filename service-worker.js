const CACHE_NAME = 'toan9-levels-v1';
const urlsToCache = [
  './',
  'index.html',
  'manifest.json',
  'css/style.css',
  'levels/level-1-yếu/ds-ch1-bai1.html',
  'levels/level-2-trung-binh/ds-ch2-bai1.html',
  'exercises/de-on-thi-vao-10-mau-1.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});