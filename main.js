//ゲーム全体の流れを管理する処理、イベントに関する処理を記述

// - global --------------------------------------------
var screenCanvas, info; //HTMLファイルで記述したcanvasとpを参照する変数
var run = true; //ゲームの処理を継続するかどうかのフラグ
/*false:ゲームの進行ストップ
　true:ゲーム継続
/
var fps = 1000 / 30; //ゲームの更新頻度を表すFPS
/1秒間に30回ゲームを更新
 */
var mouse = new Point(); //マウスカーソルの座標を格納するためのインスタンスを作成

// - main ----------------------------------------------

//window.onloadにページの読み込み完了と同時にプログラムが動き出すように関数を仕込む
//マウスの位置を拾うためのmouseMove
//キーの入力を拾うためのkeyDown
window.onload = function(){

    //スクリーンの初期化
    //getElementByIdでcanvasへの参照を取得し大きさを変更
    scrrenCanvas = document.getElementById('scrren');
    scrrenCanvas.width = 256;
    scrrenCanvas.height = 256;

    //イベントの登録
    //マウスカーソルの位置を検知する関数とキー入力を検知する関数の2つを登録
    scrrenCanvas.addEventListener('mousemove', mouseMove, true);
    window.addEventListener('keydown', keyDown, true);

    //エレメント関連
    //HTML内のpタグへの参照を取得→動的に書き換えてコンソール出力みたいに使う
    info = document.getElementById('info');

    //ループ処理を呼び出す
    //ループ構造を作り画面を更新するなどの必要な処置をループ内に記述(無名関数を再帰的に呼び出す方法を使う)
    (function(){
        //HTMLを更新
        info.innerHTML = mouse.x + ' : ' + mouse.y;

        //フラグにより再帰呼び出し(わからん
        if(run){
            setTimeout(arguments.callee, fps);
        }
    })();
};

// - event ----------------------------------------------
function mouseMove(event){
    //マウスカーソル座標の更新
    //canvas上でマウスカーソルが動いた時、スクリーン座標系のそれぞれの座標を変数mouseに設定
    mouse.x = event.clientX - scrrenCanvas.offsetLeft;
    mouse.y = event.clientY - screenCanvas.offsetTop;
}

function keyDown(event){
    //キーコードを取得
    var ck = event.keyCode;

    //Escキーが押されていたらフラグを降ろす
    if(ck ===27){run = false;}
}