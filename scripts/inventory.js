var INVENTORY = function () {
  if (INVENTORY.instance_) {
    return INVENTORY.instance_
  }
  INVENTORY.instance_ = this

  this.itemArray = []

  this.background = null

  this.init()
}

INVENTORY.prototype = {
  init: function () {
    this.background = new Image()
    this.refreshPositions()
    this.initInventory()
  },

  initInventory: function () {
    for (var i = 0; i < 28; i++) {
      this.itemArray.push(new ITEM('empty'))
    }
  },

  refreshPositions: function () {
    // get BG pos.
    // make array of positions;
  },

  drawBackground: function (ctx, x, y, width, height) {
    this.background.onload = function () {
      ctx.drawImage(this.background, x, y, width, height)
    }.bind(this)
    this.background.src = 'img/experimental_inventory.png'
  },

  drawItems: function (ctx, x, y, width, height) {
    let invInnerWidth = width * 0.78
    let invInnerHeight = height * 0.77
    x = x + (width - invInnerWidth) / 2
    y = y + (height - invInnerHeight) / 2

    for (var i = 0; i < 28; i++) {
      if (this.itemArray[i].itemName !== 'empty') {
        let posx = i % 4
        let posy = Math.floor(i / 4)
        this.drawItem(ctx, x + (invInnerWidth / 4) * posx, y + (invInnerHeight / 7) * posy, invInnerWidth / 4, invInnerHeight / 7, this.itemArray[i])
      }
    }
  },

  drawItem: function (ctx, x, y, width, height, item) {
    item.img.onload = function () {
      ctx.drawImage(item.img, x, y, width, height)
    }
    item.img.src = item.imgSource
  },

  addItem: function (item) {
    for (var i = 0; i < 28; i++) {
      if (this.itemArray[i].itemName === 'empty') {
        this.itemArray[i] = item
        break
      }
    }
  },

  withdraw: function (width, height, clickX, clickY, bankHeight, offsetLeft, offsetTop) {
    let innerWidth = width * 0.78
    let innerHeight = height * 0.77
    let edgeSide = (width - innerWidth) / 2 + offsetLeft
    let edgeTop = (height - innerHeight) / 2 + offsetTop
    let posx
    let posy

    if (clickX < (innerWidth / 4) + edgeSide && clickX >= edgeSide) {
      posx = 1
    } else if (clickX < (innerWidth / 4 * 2) + edgeSide && clickX >= innerWidth / 4 + edgeSide) {
      posx = 2
    } else if (clickX < (innerWidth / 4 * 3) + edgeSide && clickX >= innerWidth / 4 * 2 + edgeSide) {
      posx = 3
    } else if (clickX < (innerWidth / 4 * 4) + edgeSide && clickX >= innerWidth / 4 * 3 + edgeSide) {
      posx = 4
    }
    if (clickY < (innerHeight / 7) + edgeTop + bankHeight && clickY >= edgeTop + bankHeight) {
      posy = 1
    } else if (clickY < (innerHeight / 7 * 2) + edgeTop + bankHeight && clickY >= (innerHeight / 7) + edgeTop + bankHeight) {
      posy = 2
    } else if (clickY < (innerHeight / 7 * 3) + edgeTop + bankHeight && clickY >= (innerHeight / 7 * 2) + edgeTop + bankHeight) {
      posy = 3
    } else if (clickY < (innerHeight / 7 * 4) + edgeTop + bankHeight && clickY >= (innerHeight / 7 * 3) + edgeTop + bankHeight) {
      posy = 4
    } else if (clickY < (innerHeight / 7 * 5) + edgeTop + bankHeight && clickY >= (innerHeight / 7 * 4) + edgeTop + bankHeight) {
      posy = 5
    } else if (clickY < (innerHeight / 7 * 6) + edgeTop + bankHeight && clickY >= (innerHeight / 7 * 5) + edgeTop + bankHeight) {
      posy = 6
    } else if (clickY < (innerHeight / 7 * 7) + edgeTop + bankHeight && clickY >= (innerHeight / 7 * 6) + edgeTop + bankHeight) {
      posy = 7
    }

    let itemPosition = ((posy - 1) * 4 + posx) - 1
    this.itemArray[itemPosition] = new ITEM('empty')
  }

}

/* window.onload = function(){
    var inventory = new INVENTORY();
    window.inventory = inventory;
}; */
