/* eslint-disable no-restricted-globals */

/* global self, caches, fetch */

const CACHE = 'cache-74ecee5';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./colophon.html","./favicon.png","./index.html","./kluci_hura_za_nim_002.html","./kluci_hura_za_nim_005.html","./kluci_hura_za_nim_006.html","./kluci_hura_za_nim_007.html","./kluci_hura_za_nim_008.html","./kluci_hura_za_nim_009.html","./kluci_hura_za_nim_010.html","./kluci_hura_za_nim_011.html","./kluci_hura_za_nim_012.html","./kluci_hura_za_nim_013.html","./kluci_hura_za_nim_014.html","./kluci_hura_za_nim_015.html","./kluci_hura_za_nim_016.html","./kluci_hura_za_nim_017.html","./kluci_hura_za_nim_018.html","./kluci_hura_za_nim_020.html","./kluci_hura_za_nim_021.html","./kluci_hura_za_nim_022.html","./kluci_hura_za_nim_023.html","./kluci_hura_za_nim_024.html","./manifest.json","./kluci_hura_za_nim_019.html","./resources/image001.jpg","./resources/image002.jpg","./resources/mzk_logo_tyrkys_transparent.jpg","./resources/obalka_kluci_hura_za_nim.jpg","./resources/upoutavka_eknihy.jpg","./scripts/bundle.js","./style/style.min.css","./fonts/Literata-Italic-var.woff2","./fonts/Literata-var.woff2","./fonts/LiterataTT-TextItalic.woff2","./fonts/LiterataTT-TextRegular.woff2","./fonts/LiterataTT-TextSemibold.woff2","./fonts/LiterataTT_LICENSE.txt","./fonts/SpaceGroteskVF.woff2","./fonts/SpaceGroteskVF_LICENSE.txt","./template-images/circles.png"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
