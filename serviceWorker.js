// service worker
const CACHE_NAME = 'game-v1'
const urlsToCache = [
  'https://www.tlu.ee/~stenlaht/4.ea-kodutoo/images/artu2.png',
  'https://www.tlu.ee/~stenlaht/4.ea-kodutoo/images/artu3.png',
  'https://www.tlu.ee/~stenlaht/4.ea-kodutoo/images/artu4.png',
  'https://www.tlu.ee/~stenlaht/4.ea-kodutoo/images/artu5.png',
  'https://www.tlu.ee/~stenlaht/4.ea-kodutoo/images/artu6.png',
  'https://www.tlu.ee/~stenlaht/4.ea-kodutoo/images/artu7.png',
  'https://www.tlu.ee/~stenlaht/4.ea-kodutoo/images/artu8.png',
  'https://www.tlu.ee/~stenlaht/4.ea-kodutoo/images/artu9.png',
  'https://www.tlu.ee/~stenlaht/4.ea-kodutoo/images/artu10.png',
  'https://www.tlu.ee/~stenlaht/4.ea-kodutoo/images/artupoiss.png',
  'https://www.tlu.ee/~stenlaht/4.ea-kodutoo/images/artuemand.png',
  'https://www.tlu.ee/~stenlaht/4.ea-kodutoo/images/artukunn.png',
  'https://www.tlu.ee/~stenlaht/4.ea-kodutoo/images/artuass.png',
  'https://www.tlu.ee/~stenlaht/4.ea-kodutoo/images/poti2.png',
  'https://www.tlu.ee/~stenlaht/4.ea-kodutoo/images/poti3.png',
  'https://www.tlu.ee/~stenlaht/4.ea-kodutoo/images/poti4.png',
  'https://www.tlu.ee/~stenlaht/4.ea-kodutoo/images/poti5.png',
  'https://www.tlu.ee/~stenlaht/4.ea-kodutoo/images/poti6.png',
  'https://www.tlu.ee/~stenlaht/4.ea-kodutoo/images/poti7.png',
  'https://www.tlu.ee/~stenlaht/4.ea-kodutoo/images/poti8.png',
  'https://www.tlu.ee/~stenlaht/4.ea-kodutoo/images/poti9.png',
  'https://www.tlu.ee/~stenlaht/4.ea-kodutoo/images/poti10.png',
  'https://www.tlu.ee/~stenlaht/4.ea-kodutoo/images/potipoiss.png',
  'https://www.tlu.ee/~stenlaht/4.ea-kodutoo/images/potiemand.png',
  'https://www.tlu.ee/~stenlaht/4.ea-kodutoo/images/potikunn.png',
  'https://www.tlu.ee/~stenlaht/4.ea-kodutoo/images/potiass.png',
  'https://www.tlu.ee/~stenlaht/4.ea-kodutoo/images/risti2.png',
  'https://www.tlu.ee/~stenlaht/4.ea-kodutoo/images/risti3.png',
  'https://www.tlu.ee/~stenlaht/4.ea-kodutoo/images/risti4.png',
  'https://www.tlu.ee/~stenlaht/4.ea-kodutoo/images/risti5.png',
  'https://www.tlu.ee/~stenlaht/4.ea-kodutoo/images/risti6.png',
  'https://www.tlu.ee/~stenlaht/4.ea-kodutoo/images/risti7.png',
  'https://www.tlu.ee/~stenlaht/4.ea-kodutoo/images/risti8.png',
  'https://www.tlu.ee/~stenlaht/4.ea-kodutoo/images/risti9.png',
  'https://www.tlu.ee/~stenlaht/4.ea-kodutoo/images/risti10.png',
  'https://www.tlu.ee/~stenlaht/4.ea-kodutoo/images/ristipoiss.png',
  'https://www.tlu.ee/~stenlaht/4.ea-kodutoo/images/ristiemand.png',
  'https://www.tlu.ee/~stenlaht/4.ea-kodutoo/images/ristikunn.png',
  'https://www.tlu.ee/~stenlaht/4.ea-kodutoo/images/ristiass.png',
  'https://www.tlu.ee/~stenlaht/4.ea-kodutoo/images/ruutu2.png',
  'https://www.tlu.ee/~stenlaht/4.ea-kodutoo/images/ruutu3.png',
  'https://www.tlu.ee/~stenlaht/4.ea-kodutoo/images/ruutu4.png',
  'https://www.tlu.ee/~stenlaht/4.ea-kodutoo/images/ruutu5.png',
  'https://www.tlu.ee/~stenlaht/4.ea-kodutoo/images/ruutu6.png',
  'https://www.tlu.ee/~stenlaht/4.ea-kodutoo/images/ruutu7.png',
  'https://www.tlu.ee/~stenlaht/4.ea-kodutoo/images/ruutu8.png',
  'https://www.tlu.ee/~stenlaht/4.ea-kodutoo/images/ruutu9.png',
  'https://www.tlu.ee/~stenlaht/4.ea-kodutoo/images/ruutu10.png',
  'https://www.tlu.ee/~stenlaht/4.ea-kodutoo/images/ruutupoiss.png',
  'https://www.tlu.ee/~stenlaht/4.ea-kodutoo/images/ruutuemand.png',
  'https://www.tlu.ee/~stenlaht/4.ea-kodutoo/images/ruutukunn.png',
  'https://www.tlu.ee/~stenlaht/4.ea-kodutoo/images/ruutuass.png',
  'https://www.tlu.ee/~stenlaht/4.ea-kodutoo/game.js',
  'https://www.tlu.ee/~stenlaht/4.ea-kodutoo/game.html',
  'https://www.tlu.ee/~stenlaht/4.ea-kodutoo/',
  'https://www.tlu.ee/~stenlaht/4.ea-kodutoo/kaarditagune.png',
  'https://www.tlu.ee/~stenlaht/4.ea-kodutoo/package.json'
 


]

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
