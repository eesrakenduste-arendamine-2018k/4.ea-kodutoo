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

// Main activity stopper

const mainActivityTrigger = document.getElementById('start-main-activity')
const mainActivity = document.getElementById('main-activity')
const mainActivityStopwatch = new Stopwatch(false)

function startMainActivity () {
  mainActivityTrigger.classList.add('is-active')
  mainActivityTrigger.textContent = 'Stop'
  mainActivityStopwatch.start()
}

function stopMainActivity () {
  mainActivityTrigger.classList.remove('is-active')
  mainActivityTrigger.textContent = 'Start'
  mainActivityStopwatch.stop(mainActivity.value)
}

mainActivityTrigger.addEventListener('click', function () {
  mainActivityStopwatch.isOn ? stopMainActivity() : startMainActivity()
})

// Fit activity stopper

const fitActivityTrigger = document.getElementById('start-fit-activity')
const fitActivity = document.getElementById('fit-activity')
const fitActivityStopwatch = new Stopwatch(false)

function startFitActivity () {
  fitActivityTrigger.classList.add('is-active')
  fitActivityTrigger.textContent = 'Stop'
  fitActivityStopwatch.start()
}

function stopFitActivity () {
  fitActivityTrigger.classList.remove('is-active')
  fitActivityTrigger.textContent = 'Start'
  fitActivityStopwatch.stop(fitActivity.value)
}

fitActivityTrigger.addEventListener('click', function () {
  fitActivityStopwatch.isOn ? stopFitActivity() : startFitActivity()
})

// Weird activity stopper

const weirdActivityTrigger = document.getElementById('start-weird-activity')
const weirdActivity = document.getElementById('weird-activity')
const weirdActivityStopwatch = new Stopwatch(false)

function startWeirdActivity () {
  weirdActivityTrigger.classList.add('is-active')
  weirdActivityTrigger.textContent = 'Stop'
  weirdActivityStopwatch.start()
}

function stopWeirdActivity () {
  weirdActivityTrigger.classList.remove('is-active')
  weirdActivityTrigger.textContent = 'Start'
  weirdActivityStopwatch.stop(weirdActivity.value)
}

weirdActivityTrigger.addEventListener('click', function () {
  weirdActivityStopwatch.isOn ? stopWeirdActivity() : startWeirdActivity()
})

// Kuvamised

const activityList = document.getElementById('data')

for (var i = 0, len = localStorage.length; i < len; ++i) {
  // console.log(localStorage.getItem(localStorage.key(i)))
  activityList.insertAdjacentHTML('beforeend', `<li> <span>${localStorage.key(i)}</span> – ${timeFormatter(destructMS(localStorage.getItem(localStorage.key(i))))}</li>`)
  console.log(destructMS(localStorage.getItem(localStorage.key(i))))
}

// timeformatter

function destructMS (milli) {
  if (isNaN(milli) || milli < 0) {
    return null
  }

  var d, h, m, s, ms
  s = Math.floor(milli / 1000)
  m = Math.floor(s / 60)
  s = s % 60
  h = Math.floor(m / 60)
  m = m % 60
  d = Math.floor(h / 24)
  h = h % 24
  ms = Math.floor((milli % 1000) * 1000) / 1000
  return { d: d, h: h, m: m, s: s, ms: ms }
}

function timeFormatter (msObject) {
  return `${msObject.h} h ${msObject.m} min ${msObject.s} sec`
}
