
var Common = {
  init: function() {
    var device = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));

    var _this = this;
    _this.projectId = _.last($(".contents").attr("id").split("PF"))
    _this.menuListClass = '#menuList';    
    _this.$menuList = $(_this.menuListClass);
   
    $.get("/inc/project.json", function(data){
      var projectList = _.map(data, function(value){
        var className = (value.id === _this.projectId) ? 'menu active' : 'menu';
        var href = (device && value.url.mobile) ? value.url.mobile : value.url.pc;
        return (
          "<li class='" + className + "'>" +
            "<a href="+ href +">" +
              value.name +
            "</a>" +
          "</li>"
        );
      })
      _this.$menuList.html("").append(projectList)
    })

    return _this;
  },
  header: function() {
    var _this = this;
    this.$header = $("#header");
    this.$btnAllMenu = this.$header.find(".btnAllMenu");
    this.$gnb = $("#gnb");
    this.headerType = this.$header.hasClass("wh") ? 'wh' : 'bk';
    this.activeClass = 'on';

    $(window).on("scroll", function(){
      var sTop = $(this).scrollTop();
      if(sTop >= $(this).outerHeight(true)) {
        _this.headerType === 'wh' ? _this.$header.removeClass('wh').addClass('bk on') : _this.$header.addClass('on');
      } else {
        _this.headerType === 'wh' ? _this.$header.removeClass('bk on').addClass('wh') : _this.$header.removeClass('on');
      }
    })

    this.$btnAllMenu.on("click", function(){
      if($(this).toggleClass(_this.activeClass).hasClass(_this.activeClass)) {
        TweenMax.to(_this.$gnb, .45, { x: 0 + '%', autoAlpha: 1, ease: Power1.easeOut })
      } else {
        TweenMax.to(_this.$gnb, .45, { x: 100 + '%', autoAlpha: 0, ease: Power1.easeOut })
      }
    })
  }
}

$(function(){
  $("#header").length > 0 && Common.init().header();
})

