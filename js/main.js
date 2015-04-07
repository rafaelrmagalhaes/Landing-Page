$(document).ready(function($) {
	
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
		pagination: false,
		autoPlay: false,
		singleItem:true,
		navigationText: false,
		transitionStyle : "fade",
		lazyLoad : true,
		mouseDrag: false,
		touchDrag: false
  });
    
    function validEmail(email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }
    
    function criaSpan(msg){
        var form = $("form").parents();
        form.prepend("<span class='formError'></span>");
        $("span.formError").html(msg);
        $("span.formError").remove().delay(10000);
    }
    
    $("#form-email button[type='submit']").on("click", function(){
        var button = $(this);
        var email = $('#form-email input[type="email"]').val();
        var data = {
            form: 'form-email',
            email: email
        };        
        data = $(this).serialize() + "&" + $.param(data);
        if(!validEmail(email) || email == ''){
            criaSpan("E-mail inválido.");
            return false;       
        }
         $.ajax({
             beforeSend: function() {
                button.attr('disabled','disabled');
                button.children('span').addClass('hidden');
                button.children('img').removeClass('hidden');
            },
            url : "ajax/ajax.php",
            type: 'post',
            data: data,            
            success : function(data){
                if(data['return'] === true)
                {
                    $('#form-more input#email').val(data['email']);
                    setTimeout(
                        function(){
                            button.children('img').addClass('hidden');
                            button.children('span').html("Ok!").delay(5000).removeClass('hidden');
                            $('#form-email').removeAttr('style');
                        }, 2000);
                    setTimeout(
                        function(){
                            $('#form-email').addClass('wow animated flipOutX');
                        }, 2000);
                    setInterval(function(){
                        $('#form-email').addClass('hidden');
                        $('#form-more').removeClass('hidden');
                        $('#form-more').addClass('wow flipInX animated');                
                    }, 2300);
                } else {
                    button.removeAttr('disabled');
                    button.children('span').removeClass('hidden');
                    button.children('img').addClass('hidden');
                    return false;
                }
            },             
            error: function(error) { 
                alert(error);
            },
         });
        return false;
    });
    
    $("#form-more button[type='submit']").on("click", function(){
        var button = $(this);
        var nome = $('#form-more #nome').val();
        var telefone = $('#form-more #telefone').val();
        var mensagem = $('#form-more #mensagem').val();
        var data = {
            form: 'form-more',
            nome: nome,
            telefone: telefone,
            mensagem: mensagem
        };
        data = $(this).serialize() + "&" + $.param(data);     
        
         $.ajax({
             beforeSend: function() {
                button.attr('disabled','disabled');
                button.children('span').addClass('hidden');
                button.children('img').removeClass('hidden');
            },
            url : "ajax/ajax.php",
            type: 'post',
            data: data,            
            success : function(data){
                if(data['return'] === true)
                {
                    $('#form-more input#email').val(data['email']);
                    setTimeout(
                        function(){
                            button.children('img').addClass('hidden');
                            button.children('span').html("Ok!").delay(5000).removeClass('hidden');
                            $('#form-email').removeAttr('style');
                        }, 2000);
                    setTimeout(
                        function(){
                            $('#form-email').addClass('wow animated flipOutX');
                        }, 2000);
                    setInterval(function(){
                        $('#form-email').addClass('hidden');
                        $('#form-more').removeClass('hidden');
                        $('#form-more').addClass('wow flipInX animated');                
                    }, 2300);
                } else {
                    button.removeAttr('disabled');
                    button.children('span').removeClass('hidden');
                    button.children('img').addClass('hidden');
                    criaSpan("Ocorreu algum erro. Tente novamente.");
                    return false;
                }
            },             
            error: function(error) { 
                alert(error);
            },
         });
        return false;
    });
    
    
    
    
	$(".back_top").click(function(event) {
		event.preventDefault();
  		$("html, body").animate({scrollTop: 0}, 1000);
	});

	$(".logo").click(function(event) {
		event.preventDefault();
  		$("html, body").animate({scrollTop: 0}, 1000);
	});


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
		$(".back_top").fadeIn('slow');
	} else {
		$('#header2').removeClass("top_fixed_head");
		$(".back_top").fadeOut('slow');
	}
}