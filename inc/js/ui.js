var App = App || {};
App.hasJqueryObject = function($elem){ return $elem.length > 0; };

// Init Check Console
// App.console.log(String);
// App.console.error(String);
// App.console.reset(String);
App.console = new function(){
	this.log = function(name){ console.log("pubLog : " + name + " is init"); };
	this.error = function(name){ console.log("pubError : " + name + " is not init"); };
	this.reset = function(name){ console.log("Reset "+ name +" Complete"); };
};

// Mobile Console
// App.mConsole.log(arguments);
App.mConsole = new function(){
	this.init = function(){
		var html = [
			'<style>',
			'#bsConsole{position:fixed;z-index:999999;background:#eee;bottom:0;left:0;right:0;height:60px}',
			'#bsConsoleTab{background:#ccc;height:20px}',
			'#bsConsoleTabConsole,#bsConsoleTabElement{font-size:11px;margin:2px 5px;padding:0 5px;float:left;border:1px solid #666}',
			'#bsConsoleView{font-size:10px;overflow-y:scroll;height:180px}',
			'#bsConsoleViewElement{word-break:break-all;word-wrap:break-word}',
			'.bsConsoleItem{font-size:13px;border:1px solid #000;padding:5px;margin:5px;float:left}',
			'</style>',
			'<div id="bsConsole">',
			'<div id="bsConsoleTab">',
			'<div id="bsConsoleTabConsole">Console</div>',
			'</div>',
			'<div id="bsConsoleView">',
			'<div id="bsConsoleViewConsole"></div><div id="bsConsoleViewElement" style="display:none"></div>',
			'</div>',
			'</div>'
		];
		this.temp = document.createElement('div');
		this.count = 0;
		if(document.getElementById('bsConsole')) return;
		this.temp.innerHTML = html.join('');
		document.body.appendChild(this.temp.childNodes[0]);
		document.body.appendChild(this.temp.childNodes[0]);
		$("#bsConsole").on("click",  function(e){
			this.style.opacity = this.style.opacity == '1' ? '.2' : '1';
		});
	};

	this.log = function(){
		this.init();
		var a = arguments, i = 0, j = a.length, item, v;
		item = ['<div style="clear:both">'];
		while(i < j){
			v = a[i++];
			if(v && typeof v == 'object') v = JSON.stringify(v);
			item.push('<div class="bsConsoleItem">' + v + " / " +( this.count++)+'</div>');
		}
		item.push('</div>');
		this.temp.innerHTML = item.join('');
		$("#bsConsoleViewConsole").html(this.temp);
	};
};

// mobile check 
function MobileCheck(){	
	var filter = "win16|win32|win64|mac";
	var isMo;
	if(navigator.platform){
		if(0 > filter.indexOf(navigator.platform.toLowerCase())){
			isMo = true;
		}else{
			isMo = false;
		}
	}
	return {
		check : isMo
	};
};

// matchMedia
var Utils = {
	getMediaQuery: function(type){
		return {
			pc: window.matchMedia("(min-width:1025px)"),
			tablet: window.matchMedia("(min-width:768px) and (max-width:1024px)"),
			mobile: window.matchMedia("all and (max-width:767px)")
		}[type];
	}
}

function mapToIscroll(id) {

	var Popup = document.getElementById(id);

	if(Utils.getMediaQuery('pc').matches){
		console.log('is pc');
		Popup.IscrollObject =  Popup.IscrollObject || new IScroll(".scrollWrap", { 
			scrollbars: true, mouseWheel: true, fadeScrollbars: true 
		}); 
		
	}else{
		console.log('is Mobile');
		$(Popup).find(".scrollWrap").children().first().removeAttr("style");
		Popup.IscrollObject ? Popup.IscrollObject.destroy() : null;
	};
	

};

/* @mediaQuery
*
* PC: window.matchMedia("(min-width:1025px) and all")
* TABLET: window.matchMedia("(min-width:768px) and (max-width:1024px)")
* 
*/
App.mediaQuery = new function(){
	this.init = function(){
		this.isInit = true;
		App.console.log("App.mediaQuery");
		this.reset();

		// var device = new MobileCheck();

		// if(device.check){
		// 	console.log('is Mobile');
		// }else{
		// 	console.log('is pc');
		// }
	};

	this.reset = function(){
		var _this = this;
		var pcMQ = Utils.getMediaQuery('pc');
		var tabletMQ = Utils.getMediaQuery('tablet');

		if(pcMQ.matches) { // PC 해상도 일 때
			_this.matchedIsPC();
		} else { // PC 해상도가 아닐 때
			tabletMQ.matches ? _this.matchedIsTablet() : _this.matchedIsMobile();
		}

		pcMQ.addListener(function(mql){
			mql.matches && _this.matchedIsPC();
		});

		tabletMQ.addListener(function(mql){
			mql.matches ? _this.matchedIsTablet() : pcMQ.matches ? _this.matchedIsPC() : _this.matchedIsMobile();
		});
	};

	this.matchedIsPC = function(){
		console.log('is PC');
	};

	this.matchedIsTablet = function(){
		console.log('is Tablet');
	};

	this.matchedIsMobile = function(){
		console.log('is Mobile');
		
		// 리사이즈 이벤트 후처리
		$(window).on("resize.gnb", function(){
			if(this.resizeTO) {
				clearTimeout(this.resizeTO);
			}

			this.resizeTO = setTimeout(function() {
				$(this).trigger('resizeEnd');
			}, 300);
		});

		$(window).on('resizeEnd', function() {
			var $moTop = $(".moMenuWrap"),
				$moTopH = $moTop.outerHeight(true);

			$(".contents").css("padding-top", $moTopH + 30);
		});

		//아이폰 대응 setTimeout 추가
		setTimeout(function() {
			var $moTop = $(".moMenuWrap"),
			$moTopH = $moTop.outerHeight(true);

			$(".contents").css("padding-top", $moTopH + 30);
		}, 300);

	};

};

// Index Manager
// add - App.idxManager.add({ id: String, len: Number, isNext: Boolean });
// get - App.idxManager.find(id).getIndex(value);
// set - App.idxManager.find(id).setIndex(value);
// reset - App.idxManager.find(id).reset();
// get Length - App.idxManager.find(id).getLength();
// set Length - App.idxManager.find(id).setLength(value);
App.idxManager = new function(){
	var _that = this;
	_that.hash = {};
	_that.arrAll = [];

	_that.add = function(obj){
		function Indexing(_id, _len, _isNext){
			var len = _len;
			var count = 0;
			var isNext = _isNext;
			return {
				getIndex: function(value){
					if(value === undefined) return count;
					count += value;
					if(isNext){
						if(count >= len) count = 0;
						else if(count < 0) count = len - 1;
					} else{
						if(count >= len) count = len;
						else if(count < 0) count = 0;
					}
					return count;
				},

				setIndex: function(value){
					count = value;
					return count;
				},

				getLength: function(){
					return len;
				},

				setLength: function(value){
					len = value;
					return len;
				},

				reset: function(){
					count = 0;
				}
			};
		}
		var indexing = new Indexing(obj.id, obj.len, obj.isNext);
		return _that.hash[obj.id] = indexing, _that.arrAll.push(indexing), _that;
	};

	_that.find = function(obj){
		return _that.hash[obj];
	};

	_that.all = function(){
		return _that.arrAll;
	};
};

// TimerManager
// Object - id, end, success, removeCount
// id : String
// end : Number
// success : function
// removeCount : number
// App.timerManager.add({ id: , end: , success: , removeCount:  });
// App.timerManager.start();
window.requestAnimatedFrame = (function (){
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback){
		window.setTimeout(callback, 1000 / 60);
	};
})();

App.timerManager = new function (){
	var _that = this;
	_that.hashMap = {};
	_that.all = [];
	var count = 0;
	var isStop = false;
	var fps = 60;

	_that.add = function(obj){
		function CustomSetTimeOut($id, $ended, $successFunc, $removedCount){
			var _id = $id;
			var elapsed = 0;
			var ended = $ended;
			var isAutoplay = true;
			var removedCount = $removedCount || -1;
			var counter = 0;
			return {
				id: function(){
					return $id;
				}, 
				
				call: function(){
					counter += 1;
					if (counter < $removedCount){
						App.timerManager.ins().remove($id);
						return;
					}
					if (isAutoplay){
						if (++elapsed >= ended){
							$successFunc(_id, counter - 1);
							elapsed = 0;
						}
					}
				}, 
				
				auto: function(){
					if (arguments.length){
						isAutoplay = arguments[0];
						elapsed = 0;
					} else{
						return isAutoplay;
					}
				}, 
				
				reset: function(){
					elapsed = 0;
				}
			};
		}
		var ticker = new CustomSetTimeOut(obj["id"], obj["end"], obj["success"], obj["removeCount"]);
		_that.hashMap[obj["id"]] = ticker;
		_that.all.push(ticker);
	};

	_that.find = function (id){
		return _that.hashMap[id];
	};

	_that.remove = function (id){
		_that.all.splice(_that.all.indexOf(_that.hashMap[id]), 1);
		_that.hashMap[id] = null;
	};

	_that.start =  function (){
		requestAnimatedFrame(enterFrame);
	};

	function enterFrame(){
		count += 1;
		if (count >= fps){
			var i = -1, length = _that.all.length;
			count = 0;
			while (++i < length){
				_that.all[i].call();
			}
		}
		requestAnimatedFrame(enterFrame);
	}
};

// PreventDefault
App.handlePreventDefault = function(e){ if(App.$dim.length > 0 && App.$dim.is(":visible")) e.preventDefault(); };
App.PreventDefault = function(){ App.$body.on("touchmove", App.handlePreventDefault); };

// Ticker
// @params
// bool - Boolean
// func - function
App.ticker = function(bool, func){
	var isBoolean = bool;
    if(isBoolean) TweenMax.ticker.addEventListener("tick", func);
    else TweenMax.ticker.removeEventListener("tick", func);
};

// Center Align
// @params
// $el - Selector
App.align = function($el){
	if($el === undefined) return;
	var winWidth = App.$window.width();
	var winHeight = App.$window.height();
	$el.each(function(){
		if($(this).is(":visible")){
			var popWidth = $el.outerWidth(true);
			var popHeight = $el.outerHeight(true);
			$(this).css({"top": (winHeight- popHeight) *.5, "left": (winWidth - popWidth) *.5});
		}
	});
};

// Layer Popup
// Open - App.UI.find("App.layerPopup").handleOpen(this);
// Close - App.UI.find("App.layerPopup").handleClose();
App.layerPopup = new function(){
	this.init = function(){
		this.isInit = true;
		App.console.log("App.layerPopup");
		this.addEvents();
	};

	this.addEvents = function(){
		App.$body.on("click.popOpen", ".pubLayerCtrl", this.handleOpen);
		App.$body.on("click.popClose", ".layerPopup .btnLayerClose", this.handleClose);
	};

	this.handleOpen = function(e){
		var $layerPopup = App.$body.find(".layerPopup");
		var $pubLayerPopup = App.$body.find(".pubLayerPopup");
		if($(e.target).next($pubLayerPopup).length > 0){
			App.layerPopup.$target = $(e.target);
			App.layerPopup.$layerPopup = $(e.target).next($pubLayerPopup);
		} else{
			App.layerPopup.$target = $(e)[0];
			App.layerPopup.$layerPopup = $layerPopup.not($pubLayerPopup);
		}
		App.layerPopup.$layerPopup.attr("tabindex", 0).show().focus();
		App.$dim.show();
		App.layerPopup.handleCenterAlign( App.layerPopup.$layerPopup );
		App.$window.off("resize.align").on("resize.align", function(){ App.layerPopup.handleCenterAlign(App.layerPopup.$layerPopup); });
		App.layerPopup.$layerPopup.off("keydown.focus").on("keydown.focus", App.layerPopup.handleFocus);
	};

	this.handleClose = function(){
		App.layerPopup.$layerPopup.hide();
		App.$dim.hide();
		App.layerPopup.$target.focus();
	};

	this.handleFocus = function(e){
		if(e.keyCode === 9){
			if(!e.shiftKey){
				if(App.layerPopup.$layerPopup.find("a,button,input").last().is(":focus")){
					App.layerPopup.$layerPopup.focus();
				}
			} else{
				if(App.layerPopup.$layerPopup.is(":focus")){
					setTimeout(function(){
						App.layerPopup.$layerPopup.find("a,button,input").last().focus();
					}, 1);
				}
			}
		}
	};

	this.handleCenterAlign = function($elem){ App.align($elem); };
};

// Tab
App.tab = new function(){
	this.init = function(){
		this.isInit = true;
		App.console.log("App.tab");
		this.reset();
	};

	this.reset = function(){
		this.$tab = App.$body.find(".initTab");
		this.$tabCtrl = this.$tab.find(".tabCtrl");
		this.$tab.each(function(idx){ 
			$(this).data("key", idx).find(">.tabCtrlWrap>.tabCtrl").each(function(_idx){ 
				$(this).data("ctrlKey", _idx);
				if($(this).hasClass("current")){
					var key = $(this).data("ctrlKey");
					App.tab.$tab.eq(idx).find(">.tabViewWrap>.tabView").eq(key).show();
				}
			}); 
		});
		this.addEvents();
	};

	this.addEvents =function(){
		this.$tabCtrl.off("click.tab").on("click.tab", this.handleClick);
	};

	this.handleClick = function(e){
		if($(e.target).hasClass("current")) return;
		var key = $(e.target).parents(".initTab").data("key");
		var ctrlKey = $(e.target).data("ctrlKey");
		var currentKey = App.tab.$tab.eq(key).find(">.tabCtrlWrap>.tabCtrl.current").data("ctrlKey");
		var $tabCtrl = App.tab.$tab.eq(key).find(">.tabCtrlWrap>.tabCtrl");
		var $tabView = App.tab.$tab.eq(key).find(">.tabViewWrap>.tabView");
		$tabCtrl.eq(currentKey).removeClass("current");
		$tabView.eq(currentKey).hide();
		$(e.target).addClass("current");
		$tabView.eq(ctrlKey).show();
	};
};

// Toggle
App.toggle = new function(){
	this.init = function(){
		this.isInit = true;
		App.console.log("App.toggle");
		this.reset();
		this.addEvents();	
	};

	this.addEvents =function(){
		App.$body.on("click.toggle", ".toggleCtrl", this.handleClick);
	};

	this.reset = function(){
		this.$toggle = App.$body.find(".initToggle");
		this.$toggleCtrl = this.$toggle.find(".toggleCtrl");
		this.$toggle.each(function(){
			$(this).find(">ul>li>.toggleCtrl").each(function(){ 
				var $siblings = $(this).siblings(".toggleView");
				if($(this).hasClass("current")) $siblings.show();
				else $siblings.hide();
			 });
		});
	};

	this.handleClick = function(e){
		var $that = $(e.target);
		var $toggleCtrl = $that.closest(".initToggle").find(">ul>li>.toggleCtrl");
		var $toggleView = $that.closest(".initToggle").find(">ul>li>.toggleView");
		var $siblings = $that.siblings(".toggleView");
		if(!$that.hasClass("current")){
			$toggleCtrl.not($that).removeClass("current");
			$toggleView.not($siblings).hide();
			$that.addClass("current");
			$siblings.show();
		} else{
			$that.removeClass("current");
			$siblings.hide();
		}
	};
};

// Toggle
App.selectBox = new function(){
	this.init = function(){
		this.isInit = true;
		App.console.log("App.selectBox");
		this.reset();
		this.addEvents();	
	};

	this.addEvents =function(){
		App.$body.on("focusIn change", this.$selectBoxCtrl , this.handleChange);
	};

	this.reset = function(){
		this.$selectBoxCtrl = App.$body.find('.selectBox .select');
	};

	this.handleChange = function(e){
		var $this = $(e.target);
		var select_name = $("#" + $this.attr("id") + " option:selected").text();
		$this.siblings('label').text(select_name);
	};
};


// header, footer include 
App.include = new function(){
	this.init = function(){
		$(window).load(function(){
      var $include = $('[data-include]');
      $include.each(function(i,el){
        var $this = $(this)
        var src = $this.data('include');
        $this.load(src,function(){
          $this.removeAttr('data-include');
        });
      });
    });
	};
};

// UI Init
var UI = new function(){
	this.init = function(){
    App.mediaQuery.init();
    App.include.init();
		if( App.layerPopup.isInit === undefined && App.hasJqueryObject( App.$body.find(".layerPopup") ) ) App.layerPopup.init();
		if( App.tab.isInit === undefined && App.hasJqueryObject( App.$body.find(".initTab") ) ) App.tab.init();
		if( App.toggle.isInit === undefined && App.hasJqueryObject( App.$body.find(".initToggle") ) ) App.toggle.init();
		if( App.selectBox.isInit === undefined && App.hasJqueryObject( App.$body.find(".selectBox") ) ) App.selectBox.init();
		
	};

	this.reset = function(){
		App.tab.isInit && App.hasJqueryObject( App.$body.find(".initTab") ) ? App.tab.reset() : App.console.error("App.tab");
		App.toggle.isInit && App.hasJqueryObject( App.$body.find(".initToggle") ) ? App.toggle.reset() : App.console.error("App.toggle");
		App.console.reset("App.UI");
	};
};

$(function(){
	App.$window = $(window);
	App.$body = $("body");
	App.$dim = App.$body.find(".dim");
	UI.init();
});