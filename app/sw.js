importScripts('serviceworker-cache-polyfill.js');

self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('airhorner').then(function(cache) {
     return cache.addAll([
       '/',
       '/index.html',
       '/style.css',
       '/js/calc.js',
       '/icons/favicon-500.png',
       '/icons/favicon-768.png',
       '/icons/favicon-1024.png',
       '/icons/favicon.ico',
       '/js/showElements.js',
       '/js/waypoints.js',
       '/js/jquery.waypoints.min.js',
       '/css/animate.css',
       '/css/waypoints.css'
     ]);
   })
 );
});
self.addEventListener('fetch', function(event) {

  console.log(event.request.url);
  
  event.respondWith(
  
  caches.match(event.request).then(function(response) {
  
  return response || fetch(event.request);
  
  })
  
  );
  
  });