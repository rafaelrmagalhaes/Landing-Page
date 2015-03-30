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
		    window.location.hash = target;
		    $(document).on("scroll", onScroll);
		});


		if($target.offset().top == 0){ //Se for home
			$('#header2').removeClass("top_fixed_head");
		}
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

	jQuery('.back_top').click(function(event) {
		event.preventDefault();
		jQuery('html, body').animate({scrollTop: 0}, 800);
		return false;
	});
	

	function resetForm($form) {
		$form.find('input:text, input:password, input, input:file, select, textarea').val('');
		$form.find('input:radio, input:checkbox').removeAttr('checked').removeAttr('selected');
	}	
	
	
	if($('#Grid').length){
		$('#Grid').mixItUp();
	}
	
	// jflickrfeed
	if($('#mate_flickr').length){
		$('#mate_flickr').jflickrfeed({
			limit: 6,
			qstrings: {
				id: '52617155@N08'
			},
			itemTemplate: '<li>'+
							'<a href="{{image}}" title="{{title}}">' +
								'<img src="{{image_s}}" alt="{{title}}" />' +
							'</a>' +
						  '</li>'
		});
	}
	
	
	
});


//----------------------------------------
//------------- Count Factors ------------	   
//---------------------------------------- 
 
(function($) {
	'use strict';
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
	
	//-----------------------------------------
	//---------------- WoW --------------------
	//-----------------------------------------
	var wow = new WOW(
	  {
		boxClass:     'wow',      // animated element css class (default is wow)
		animateClass: 'animated', // animation css class (default is animated)
		offset:       0,          // distance to the element when triggering the animation (default is 0)
		mobile:       true,       // trigger animations on mobile devices (default is true)
		live:         true        // act on asynchronously loaded content (default is true)
	  }
	);
	wow.init();
	
})(jQuery); 


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