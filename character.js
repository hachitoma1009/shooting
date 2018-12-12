//自機の位置とサイズを管理
function Character() {
    this.position = new Point();
    this.size = 0;
}

//自機のサイズの指定
Character.prototype.init = function(size){
    this.size = size;
};