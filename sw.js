const CACHE_NAME = 'quiz-pro-v3'; // Version erhöht für Refresh

const ASSETS = [
  './',
  'index.html',
  'manifest.json',
  '1000133550-removebg-preview.png',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js',
  'https://fonts.googleapis.com/css2?family=Rye&family=Roboto+Slab:wght@700&display=swap'
];

// Installation: Alles in den Cache laden
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Erzwingt, dass der neue SW sofort aktiv wird
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Wir nutzen addAll, aber fangen Fehler ab, falls eine Datei fehlt
      return cache.addAll(ASSETS).catch(err => console.error("Cache Error:", err));
    })
  );
});

// Aktivierung: Alte Caches löschen
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// Fetch: Erst im Cache suchen, dann Netzwerk
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).catch(() => {
        // Falls Netzwerkfehler und nicht im Cache (z.B. neue Bilder)
        console.log("Offline und nicht im Cache:", event.request.url);
      });
    })
  );
});
