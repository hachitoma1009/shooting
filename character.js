//自機の位置とサイズを管理するクラス
function CharacterShot() {
    this.position = new Point();//Pointクラスのインスタンス
    this.size = 0;
    this.speed = 0;
    this.alive = false;//自機ショットの生存フラグ(画面上に描かれる場合とそうでない場合)
}

//自機のサイズの指定
//メソッドが呼び出されると自動的に生存フラグが立つ
CharacterShot.prototype.set = function(p, size, speed){
    //座標をセット
    this.position.x = p.x;
    this.position.y = p.y;

    //サイズ、スピードをセット
    this.size = size;
    this.speed = speed;

    //生存フラグを立てる
    this.alive = true;
};

CharacterShot.prototype.move = function(){
    //座標を真上にspeed分だけ移動させる
    this.position.y -= this.speed;

    //一定以上の座標に到達していたら生存フラグを降ろす(画面外に出てしまったショットの生存フラグを降ろす)
    if(this.position.y < -this.size){
        this.alive = false;
    }
};