if (localStorage.length !== 0) {
  let listItems = document.getElementById('myUL')
  for (let i = 0; i < localStorage.length; i++) {
    let item = JSON.parse(localStorage.getItem(localStorage.key(i)))
    let name = item.categoryName
    item = '<li>' + name + '</li>'
    item = '<a href="item.html?category=' + name + '">' + item + '</a>'
    console.log(item)
    listItems.insertAdjacentHTML('beforeend', item)
  }
}

/*
// function registerServiceWorker () {
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('serviceWorker.js').then(function (registration) {
    // Registration was successful
    console.log('ServiceWorker registration successful: ', registration)
  }, function (err) {
    // registration failed :(
    console.log('ServiceWorker registration failed: ', err)
  })
} */
//  }
