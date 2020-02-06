var UI = {
  scroll: function() {
      var _this = this;
      _this.$animate = _this.$body.find(".animate");
      var sec1,
          sec2;

      var handler = {
          sec1: function SEC1_ANIMATE() {
            console.log(1)
              if(sec1) return;
              sec1 = true;
              var $container = $('#sec1'), tl = new TimelineMax();
              
          },
          sec2: function SEC2_ANIMATE() {
              if(sec2) return;
              sec2 = true;
              var $container = $('#sec2'), tl = new TimelineMax();

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
  UI.scroll();
})