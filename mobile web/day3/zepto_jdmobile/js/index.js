$(function () {
    //头部js效果
    var bannerHeight = $(".jd_banner").height();
    window.onscroll = function () {
        var offsetTop = document.body.scrollTop || document.documentElement.scrollTop;
        if (offsetTop < bannerHeight) {
            var opacity = offsetTop / bannerHeight;

        } else {
            opacity = 1
        }

        $('.jd_header').css('background', 'rgba(233,35,34,' + opacity + ')');

    }
    //轮播图部分
    var bannerWidth = $('.jd_banner').width();
    $('.jd_banner ul').append($('.jd_banner>ul li').first().clone());
    $('.jd_banner ul li').first().before($('.jd_banner>ul li').last().prev().clone());
    var imgbox = $('.jd_banner>ul');
    var count = imgbox.children().length;
    imgbox.width(count * bannerWidth);
    for (var i = 0; i < count; i++) {
        imgbox.children()[i].style.width = bannerWidth + "px";
    }
    var currentIndex = 1;
    imgbox.css('left', -currentIndex * bannerWidth);
    $(window).resize(function () {
        bannerWidth = $('.jd_banner').width();
        imgbox.width(count * bannerWidth);
        for (var i = 0; i < count; i++) {
            imgbox.children()[i].style.width = bannerWidth + "px";
        }
        imgbox.css('left', -currentIndex * bannerWidth);
    });
    //自动轮播函数
    function animation() {
        imgbox.animate({
            'left': -currentIndex * bannerWidth
        }, 400, 'swing', function () {
            //动画执行完毕后判断当前的index值为多少,最后一张时直接跳到currentIndex为1的时候
            if (currentIndex == count - 1) {
                currentIndex = 1;
                $(this).css('left', -currentIndex * bannerWidth);
            } else if (currentIndex == 0) {
                currentIndex = count - 2;
                $(this).css('left', -currentIndex * bannerWidth);
            }
            //让对应的小圆点显示
            $('.jd_banner >ol >li').removeClass('active').eq(currentIndex-1).addClass('active');
            
        })
    }
    var timerId = setInterval(autoMove, 2000);

    function autoMove() {
        currentIndex++;
        animation();
    }

    //当手指在屏幕上触摸时候添加zepto里面的swipeLeft 和swipeRight事件来清除定时器,并移动图片
    imgbox.on('swipeLeft', function () {
        //向做滑动的时候,移除定时器
        clearInterval(timerId);
        currentIndex++;
        animation();
       

    })
    imgbox.on('swipeRight', function () {
        clearInterval(timerId)
        currentIndex--;
        animation();
      

    })








})