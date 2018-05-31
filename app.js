/*
   =================================================================
    script: CrappyBird
    author: Varun Pant  
    date: April 6, 2014
    site: http://www.varunpant.com			 	 
   =================================================================
*/


// http://paulirish.com/2011/requestanimationframe-for-smart-animating
// shim layer with setTimeout fallback
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();
//sounds

var soundJump = new Audio("wing.ogg");
var soundScore = new Audio("point.ogg");
var soundHit = new Audio("hit.ogg");
var soundDie = new Audio("die.ogg");
var soundSwoosh = new Audio("swooshing.ogg");
//http://www.storiesinflight.com/html5/audio.html
var channel_max = 10; // number of channels
audiochannels = new Array();
for (a = 0; a < channel_max; a++) { // prepare the channels
    audiochannels[a] = new Array();
    audiochannels[a]['channel'] = new Audio(); // create a new audio object
    audiochannels[a]['finished'] = -1; // expected end time for this channel
}

function play_sound(s) {
    for (a = 0; a < audiochannels.length; a++) {
        thistime = new Date();
        if (audiochannels[a]['finished'] < thistime.getTime()) { // is this channel finished?
            audiochannels[a]['finished'] = thistime.getTime() + s.duration * 1000;
            audiochannels[a]['channel'].src = s.src;
            audiochannels[a]['channel'].load();
            audiochannels[a]['channel'].play();
            break;
        }
    }
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

var scores = []



// namespace our game
var FB = {
    // set up some inital values
    WIDTH: 320,
    HEIGHT: 480,
    scale: 1,
    // the position of the canvas
    // in relation to the screen
    offset: {
        top: 0,
        left: 0
    },
    // store all bird, touches, pipes etc
    entities: [],
    currentWidth: null,
    currentHeight: null,
    canvas: null,
    ctx: null,
    score: {
        taps: 0,
        coins: 0
    },
    distance: 0,
    digits: [],
    fonts: [],
    // we'll set the rest of these
    // in the init function
    RATIO: null,
    bg_grad: "day",
    game: null,
    currentWidth: null,
    currentHeight: null,
    canvas: null,
    ctx: null,
    ua: null,
    android: null,
    ios: null,
    gradients: {},
    init: function () {
        var grad;
        // the proportion of width to height
        FB.RATIO = FB.WIDTH / FB.HEIGHT;
        // these will change when the screen is resize
        FB.currentWidth = FB.WIDTH;
        FB.currentHeight = FB.HEIGHT;
        // this is our canvas element
        FB.canvas = document.getElementsByTagName('canvas')[0];
        // it's important to set this
        // otherwise the browser will
        // default to 320x200
        FB.canvas.width = FB.WIDTH;
        FB.canvas.height = FB.HEIGHT;
        // the canvas context allows us to 
        // interact with the canvas api
        FB.ctx = FB.canvas.getContext('2d');
        // we need to sniff out android & ios
        // so we can hide the address bar in
        // our resize function
        FB.ua = navigator.userAgent.toLowerCase();
        FB.android = FB.ua.indexOf('android') > -1 ? true : false;
        FB.ios = (FB.ua.indexOf('iphone') > -1 || FB.ua.indexOf('ipad') > -1) ? true : false;

        // setup some gradients
        grad = FB.ctx.createLinearGradient(0, 0, 0, FB.HEIGHT);
        grad.addColorStop(0, '#036');
        grad.addColorStop(0.5, '#69a');
        grad.addColorStop(1, 'yellow');
        FB.gradients.dawn = grad;

        grad = FB.ctx.createLinearGradient(0, 0, 0, FB.HEIGHT);
        grad.addColorStop(0, '#69a');
        grad.addColorStop(0.5, '#9cd');
        grad.addColorStop(1, '#fff');
        FB.gradients.day = grad;

        grad = FB.ctx.createLinearGradient(0, 0, 0, FB.HEIGHT);
        grad.addColorStop(0, '#036');
        grad.addColorStop(0.3, '#69a');
        grad.addColorStop(1, 'pink');
        FB.gradients.dusk = grad;

        grad = FB.ctx.createLinearGradient(0, 0, 0, FB.HEIGHT);
        grad.addColorStop(0, '#036');
        grad.addColorStop(1, 'black');
        FB.gradients.night = grad;

        // listen for clicks
        window.addEventListener('click', function (e) {
            e.preventDefault();
            FB.Input.set(e);
        }, false);

        // listen for touches
        window.addEventListener('touchstart', function (e) {
            e.preventDefault();
            // the event object has an array
            // called touches, we just want
            // the first touch
            FB.Input.set(e.touches[0]);
        }, false);
        window.addEventListener('touchmove', function (e) {
            // we're not interested in this
            // but prevent default behaviour
            // so the screen doesn't scroll
            // or zoom
            e.preventDefault();
        }, false);
        window.addEventListener('touchend', function (e) {
            // as above
            e.preventDefault();
        }, false);

        // we're ready to resize
        FB.resize();
        FB.changeState("Splash");

        FB.registerServiceWorker();
        FB.loop();

    },

    resize: function () {

        FB.currentHeight = window.innerHeight;
        // resize the width in proportion
        // to the new height
        FB.currentWidth = FB.currentHeight * FB.RATIO;

        // this will create some extra space on the
        // page, allowing us to scroll pass
        // the address bar, and thus hide it.
        if (FB.android || FB.ios) {
            document.body.style.height = (window.innerHeight + 50) + 'px';
        }

        // set the new canvas style width & height
        // note: our canvas is still 320x480 but
        // we're essentially scaling it with CSS
        FB.canvas.style.width = FB.currentWidth + 'px';
        FB.canvas.style.height = FB.currentHeight + 'px';

        // the amount by which the css resized canvas
        // is different to the actual (480x320) size.
        FB.scale = FB.currentWidth / FB.WIDTH;
        // position of canvas in relation to
        // the screen
        FB.offset.top = FB.canvas.offsetTop;
        FB.offset.left = FB.canvas.offsetLeft;

        // we use a timeout here as some mobile
        // browsers won't scroll if there is not
        // a small delay
        window.setTimeout(function () {
            window.scrollTo(0, 1);
        }, 1);
    },

    // this is where all entities will be moved
    // and checked for collisions etc
    update: function () {
        FB.game.update();
        FB.Input.tapped = false;
    },

    // this is where we draw all the entities
    render: function () {

        FB.Draw.rect(0, 0, FB.WIDTH, FB.HEIGHT, FB.gradients[FB.bg_grad]);

        // cycle through all entities and render to canvas
        for (i = 0; i < FB.entities.length; i += 1) {
            FB.entities[i].render();
        }

        FB.game.render();

    },

    // the actual loop
    // requests animation frame
    // then proceeds to update
    // and render
    loop: function () {

        requestAnimFrame(FB.loop);

        FB.update();
        FB.render();
    },
    changeState: function (state) {
        FB.game = new window[state]();
        FB.game.init();
    },

    registerServiceWorker: (function () {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('serviceWorker.js').then(function (registration) {
                // Registration was successful
                console.log('ServiceWorker registration successful: ', registration)
            }, function (err) {
                // registration failed :(
                console.log('ServiceWorker registration failed: ', err)
            })
        }
    })
};

// abstracts various canvas operations into
// standalone functions
FB.Draw = {

    clear: function () {
        FB.ctx.clearRect(0, 0, FB.WIDTH, FB.HEIGHT);
    },

    rect: function (x, y, w, h, col) {
        FB.ctx.fillStyle = col;
        FB.ctx.fillRect(x, y, w, h);
    },
    circle: function (x, y, r, col) {
        FB.ctx.fillStyle = col;
        FB.ctx.beginPath();
        FB.ctx.arc(x + 5, y + 5, r, 0, Math.PI * 2, true);
        FB.ctx.closePath();
        FB.ctx.fill();
    },
    Image: function (img, x, y) {
        FB.ctx.drawImage(img, x, y);
    },
    Sprite: function (img, srcX, srcY, srcW, srcH, destX, destY, destW, destH, r) {
        FB.ctx.save();
        FB.ctx.translate(destX, destY);
        FB.ctx.rotate(r * (Math.PI / 180));
        FB.ctx.translate(-(destX + destW / 2), -(destY + destH / 2));
        FB.ctx.drawImage(img, srcX, srcY, srcW, srcH, destX, destY, destW, destH);
        FB.ctx.restore();
    },
    semiCircle: function (x, y, r, col) {
        FB.ctx.fillStyle = col;
        FB.ctx.beginPath();
        FB.ctx.arc(x, y, r, 0, Math.PI, false);
        FB.ctx.closePath();
        FB.ctx.fill();
    },

    text: function (string, x, y, size, col) {
        FB.ctx.font = 'bold ' + size + 'px Monospace';
        FB.ctx.fillStyle = col;
        FB.ctx.fillText(string, x, y);
    }

};

FB.Input = {

    x: 0,
    y: 0,
    tapped: false,

    set: function (data) {
        this.x = (data.pageX - FB.offset.left) / FB.scale;
        this.y = (data.pageY - FB.offset.top) / FB.scale;
        this.tapped = true;

    }

};

FB.Cloud = function (x, y) {

    this.x = x;
    this.y = y;
    this.r = 30;
    this.col = 'rgba(255,255,255,1)';
    this.type = 'cloud';
    // random values so particles do no
    // travel at the same speeds
    this.vx = -0.10;

    this.remove = false;

    this.update = function () {

        // update coordinates
        this.x += this.vx;
        if (this.x < (0 - 115)) {
            this.respawn();
        }

    };


    this.render = function () {

        FB.Draw.circle(this.x + this.r, (this.y + this.r), this.r, this.col);
        FB.Draw.circle(this.x + 55, (this.y + this.r / 2), this.r / 0.88, this.col);
        FB.Draw.circle(this.x + 55, (this.y + this.r + 15), this.r, this.col);
        FB.Draw.circle(this.x + 85, (this.y + this.r), this.r, this.col);


    };

    this.respawn = function () {

        this.x = ~~(Math.random() * this.r * 2) + FB.WIDTH;
        this.y = ~~(Math.random() * FB.HEIGHT / 2)


    };

};

FB.BottomBar = function (x, y, r) {

    this.x = x;
    this.y = y
    this.r = r;
    this.vx = -1;
    this.name = 'BottomBar';

    this.update = function () {
        // update coordinates
        this.x += this.vx;
        if (this.x < (0 - this.r)) {
            this.respawn();
        }
    };

    this.render = function () {
        FB.Draw.rect(this.x, this.y, this.r, 100, '#D2691E');
        for (var i = 0; i < 10; i++) {
            FB.Draw.semiCircle(this.x + i * (this.r / 9), this.y, 20, '#050');
        }
    }

    this.respawn = function () {
        this.x = FB.WIDTH - 1;
    }

}

FB.Tree = function (x, y) {

    this.x = x;
    this.y = y
    this.r = 30;
    this.h = 50;
    this.w = this.r * 2;
    this.vx = -1;
    this.type = 'Tree';

    this.update = function () {
        // update coordinates
        this.x += this.vx;
        if (this.x < (0 - this.r * 2)) {
            this.respawn();
        }
    };

    this.render = function () {

        //FB.Draw.rect(this.x, this.y, this.w, this.h, '#c20');
        FB.Draw.circle(this.x + this.r, (this.y + this.r) - 10, this.r, 'green', '#050');
        FB.Draw.circle(this.x + (this.r / 2), (this.y + this.r) - 10, this.r / 3, 'rgba(0,0,0,0.08)');
        FB.Draw.rect(this.x + this.r, this.y + this.r, 10, this.r, 'brown', '#d20');
    }

    this.respawn = function () {
        this.x = FB.WIDTH + this.r;
    }


}

FB.Pipe = function (x, w) {

    this.centerX = x;
    this.coin = true
    this.w = w;
    this.h = FB.HEIGHT - 150;
    this.vx = -1;
    this.type = 'pipe';


    this.update = function () {
        // update coordinates
        this.centerX += this.vx;
        if (this.centerX == (0 - this.w)) {
            this.respawn();
        }
    };

    this.render = function () {

        if (this.coin) {
            FB.Draw.circle(this.centerX + this.w / 2 - 5, this.centerY - 5, 5, "Gold")
        }
        FB.Draw.rect(this.centerX, 0, this.w, this.centerY - 50, '#8ED6FF');
        FB.Draw.rect(this.centerX, this.centerY + 50, this.w, this.h - this.centerY, '#8ED6FF');
    }

    this.respawn = function () {
        this.centerY = this.randomIntFromInterval(70, 220);
        this.centerX = 320 - this.w + 160;
        this.coin = true;
    }

    this.randomIntFromInterval = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    this.centerY = this.randomIntFromInterval(70, 220);
}

FB.Bird = function () {

    this.img = new Image();
    this.img.src = 'bird.png';
    this.gravity = 0.25;
    this.width = 34;
    this.height = 24;
    this.ix = 0;
    this.iy = 0;
    this.fr = 0;
    this.vy = 180;
    this.vx = 70;
    this.velocity = 0;
    this.play = false;
    this.jump = -4.6;
    this.rotation = 0;
    this.type = 'bird';
    this.update = function () {
        if (this.fr++ > 5) {
            this.fr = 0;
            if (this.iy == this.height * 3) {
                this.iy = 0
            }
            this.iy += this.height;
        }
        if (this.play) {
            this.velocity += this.gravity;
            this.vy += this.velocity;
            if (this.vy <= 0) {
                this.vy = 0;
            }
            if (this.vy >= 370) {
                this.vy = 370;
            }
            this.rotation = Math.min((this.velocity / 10) * 90, 90);
        }
        if (FB.Input.tapped) {
            this.play = true;
            play_sound(soundJump);
            this.velocity = this.jump;
        }
    };

    this.render = function () {

        FB.Draw.Sprite(this.img, this.ix, this.iy, this.width, this.height, this.vx, this.vy, this.width, this.height, this.rotation);
    }

}

FB.Particle = function (x, y, r, col, type) {

    this.x = x;
    this.y = y;
    this.r = r;
    this.col = col;
    this.type = type || 'circle';
    this.name = 'particle';

    // determines whether particle will
    // travel to the right of left
    // 50% chance of either happening
    this.dir = (Math.random() * 2 > 1) ? 1 : -1;

    // random values so particles do no
    // travel at the same speeds
    this.vx = ~~(Math.random() * 4) * this.dir;
    this.vy = ~~(Math.random() * 7);

    this.remove = false;

    this.update = function () {

        // update coordinates
        this.x += this.vx;
        this.y -= this.vy;

        // increase velocity so particle
        // accelerates off screen
        this.vx *= 0.99;
        this.vy *= 0.99;

        // adding this negative amount to the
        // y velocity exerts an upward pull on
        // the particle, as if drawn to the
        // surface
        this.vy -= 0.35;

        // offscreen
        if (this.y > FB.HEIGHT) {
            this.remove = true;
        }

    };


    this.render = function () {
        if (this.type === 'star') {
            FB.Draw.star(this.x, this.y, this.col);
        } else {
            FB.Draw.circle(this.x, this.y, this.r, this.col);
        }
    };

};

// checks if two entities are touching
FB.Collides = function (bird, pipe) {

    if (bird.vy >= 370) {

        return true;
    }
    if (pipe.coin && bird.vx > pipe.centerX + pipe.w / 2 - 5) {
        pipe.coin = false;
        FB.score.coins += 1;
        FB.digits = FB.score.coins.toString().split('');
        play_sound(soundScore);
    }

    var bx1 = bird.vx - bird.width / 2;
    var by1 = bird.vy - bird.height / 2;
    var bx2 = bird.vx + bird.width / 2;
    var by2 = bird.vy + bird.height / 2;

    var upx1 = pipe.centerX;
    var upy1 = 0;
    var upx2 = pipe.centerX + pipe.w;
    var upy2 = pipe.centerY - 50;


    var lpx1 = pipe.centerX;
    var lpy1 = pipe.centerY + 50;
    var lpx2 = upx2;
    var lpy2 = pipe.h;

    var c1 = !(bx1 > upx2 ||
        bx2 < upx1 ||
        by1 > upy2 ||
        by2 < upy1)
    var c2 = !(bx1 > lpx2 ||
        bx2 < lpx1 ||
        by1 > lpy2 ||
        by2 < lpy1)

    return (c1 || c2)

};

window.Splash = function () {

    this.banner = new Image();
    this.banner.src = "splash.png";

    this.init = function () {
        play_sound(soundSwoosh);
        FB.distance = 0;
        FB.bg_grad = "day";
        FB.entities = [];
        FB.score.taps = FB.score.coins = 0;
        //Add entities
        FB.entities.push(new FB.Cloud(30, ~~(Math.random() * FB.HEIGHT / 2)));
        FB.entities.push(new FB.Cloud(130, ~~(Math.random() * FB.HEIGHT / 2)));
        FB.entities.push(new FB.Cloud(230, ~~(Math.random() * FB.HEIGHT / 2)));
        for (i = 0; i < 2; i += 1) {
            FB.entities.push(new FB.BottomBar(FB.WIDTH * i, FB.HEIGHT - 100, FB.WIDTH));
        }
        FB.entities.push(new FB.Tree(~~(Math.random() * FB.WIDTH), FB.HEIGHT - 160));
        FB.entities.push(new FB.Tree(~~(Math.random() * FB.WIDTH + 50), FB.HEIGHT - 160));
        FB.entities.push(new FB.Tree(~~(Math.random() * FB.WIDTH + 100), FB.HEIGHT - 160));
    }

    this.update = function () {
        for (i = 0; i < FB.entities.length; i += 1) {
            FB.entities[i].update();
        }
        if (FB.Input.tapped) {
            FB.changeState('Play');
            FB.Input.tapped = false;
        }
    }

    this.render = function () {
        FB.Draw.Image(this.banner, 66, 100);
    }

}

window.Play = function () {

    this.init = function () {


        FB.entities.push(new FB.Pipe(FB.WIDTH * 2, 50));
        FB.entities.push(new FB.Pipe(FB.WIDTH * 2 + FB.WIDTH / 2, 50));
        FB.entities.push(new FB.Pipe(FB.WIDTH * 3, 50));

        FB.bird = new FB.Bird();
        FB.entities.push(FB.bird);
        for (var n = 0; n < 10; n++) {
            var img = new Image();
            img.src = "font_small_" + n + '.png';
            FB.fonts.push(img);
        }
        FB.digits = ["0"];
    }

    this.update = function () {

        FB.distance += 1;
        var levelUp = ((FB.distance % 2048) === 0) ? true : false;
        if (levelUp) {
            var bg = "day";
            var gradients = ["day", "dusk", "night", "dawn"];
            for (var i = 0; i < gradients.length; i++) {
                if (FB.bg_grad === gradients[i]) {
                    if (i == gradients.length - 1) {
                        bg = "day";
                    } else {
                        bg = gradients[i + 1];
                    }
                }
            }
            FB.bg_grad = bg;
        }


        var checkCollision = false; // we only need to check for a collision
        // if the user tapped on this game tick




        // if the user has tapped the screen
        if (FB.Input.tapped) {
            // keep track of taps; needed to 
            // calculate accuracy
            FB.score.taps += 1;

            // set tapped back to false           
            // in the next cycle

            checkCollision = true;
        }

        // cycle through all entities and update as necessary
        for (i = 0; i < FB.entities.length; i += 1) {
            FB.entities[i].update();
            if (FB.entities[i].type === 'pipe') {
                var hit = FB.Collides(FB.bird, FB.entities[i]);
                if (hit) {
                    play_sound(soundHit);
                    FB.changeState('GameOver');
                    break;
                }
            }
        }
    }

    this.render = function () {
        //score				
        var X = (FB.WIDTH / 2 - (FB.digits.length * 14) / 2);
        for (var i = 0; i < FB.digits.length; i++) {
            FB.Draw.Image(FB.fonts[Number(FB.digits[i])], X + (i * 14), 10);
        }
    }
}

window.GameOver = function () {

    this.getMedal = function () {
        var score = FB.score.coins;
        var medal
        if (score <= 10)
            medal = "bronze";
        if (score >= 20)
            medal = "silver";
        if (score >= 30)
            medal = "gold";
        if (score >= 40)
            medal = "platinum";

        return medal;
    }
    this.getHighScore = function () {
        var savedscore = getCookie("highscore");
        if (savedscore != "") {
            var hs = parseInt(savedscore) || 0;
            if (hs < FB.score.coins) {
                hs = FB.score.coins
                setCookie("highscore", hs, 999);
            }
            return hs;
        }
        else {
            setCookie("highscore", FB.score.coins, 999);
            return FB.score.coins;
        }
    }

    var user = ""
    var scores2 = []
    var scores3 = []

    this.scoreSaves = function () {
        
        if (user == "") {
            while (user == "") {
                user = prompt("Please enter your username:", "")
            }
            if (user != "" && user != null) {
                sLen = scores.length
                if (scores != "") {
                    for (i = 0; i < sLen; i++) {
                        if (!scores.includes(user)) {
                            scores.push(user)
                            scores.push(FB.score.coins)
                            if (scores.length <= 3) {
                                scores2.push(scores[1], scores[3])
                            } else {
                                scores2.push(scores[1], scores[3], scores[5])
                            }
                            /*scores2.push(FB.score.coins)*/
                            /*console.log(scores)
                            console.log("Scores2: " + scores2)*/
                            scores2.sort(function(a, b) {return a - b; })
                            /*console.log("Scores2 sorted: " + scores2)*/
                            scores2.reverse()
                            /*console.log("Scores2 sorted n reversed: " + scores2)*/
                            for (j = 0; j < scores.length; j++) {
                                if (scores[j] == scores2[0]) {
                                    if (scores3.includes(scores[j])) {
                                        scores3.push(scores[j + 1])
                                        /*console.log("J tsükli esimene push: " + scores3)*/
                                        scores3.push(scores2[0])
                                        break
                                    } else {
                                        scores3.push(scores[j - 1])
                                        scores3.push(scores2[0])
                                        break
                                    }
                                }
                            }
                            for (k = 0; k < scores.length; k++) {
                                if (scores[k] == scores2[1]) {
                                    if (scores3.includes(scores[k])) {
                                        scores3.push(scores[k + 1])
                                        /*console.log("K tsükli esimene push: " + scores3)*/
                                        scores3.push(scores2[1])
                                        break
                                    } else {
                                        scores3.push(scores[k - 1])
                                        scores3.push(scores2[1])
                                        /*console.log(scores3)*/
                                        break
                                    }
                                }
                            }
                            for (l = 0; l < scores.length; l++) {
                                /*console.log("A - " + scores[1])
                                console.log("B - " + scores[3])
                                console.log("C - " + scores[5])*/
                                if (scores[l] == scores2[2]) {
                                    if (scores3.includes(scores[l]) && scores[1] == scores[5]) {
                                        scores3.push(scores[l + 3])
                                        /*console.log("L tsükli esimene push: " + scores3)*/
                                        scores3.push(scores2[2])
                                        break
                                    } else if (scores3.includes(scores[l])) {
                                        scores3.push(scores[l + 1])
                                        /*console.log("L tsükli esimene push: " + scores3)*/
                                        scores3.push(scores2[2])
                                        break
                                    } else {
                                        scores3.push(scores[l - 1])
                                        scores3.push(scores2[2])
                                        /*console.log(scores3)*/
                                        break
                                    }
                                }
                            }
                            /*console.log("Scores3: " + scores3)*/
                        } else if (scores[i] == user) {
                            if (scores[i + 1] < FB.score.coins) {
                                scores[i + 1] = FB.score.coins
                                /*console.log(scores)*/
                                scores2.push(scores[1], scores[3], scores[5])
                                /*scores2.push(FB.score.coins)*/
                                /*console.log("Scores2: " + scores2)*/
                                scores2.sort(function(a, b) {return a - b; })
                                /*console.log("Scores2 sorted: " + scores2)*/
                                scores2.reverse()
                                /*console.log("Scores2 sorted n reversed: " + scores2)*/
                                for (j = 0; j < scores.length; j++) {
                                    if (scores[j] == scores2[0]) {
                                        if (scores3.includes(scores[j])) {
                                            scores3.push(scores[j + 1])
                                            /*console.log("J tsükli esimene push: " + scores3)*/
                                            scores3.push(scores2[0])
                                            break
                                        } else {
                                            scores3.push(scores[j - 1])
                                            scores3.push(scores2[0])
                                            break
                                        }
                                    }
                                }
                                for (k = 0; k < scores.length; k++) {
                                    if (scores[k] == scores2[1]) {
                                        if (scores3.includes(scores[k])) {
                                            scores3.push(scores[k + 1])
                                            /*console.log("K tsükli esimene push: " + scores3)*/
                                            scores3.push(scores2[1])
                                            break
                                        } else {
                                            /*console.log(scores)*/
                                            scores3.push(scores[k - 1])
                                            scores3.push(scores2[1])
                                            /*console.log(scores3)*/
                                            break
                                        }
                                    }
                                }
                                for (l = 0; l < scores.length; l++) {
                                    if (scores[l] == scores2[2]) {
                                        if (scores3.includes(scores[l]) && scores[1] == 1 && scores[3] == 0 && scores[5] == 0) {
                                            /*console.log(scores[l])*/
                                            scores3.push(scores[l + 1])
                                            /*console.log("L tsükli esimene push: " + scores3)*/
                                            scores3.push(scores2[2])
                                            break
                                        } else if (scores3.includes(scores[l])) {
                                            /*console.log(scores[l])*/
                                            scores3.push(scores[l + 3])
                                            /*console.log("L tsükli esimene push: " + scores3)*/
                                            scores3.push(scores2[2])
                                            break
                                        } else {
                                            scores3.push(scores[l - 1])
                                            scores3.push(scores2[2])
                                            /*console.log(scores3)*/
                                            break
                                        }
                                    }
                                }
                                /*console.log("Scores3: " + scores3)*/
                            } else {
                                scores2.push(scores[1], scores[3], scores[5])
                                /*cores2.push(FB.score.coins)*/
                                /*console.log("Scores2: " + scores2)*/
                                scores2.sort(function(a, b) {return a - b; })
                                /*console.log("Scores2 sorted: " + scores2)*/
                                scores2.reverse()
                                /*console.log("Scores2 sorted n reversed: " + scores2)*/
                                for (j = 0; j < scores.length; j++) {
                                    if (scores[j] == scores2[0]) {
                                        if (scores3.includes(scores[j])) {
                                            scores3.push(scores[j + 1])
                                            /*console.log("J tsükli esimene push: " + scores3)*/
                                            scores3.push(scores2[0])
                                            break
                                        } else {
                                            scores3.push(scores[j - 1])
                                            scores3.push(scores2[0])
                                            break
                                        }
                                    }
                                }
                                for (k = 0; k < scores.length; k++) {
                                    if (scores[k] == scores2[1]) {
                                        if (scores3.includes(scores[k])) {
                                            scores3.push(scores[k + 1])
                                            /*console.log("K tsükli esimene push: " + scores3)*/
                                            scores3.push(scores2[1])
                                            break
                                        } else {
                                            scores3.push(scores[k - 1])
                                            scores3.push(scores2[1])
                                            /*console.log(scores3)*/
                                            break
                                        }
                                    }
                                }
                                for (l = 0; l < scores.length; l++) {
                                    if (scores[l] == scores2[2]) {
                                        if (scores3.includes(scores[l])) {
                                            scores3.push(scores[l + 3])
                                            /*console.log("L tsükli esimene push: " + scores3)*/
                                            scores3.push(scores2[2])
                                            break
                                        } else {
                                            scores3.push(scores[l - 1])
                                            scores3.push(scores2[2])
                                            /*console.log(scores3)*/
                                            break
                                        }
                                    }
                                }
                            }
                        }
                    }
                } else {
                    scores.push(user)
                    scores.push(FB.score.coins)
                    scores2.push(scores[1], scores[3])
                    scores2.push(FB.score.coins)
                    /*console.log(scores)
                    console.log("Scores2: " + scores2)*/
                    scores2.sort(function(a, b) {return a - b; })
                    /*console.log("Scores2 sorted: " + scores2)*/
                    scores2.reverse()
                    /*console.log("Scores2 sorted n reversed: " + scores2)*/
                    for (j = 0; j < scores.length; j++) {
                        if (scores[j] == scores2[0]) {
                            if (scores3.includes(scores[j])) {
                                scores3.push(scores[j + 1])
                                /*console.log("J tsükli esimene push: " + scores3)*/
                                scores3.push(scores2[0])
                                break
                            } else {
                                scores3.push(scores[j - 1])
                                scores3.push(scores2[0])
                                break
                            }
                        }
                    }
                    for (k = 0; k < scores.length; k++) {
                        if (scores[k] == scores2[1]) {
                            if (scores3.includes(scores[k])) {
                                scores3.push(scores[k + 1])
                                /*console.log("K tsükli esimene push: " + scores3)*/
                                scores3.push(scores2[1])
                                break
                            } else {
                                scores3.push(scores[k - 1])
                                scores3.push(scores2[1])
                                /*console.log(scores3)*/
                                break
                            }
                        }
                    }
                    for (l = 0; l < scores.length; l++) {
                        if (scores[l] == scores2[2]) {
                            if (scores3.includes(scores[l])) {
                                scores3.push(scores[l + 3])
                                /*console.log("L tsükli esimene push: " + scores3)*/
                                scores3.push(scores2[2])
                                break
                            } else {
                                scores3.push(scores[l - 1])
                                scores3.push(scores2[2])
                                /*console.log(scores3)*/
                                break
                            }
                        }
                    }
                    /*console.log("Scores3: " + scores3)*/
                }
            }
        }
    }
    this.init = function () {

        var that = this;
        setTimeout(function () {
            play_sound(soundDie);
            that.banner = new Image();
            that.banner.src = "scoreboard.png";
            var m = that.getMedal();
            that.medal = new Image();
            that.medal.src = 'medal_' + m + '.png';
            that.replay = new Image();
            that.replay.src = "replay.png";
            that.highscore = that.getHighScore();
            that.scoreboard = new Image();
            that.scoreboard.src = "scoreboard2.png";
            that.scoreSaves();
        }, 500);

    }

    this.update = function () {
        if (FB.Input.tapped) {
            var x = FB.Input.x;
            var y = FB.Input.y;

            if ((x >= 102.5 && x <= 102.5 + 115) && (y >= 230 && y <= 230 + 70)) {
                FB.changeState('Splash');
            }
            FB.Input.tapped = false;
        }
        FB.bird.update();
    }

    this.render = function () {
        if (this.banner) {
            FB.Draw.Image(this.banner, 42, 35);
            FB.Draw.Image(this.medal, 75, 148);
            FB.Draw.Image(this.replay, 102.5, 225);
            FB.Draw.text(FB.score.coins, 220, 150, 15, 'black');
            FB.Draw.text(this.highscore, 220, 190, 15, 'black');
            FB.Draw.Image(this.scoreboard, 42, 265);
            FB.Draw.text(scores3[1], 215, 385, 'black');
            FB.Draw.text(scores3[0], 65, 385, 'black');
            if (scores[2] != undefined) {
                FB.Draw.text(scores3[3], 215, 405, 'black');
                FB.Draw.text(scores3[2], 65, 405, 'black');
            }
            if (scores[4] != undefined) {
                FB.Draw.text(scores3[5], 215, 425, 'black');
                FB.Draw.text(scores3[4], 65, 425, 'black');
            }
        }
    }
}

window.addEventListener('load', FB.init, false);
window.addEventListener('resize', FB.resize, false);