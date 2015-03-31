jQuery(document).ready(function($) {
	
	//SCROLL
	$(document).on("scroll", onScroll);

	$('#main_menu2 ul li a[href^="#"]').on('click', function (e) {
		e.preventDefault();
		$(document).off("scroll");

		$('a').each(function () {
		    $(this).parent().removeClass('active');
		})
		$(this).parent().addClass('active');

		var target = this.hash,
		menu = target;
		$target = $(target);
		$('html, body').stop().animate({
		    'scrollTop': $target.offset().top - 80
		}, 500, 'swing', function () {
		    //window.location.hash = target;
		    $(document).on("scroll", onScroll);
		});


		if($target.offset().top == 0){ //Se for home
			$('#header2').removeClass("top_fixed_head");
		}
	});

	$("#telas").owlCarousel({
		navigation : true,
		slideSpeed : 300,
		paginationSpeed : 400,
		autoPlay: false,
		singleItem:true
  });
 

	// Back to Top
	'use strict';	
	
	var offset = 220;
	var duration = 1000;

	jQuery(window).scroll(function() {
		if (jQuery(this).scrollTop() > offset){
			jQuery(".back_top").fadeIn('slow');
		} else {
			jQuery(".back_top").fadeOut('slow');
		}
	});
	
	
	if($('#Grid').length){
		$('#Grid').mixItUp();
	}


	$(".back_top").click(function(event) {
		event.preventDefault();
  		$("html, body").animate({scrollTop: 0}, 1000);
	});

	$(".logo").click(function(event) {
		event.preventDefault();
  		$("html, body").animate({scrollTop: 0}, 1000);
	});
	
});


//SCROLL
function onScroll(event){
    var scrollPos = $(document).scrollTop();
    $('#main_menu2 ul li a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top - 116 <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('#main_menu2 ul li').removeClass("active");
            currLink.parent().addClass("active");
        }
        else{
            currLink.parent().removeClass("active");
        }
    });
    
    if($(this).scrollTop() > 116){
		$('#header2').addClass("top_fixed_head");
	} else {
		$('#header2').removeClass("top_fixed_head");
	}
}