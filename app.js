(function () {
  let app = {
    // routes (i.e. views and their functionality) defined here
    'routes': {
      'weightLog': {
        'rendered': function () {
        }
      }
    },
    // The default view is recorded here. A more advanced implementation
    // might query the DOM to define it on the fly.
    'default': 'the-default-view',
    'routeChange': function () {
      app.routeID = location.hash.slice(1)
      app.route = app.routes[app.routeID]
      app.routeElem = document.getElementById(app.routeID)
      if (app.route) {
        app.route.rendered()
      }
    },
    // The function to start the app
    'init': function () {
      window.addEventListener('hashchange', function () {
        app.routeChange()
      })
      // If there is no hash in the URL, change the URL to
      // include the default view's hash.
      if (!window.location.hash) {
        window.location.hash = app.default
      } else {
        // Execute routeChange() for the first time
        app.routeChange()
      }
    }
  }
  window.app = app
})()

app.init()
