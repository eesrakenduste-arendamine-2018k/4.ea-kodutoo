var CACHE_NAME = 'mingimang'
var cachedUrls = [
  '/~seppcasp/BlockEvader/script.js',
  '/~seppcasp/BlockEvader/game-v04.html'
  '/~seppcasp/BlockEvader/'  
  '/~seppcasp/BlockEvader/style.css'  
  
 ]

//Installing Your ServiceWorker
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        return cache.addAll(urlsToCache)
      })
  )
})

//Intercepting Fetch Requests
self.addEventListener("fetch", function(event) {
  if (event.request.method !== 'GET') {
    return;
  }
  event.respondWith(
    caches
      .match(event.request)
      .then(function(cached) {
        var networked = fetch(event.request)
          .then(fetchedFromNetwork, unableToResolve)
          .catch(unableToResolve);
        return cached || networked;
        
		function fetchedFromNetwork(response) {
          var cacheCopy = response.clone();
          caches
            .open(version + 'pages')
            .then(function add(cache) {
              cache.put(event.request, cacheCopy);
            })
            .then(function() {
            });

          return response;
        }

        function unableToResolve () {
          return new Response('<h1>Service Unavailable</h1>', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
              'Content-Type': 'text/html'
            })
          });
        }
      })
  );
});