window.onload = function () {
    /* 通过js来获取设备的宽度,然后根据宽度来设置当前屏幕下的html的字体大小*/
    window.onresize = function () {
        var deviceWidth = this.innerWidth;
        var fontSize = deviceWidth / 640 * 100;
        if (fontSize >= 100) {
            document.documentElement.style.fontSize =  "100px";
        } else {
            document.documentElement.style.fontSize = fontSize + "px";

        }
    }
    onresize();
}