
gamelength=30;
timerID=null
var playing=false;
var numholes=6*10;
var currentpos=-1;

var sound_correct = document.getElementById("audio_correct");
var sound_false = document.getElementById("audio_false");

function clrholes() {
	for(var k=0;k<document.dmz.elements.length;k++)
	document.dmz.elements[k].checked=false;
}

function stoptimer() {
	if(playing)
	clearTimeout(timerID);
}

function showtime(remtime) {
	document.cpanel.timeleft.value=remtime;
	if(playing) {
	if(remtime==0) {
	stopgame();
	return;
	}
	else {
	temp=remtime-1;
	timerID=setTimeout("showtime(temp)",1000);
		  }
	   }
}

function stopgame() {
	stoptimer();
	playing=false;
	document.cpanel.timeleft.value=0;
	clrholes();
	alert('Game Over.\nYour score is:  '+totalhits);
}

function play() {
	stoptimer();
	if(playing) {
	stopgame();
	return;
	}
	playing=true;
	clrholes();
	totalhits=0;
	document.cpanel.score.value=totalhits;
	launch();
	showtime(gamelength);
}

function launch() {
	var launched=false;
	while(!launched) {
	mynum=random();
	console.log(mynum)
	if(mynum!=currentpos) {
	document.dmz.elements[mynum].checked=true;
	currentpos=mynum;
	launched=true;
		  }
	   }
}

function hithead(id) {
	if(playing==false) {
	clrholes();
	return;
}

if(currentpos!=id) {
	totalhits+=-1;
	document.cpanel.score.value=totalhits;
	document.dmz.elements[id].checked=false;
	
    sound_false.play();
	document.body.style.background = radial-gradient(rgba(255,0,0,0), rgba(255,0,0,0), red);
	
	}else {
	totalhits+=1;
	document.cpanel.score.value=totalhits;
	launch();
	document.dmz.elements[id].checked=false;
	sound_correct.play();
	}
}

function random() {
	return(Math.floor(Math.random()*100%numholes));
}