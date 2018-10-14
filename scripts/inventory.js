var INVENTORY = function(){
    if (INVENTORY.instance_){
        return INVENTORY.instance_;
    }
    INVENTORY.instance_ = this;
    

    this.itemPositions;
    this.itemArray = [];
    
    this.background = null;

    this.init();
};


INVENTORY.prototype = {
    init: function(){
        this.background = new Image();
        this.refreshPositions();
        this.initInventory();
    },
    
    initInventory: function(){
        for(var i=0; i < 28; i++){
            this.itemArray.push(new ITEM("empty"));
        }
    },

    refreshPositions: function(){
        //get BG pos.
        //make array of positions;
    },

    addItem: function(){

        for(var i=0; i<28; i++){
            if(this.itemArray[i].name != 'empty'){
                
            }
        }
    },

    drawBackground: function(ctx, x, y, width, height){
        background = this.background;

        this.background.onload = function(){
            console.log("drawing");
            ctx.drawImage(background, x,y, width, height);
        };
        console.log("1");
        this.background.src = 'img/experimental_inventory.png';
    },

    drawItems: function(){

    },

}


/* window.onload = function(){
    var inventory = new INVENTORY();
    window.inventory = inventory;
}; */