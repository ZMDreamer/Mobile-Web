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
   /* 中间新闻导航条滑动事件 */
   /* 获取需要操作的元素 */
   var lis = $('.table_parent>ul>li');
   var ulBOX = $('.table_parent>ul');
   var totalWidth = 0;
   lis.each(function(index,value){
       totalWidth+=$(value).innerWidth();
   })
   ulBOX.width(totalWidth);
// 利用滑动插件
var myScroll = new IScroll('.table_parent',{
     /*设置水平滑动，不允许垂直滑动*/
     scrollX: true, scrollY: false
});

})