// Some code used from https://www.w3schools.com/howto/howto_js_todolist.asp

let inputValue
/*
// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName('LI')
var i
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement('SPAN')
  var txt = document.createTextNode('\u00D7')
  span.className = 'close'
  span.id = i
  span.appendChild(txt)
  myNodelist[i].appendChild(span)
} */

// Click on a close button to hide the current list item
var close = document.getElementsByClassName('close')
for (i = 0; i < close.length; i++) {
  close[i].onclick = function () {
    var div = this.parentElement
    div.style.display = 'none'
  }
}
// Create new element when clicking Add
function newElement () {
  inputValue = document.getElementById('myInput').value
  var a = document.createElement('a')
  a.href = 'item.html?category=' + inputValue
  var li = document.createElement('li')
  var t = document.createTextNode(inputValue)
  li.appendChild(t)
  a.appendChild(li)
  if (inputValue === '') {
    alert('You must write something!')
  } else {
    if (window.location.pathname === '/~timj/4.ea-kodutoo/src/index.html' || window.location.pathname === '/~timj/4.ea-kodutoo/src/') {
      document.getElementById('myUL').appendChild(a)
    } else {
      document.getElementById('myUL').appendChild(li)
    }
  }
  document.getElementById('myInput').value = ''

  var span = document.createElement('SPAN')
  var txt = document.createTextNode('\u00D7')
  span.className = 'close'
  // span.id = inputValue
  span.appendChild(txt)
  li.appendChild(span)

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      var div = this.parentElement
      div.style.display = 'none'
    }
  }
}
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('serviceWorker.js').then(function (registration) {
    // Registration was successful
    console.log('ServiceWorker registration successful: ', registration)
  }, function (err) {
    // registration failed :(
    console.log('ServiceWorker registration failed: ', err)
  })
}

let addButton = document.getElementById('addBtn')
addButton.addEventListener('click', function () {
  newElement()
})
/*
let delButton = document.querySelector('span')
delButton.addEventListener("click", function (ev){
  let id = ev.target.id
  console.log(id)
  let el = document.getElementById(id)
  let row = el.parentNode.innerText
  row = row.slice(0, -1)
  localStorage.removeItem(row)
  debugger
    // let value = e.target.parentElement.value
  // localStorage.removeItem(value)
}) */
