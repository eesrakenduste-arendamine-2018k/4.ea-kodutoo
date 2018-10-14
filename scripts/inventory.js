var INVENTORY = function(){
    if (INVENTORY.instance_){
        return INVENTORY.instance_;
    }
    INVENTORY.instance_ = this;
    
    this.background = null;
    this.itemPositions;
    this.itemArray = [];
    


    this.init();
};


INVENTORY.prototype = {
    init: function(){
        this.background = new Image();
        this.background.src = 'img/experimental_inventory.png';
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

    draw: function(x, y, width){

    },

    getBackground: function(){
        this.background.onload = function(){
            
            return this.background;
        }
    }

}


/* window.onload = function(){
    var inventory = new INVENTORY();
    window.inventory = inventory;
}; */