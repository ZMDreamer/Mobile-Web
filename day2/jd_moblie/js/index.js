window.onload = function () {
     //轮播图模块
     bannerEffect();
    //头部样式
    headerChange();
    //秒杀倒计时
    timerBack();
   
}
/* 头部背景颜色的透明度根据页面滚动距离和banner图部分的比例进行变化*/

function headerChange() {
    // 获取banner图高度
    var banner = document.querySelector('.jd_banner');
    var bannerHeight = banner.offsetHeight;
    console.log(bannerHeight);
    var header = document.querySelector('.jd_header');
    var opacity = 0;
    // 添加滚动事件, 根据比例给header的设置背景透明度
    window.onscroll = function () {
        //获取滚动距离
        var scrollHeight = document.body.scrollTop || document.documentElement.scrollTop;
        if (scrollHeight <= bannerHeight) {
            opacity = scrollHeight / bannerHeight;
        } else {
            opacity = 1;
        }
        header.style.background = 'rgba(233,35,34,' + opacity + ')';
    }
}
//倒计时模块函数
function timerBack() {
    var span = document.querySelector('.sk_countDown').querySelectorAll('span');
    var targetDate = new Date('2018-7-6 24:00:00');

    var timerID = setInterval(seckill, 1000);
    seckill();
    //倒计时函数
    function seckill() {
        var startDate = new Date();
        var totalTime = targetDate - startDate;
        totalTime = totalTime / 1000;
        if (totalTime <= 0) {
            clearInterval(timerID);
            return;
        }
        var hour = Math.floor(totalTime / 60 / 60 % 24);
        var minute = Math.floor(totalTime / 60 % 60);
        var second = Math.floor(totalTime % 60);
        //将获取的时间值填充到相应的span标签中
        span[0].innerHTML = Math.floor(hour / 10);
        span[1].innerHTML = Math.floor(hour % 10);
        span[3].innerHTML = Math.floor(minute / 10);
        span[4].innerHTML = Math.floor(minute % 10);
        span[6].innerHTML = Math.floor(second / 10);
        span[7].innerHTML = Math.floor(second % 10);


    }
}
//轮播图模块
function bannerEffect() {
    //因为可以获取到屏幕窗口的宽度可以根据这个来给ul设置宽度
    var bannerWidth = document.querySelector('.jd_banner').offsetWidth;
    var imgBox = document.querySelector('.jd_banner').querySelector('ul');
    //要实现图片的无缝滚动,需要给ul最前面动态添加最后一张图片,给ul最后面动态添加第一张图片
    //获取第一张和最后一张图片,然后深克隆
    var firstImg = imgBox.querySelector('li:first-of-type');
    var lastImg = imgBox.querySelector('li:last-of-type');
    imgBox.appendChild(firstImg.cloneNode(true));
    imgBox.insertBefore(lastImg.cloneNode(true), firstImg);
    //重新获取ul里面的元素然后给他们添加样式
    var moveBox = document.querySelector('ul');
    var lists = moveBox.children;
    //根据数组的长度给ul设置宽度,然后默认是显示现在的张二张,
    var index = 1;
    moveBox.style.width = lists.length * bannerWidth + "px";
    moveBox.style.left = -bannerWidth + 'px';

    //循环遍历给每一个li加样式
    for (var i = 0; i < lists.length; i++) {
        lists[i].style.width = bannerWidth + "px";
    }
    //屏幕放大缩小的时候要给它重新设置宽高,并且位置也要缩放
    window.onresize = function () {
        bannerWidth = document.querySelector('.jd_banner').offsetWidth;
        moveBox.style.width = lists.length * bannerWidth + "px";
       // console.log(lists.length * bannerWidth,7788);
        moveBox.style.left = -index*bannerWidth + 'px';
        //循环遍历给每一个li加样式
        for (var i = 0; i < lists.length; i++) {
            lists[i].style.width = bannerWidth + "px";
        }
    
    }
    //开启定时器开始动画,定义当前的index为1
    setInterval(animation, 2000);
    function animation() {
        index++;
        setTimeout(() => {
            if (index == lists.length - 1) {
                moveBox.style.transition = "none";
                moveBox.style.left = -bannerWidth + "px";
                index = 1;
            }
        }, 500);
        moveBox.style.transition = "all 0.5s ease";
        moveBox.style.left = -index * bannerWidth + "px";
    }

}