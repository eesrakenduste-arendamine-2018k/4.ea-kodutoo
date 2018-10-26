var APP = function(){
    if (APP.instance_){
        return APP.instance_;
    }
    APP.instance_ = this;

    this.appXPosition = 0;
    this.appYPosition = 0;
    this.appWidth = 0;
    this.appHeight = 0;
    this.useDynamicWidth = false;
    this.appWidthDynamic = 0;
    this.appHeightDynamic = 0;

    this.canvas = null;
    this.ctx = null;
    this.bank = null;
    this.inventory = null;

    //this.background = null;


    this.init();
};

APP.prototype = {
    init: function(){
        //this.background = new Image();


        this.appWidth = 500;
        this.appHeight = 1000;
        this.useDynamicWidth = false;
        this.initiateChildren();
        //try to remove this:
        this.resizeAppWindow();
        window.onresize = function(){
            app.resizeAppWindow();
        };
        
    },

    resizeAppWindow: function(){
        if(window.innerWidth < this.appWidth){
            this.useDynamicWidth = true;
            this.appWidthDynamic = window.innerWidth;  
            this.calculateDynamicHeight();
            this.updateCanvas();
        }else{
            this.useDynamicWidth = false;
            this.updateCanvas();
        }
        console.log("appwindow resized");
    },

    initiateChildren: function(){
        this.canvas = document.getElementById("appScreen");
        this.ctx = this.canvas.getContext("2d");
        console.log("children initiated");

        this.bank = new BANK();
        this.inventory = new INVENTORY();
    },

    updateCanvas: function(){
        if(this.useDynamicWidth){
            
            this.canvas.width = this.appWidthDynamic;
            this.canvas.style.marginLeft = "0px";
            this.canvas.style.marginRight = "0px";
            this.canvas.height = this.appHeightDynamic;
            
            this.bank.height = this.appHeightDynamic * this.bank.heightMultiplier;
            //this.bank.draw(this.appWidthDynamic, this.appHeight, this);
            //this.drawBank(0, 0, this.appWidthDynamic, this.bank.height);
            this.updateInventory()
            console.log("canvas updated");
        }else{
            this.canvas.width = this.appWidth;
            this.canvas.height = this.appHeight;
            this.canvas.style.marginLeft = "auto";
            this.canvas.style.marginRight = "auto";
            
            this.bank.height = this.appHeight * this.bank.heightMultiplier;
            
            //this.loadItems();
            
            //this.drawBank(0, 0, this.appWidth, this.bank.height);
            this.updateInventory()
            console.log("canvas updated");
        }
    },
    
    updateInventory: function(x, y, width, height){
        if(this.useDynamicWidth){
            this.ctx.clearRect(0, this.bank.height, this.appWidthDynamic, (this.canvas.height - this.bank.height));
            this.bank.drawBackground(this.ctx, 0, 0, this.appWidthDynamic, this.bank.height)
            this.bank.drawItems(this.ctx, 0, 0, this.appWidthDynamic, this.bank.height)
            this.inventory.drawBackground(this.ctx, 0, this.bank.height, this.appWidthDynamic, (this.canvas.height - this.bank.height));
            this.inventory.drawItems(this.ctx, 0, this.bank.height, this.appWidthDynamic, (this.canvas.height - this.bank.height));
        }else{
            this.ctx.clearRect(0, this.bank.height, this.appWidth, (this.canvas.height - this.bank.height));
            this.bank.drawBackground(this.ctx, 0, 0, this.appWidth, this.bank.height)
            this.bank.drawItems(this.ctx, 0, 0, this.appWidth, this.bank.height)
            this.inventory.drawBackground(this.ctx, 0, this.bank.height, this.appWidth, (this.canvas.height - this.bank.height));
            this.inventory.drawItems(this.ctx, 0, this.bank.height, this.appWidth, (this.canvas.height - this.bank.height));
        }
    },
    
    drawBank: function(x,y,width,height){
        this.ctx.clearRect(x,y,width,height);
        this.ctx.fillStyle="#FF0000";
        this.ctx.fillRect(x,y,width,height);
    },        

    calculateDynamicHeight: function(){
        var multiplier = 1 / this.appWidth * this.appWidthDynamic;
        this.appHeightDynamic = this.appHeight * multiplier;
    }
};

//ei tööta vist
window.mobilecheck = function() {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };

window.onload = function(){
    var app = new APP();
    window.app = app;
};