
const MainApp = function () {
  if (MainApp.instance) {
    return MainApp.instance
  }
  MainApp.instance = this

  this.routes = MainApp.routes
  this.currentRoute = null

  this.init()
}

MainApp.routes = {
  'home-view': {
    'render': function () {
      console.log('>>>> Home')
    }
  },
  'main-view': {
    'render': function () {
      console.log('>>>> Main')
    }
  },
  'fit-view': {
    'render': function () {
      console.log('>>>> Fit')
    }
  },
  'weird-view': {
    'render': function () {
      console.log('>>>> Weird')
    }
  }
}

MainApp.prototype = {
  init: function () {
    console.log('Rakendus läks tööle')

    window.addEventListener('hashchange', this.routeChange.bind(this))

    if (!window.location.hash) {
      window.location.hash = 'home-view'
    } else {
      this.routeChange()
    }
  },

  routeChange: function (event) {
    this.currentRoute = location.hash.slice(1)
    if (this.routes[this.currentRoute]) {
      this.updateMenu()

      this.routes[this.currentRoute].render()
    } else {
      /// 404 - ei olnud
    }
  },

  updateMenu: function () {
    // http://stackoverflow.com/questions/195951/change-an-elements-class-with-javascript
    document.querySelector('.active-menu').className = document.querySelector('.active-menu').className.replace('active-menu', '')
    document.querySelector('.' + this.currentRoute).className += ' active-menu'
  }

}

window.addEventListener('load', function (event) {
  const app = new MainApp()
  window.app = app
})

/* Select box */

var x, i, j, selElmnt, a, b, c
/* look for any elements with the class "custom-select": */
x = document.getElementsByClassName('custom-select')
for (i = 0; i < x.length; i++) {
  selElmnt = x[i].getElementsByTagName('select')[0]
  /* for each element, create a new DIV that will act as the selected item: */
  a = document.createElement('DIV')
  a.setAttribute('class', 'select-selected')
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML
  x[i].appendChild(a)
  /* for each element, create a new DIV that will contain the option list: */
  b = document.createElement('DIV')
  b.setAttribute('class', 'select-items select-hide')
  for (j = 1; j < selElmnt.length; j++) {
    /* for each option in the original select element,
    create a new DIV that will act as an option item: */
    c = document.createElement('DIV')
    c.innerHTML = selElmnt.options[j].innerHTML
    c.addEventListener('click', function (e) {
      /* when an item is clicked, update the original select box,
        and the selected item: */
      var y, i, k, s, h
      s = this.parentNode.parentNode.getElementsByTagName('select')[0]
      h = this.parentNode.previousSibling
      for (i = 0; i < s.length; i++) {
        if (s.options[i].innerHTML === this.innerHTML) {
          s.selectedIndex = i
          h.innerHTML = this.innerHTML
          y = this.parentNode.getElementsByClassName('same-as-selected')
          for (k = 0; k < y.length; k++) {
            y[k].removeAttribute('class')
          }
          this.setAttribute('class', 'same-as-selected')
          break
        }
      }
      h.click()
    })
    b.appendChild(c)
  }
  x[i].appendChild(b)
  a.addEventListener('click', function (e) {
    /* when the select box is clicked, close any other select boxes,
      and open/close the current select box: */
    e.stopPropagation()
    closeAllSelect(this)
    this.nextSibling.classList.toggle('select-hide')
    this.classList.toggle('select-arrow-active')
  })
}

function closeAllSelect (elmnt) {
  /* a function that will close all select boxes in the document,
  except the current select box: */
  let x, y, i
  let arrNo = []
  x = document.getElementsByClassName('select-items')
  y = document.getElementsByClassName('select-selected')
  for (i = 0; i < y.length; i++) {
    if (elmnt === y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove('select-arrow-active')
    }
  }
  for (i = 0; i < x.length; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add('select-hide')
    }
  }
}
/* if the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener('click', closeAllSelect)
