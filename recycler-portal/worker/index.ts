import { clientsClaim } from 'workbox-core';
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, NetworkFirst, CacheFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { BackgroundSyncPlugin } from 'workbox-background-sync';

// self is a ServiceWorkerGlobalScope
declare const self: ServiceWorkerGlobalScope;

// This will be replaced by the precache manifest injected by next-pwa
precacheAndRoute(self.__WB_MANIFEST || []);

clientsClaim();
self.skipWaiting();

// 1. StaleWhileRevalidate for lot listings
registerRoute(
  ({ url }) => url.pathname.startsWith('/api/lots') && !url.pathname.includes('/quotes'),
  new StaleWhileRevalidate({
    cacheName: 'lots-list-cache',
  })
);

// 2. NetworkFirst for specific quotes (3s timeout)
registerRoute(
  ({ url }) => url.pathname.includes('/api/quotes/'),
  new NetworkFirst({
    cacheName: 'quotes-cache',
    networkTimeoutSeconds: 3,
  })
);

// 3. CacheFirst for Lot Photos (30-day expiry)
registerRoute(
  ({ request, url }) => request.destination === 'image' || url.pathname.includes('/images/'),
  new CacheFirst({
    cacheName: 'lot-photos-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  })
);

// 4. Background Sync for offline mutations (POST / PATCH)
const bgSyncPlugin = new BackgroundSyncPlugin('sync-outbox', {
  maxRetentionTime: 24 * 60, // Retry for max of 24 Hours (specified in minutes)
});

registerRoute(
  ({ request }) => request.method === 'POST' || request.method === 'PATCH',
  new NetworkFirst({
    plugins: [bgSyncPlugin],
  })
);

self.addEventListener('activate', (event) => {
  // Clear old caches if version mismatch logic needed, though workbox-precaching handles its own.
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName.startsWith('next-pwa-') && cacheName !== 'next-pwa-v1')
          .map((cacheName) => caches.delete(cacheName))
      );
    })
  );
});
