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

// Intro loading screen
  $(window).load(function() {
    // Animate loader off screen
    $("#loading-spinner").fadeOut();
    $('#loading-screen').delay(350).fadeOut('slow'); 
    $('body').delay(350).css({'overflow':'visible'}); 
  });

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

  $("#hero-title").fitText(1.2, { minFontSize: '40px', maxFontSize: '108px'});
  $("#hero-tagline").fitText(2.5, { minFontSize: '21px', maxFontSize: '54px'});

// Chart data and
  var skillsChartData = [{
    value: 25,
    color: "#424651"
  }, {
    value: 25,
    color: "#85BAB0"
  }, {
    value: 20,
    color: "#F4D569"
  }, {
    value: 10,
    color: "#ED1941"
  }, {
    value: 10,
    color: "#575151"
  }, {
    value: 10,
    color: "#92CDED"
  }];

  function showSkillsChart() {
    var ctx = document.getElementById("skills-chart").getContext("2d");
    new Chart(ctx).Pie(skillsChartData);
  }

// Waypoint transitions
  var graphInitDelay = 300;


  $('#recent-work').waypoint(function (direction) {
    $("#aat-screenshot").removeClass("invisible").addClass("animated fadeInLeft");
  }, {
    triggerOnce: true,
    offset: "60%"
  });

  $('#skills').waypoint(function (direction) {
    $("#skills-chart-container").removeClass("invisible");
    $(".chart-legend").addClass("animated fadeInUp");
  setTimeout(showSkillsChart, graphInitDelay);
  }, {
    triggerOnce: true,
    offset: "60%"
  });

  $('#about').waypoint(function (direction) {
    $(".img-list").removeClass("invisible").addClass("animated fadeInRight");
  setTimeout(showSkillsChart, graphInitDelay);
  }, {
    triggerOnce: true,
    offset: "60%"
  });

  $('#contact').waypoint(function (direction) {
    $(".contact-inner").removeClass("invisible").addClass("animated fadeInUp");
  setTimeout(showSkillsChart, graphInitDelay);
  }, {
    triggerOnce: true,
    offset: "60%"
  });


// Sticky Nav

if(top.location.pathname == "/") {

  var stickyNav = function () {
    width = $(window).width();
    var top = $(".hero").height();
    var scrollTop = $(window).scrollTop();

    if (scrollTop >= top && width >= 577) {
      $("#sticky-nav").addClass("sticky");
      $("#sticky-nav").slideDown("fast");
    } else if (scrollTop >= 0) {
      $("#sticky-nav").slideUp("fast");
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






