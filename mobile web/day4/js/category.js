window.onload = function () {
    // 获取左边的样式
    var ct_left = document.querySelector('.ct_left');
    var boxHeight = ct_left.offsetHeight;
    var ul_left = ct_left.querySelector('ul:first-of-type');
    var ulHeight = ul_left.offsetHeight;
    //计算最大滑动值和最小滑动值
    var maxDistance = 0;
    var minDistance = boxHeight - ulHeight;
    // 添加触摸三事件
    var startY = 0,
        moveY = 0,
        distanceY = 0,
        currentY = 0;
    ul_left.addEventListener('touchstart', function (e) {
        startY = e.targetTouches[0].clientY;

    });
    ul_left.addEventListener('touchmove', function (e) {

        moveY = e.targetTouches[0].clientY;
        distanceY = moveY - startY;
        if (currentY + distanceY > 50 || currentY + distanceY < (minDistance - 100)) {
            return;
        }
        this.style.top = (currentY + distanceY) + "px";
    })
    ul_left.addEventListener('touchend', function () {
        // 判断能滚动的区间
        if (currentY + distanceY > maxDistance) {
            currentY = maxDistance;
            ul_left.style.transition = "top 0.5s";
            ul_left.style.top = maxDistance + "px";
        } else if (currentY + distanceY < minDistance) {
            currentY = minDistance;
            ul_left.style.transition = "top 0.5s";
            ul_left.style.top = minDistance + "px";
        } else {
            currentY += distanceY;

        }

    })
    //点击左边模块的li让它的当前样式激活,需要调用封装好的common.js文件,可以给uk添加点击事件,然后利用事件捕获来找到目标的li
    //获取所有的li标签
    var lis = ul_left.querySelectorAll('li');
    itcast.tab(ul_left,function(e){
        //此处的e其实就是模拟touch事件传过来的e
        //移除所有li的active样式
        for(var i = 0; i < lis.length;i++){
            lis[i].classList.remove('active');
        }
        //给当前点击的li标签添加active样式
        var targetLi = e.target.parentNode;
        targetLi.classList.add('active');

    })
    


}