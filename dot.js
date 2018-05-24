
gamelength=30;
timerID=null
var playing=false;
var numholes=6*10;
var currentpos=-1;

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
	}else {
	totalhits+=1;
	document.cpanel.score.value=totalhits;
	launch();
	document.dmz.elements[id].checked=false;
	   }
}

function random() {
	return(Math.floor(Math.random()*100%numholes));
}