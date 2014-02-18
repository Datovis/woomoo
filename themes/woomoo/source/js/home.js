(function($){
  var screens = $('.screen'),
    $body = $('html, body'),
    $window = $(window),
    currentId = 'intro',
    speed = 700;

  var setIndicator = function(id){
    if (currentId === id) return;

    currentId = id;

    $('.indicator-link').removeClass('active');
    $('#indicator-' + id).addClass('active');

    $('.mobile-nav-link').removeClass('active');
    $('#mobile-nav-' + id).addClass('active');
  };

  var scrollTo = function(id){
    var target = $('#' + id);

    $body.animate({
      scrollTop: target[0].offsetTop
    }, speed);
  };

  var updateIndicator = function(){
    var scrollTop = $(this).scrollTop(),
      id;

    screens.each(function(){
      if (scrollTop >= this.offsetTop - 10) id = this.id;
    });

    setIndicator(id);
  };

  $window.on('scroll', updateIndicator);
  updateIndicator();

  $body.on('click', 'a', function(e){
    if (this.hash){
      e.preventDefault();
      scrollTo(this.hash.substring(1));
    }
  });

  var setScreenSize = function(){
    var wrapWidth = $window.width(),
      wrapHeight = $window.height();

    screens.not('#team').each(function(){
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

  var easterEgg = new Konami(function(){
    $('.easter-egg').fadeIn(500);
  });
})(jQuery);
