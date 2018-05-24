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
    more.style.display = "none";
} 
function showComparison() {
    var tutorial = document.getElementById("tutorial");
    var comparison = document.getElementById("comparison");
    tutorial.style.display = "none";
    comparison.style.display = "block";
    more.style.display = "none";
} 
function getBack() {
    var tutorial = document.getElementById("tutorial");
    var comparison = document.getElementById("comparison");
    var saved = document.getElementById("saved");
    var more = document.getElementById("more");
    more.style.display = "none";
    if (comparison.style.display === "none") {
        comparison.style.display = "block";
    } else {
        comparison.style.display = "none";
    }
    saved.style.display = "none";
    if (comparison.style.display === "none") {
        tutorial.style.display = "block";
    } else {
        tutorial.style.display = "none";
    }
}
function showSaved(){
    var comparison = document.getElementById("comparison");
    var saved = document.getElementById("saved");
    comparison.style.display = "none";
    saved.style.display = "block";
    
}
function showMore(){
    var more = document.getElementById("more");
    var comparison = document.getElementById("comparison");
    more.style.display = "block";
    comparison.style.display = "none";
}
function closeMore(){
    var comparison = document.getElementById("comparison");
    var more = document.getElementById("more");
    more.style.display = "none";
    comparison.style.display = "block";
}