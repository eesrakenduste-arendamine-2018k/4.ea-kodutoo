var BANK = function(height){
    if (BANK.instance_){
        return BANK.instance_;
    }
    BANK.instance_ = this;

    this.heightMultiplier = 0;
    this.height = 0;
    this.heightDynamic = 0;
    this.init();
};

BANK.prototype = {
    init: function(){
        this.heightMultiplier = 0.3;
    },

    draw: function(width, height, app){
        
    }

};

/* window.onload = function(){
    var bank = new BANK();
    window.bank = bank;
}; */