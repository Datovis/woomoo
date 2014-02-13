(function($){
  var screens = $('.screen'),
    currentId = 'intro';

  var setIndicator = function(id){
    currentId = id;

    $('.indicator-link').removeClass('active');
    $('#indicator-' + id).addClass('active');
  };

  var scrollTo = function(id, setHash){
    var target = $('#' + id);

    $('#wrap').animate({
      scrollTop: target[0].offsetTop
    }, 800, function(){
      if (setHash) window.location.hash = '#' + id;
    });
  };

  var onHashChange = function(){
    scrollTo(window.location.hash.substring(1));
  };

  $('#wrap').on('scroll', function(){
    var scrollTop = $(this).scrollTop(),
      id;

    screens.each(function(){
      if (scrollTop >= this.offsetTop - 10) id = this.id;
    });

    if (id !== currentId) setIndicator(id);
  }).on('click', 'a', function(e){
    if (this.hash){
      e.preventDefault();
      scrollTo(this.hash.substring(1), true);
    }
  });

  $(window).on('hashchange', onHashChange);

  if (window.location.hash){
    currentId = window.location.hash.substring(1);
    setIndicator(currentId);
  }

  var setScreenSize = function(){
    var wrapWidth = $('#wrap').width(),
      wrapHeight = $('#wrap').height();

    screens.not('#crew').each(function(){
      if (wrapWidth > 768){
        $(this).css('height', wrapHeight);
      } else {
        $(this).css('height', 'auto');
      }
    });
  };

  $(window).on('resize', setScreenSize);
  setScreenSize();
})(jQuery);