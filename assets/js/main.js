// Avoid `console` errors in browsers that lack a console.
(function() {
  var method;
  var noop = function () {};
  var methods = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
    'timeStamp', 'trace', 'warn'
  ];
  var length = methods.length;
  var console = (window.console = window.console || {});

  while (length--) {
    method = methods[length];

    // Only stub undefined methods.
    if (!console[method]) {
        console[method] = noop;
    }
  }
}());

$(function () {

// Smoothe scroll
  $('a[href*=#]:not([href=#])').click(function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    if (target.length) {
      $('html,body').animate({
      scrollTop: target.offset().top
      }, 800);
      return false;
      }
    }
  });

  $("#hero-title").fitText(1.2, { minFontSize: '60px', maxFontSize: '108px'});
  $("#hero-tagline").fitText(2.5, { minFontSize: '21px', maxFontSize: '54px'});

// Sticky Nav

if(top.location.pathname == "/") {

  var stickyNav = function () {
    var width = $(window).width();
    var top = $(".hero").height();
    var scrollTop = $(window).scrollTop();

    if (scrollTop >= top && width >= 577) {
      $(".sticky-nav").slideDown();
    } else if (scrollTop >= 0) {
      $(".sticky-nav").slideUp();
    }
  };

  stickyNav();

  $(window).scroll(function () {
    stickyNav();
  });
}

// Form Validation and Simple Form Submission
  $(".ajax-form").validate({
    rules: {
      name: {
        required: true,
        minlength: 2,
      },
      email: {
        required: true,
        email: true,
      },
      message: {
        required: true,
        minlength: 5,
    },
  },
  errorPlacement: function(error, element) {
  },
  submitHandler: function(form) {
    $.ajax({
      dataType: "jsonp",
      url: "http://getsimpleform.com/messages/ajax?form_api_token=f3424adaa86654f85e3c0931cbffc00f",
      data: $(".ajax-form").serialize()
    }).done(function() {
      //callback which can be used to show a thank you message
      //and reset the form
      $(".ajax-form").hide();
      $(".form-thank-you").fadeIn("400");
    });
      return false; //to stop the form from submitting
    }
  });

});
