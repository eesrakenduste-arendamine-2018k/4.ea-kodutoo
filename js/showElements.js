function showTutorial() {
    var main = document.getElementById("main");
    var tutorial = document.getElementById("tutorial");
    main.style.display = "none";
    tutorial.style.display = "block";
} 
function showMain() {
    var main = document.getElementById("main");
    var tutorial = document.getElementById("tutorial");
    main.style.display = "block";
    tutorial.style.display = "none";
} 
function showComparison() {
    var tutorial = document.getElementById("tutorial");
    var comparison = document.getElementById("comparison");
    tutorial.style.display = "none";
    comparison.style.display = "block";
} 
function getBack() {
    var tutorial = document.getElementById("tutorial");
    var comparison = document.getElementById("comparison");
    comparison.style.display = "none";
    tutorial.style.display = "block";
}

/*
example to draw displays
if (main.style.display === "none") {
        main.style.display = "block";
    } else {
        main.style.display = "none";
    }
    if (tutorial.style.display === "block") {
        tutorial.style.display = "none";
    } else {
        tutorial.style.display = "block";
    }
    comparison.style.display === "none"
*/