// Service Worker for The Vible - Updated for modern module loading
const CACHE_NAME = 'the-vible-v3';
const STATIC_CACHE = 'the-vible-static-v3';

// Only cache static assets, not HTML or modules
const urlsToCache = [
  '/vite.svg',
  '/manifest.json'
];

// Install event - cache static resources only
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Opened static cache');
        return cache.addAll(urlsToCache);
      })
  );
  // Force activation
  self.skipWaiting();
});

// Fetch event - aggressive no-cache for JavaScript and HTML
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // NEVER cache JavaScript files - always fetch fresh
  if (request.url.includes('.js') || request.destination === 'script') {
    console.log('JavaScript file requested, fetching fresh:', request.url);
    event.respondWith(
      fetch(request).catch(() => {
        // If fetch fails, return a new Response to prevent caching
        return new Response('', { status: 404 });
      })
    );
    return;
  }
  
  // NEVER cache HTML files - always fetch fresh
  if (request.url.includes('.html') || request.destination === 'document') {
    console.log('HTML file requested, fetching fresh:', request.url);
    event.respondWith(
      fetch(request).catch(() => {
        return new Response('', { status: 404 });
      })
    );
    return;
  }
  
  // NEVER cache CSS files - always fetch fresh
  if (request.url.includes('.css') || request.destination === 'style') {
    console.log('CSS file requested, fetching fresh:', request.url);
    event.respondWith(
      fetch(request).catch(() => {
        return new Response('', { status: 404 });
      })
    );
    return;
  }
  
  // For static assets only, try cache first, then network
  if (request.destination === 'image' || request.destination === 'font') {
    event.respondWith(
      caches.match(request)
        .then((response) => {
          return response || fetch(request);
        })
    );
    return;
  }
  
  // For everything else, fetch fresh and don't cache
  event.respondWith(
    fetch(request).catch(() => {
      return new Response('', { status: 404 });
    })
  );
});

// Activate event - clean up old caches and take control immediately
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== CACHE_NAME) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Take control immediately
      self.clients.claim()
    ])
  );
});

// Handle service worker updates
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Force update on any error
self.addEventListener('error', (event) => {
  console.error('Service Worker error:', event.error);
  // Force reload to get fresh content
  self.clients.matchAll().then(clients => {
    clients.forEach(client => {
      client.postMessage({ type: 'FORCE_RELOAD' });
    });
  });
});
