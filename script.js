let myGamePiece;
let myObstacles = [];
let myScore;

function startGame() {
    myGamePiece = new component(30, 30, "red", 220, 460);
	myScore = new component("30px", "Consolas", "black", 280, 40, "text");
    myGameArea.start();
}

let myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 500;
        this.canvas.height = 500;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20); //ILMSELT KUSKIL SIIN MINGI INTERVAL HALB, ROHELISED KASTID VILGUVAD
		this.interval = setInterval(obstacleGameArea, 20);
		window.addEventListener('keydown', function (e) {
            myGameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.key = false;
        })
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }    
}

function component(width, height, color, x, y, type) {
	this.type = type;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = myGameArea.context;
		if (this.type == "text") {
			ctx.font = this.width + " " + this.height;
			ctx.fillStyle = color;
			ctx.fillText(this.text, this.x, this.y);
		} else {
			ctx.fillStyle = color;
			ctx.fillRect(this.x, this.y, this.width, this.height);
		}
	}
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;        
    }    
    this.crashWith = function(otherobj) {
        let myleft = this.x;
        let myright = this.x + (this.width);
        let mytop = this.y;
        let mybottom = this.y + (this.height);
        let otherleft = otherobj.x;
        let otherright = otherobj.x + (otherobj.width);
        let othertop = otherobj.y;
        let otherbottom = otherobj.y + (otherobj.height);
        let crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        } else {
			gameOver();
		}
        return crash;
    }
}

function gameOver() {
    if (confirm("Game over.\n Score: " + myGameArea.frameNo + "\nDo you want to play again?")) {
        location.reload();
    }
}

function obstacleGameArea() {
	this.gravity = 0.4;
    this.gravitySpeed = 0;
    let x, y;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            myGameArea.stop();
            return;
        } 
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(75)) {
        x = myGameArea.canvas.width-(Math.random() * 500) + 1;;
        y = myGameArea.canvas.height - 500;
        myObstacles.push(new component((Math.random() * 100) + 1, 40, "green", x, y));
    }
    for (i = 0; i < myObstacles.length; i += 1) {
        this.gravitySpeed += this.gravity;
        myObstacles[i].x += myObstacles[i].speedX;
		myObstacles[i].y += myObstacles[i].speedY + this.gravitySpeed;;;
        myObstacles[i].update();
    }
	myScore.text="SCORE: " + myGameArea.frameNo;
    myScore.update();
    myGamePiece.newPos();    
    myGamePiece.update();
}

function updateGameArea() {
    myGameArea.clear();
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;    
    if (myGameArea.key && myGameArea.key == 37) {myGamePiece.speedX = -3; }
    if (myGameArea.key && myGameArea.key == 39) {myGamePiece.speedX = 3; }
    myGamePiece.newPos();    
    myGamePiece.update();
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}

function moveleft() {
    myGamePiece.speedX = -3; 
}

function moveright() {
    myGamePiece.speedX = 3; 
}

function clearmove() {
    myGamePiece.speedX = 0; 
    myGamePiece.speedY = 0; 
}

function playAgain () {
	location.reload();
}