let item

let category = location.search.split('category=')[1]
console.log(category)
function saveLocal () {
  // todo: push to array to save all and not last
  let Label = category
  let o = [
    {
      elementName: document.getElementById('myInput').value,
      checked: false
    }
  ]
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
let items = localStorage.getItem(category)
if (items != null) {
  items = JSON.parse(items)
  let listItems = document.getElementById('myUL')
  for (let i = 0; i < items.length; i++) {
    item = '<li>' + items[i].elementName + '</li>'
    listItems.insertAdjacentHTML('beforeend', item)
  }
}
