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

    var lists = imgBox.children;
    //根据数组的长度给ul设置宽度,然后默认是显示现在的张二张,
    imgBox.style.width = lists.length * bannerWidth + "px";
    //循环遍历给每一个li加样式
    for (var i = 0; i < lists.length; i++) {
        lists[i].style.width = bannerWidth + "px";
    }
    imgBox.style.left = -bannerWidth + 'px';
    //屏幕放大缩小的时候要给它重新设置宽高,并且位置也要缩放
    window.onresize = function () {
        bannerWidth = document.querySelector('.jd_banner').offsetWidth;
        imgBox.style.width = lists.length * bannerWidth + "px";
        // console.log(lists.length * bannerWidth,7788);
        //循环遍历给每一个li加样式
        for (var i = 0; i < lists.length; i++) {
            lists[i].style.width = bannerWidth + "px";
        }
        imgBox.style.left = -index * bannerWidth + 'px';


    }
    //开启定时器开始动画,定义当前的index为1
    var timerID = setInterval(animation, 1000);
    var index = 1;
    //根据index的来给当前的li标签添加样式
    function setState(index){
        //获取所有的ol下面的li标签
        var ol =document.querySelector('.jd_banner ol');
        var circles = ol.querySelectorAll('li');
        //循环遍历circles给移除每个li的样式,给当前加
        for(var i = 0; i < circles.length; i++){
            // circles[i].className = "";
            circles[i].classList.remove('active');
        }
        circles[index-1].classList.add('active');
    }
    function animation() {
        index++;
        imgBox.style.transition = "left 0.5s ease";
        imgBox.style.left = -index * bannerWidth + "px";
        setTimeout(() => {
            if (index == lists.length - 1) {
                index = 1;
                imgBox.style.transition = "none";
                imgBox.style.left = -bannerWidth + "px";
            }
        }, 500);


    }
    //触摸屏幕有三个事件, touchstart,touchmove, touchend来实现触摸屏幕出现效果
    var distanceX, startX, moveX;
    //添加触摸事件移除自动轮播
    //定义一个节流阀功能来实现触摸屏幕的时候清除定时器,结束时开启定时器
    var flag = true;
    imgBox.addEventListener('touchstart', function (e) {
        clearInterval(timerID);
        startX = e.targetTouches[0].clientX;
    })
    //添加触摸移动事件,记算出移动的距离
    imgBox.addEventListener('touchmove', function (e) {
        //移动的距离是相对于最开的原点,所以应该加上触摸时候的被触摸元素到原点的left值
        if (flag) {
            moveX = e.targetTouches[0].clientX;
            distanceX = moveX - startX;
            imgBox.style.transition = "none";
            imgBox.style.left = -index * bannerWidth + distanceX + "px";
        }


    })
    //添加触摸结束事件,判断是滑动的距离是否超过100px,超过就切换图片否则在当前图片
    imgBox.addEventListener('touchend', function () {
        //当一个滑动动画执行完毕后才会执行下一个,否则会出现bug
        flag = false;
        //因为两个方向都有移动距离超过100,所以需要判断
        if (Math.abs(distanceX) > 100) {
            //根据不同的方向会展示不同的图片,需要判断方向
            if (distanceX > 100) {
                index--
            } else {
                index++;
            }
            imgBox.style.transition = "all 0.5s ease";
            imgBox.style.left = -index * bannerWidth + "px";
        } else if (Math.abs(distanceX) > 0) {
            imgBox.style.transition = "all 0.5s ease";
            imgBox.style.left = -index * bannerWidth + "px";
        }
          //因为会触发事件所以必须将当前的下面的值清零
          moveX = 0;
          startX = 0;
          distanceX = 0;
    })
    //添加动画过渡效果监听事件, 就是动画过渡效果执行完毕后触发
    imgBox.addEventListener('webkitTransitionEnd', function () {
        //监听当滑动第一张的前一张和第八张的后一张时让滑动瞬间触发
        if (index == lists.length - 1) {
            index = 1;
            imgBox.style.transition = "none";
            imgBox.style.left = -index * bannerWidth + 'px';
        } else if (index == 0) {
            index = lists.length - 2;
            imgBox.style.transition = "none";
            imgBox.style.left = -index * bannerWidth + 'px';
        }
        //设置动画后的小点样式
        setState(index);

         //手指离开开启定时自动播放
         setTimeout(() => {
            flag = true;
            clearInterval(timerID);
            timerID = setInterval(animation, 1000);
         }, 100);
         


    })

}