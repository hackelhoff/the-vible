// Service Worker for The Vible - Updated for modern module loading
const CACHE_NAME = 'the-vible-v2';
const STATIC_CACHE = 'the-vible-static-v2';

// Only cache static assets, not HTML or modules
const urlsToCache = [
  '/vite.svg',
  '/manifest.json'
];

// Install event - cache static resources only
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Opened static cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - smart caching strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip caching for module scripts and HTML
  if (request.destination === 'script' && request.url.includes('.js')) {
    // For JavaScript modules, always fetch fresh
    event.respondWith(fetch(request));
    return;
  }
  
  if (request.destination === 'document') {
    // For HTML, always fetch fresh
    event.respondWith(fetch(request));
    return;
  }
  
  // For static assets, try cache first, then network
  if (request.destination === 'image' || request.destination === 'font') {
    event.respondWith(
      caches.match(request)
        .then((response) => {
          return response || fetch(request);
        })
    );
    return;
  }
  
  // For everything else, fetch fresh
  event.respondWith(fetch(request));
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Handle service worker updates
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
