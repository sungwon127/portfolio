var UI = {
  init: function() {
    var winHeight = window.innerHeight;
    var $container = $('.infoWrap'), tl = new TimelineMax();
    $(".aboutWrap").attr('style','padding-top:'+winHeight+'px');
    tl.staggerTo($container.find('.txt span'), .3, {y:0, opacity:1, ease:Linear.easeIn}, .3);

    var menuItem = $('.gnb > li'),
        contItem = $('.contItem');

    menuItem.each(function(idx){
      var _idx = idx,
          scrollPos = contItem.eq(_idx).find('.innerWrap').offset().top;
      $(this).on("click",function(){
        $(this).addClass('on').siblings().removeClass('on');
        $("html,body").animate({
          scrollTop: scrollPos
        }, 500);
      });
    });

    $('.infoWrap .scrollBtn .btn').on("click",function(){
      $("html,body").animate({
        scrollTop: $('.aboutWrap').find('.innerWrap').offset().top
      }, 500);
    });

    $('.contactWrap .scrollBtn .btn').on("click",function(){
      $("html,body").animate({
        scrollTop:0
      }, 500);
    });

    var workListSwiper = new Swiper('.workList', {
      direction: 'vertical',
      slidesPerView: 10,
      spaceBetween: 20,
      freeMode:true,
      on:{
        slideChange: function() {
            var chkItem = workListSwiper.isEnd;
            if(chkItem == true){
              $(".workList .bg").hide();
            }else{
              $(".workList .bg").show();
            }
        }
      }
    });

    var lastScrollTop = 0;
    
    $(window).on("scroll", function(){
      if($(window).scrollTop() > 100){
        $(".header").addClass('on');
      }else{
        $(".header").removeClass('on');
      }

      if($(window).scrollTop() > window.innerHeight){
        $('.infoWrap .txt').hide();
      }else{
        $('.infoWrap .txt').show();
      }


      var scltop = $(window).scrollTop();
      $('.contItem').each(function(idx){
        var $target = $('.contItem').eq(idx);
        var i = $target.index();
        var targetTop = $target.offset().top - 80;
        
        if(targetTop <= scltop){
          $('.gnb > li').eq(idx).addClass("on").siblings().removeClass('on');
        };

        if(scltop == 0){
          $('.gnb > li').removeClass('on');
        }
      });
    
    }).trigger("scroll");

  }
}

$( function() {
  UI.$body = $("body");
  UI.init();
})
