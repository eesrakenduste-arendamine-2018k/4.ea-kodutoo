importScripts('/cache-polyfill.js');

self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('calculator').then(function(cache) {
     return cache.addAll([
       '/',
       '/popup.html',
       '/popup.html?homescreen=1',
	   '/options.html',
	   '/background.js',
	   '/localization.js',
	   '/options.js',
	   '/popup.js',
	   '/vue.min.js',
	   '/bootstrap.min.css',
	   '/imageDropDown.css',
	   '/popup.css',
	   '/icon16.png',
	   '/icon48.png',
	   '/icon128.png',
	   '/loading.gif',
	   '/_locales/en/messages.json',
	   '/_locales/ru/messages.json',
	   '/_metadata/verified_contents.json',
	   '/flags/cny.png',
	   '/flags/eu-flag.png',
	   '/flags/eur.png',
	   '/flags/gbp.png',
	   '/flags/Rossiya-Russia.png',
	   '/flags/rub.png',
	   '/flags/Zhongguo-China.png',
	   '/flags/UK.png',
	   '/flags/USA.png',
	   '/flags/usd.png',
       '/?homescreen=1'
     ]);
   })
 );
self.addEventListener('fetch', function(event) {

console.log(event.request.url);

event.respondWith(

caches.match(event.request).then(function(response) {

return response || fetch(event.request);

})

);

});
});