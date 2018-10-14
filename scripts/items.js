var ITEM = function(itemName, position){
    this.itemName = itemName;
    this.position = position;
    if(itemName!='empty'){
        this.picture = getPicture(itemName);
    }
};

ITEM.prototype = {
    setPosition: function(){
        return null;
    },

    getPosition: function(){
        return null;
    }
}