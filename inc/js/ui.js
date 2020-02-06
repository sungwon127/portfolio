var UI = {
  scroll: function() {
      var _this = this;
      _this.$animate = _this.$body.find(".animate");
      var sec1,
          sec2;

      var handler = {
          sec1: function SEC1_ANIMATE() {
              if(sec1) return;
              sec1 = true;
              var $container = $('#sec1'), tl = new TimelineMax();

              var workListSwiper = new Swiper('.workList', {
                direction: 'vertical',
                slidesPerView: 'auto',
                spaceBetween: 25,
                mousewheel: true,
                freeMode:true
              });
          }
      }

      $(window).on("scroll", function(){
          var viewTop = $(this).scrollTop(),
              viewHeight = $(this).outerHeight(true) / 2,
              viewBottom = viewTop + viewHeight;

          _this.$animate.each(function(){
              var elementTop = $(this).offset().top,
                  elementHeight = $(this).outerHeight(),
                  elementBottom = elementTop + elementHeight;
              if(viewTop < elementBottom && viewBottom > elementTop) {
                  var id = $(this).attr('id');
                  handler[id]();
              }
          });
      }).trigger("scroll");
  }
}

$( function() {
  UI.$body = $("body");
  var winHeight = window.innerHeight;	
  $(".aboutWrap").attr('style','padding-top:'+winHeight+'px');

  var $container = $('.infoWrap'), tl = new TimelineMax();
  tl.staggerTo($container.find('.txt span'), .3, {y:0, opacity:1, ease:Linear.easeIn}, .3);

  UI.scroll();
})