// service worker

const CACHE_NAME = 'sayings-v1'
const urlsToCache = [
  '/~rasmuskk/4.ea-kodutoo/src/index.html',
  '/~rasmuskk/4.ea-kodutoo/src/index.js',
  '/~rasmuskk/4.ea-kodutoo/src/item.html',
  '/~rasmuskk/4.ea-kodutoo/src/item.html',
  '/~rasmuskk/4.ea-kodutoo/src/css/style.css',
  'https://stackpath.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js',
  'https://stackpath.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
  '//code.jquery.com/jquery-3.3.1.min.js'
		
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
      .match(event.request)
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
