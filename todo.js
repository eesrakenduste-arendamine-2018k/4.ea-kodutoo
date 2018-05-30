<<<<<<< HEAD
window.onload = function() {
  counter = 0;
  /*console.log(counter);*/
  playOrPause();
  // console.log(counter);
=======
// Close nupp to do listi lisatu kinni panemiseks
/* myMusic = new sound("song.mp3");
myMusic.play(); */

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('serviceworker.js').then(function (registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful: ', registration)
    }, function (err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err)
    })
  }
}



window.onload = function() {
  document.getElementById("song").play();

  function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('serviceworker.js').then(function (registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful: ', registration)
      }, function (err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err)
      })
    }
  }
  registerServiceWorker()
>>>>>>> d8bd32156515848602d6baa7d5b4ae3b68e26654
}


var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Ülesande sulgemine
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// Ülesanne täidetud ehk ülesandele vajutades toimub läbikriipsutamine
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    Silence("death");
    ev.target.classList.toggle('checked');
  }
}, false);

//Enteri vajutus sisestab andmed listi
document.getElementById('item').addEventListener('keydown', function (e) {
  var value = this.value;
  if ((e.code === 'Enter' || e.code === 'NumpadEnter') && value) {
    newElement(value);
  }
});

/*-----------------------------------FUNKTSIOONID-----------------------------------*/

function playOrPause(){
  console.log(counter);
  if(counter % 2 == 0){
    document.getElementById("song").play();
  }else{
    document.getElementById("song").pause();
  }
  counter += 1;
  if(counter == 10){
    counter = 0;
  }
}

// Add nupu vajutusel uue elemendi tekitamine
function Silence(song){
  if(song == "mushroom"){
    var firstDelay = 5000;
    var secDelay = 1000;
  }else if(song == "death"){
    var firstDelay = 6000;
    var secDelay = 3627;
  }
  if(counter % 2 != 0){
    document.getElementById("song").pause();

    document.getElementById(song).play();

    setTimeout(function() {
      document.getElementById(song).pause();
    }, firstDelay);
    setTimeout(function() {
      document.getElementById("song").play();
    }, secDelay);

  }else{
    document.getElementById(song).play()
  }
}
function newElement() {

  var li = document.createElement("li");
  var inputValue = document.getElementById("item").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("Ei saa jätta tühjaks!");
  } else {
    document.getElementById("mainUl").appendChild(li);
    Silence("mushroom");
    console.log(counter);
  }
  document.getElementById("item").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}




