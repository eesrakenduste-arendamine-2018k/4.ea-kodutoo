var legExercises=["Barbell Squat", "Dumbbell Lunges", "Leg Press", "Lying Leg Curls", "Leg Extensions", "Standing Calf Raises"];
var abExercises=["Hanging Leg Raise", "Machine Crunch", "Cable Pallof Press", "Kneeling Cable Crunch", "Squat", "Ab-Wheel Roll-Out", "Exercise-Ball Pike", "Plank"];
var backExercises=["Barbell Deadlift", "Bent-Over Barbell Deadlift", "Wide-Grip Pull-Up", "Standing T-Bar Row", "Wide-Grip Seated Cable Row", "Reverse-Grip Smith Machine Row", "Close-Grip Pull-Down", "Single-Arm Dumbbell Row"];
var armExercises=["Close-Grip Barbell Bench Press", "Cable Rope Overhead Triceps Extension", "Triceps Pushdown", "Barbell Curl", "Dumbbell Alternate Bicep Curl", "Standing Biceps Cable Curl", "Palms-Down Wrist Curl Over A Bench"];
var sets=["10", "15", "20", "25", "30"];

var appendTens = document.getElementById("tens");
var appendSeconds = document.getElementById("seconds");

/*
serviceWorkeri koodi osa võetud - https://github.com/elinorroosalu/4.ea-kodutoo/blob/master/calculator.html
*/
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
  navigator.serviceWorker.register('serviceWorker.js').then(function(registration) {
    console.log('ServiceWorker registration successful with scope: ', registration.scope);
  }, function(err) {
    console.log('ServiceWorker registration failed: ', err);
    });
  });
}

function hideExercises(){
  var abs = document.getElementById("abs").style.display="none";
  var back = document.getElementById("back").style.display="none";
  var arms = document.getElementById("arms").style.display="none";
  var legs = document.getElementById("legs").style.display="none";
}

function hideMain(){
  var main = document.getElementById("main").style.display="none";
}
function showabs(){
  hideMain();
  abs.style.display="block";
  getAbExercise();
}
function showback(){
  hideMain(); 
  back.style.display="block";
  getBackExercise();
  console.log("hoi");
}
function showarms(){
  hideMain();
  arms.style.display="block";
  getArmExercise();
}
function showlegs(){
  hideMain();
  legs.style.display="block";
  getLegExercise();
}

function randomNumber(max){
  return (Math.floor(Math.random() * max)); 
}

function getLegExercise() {
  var output = document.getElementById('output4');
  var getsets = document.getElementById('sets4');
  var getreps = document.getElementById('reps4');
  var random1=randomNumber(legExercises.length);
  var random2=randomNumber(sets.length);

  var returnExercise = legExercises[random1];
  var returnSets = sets[random2];
  var returnReps = randomNumber(4)+2;

  getsets.innerHTML = returnSets+" sets";
  getreps.innerHTML = returnReps+" reps";
  output.innerHTML = returnExercise;
}

function getArmExercise() {
  var output = document.getElementById('output1');
  var getsets = document.getElementById('sets1');
  var getreps = document.getElementById('reps1');

  var random1=randomNumber(armExercises.length);
  var random2=randomNumber(sets.length);

  var returnReps = randomNumber(4)+2;
  var returnSets = sets[random2];
  var returnExercise = armExercises[random1];

  getsets.innerHTML = returnSets+" sets";
  getreps.innerHTML = returnReps+" reps";
  output.innerHTML = returnExercise;
}

function getAbExercise() {
  var output = document.getElementById('output3');
  var getsets = document.getElementById('sets3');
  var getreps = document.getElementById('reps3');

  var random1=randomNumber(abExercises.length);
  var random2=randomNumber(sets.length);

  var returnReps = randomNumber(4)+2;
  var returnSets = sets[random2];
  var returnExercise = abExercises[random1];

  getsets.innerHTML = returnSets+" sets";
  getreps.innerHTML = returnReps+" reps";
  output.innerHTML = returnExercise;
}
/*
function getBackExercise() {
  var output = document.getElementById('output2');
  var getsets = document.getElementById('sets2');
  var getreps = document.getElementById('reps2');

  var random1=randomNumber(backExercises.length);
  var random2=randomNumber(sets.length);

  var returnReps = randomNumber(4)+2;
  var returnSets = sets[random2];
  var returnExercise = backExercises[random1];

  getsets.innerHTML = returnSets+" sets";
  getreps.innerHTML = returnReps+" reps";
  output.innerHTML = returnExercise;
  getStopWatch();
}

function getStopWatch(){
  var seconds = 00;
  var tens = 10;
  var appendTens = document.getElementById("tens");
  var appendSeconds = document.getElementById("seconds");
  var Interval ;
  function start() {
    clearInterval(Interval);
    Interval = setInterval(startTimer, 10);
  }
  function startTimer () {
    tens++;
    console.log(tens);
    if(tens < 9){
      appendTens.innerHTML = "0" + tens;
    }
    if (tens > 9){
      appendTens.innerHTML = tens;
    }
    if (tens > 99) {
      console.log("seconds");
      seconds++;
      appendSeconds.innerHTML = "0" + seconds;
      tens = 0;
      appendTens.innerHTML = "0" + 0;
    }
 
    appendSeconds.innerHTML = seconds;
    console.log(seconds);

  }
    
}
*/
