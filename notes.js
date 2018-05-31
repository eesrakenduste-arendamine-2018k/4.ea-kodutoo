let rgb = []

window.onload = function(){
  registerServiceWorker();
}

let el = document.querySelector('#container');

if(el){
  el.addEventListener('mousemove', function(event) {
      color(event)
      console.log('hiireke')
  })
}

//If storage space doesn't exist
if(localStorage.getItem("noteitems")==null){
    let placeholder = []
    localStorage.setItem("noteitems", JSON.stringify(placeholder))
}
this.registerServiceWorker()
function random(to){
  return Math.floor(Math.random() * to)
}

//Push to local storage
function pushToStorage(data){
    localStorage.setItem("noteitems", JSON.stringify(data))
}

//Pull from local storage
function pullFromStorage(){
    return JSON.parse(localStorage.getItem("noteitems"))
}

function registerServiceWorker(){
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

//Angular module
angular.module('notePadApp', [])
  .controller('notePadController', function() {
    var notePad = this;
    //Pulls from local storage
    notePad.notes = pullFromStorage()

    window.addEventListener('devicemotion', function(){
      const xGravity = event.accelerationIncludingGravity.x
    
      if(xGravity > 0){
        navigator.vibrate(200)
        this.color(event)
      }
    })

    //Add function, pushes to local array which is pushed to local storage
    notePad.addNote = function() {
      if(notePad.noteText == ""){
        alert("Write something first!")
      }
      else{
        notePad.notes.push({text:notePad.noteText, done:false});
        pushToStorage(notePad.notes)
        notePad.noteText = '';
      }
    };
    
    
    function color(e){
      r = Math.round(e.pageX/w * 255)
      g = Math.round((h-e.pageY)/h * 255)
      b = 160
        rgb = [r, g, b]
        console.log('varv?')
        document.body.style.backgroundColor = 'rgb(' + 
        [rgb[0],rgb[1],rgb[2]].join(',') + ')';

        console.log(e)
    }

    notePad.saveCheck = function(){
      pushToStorage(notePad.notes)
    }
    
    //archive function, keeps items that haven't been checked, pushes final array to local storage
    notePad.archive = function() {
      var oldNotes = notePad.notes;
      notePad.notes = [];
      angular.forEach(oldNotes, function(note) {
        if (!note.done) notePad.notes.push(note);
      });
      pushToStorage(notePad.notes)
    };	
  });

