const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

// Precache the static assets and other files specified in the manifest
precacheAndRoute(self.__WB_MANIFEST);

// Cache-first strategy for HTML pages
const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 days
    }),
  ],
});

// Pre-cache the initial HTML and index page
warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

// Register route to cache HTML pages
registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// Cache assets such as JavaScript, CSS, and images
const assetCache = new StaleWhileRevalidate({
  cacheName: 'asset-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxEntries: 50, // Limit the number of entries in the cache
      maxAgeSeconds: 7 * 24 * 60 * 60, // Cache for 7 days
    }),
  ],
});

// Register route for assets
registerRoute(
  ({ request }) => ['style', 'script', 'image'].includes(request.destination),
  assetCache
);

// Fallback to an offline page if the network is unavailable
offlineFallback({
  pageFallback: '/index.html',
});
