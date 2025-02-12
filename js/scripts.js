function getRespParams() {
    if($(document).scrollTop() > 10) {
        $("#header").addClass("scroll");
    } else {
        $("#header").removeClass("scroll");
    }
}

var w = window,
d = document,
e = d.documentElement,
g = d.getElementsByTagName('body')[0],
bodyWidth = w.innerWidth || e.clientWidth || g.clientWidth;

var sections = $('.screen')
  , nav = $('.resp_nav')
  , nav_height = nav.outerHeight();

$(window).resize(function() {
    getRespParams();
    bodyWidth = w.innerWidth || e.clientWidth || g.clientWidth;
});

$(document).scroll(function() {
    getRespParams();
    var cur_pos = $(this).scrollTop();    
    sections.each(function() {
    var top = $(this).offset().top - nav_height,
        bottom = top + $(this).outerHeight();

    if (cur_pos >= top && cur_pos <= bottom) {
      nav.find('a').removeClass('active');
      sections.removeClass('active');
      
      $(this).addClass('active');
      nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('active');
    }
    });
});

$(document).ready(function() {
    getRespParams();

    $(".dr_parent").each(function() {
        sl = $(this).find(".dr_content");
        if($(this).hasClass("active")) {
            sl.slideDown(300);
        } else {
            sl.slideUp(300);
        }
    });

    $(".dr_title").on("click", function(e) {
      e.preventDefault();
      wrapp = $(this).closest(".dr_wrapp");
      parent = $(this).closest(".dr_parent");
      sl = parent.find(".dr_content");
      if(sl.is(":hidden")) {
        wrapp.find(".dr_content").slideUp(300);
        parent.addClass("active");
        sl.slideDown(300);
      } else {               
        sl.slideUp(300);
        parent.removeClass("active");
      }
    });

    // --------------

    $('a[href^="#"]').on('click', function (e) {
      e.preventDefault();
      var hrefAttr = $(this).attr("href");
      $(".resp_nav li a").removeClass("active");
      $(this).addClass("active");
      if( hrefAttr.length > 0 && hrefAttr != "#" ) {
          $('html, body').stop().animate({
              'scrollTop': $(hrefAttr).offset().top - 30
          }, 500);
      }
      if(bodyWidth <= 768) {
        $("#respNav").fadeOut(300);
        $(".respmenubtn").removeClass("active");
      }    
    });

    // --------------

    $(".respmenubtn").click(function(e) {
      e.preventDefault();
      if( $("#respNav").is(":hidden") ) {
          $("#respNav").fadeIn(300);
          $(this).addClass("active");
      } else {
          $("#respNav").fadeOut(300);
          $(this).removeClass("active");
      }
    });
    
    $(this).keydown(function(eventObject){
        if (eventObject.which == 27 &&
            $("#respNav").is(":visible") &&
            bodyWidth <= 767) {
                $("#respNav").fadeOut(300);
                $(".respmenubtn").removeClass("active");
        }
    });

});