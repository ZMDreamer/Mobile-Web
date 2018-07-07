window.onload = function () {
    // 可以用fastclick事件来处理移动端的点击事件,既可以解决透点又可以解决延迟
    //将使用的条件引入
    if ('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded', function () {
            FastClick.attach(document.body);
        }, false);
    }
    // 音乐播放模块
    var music = document.querySelector('.music');
    var audio = document.querySelector('audio');
    var flag = true;
    music.addEventListener('click', function () {
        //给元素播放的时候添加一个play类, 如果点击后移除这个样式,添加一个新的暂停下的样式play2 有play样式的时候是播放,有play2的时候是暂停
        if (flag) {
            audio.pause();
            this.style.background = "url('./images/music1_03.png') no-repeat 0 0/30px 30px";
            this.style.animation = "rotate1 2s linear infinite";
            flag = false;
        } else {
            audio.play();
            this.style.background = "url('./images/music_03.png') no-repeat 0 0/30px 30px";
            this.style.animation = "rotate 2s linear infinite";
            flag = true;
        }
    })
    //tab栏切换 获取类容头部标签
    var headers = document.querySelectorAll('.ct_header>h3');
    var h_offleft = headers[0].offsetWidth;
    var span = document.querySelector('.ct_header>span');
    //获取所有的ul
    var article = document.querySelector('.ct_articles');
    var offLeft = document.querySelector('.post_content').offsetWidth;
    var count = 0;
    //循环添加index下标
    for (var i = 0; i < headers.length; i++) {
        headers[i].index = i;
        headers[i].addEventListener('click', function () {
            count = this.index;
            span.style.left = count*h_offleft + 'px';
            article.style.left = -this.index * offLeft + "px";
        })
    }
    window.onresize = function () {
        span.style.left = count*h_offleft + 'px';
    }
    //左右移动利用手指移动来实现
    var startX, distanceX, moveX;
    article.addEventListener('touchstart', function (e) {
      
        startX = e.targetTouches[0].clientX;
    })
    article.addEventListener('touchmove', function (e) {
        moveX = e.targetTouches[0].clientX;
        distanceX = moveX - startX;
        if (count == 0) {
            if (distanceX > 0) {
                return;
            }
        }
        if(count == 1){
            if (distanceX < 0) {
                return;
            }
        }
         article.style.left = (-count* offLeft + distanceX) + 'px';
    })
    article.addEventListener('touchend', function (e) {
        if (count == 0) {
            if (distanceX > 0) {
                return;
            }
        }
        if(count == 1){
            if (distanceX < 0) {
                return;
            }
        }
        var endX = e.changedTouches[0].clientX;
        if (Math.abs(endX - startX) > 100){
            if (count == 0) {
                count = 1
            }else{
                count =0;
            }
            article.style.left = -count* offLeft + 'px'
        }else{
            
            article.style.left = -count* offLeft + 'px'
        }
        span.style.left = count*h_offleft + 'px';
    })


}