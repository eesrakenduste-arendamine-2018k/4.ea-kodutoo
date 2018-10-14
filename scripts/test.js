
window.onload = function() {
    var c=document.getElementById("appScreen");
    var ctx=c.getContext("2d");
    var background = new Image();
    background.onload = function() {
        ctx.drawImage(background,10,10);
    };
    background.src = 'img/experimental_inventory.png';
};