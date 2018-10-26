var BANK = function(height){
    if (BANK.instance_){
        return BANK.instance_;
    }
    BANK.instance_ = this;

    this.heightMultiplier = 0;
    this.height = 0;
    this.heightDynamic = 0;
    this.background
    this.allItemNames = []
    this.allItems = []
    this.init();
};

BANK.prototype = {
    init: function(){
        this.heightMultiplier = 0.3;
        this.background = new Image()
        this.allItemNames.push("saradomin_brew")
        this.allItemNames.push("shark")
        this.allItemNames.push("lobster")
        this.allItemNames.push("rune_scimitar")
        this.allItemNames.push("logs")
        this.allItemNames.push("air_rune")
        this.loadAllItems();
    },

    loadAllItems: function () {
        for(let i=0; i < this.allItemNames.length; i++){
            this.allItems.push(new ITEM(this.allItemNames[i]))
        }
        
    },

    drawBackground: function(ctx, x, y, width, height){
        this.background.onload = function(){
            ctx.drawImage(this.background, x,y, width, height);
        }.bind(this)
        this.background.src = 'img/bank.png';
    },

    drawItems: function(ctx,x,y,width,height){
        let invInnerWidth = width
        let invInnerHeight = height
        x = x + (width - invInnerWidth) / 2
        y = y + (height - invInnerHeight) / 2

        for(var i=0; i<this.allItems.length; i++){
            
                let posx = i % 5
                let posy = Math.floor( i/5 );
                this.drawItem(ctx, x+(invInnerWidth/5)*posx, y+(invInnerHeight/4)*posy, invInnerWidth/5, invInnerHeight/4, this.allItems[i])
            
        }
    },

    drawItem: function(ctx, x, y, width, height, item){
        item.img.onload = function(){
            ctx.drawImage(item.img, x,y, width, height);
        }.bind(this)
        item.img.src = item.imgSource;
    },

    withdraw: function(width, height, clickX, clickY, offsetLeft, offsetTop){
        console.log(offsetTop)
        console.log(clickY)
        console.log(offsetLeft)
        console.log(clickX)
        console.log(width/5*2 + offsetLeft)
        console.log(width)

        let posx
        let posy
        if(clickX < width / 5 + offsetLeft && clickX >=  offsetLeft){
            posx = 1
        }else if(clickX < width/5*2 + offsetLeft && clickX >= width/5 + offsetLeft){
            posx = 2
        }else if(clickX < width/5*3 + offsetLeft && clickX >= width/5*2 + offsetLeft){
            posx = 3
        }else if(clickX < width/5*4 + offsetLeft && clickX >= width/5*3 + offsetLeft){
            posx = 4
        }else if(clickX < width/5*5 + offsetLeft && clickX >= width/5*4 + offsetLeft){
            posx = 5
        }
        if(clickY < height / 4){
            posy = 1
        }else if(clickY < height/4*2 + offsetTop && clickY >= height/4 + offsetTop){
            posy = 2
        }else if(clickY < height/4*3 + offsetTop && clickY >= height/4*2 + offsetTop){
            posy = 3
        }else if(clickY < height/4*4 + offsetTop && clickY >= height/4*3 + offsetTop){
            posy = 4
        }
        
        itemPosition = ((posy-1)*5+posx)-1
        console.log(itemPosition)
        return new ITEM(this.allItems[itemPosition].itemName)
    }
};

/* window.onload = function(){
    var bank = new BANK();
    window.bank = bank;
}; */