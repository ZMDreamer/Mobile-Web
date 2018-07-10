$(function(){
    //获取当前屏幕的宽度
   $(window).on('resize',function(){
       var screenWidth = $(this).width();
       var items = $('.wjs_banner .item');
          // 根据屏幕尺寸的来判断768比较
       if (screenWidth >= 768) {
           //获取所有的item标签循环动态添加a标签
        $.each(items,function(index,value){
            var Imgsrc = $(value).data('largeImg');
            $(value).html($('<a href = "javascript:;" class = "pcImg"> </a>').css('backgroundImage',"url('"+Imgsrc+"')"));
        })
       }else{
        $.each(items,function(index,value){
            var Imgsrc = $(value).data('smallImg');
            $(value).html($('<a href = "javascript:;" class = "moblieImg"> <img src = "'+Imgsrc+'"> </a>'));
        })
       }
   }).trigger('resize');
   //给轮播图添加touch事件
   var startX, endX;
   $('.wjs_banner')[0].addEventListener('touchstart',function(e){

       startX = e.targetTouches[0].clientX;

   })
   $('.wjs_banner')[0].addEventListener('touchend',function(e){
       endX = e.changedTouches[0].clientX;
       if (endX - startX < 0) {
        $('.carousel').carousel('next')
       }else{
        $('.carousel').carousel('prev')
       }

   })
   /* 工具提示 */
   $('[data-toggle="tooltip"]').tooltip();

})