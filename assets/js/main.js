
$(function() {
  // Smoothe scroll 
  // Credit: Chris Coyier
  // Find it at http://css-tricks.com/snippets/jquery/smooth-scrolling/  
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 800);
        return false;
      }
    }
  });

  var width = $(window).width();

  if (width >= 1200) {
    $('[data-typer-targets]').typer();
    $.typer.options.highlightSpeed = 100;
    $.typer.options.typeSpeed = 200;
  }

  // Chart data and chart transition
  var skillsChartData = [
    {
        value: 25,
        color:"#424651"
    },
    {
        value : 25,
        color : "#85BAB0"
    },
    {
        value : 20,
        color : "#F4D569"
    },    
    {
        value : 10,
        color : "#ED1941"
    },     
    {
        value : 10,
        color : "#575151"
    },
    {
        value : 10,
        color : "#92CDED"
    }        
  ];

  function showSkillsChart(){   
    var ctx = document.getElementById("skills-chart").getContext("2d");
    new Chart(ctx).Pie(skillsChartData);
  };

  // Waypoint transitions
  var graphInitDelay = 300;

    $('#recent-work').waypoint(function(direction) {
      $("#aat-screenshot").removeClass("invisible");
      $("#aat-screenshot").addClass("animated fadeInLeft");
    }, {
      triggerOnce: true,
      offset: "60%"
    });

    $('#skills').waypoint(function(direction) {
      $("#skills-chart-container").removeClass("invisible");
      $(".chart-legend").addClass("animated fadeInUp");
      setTimeout(showSkillsChart,graphInitDelay);
    }, {
      triggerOnce: true,
      offset: "60%"
    });
    

  // Sticky Nav
  var stickyNav = function(){
    var top = $("#home").height();  
    var scrollTop = $(document).scrollTop();  
         
    if (scrollTop >= top) {   
        $("#sticky-nav").addClass("sticky");
        $("#sticky-nav").removeClass("hidden");
        $("#sticky-nav").removeClass("animated slideOutUp");
        $("#sticky-nav").addClass("animated slideInDown");
    } else if (scrollTop >= 0 )  {
        $("#sticky-nav").removeClass("animated slideInDown");
        $("#sticky-nav").addClass("animated slideOutUp");
    }
  };  
      
    stickyNav();  
      
    $(window).scroll(function() {  
        stickyNav();  
    });  

});