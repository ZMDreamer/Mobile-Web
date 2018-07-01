// 点击获取验证码几秒后才可以在点
$(function () {
    var flag = true;
    var num = 10;
    $('#getCode').click(function () {
        $(this).hide();
        $(this).next('span').show().text(num + '秒后重新获取');
        if (flag) {
            flag = false;
            timerId = setInterval(function () {
                $('.hidden').text(num + '秒后重新获取')
                num--;
                if (num < 0) {
                    num = 10;
                    clearInterval(timerId);
                    flag = true;
                    $('.hidden').hide();
                    $('#getCode').show().text('获取验证码');
                }
            }, 1000);
        }
    });




})