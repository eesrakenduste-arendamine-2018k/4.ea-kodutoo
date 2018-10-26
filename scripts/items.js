var ITEM = function (itemName, position) {
  this.itemName = itemName
  this.position = position
  this.init()
}

ITEM.prototype = {
  init: function () {
    this.img = new Image()
    this.imgSource = 'img/' + this.itemName + '.png'
  },
  setPosition: function (newPosition) {
    this.position = newPosition
  },

  getPosition: function () {
    return this.position
  }

}
