$(window).load(function(){
    $('html,body').animate({ scrollTop: 0 }, '1');
});
//-------------スクロール禁止用関数
function no_scroll(dom){
    //PC用
    var scroll_event = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
    $(document).on(scroll_event,function(e){e.preventDefault();});
    //SP用
    $(document).on('touchmove.noScroll', function(e) {e.preventDefault();});
}
//スクロール復活用関数
function return_scroll(){
    //PC用
    var scroll_event = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
    $(document).off(scroll_event);
    //SP用
    $(document).off('.noScroll');
}

//-------------ロード画面
$(function() {
    var h = $(window).height();
    
    $('#wrap').css('display','none');
    $('#loader-bg ,#loader').height(h).css('display','block');
    no_scroll(); //スクロール禁止
});
 
$(window).load(function () { //全ての読み込みが完了したら実行
    $('#loader-bg').delay(600).fadeOut(300);
    $('#loader').delay(600).fadeOut(300);
    $('#wrap').css('display', 'block');
});
 
//10秒たったら強制的にロード画面を非表示
$(function(){
  setTimeout('stopload()',10000);
});
 
function stopload(){
  $('#wrap').css('display','block');
  $('#loader-bg').delay(900).fadeOut(800,function(){
      return_scroll(); //アニメーションが終わったらスクロール禁止を解除
  });
  $('#loader').delay(600).fadeOut(300);
}