function ToTask(){
    // $("html,body").animate({scrollTop:$('#Task').offset().top});
    // $(window).scrollTop($('#Task').position().top);
    $(".maskScroll").animate({scrollTop:$("#Task").position().top});
}

function ToBreak(){
    // タスク側全体の高さを取得
    var BreakPosition = $("#TaskHeight").get(0).scrollHeight;
    var blank = $(".blank").get(0).scrollHeight;
    $(".maskScroll").animate({scrollTop: BreakPosition +blank});
    // $(".maskScroll").animate({scrollTop:$("#Break").get(0).scrollHeight + BreakPosition });
}

//モーダルウィンドウjQuery
$(function(){
    $('.js-modal-open').on('click',function(){
        $('.js-modal').fadeIn();
        $('.header').fadeOut();
        return false;
    });
    $('.js-modal-close').on('click',function(){
        $('.js-modal').fadeOut();
        $('.header').fadeIn();
        return false;
    });
});