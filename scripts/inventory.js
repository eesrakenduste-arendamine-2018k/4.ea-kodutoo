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
            this.itemArray.push(new ITEM('empty'));
        }
        this.itemArray[7] = new ITEM("saradomin_brew")
    },

    refreshPositions: function(){
        //get BG pos.
        //make array of positions;
    },

    addItem: function(){

        
    },

    drawBackground: function(ctx, x, y, width, height){
        

        this.background.onload = function(){
            console.log("drawing");
            ctx.drawImage(this.background, x,y, width, height);
        }.bind(this)
        this.background.src = 'img/experimental_inventory.png';
    },

    drawItems: function(ctx,x,y,width,height){
        let invInnerWidth = width*0.78
        let invInnerHeight = height*0.77
        x = x + (width - invInnerWidth) / 2
        y = y + (height - invInnerHeight) / 2


        for(var i=0; i<28; i++){
            if(this.itemArray[i].itemName != 'empty'){
                let posx = i % 4
                let posy = Math.floor( i/4 );
                this.drawItem(ctx, x+(invInnerWidth/4)*posx, y+(invInnerHeight/7)*posy, invInnerWidth/4, invInnerHeight/7, this.itemArray[i])
                console.log("joonistan inv")
            }
        }
    },

    drawItem: function(ctx, x, y, width, height, item){
        item.img.onload = function(){
            ctx.drawImage(item.img, x,y, width, height);
        }.bind(this)
        item.img.src = item.imgSource;
    },
}

function calculatePosition(pointer){
    let posXY = []

    //calc x
    pointerRemainder = pointer % 4
   
}

/* window.onload = function(){
    var inventory = new INVENTORY();
    window.inventory = inventory;
}; */