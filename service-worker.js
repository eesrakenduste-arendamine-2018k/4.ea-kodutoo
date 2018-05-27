   var CACHE_NAME = 'mullimang'
   var cachedUrls = [
    '/~daedalus/index.html',
    'script.js',
    '/~daedalus/favicon-16x16.png',
    '/~daedalus/favicon-32x32.png',
    '/~daedalus/favicon.ico',
    '/~daedalus/package-lock.json',
    '/~daedalus/package.json',
    '/~daedalus/safari-pinned-tab.svg',
    '/~daedalus/apple-touch-icon.png'
   ]
   
   self.addEventListener('install', function (event) {
     event.waitUntil(
       caches.open(CACHE_NAME)
         .then(function (cache) {
           console.log('cache opened')
           return cache.addAll(cachedUrls)
         })
     )
   })
   self.addEventListener('fetch', function (event) {
     if (event.request.method !== 'GET') { }
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
             console.log('WORKER: fetch response from network', event.request.url)
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
             return new Response('<h1>Service unavailable</h1>', {
               status: 503,
               statusText: 'Service unavailable',
               headers: new Headers({
                 'Content-Type': 'text-html'
               })
             })
           }
         })
     )
   })