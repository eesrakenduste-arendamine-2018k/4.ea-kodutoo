// Kivi-käärid-paber mäng 
// Viide algelisele mängule - aadressil http://jsfiddle.net/2jqz51Ly/ 
// Sellelt lähtuvast algelist mängurakenduse koodi on muudetud

window.onload = function(){
    
    registerServiceWorker();
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

//muutujad
var user;
var choose = function(choice) {
    console.log('rakendus algab')

    user = choice;
}

//mängu loogika reeglid
var computerChoice = Math.random();
    if (computerChoice < 0.34) {
        computerChoice = "rock";
    }
    else if (computerChoice < 0.67) {
        computerChoice = "paper";
    }   
    else {
        computerChoice = "scissors";
    }

var compare = function(choice1, choice2) {
    if (choice1 === choice2) {
        document.getElementById("result").innerHTML = "Viik!";
    }
    else if (choice1 === "rock") {
        if (choice2 === "scissors") {
            document.getElementById("result").innerHTML = "Sinu võit!";
        }
        else {
            document.getElementById("result").innerHTML = "Kaotasid mängu!";
        }
    }
    else if (choice1 === "paper") {
        if (choice2 === "rock") {
            document.getElementById("result").innerHTML = "Sinu võit!";
        }
        else if (choice2 ==="scissors") {
            document.getElementById("result").innerHTML = "Kaotasid mängu!";
        }
    }
    else if (choice1 === "scissors") {
        if (choice2 === "rock") {
            document.getElementById("result").innerHTML = "Kaotasid mängu!";
        }
        else if (choice2 === "paper") {
            document.getElementById("result").innerHTML = "Sinu võit!";
        }
    }
    else {
        document.getElementById("result").innerHTML = "Peaksid nagu ka valima nende kolme vahel...";
    }
}