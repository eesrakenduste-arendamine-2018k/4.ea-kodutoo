// actual file for homework

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