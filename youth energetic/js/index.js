// 页面加载后旋转进入的图片
window.onload = function () {

    // 开场动画
    $('.rotate').animate({
        'transform': "translate3d(0,0,0) rotate3D(1,0,1,360deg) scale(1)"
    }, 2000, 'easeOutExpo', function () {
        //显示大标题

        $('.bg_title').animate({
            'opacity': 1,
            left: "1%"
        }, 1000, 'linear',)
        //小图标
        $('.sm_title').animate({
            'opacity': 1,
            left: "1%"
        }, 1000, 'linear', function () {
            $('.paragrah').animate({"width": "100%"},3000,'linear')
        })
    })
    //音乐播放
    $('.audio').click(function() {
       if ($(this).hasClass('music')) {
           $(this).removeClass('music').addClass('music2');
           audio.pause();
        
       }else{
        $(this).removeClass('music2').addClass('music');
        audio.play();
       }
    });
   


}