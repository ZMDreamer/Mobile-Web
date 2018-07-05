//封装模拟click事件,以tab命名的函数
var itcast = {
    //传入两个参数,dom元素和事件执行完毕后的回调函数
    tab: function(dom, callback){
        //判断是否传入了dom元素
        if (!dom&&typeof dom != "object") {
            return;
        }
        //利用给改dom元素添加touch事件来模拟click事件
        var startX,startY,startTime;
        dom.addEventListener('touchstart',function(e){
            //单机时在屏幕上的手指对象只能有一个
            if (e.targetTouches.length > 1) {
                return;
            }
            //记录手机触碰屏幕的时间
            startTime = Date.now();
            //记录手指此时在屏幕上的位置
            startX = e.targetTouches[0].clientX;
            startY = e.targetTouches[0].clientY;
        })
        dom.addEventListener('touchend',function(e){
            //离开时手机屏幕上也只能有一个手指对象而且此时获取对象应该是changeTarget来获取
            if (e.changedTouches.length > 1) {
                return;
            }
            //计算手机停留在屏幕上的时间,让它不能大于一个毫秒值
            if ((Date.now()-startTime) > 200) {
                return;
            }
            //手指可以在屏幕上有较小的移动距离但是不能超过一个值
            var endX = e.changedTouches[0].clientX;
            var endY = e.changedTouches[0].clientY;
            if ((endX - startX) < 10 && (endY - endY) < 10) {
                //如果传人的函数存在就调用改函数
                callback&&callback(e);
                //相当于 if(callback){callback()}
            }
        })



    }
}