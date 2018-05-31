let item, o
let category = location.search.split('category=')[1]
document.getElementById('itemTitle').innerHTML = category
let delButton = document.getElementById("delBtn")
delButton.addEventListener("click", function(){
  localStorage.removeItem(category)
  window.location.replace("https://www.tlu.ee/~timj/4.ea-kodutoo/src/index.html")
})
let items = localStorage.getItem(category)
let save = items
let Label = category

function saveLocal () {
  if (save == null) {
    o = {
      stored: [],
      categoryName: category
    }
  } else {
    save = JSON.parse(save)
    o = {
      stored: save.stored,
      categoryName: category
    }
  }
  let json = {
    elementName: document.getElementById('myInput').value,
    checked: false
  }

  o.stored.push(json)
  console.log(o)

  localStorage.setItem(Label, JSON.stringify(o))
}
// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul')
list.addEventListener('click', function (ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked')
  }
}, false)

let addItem = document.getElementById('addBtn')
addItem.addEventListener('click', function () {
  saveLocal()
})
// let items = localStorage.getItem(category)
if (items != null) {
  items = JSON.parse(items)
  let listItems = document.getElementById('myUL')
  for (let i = 0; i < items.stored.length; i++) {
    if (items.stored[i] != null) {
      item = '<li>' + items.stored[i].elementName + '</li>'
      listItems.insertAdjacentHTML('beforeend', item)
    }
  }
}


