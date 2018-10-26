var BANK = function(height){
    if (BANK.instance_){
        return BANK.instance_;
    }
    BANK.instance_ = this;

    this.heightMultiplier = 0;
    this.height = 0;
    this.heightDynamic = 0;
    this.background
    this.init();
};

BANK.prototype = {
    init: function(){
        this.heightMultiplier = 0.3;
        this.background = new Image()
    },

    drawBackground: function(ctx, x, y, width, height){
        this.background.onload = function(){
            console.log("drawing");
            ctx.drawImage(this.background, x,y, width, height);
        }.bind(this)
        this.background.src = 'img/bank.png';
    },
    
};

/* window.onload = function(){
    var bank = new BANK();
    window.bank = bank;
}; */