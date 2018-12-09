//ゲーム全体の流れを管理する処理、イベントに関する処理を記述

// - global --------------------------------------------
var screenCanvas, info; //HTMLファイルで記述したcanvasとpを参照する変数
var run = true; //ゲームの処理を継続するかどうかのフラグ
/*/false:ゲームの進行ストップ
　true:ゲーム継続
*/
var fps = 1000 / 30; //ゲームの更新頻度を表すFPS
/*1秒間に30回ゲームを更新
 */
var mouse = new Point(); //マウスカーソルの座標を格納するためのインスタンスを作成
var ctx; //canvas2d コンテキスト格納用

// - main ----------------------------------------------

//window.onloadにページの読み込み完了と同時にプログラムが動き出すように関数を仕込む
//マウスの位置を拾うためのmouseMove
//キーの入力を拾うためのkeyDown
window.onload = function(){

    //スクリーンの初期化
    //getElementByIdでcanvasへの参照を取得し大きさを変更
    screenCanvas = document.getElementById('screen');
    screenCanvas.width = 256;
    screenCanvas.height = 256;

    //2dコンテキスト
    ctx = screenCanvas.getContext('2d');//変数にcanvas2dコンテキストを取得
    /**
    * canvas への参照を持っている変数screenCanvasのgetContextというメソッドを利用
    * このメソッドの引数に 文字列で '2d' を渡す(わからん)
    * これに加えてcanbas2dコンテキスト対応ブラウザか確認するコード
    */

    //イベントの登録
    //マウスカーソルの位置を検知する関数とキー入力を検知する関数の2つを登録
    screenCanvas.addEventListener('mousemove', mouseMove, true);
    window.addEventListener('keydown', keyDown, true);

    //その他のエレメント関連
    //HTML内のpタグへの参照を取得→動的に書き換えてコンソール出力みたいに使う
    info = document.getElementById('info');


    //ループ処理を呼び出す
    //ループ構造を作り画面を更新するなどの必要な処置をループ内に記述(無名関数を再帰的に呼び出す方法を使う)
    (function(){
        //HTMLを更新
        info.innerHTML = mouse.x + ' : ' + mouse.y;

        //screenクリア
        ctx.clearRect(0, 0, screenCanvas.width, screenCanvas.height);

        //パスの設定を開始
        ctx.beginPath();

        //円の色を設定する
        ctx.fillStyle = 'rgba(0, 0, 255, 0.75';

        //円を描くパスを設定
        //マウスカーソルの位置を中心とした半径 10 の円が描かれるパス
        ctx.arc(mouse.x, mouse.y, 10, 0, Math.PI * 2, false);

        //円を描く
        ctx.fill();

        //フラグにより再帰呼び出し(わからん)
        if(run){
            setTimeout(arguments.callee, fps);
        }
    })();
};

// - event ----------------------------------------------
function mouseMove(event){
    //マウスカーソル座標の更新
    //canvas上でマウスカーソルが動いた時、スクリーン座標系のそれぞれの座標を変数mouseに設定
    mouse.x = event.clientX - screenCanvas.offsetLeft;
    mouse.y = event.clientY - screenCanvas.offsetTop;
}

function keyDown(event){
    //キーコードを取得
    var ck = event.keyCode;

    //Escキーが押されていたらフラグを降ろす
    if(ck === 27){run = false;}
}