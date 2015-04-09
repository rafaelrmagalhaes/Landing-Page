$(document).ready(function($) {

    //VIDEO
    if(window.location.hash == "#video"){
        javascript:html5Lightbox.showLightbox(4, 'https://player.vimeo.com/video/122159832', 'Zé Encontra.com - O melhor preço, sempre!');
    }

    //MASCARA
    $("#telefone").mask("(99)9999-9999?9");
	
	//SCROLL
	$(document).on("scroll", onScroll);
    
	$('body a[href^="#"].inside').on('click', function (e) {
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
    
    function criaSpan(msg, este){
        var form = este.parents("form");
        if(form.find("span.formError").length <= 0)
        {
            form.append("<span class='formError'></span>");
        }
        $("span.formError").html(msg).addClass('wow fadeIn animated');
        /*setTimeout(function(){
            $("span.formError").removeAttr("style").addClass('wow fadeOutLeft animated');            
             setTimeout(function(){
                 $("span.formError").remove();
             }, 1000);
        }, 3000);*/
    }
    
    //***FORM DO E-MAIL****//
    $("#form-email button[type='submit']").on("click", function(){
        var button = $(this);
        var email = $('#form-email input[type="email"]').val();
        var dados = {
            form: 'form-email',
            email: email
        };
        dados = $(this).serialize() + "&" + $.param(dados);
        if(!validEmail(email) || email == ''){
            criaSpan("E-mail inválido.", button);
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
            data: dados,
            dataType: 'json',
            success : function(data){
                if(data['return'] === true)
                {
                    $('#form-more input#id_email').val(data['id']);
                    $('#form-friend input#id_email').val(data['id']);
                    button.children('img').addClass('hidden');
                    button.children('span').html("Ok!").removeClass('hidden');
                    $('#form-email').removeAttr('style');
                    setTimeout(function(){
                        $('#form-email').addClass('wow animated flipOutX');
                        $('#form-email').addClass('hidden');
                        $('#form-more').removeClass('hidden');
                        $('#form-more').addClass('wow flipInX animated');
                    }, 500); 
                } else {
                    button.removeAttr('disabled');
                    button.children('span').removeClass('hidden');
                    button.children('img').addClass('hidden');
                    criaSpan("Ops, ocorreu algum erro. Tente novamente!", button)
                    return false;
                }
            },             
            error: function(error) {
                criaSpan("Ocorreu algum erro.", button);
                return false;
            },
         });
        return false;
    });
    
    //***FORM DO MORE****//
    $("#form-more button[type='submit']").on("click", function(){
        var button = $(this);
        var id_email = $('#form-more input#id_email').val();
        var nome = $('#form-more input#nome').val();
        var telefone = $('#form-more input#telefone').val();
        var mensagem = $('#form-more textarea#mensagem').val();
        var dados = {
            form: 'form-more',
            id_email: id_email,
            nome: nome,
            telefone: telefone,
            mensagem: mensagem
        };
        dados = $(this).serialize() + "&" + $.param(dados);
        if(telefone == ''){
            criaSpan("O campo de telefone é obrigatório.", button);
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
            data: dados,
            dataType: 'json',
            success : function(data){
                if(data['return'] === true)
                {
                    button.children('img').addClass('hidden');
                    button.children('span').html("Ok!").delay(5000).removeClass('hidden');
                    $('#form-more').removeAttr('style');
                    setTimeout(function(){
                        $('#form-more').addClass('wow animated flipOutX');
                        $('#form-more').addClass('hidden');
                        $('div.sucesso').removeClass('hidden');
                        $('div.texto-contato').fadeOut();
                        $('div.sucesso h2').addClass('wow fadeInDown animated');
                        $('div.sucesso h3').addClass('wow fadeInDown animated');
                        $('#indique').addClass('ativo');
                    }, 1300); 
                } else {
                    button.removeAttr('disabled');
                    button.children('span').removeClass('hidden');
                    button.children('img').addClass('hidden');
                    criaSpan("Ops, ocorreu algum erro. Tente novamente!", button);
                    return false;
                }
            },             
            error: function(error) { 
                criaSpan("Ocorreu algum erro.", button);
                return false;
            },
         });
        return false;
    });
    
    //***FORM DO AMIGO****//
    $("#form-friend button[type='submit']").on("click", function(){
        var button = $(this);
        var id_email = $('#form-friend input#id_email').val();
        var email = $('#form-friend input#email').val();
        var dados = {
            form: 'form-friend',
            id_email: id_email,
            email: email
        };
        dados = $(this).serialize() + "&" + $.param(dados);
        if(!validEmail(email) || email == ''){
            criaSpan("E-mail inválido.", button);
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
            data: dados,
            dataType: 'json',
            success : function(data){
                if(data['return'] === true)
                {
                    button.children('img').addClass('hidden');
                    button.children('span').html("Ok!").delay(5000).removeClass('hidden');
                    $('#form-friend').removeAttr('style');
                    setTimeout(function(){
                        $('#form-friend').addClass('wow animated flipOutX');
                        $('#form-friend').addClass('hidden');
                        $('div.sucesso-amigo').removeClass('hidden');
                        $('div.sucesso-amigo h2').addClass('wow fadeIn animated');
                        $('div.sucesso-amigo h3').addClass('wow fadeIn animated');
                    }, 1300);
                } else {
                    button.removeAttr('disabled');
                    button.children('span').removeClass('hidden');
                    button.children('img').addClass('hidden');
                    criaSpan("Ops, ocorreu algum erro. Tente novamente!", button);
                    return false;
                }
            },             
            error: function(error) { 
                criaSpan("Ocorreu algum erro.", button);
                return false;
            },
         });
        return false;
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