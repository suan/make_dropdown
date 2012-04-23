(function($){

  var timeout    = 500;
  var closetimer = 0;
  var ddmenuitem = null;

  // From https://github.com/Modernizr/Modernizr/blob/master/modernizr.js
  var isTouch = ('ontouchstart' in window) ||
                window.DocumentTouch && document instanceof DocumentTouch;

  // jsddm funcs from http://javascript-array.com/scripts/jquery_simple_drop_down_menu/
  function jsddm_open($this){
    jsddm_canceltimer();
    jsddm_close();
    ddmenuitem = $this.find('ul').css('visibility', 'visible');
  }

  function jsddm_close() {
    if(ddmenuitem){
      ddmenuitem.css('visibility', 'hidden');
      ddmenuitem = null;
    }
  }

  function jsddm_timer() { 
    closetimer = window.setTimeout(jsddm_close, timeout);
  }

  function jsddm_canceltimer() { 
    if(closetimer)
    {  window.clearTimeout(closetimer);
       closetimer = null;
    }
  }

  function jsddm_toggle($this) {
    if (ddmenuitem && $this.has(ddmenuitem[0]).length){
      jsddm_close();
    }
    else {
      jsddm_open($this);
    }
  }

  $.fn.make_dropdown = function(options){

    return this.each(function(){

      if (options && options['timeout']){
        timeout = options['timeout'];
      }

      $(this).click(function(event){
        jsddm_toggle($(this));
        event.stopPropagation();
      });
      if (!isTouch){
        $(this).mouseover(function(){ jsddm_open($(this)) }).mouseout(jsddm_timer);
      }

    });
  }

  $(document).click(jsddm_close);

})(jQuery);

