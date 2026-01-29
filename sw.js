const CACHE_NAME = 'quiz-pro-v2'; // WICHTIG: Version auf v2 ändern!
const ASSETS = [
  './',              // WICHTIG: Punkt-Schrägstrich für das aktuelle Verzeichnis
  'index.html',
  'manifest.json',
  '1000133550-removebg-preview.png',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js',
  'https://fonts.googleapis.com/css2?family=Rye&family=Roboto+Slab:wght@700&display=swap'
];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Caching Assets...');
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
