const CACHE_NAME = 'quiz-pro-v2'; // Version erhöht für Update
const ASSETS = [
  '/',              // Root-Verzeichnis hinzufügen
  'index.html',
  'manifest.json',  // Manifest sollte auch in den Cache
  '1000133550-removebg-preview.png',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js',
  'https://fonts.googleapis.com/css2?family=Rye&family=Roboto+Slab:wght@700&display=swap',
  // Hinweis: Google Fonts lädt oft weitere Dateien nach. 
  // Für echtes Offline-Design müssten die Schriften lokal im Ordner liegen.
];

self.addEventListener('install', (e) => {
  // forceUpdate: Der neue Service Worker wird sofort aktiv
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
