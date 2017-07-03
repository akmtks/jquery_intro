//変数宣言
var hsize = $(window).height(); //ウィンドウサイズ
var flag = true; //一度実行のためのフラグ

//コンテンツサイズ
jQuery(document).ready(function () {
    $("#cover").css("height", hsize + "px"); 
    $("#contents").css("opacity", 0);
});
jQuery(window).resize(function () {
    if (flag) {
        $("#cover").css("height", hsize + "px");
    }
});

//アニメーションの定義
function scroll_animation() {
        flag = false; //一回実行のためのフラグをfalseに
        no_scroll(); //スクロール禁止
        hsizemove = hsize *0.7; //スライドのサイズ
        $( '#cover' ).animate( { height: hsizemove }, 1500, 'easeOutExpo', function (){ // 1.イントロスライドの高さを調整
                $(".intro-slide").fadeOut(500, 'easeInSine', function (){   // 2.イントロスライドをフェードアウト
                    $( '#contents' ).animate( { opacity: 1 }, 2000, 'easeInSine'); //コンテンツをフェードイン
                    return_scroll(); // 3.アニメーションが終わったらスクロール禁止を解除

                });
        });
        $('html,body').animate({ scrollTop: 0 }, '1');
}

//マウスホイールでアニメーション
$("#cover").mousewheel(function(eo, delta, deltaX, deltaY) {
    if (deltaY < 0 && flag) {
        scroll_animation(); //定義済みアニメーションを実行
    }
});

// -------------------------スマフォ対応

//フリックの取得（感度悪い…もっと良くなるかも）
$('#cover').bind('touchstart', function() {
    startY = event.changedTouches[0].pageY;//フリック開始時のX軸の座標
});
$('#cover').bind('touchmove', function(e) {
    endY = event.changedTouches[0].pageY;//フリック終了時のX軸の座標
    diffY = Math.round(startY - endY);//フリック開始時の座標-終了時の座標=フリックの移動距離
});
//フリックイベント
$('#cover').bind('touchend', function(e) {
    if (diffY > 2 && flag) {
        scroll_animation(); //定義済みアニメーションを実行
    }
});