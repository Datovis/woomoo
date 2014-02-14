(function($){
  var screens = $('.screen'),
    $body = $('html, body'),
    $window = $(window),
    currentId = 'intro';

  var setIndicator = function(id){
    if (currentId === id) return;

    currentId = id;

    $('.indicator-link').removeClass('active');
    $('#indicator-' + id).addClass('active');
  };

  var scrollTo = function(id){
    var target = $('#' + id);

    $body.animate({
      scrollTop: target[0].offsetTop
    }, 800);
  };

  $window.on('scroll', function(){
    var scrollTop = $(this).scrollTop(),
      id;

    screens.each(function(){
      if (scrollTop >= this.offsetTop - 10) id = this.id;
    });

    setIndicator(id);
  });

  $body.on('click', 'a', function(e){
    if (this.hash){
      e.preventDefault();
      scrollTo(this.hash.substring(1));
    }
  });

  var setScreenSize = function(){
    var wrapWidth = $window.width(),
      wrapHeight = $window.height();

    screens.not('#crew').each(function(){
      if (wrapWidth > 768){
        $(this).css('height', wrapHeight);
      } else {
        $(this).css('height', 'auto');
      }
    });
  };

  $window.on('resize', setScreenSize);
  setScreenSize();

  $('#mobile-nav-toggle').on('click', function(){
    $('#mobile-nav').toggleClass('on');
  });
})(jQuery);