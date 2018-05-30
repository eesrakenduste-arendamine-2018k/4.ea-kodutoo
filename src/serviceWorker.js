// service worker

const CACHE_NAME = 'notes-v1'
const urlsToCache = [
  'https://www.tlu.ee/~timj/4.ea-kodutoo/src/serviceWorker.js',
  'https://www.tlu.ee/~timj/4.ea-kodutoo/src/',
  'https://www.tlu.ee/~timj/4.ea-kodutoo/src/index.js',
  'https://www.tlu.ee/~timj/4.ea-kodutoo/src/loadFromStorage.js',
  'https://www.tlu.ee/~timj/4.ea-kodutoo/src/index.html',
  'https://www.tlu.ee/~timj/4.ea-kodutoo/src/item.html',
  'https://www.tlu.ee/~timj/4.ea-kodutoo/src/item.js',
  'https://www.tlu.ee/~timj/4.ea-kodutoo/src/images/manifest.json',
  'https://www.tlu.ee/~timj/4.ea-kodutoo/src/css/style.css',
  'https://www.tlu.ee/~timj/4.ea-kodutoo/src/images/apple-icon-57x57.png',
  'https://www.tlu.ee/~timj/4.ea-kodutoo/src/images/apple-icon-60x60.png',
  'https://www.tlu.ee/~timj/4.ea-kodutoo/src/images/apple-icon-72x72.png',
  'https://www.tlu.ee/~timj/4.ea-kodutoo/src/images/apple-icon-76x76.png',
  'https://www.tlu.ee/~timj/4.ea-kodutoo/src/images/apple-icon-114x114.png',
  'https://www.tlu.ee/~timj/4.ea-kodutoo/src/images/apple-icon-120x120.png',
  'https://www.tlu.ee/~timj/4.ea-kodutoo/src/images/apple-icon-144x144.png',
  'https://www.tlu.ee/~timj/4.ea-kodutoo/src/images/apple-icon-152x152.png',
  'https://www.tlu.ee/~timj/4.ea-kodutoo/src/images/apple-icon-180x180.png',
  'https://www.tlu.ee/~timj/4.ea-kodutoo/src/images/android-icon-192x192.png',
  'https://www.tlu.ee/~timj/4.ea-kodutoo/src/images/favicon-32x32.png',
  'https://www.tlu.ee/~timj/4.ea-kodutoo/src/images/favicon-96x96.png',
  'https://www.tlu.ee/~timj/4.ea-kodutoo/src/images/favicon-16x16.png',
  'https://www.tlu.ee/~timj/4.ea-kodutoo/src/images/ms-icon-70x70.png',
  'https://www.tlu.ee/~timj/4.ea-kodutoo/src/images/ms-icon-144x144.png',
  'https://www.tlu.ee/~timj/4.ea-kodutoo/src/images/ms-icon-150x150.png',
  'https://www.tlu.ee/~timj/4.ea-kodutoo/src/images/ms-icon-310x310.png',
  'https://code.jquery.com/jquery-3.3.1.min.js',
  'https://stackpath.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js',
  'https://stackpath.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'
]

// change above and nothing else

/*

    registerServiceWorker: function () { // to be placed in main js file and called when you want to initialize worker
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('serviceWorker.js').then(function (registration) {
          // Registration was successful
          console.log('ServiceWorker registration successful: ', registration)
        }, function (err) {
          // registration failed :(
          console.log('ServiceWorker registration failed: ', err)
        })
      }
    }

*/
self.addEventListener('install', function (event) {
  // Perform install steps

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        console.log('Opened cache')

        return cache.addAll(urlsToCache)
      })
  )
})

self.addEventListener('fetch', function (event) {
  // console.log('WORKER: fetch event in progress.');

  if (event.request.method !== 'GET') { return }
  event.respondWith(
    caches
      .match(event.request, {
        ignoreSearch: true
      })
      .then(function (cached) {
        const networked = fetch(event.request)
          .then(fetchedFromNetwork, unableToResolve)
          .catch(unableToResolve)
        console.log('WORKER: fetch event', cached ? '(cached)' : '(network)', event.request.url)
        return cached || networked

        function fetchedFromNetwork (response) {
          const cacheCopy = response.clone()
          console.log('WORKER: fetch response from network.', event.request.url)
          caches
            .open(version + 'pages')
            .then(function add (cache) {
              cache.put(event.request, cacheCopy)
            })
            .then(function () {
              console.log('WORKER: fetch response stored in cache.', event.request.url)
            })

          return response
        }

        function unableToResolve () {
          console.log('WORKER: fetch request failed in both cache and network.', event.request.url)
          return new Response('<h1>Service Unavailable</h1>', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
              'Content-Type': 'text/html'
            })
          })
        }
      })
  )
})
