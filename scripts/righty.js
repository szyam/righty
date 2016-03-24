jQuery(document).ready(function($){

	//$('html').removeClass('no-js');// for styling purposes - use modernizr instead (optional)
	

	// * page scrolling http://css-tricks.com/snippets/jquery/smooth-scrolling/
	$(function() {
		$('a[href*=#]:not([href=#])').click(function() {
			if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
				if (target.length) {
					$('html,body').animate({
						scrollTop: target.offset().top
						}, 400);
					return false;
				}
			}
		});
	});
	// * Page scrolling

	// Forms
	(function(){
		var $input = $('.input-wrapper input');

		$input.on( 'focus input paste', function() {
			$(this).parent('.input-wrapper').addClass('active');
		}).on( 'blur', function() {
			$(this).closest( '.input-wrapper' ).removeClass('active');
			if ( $(this).val().length > 0 ) { 
				$(this).parent('.input-wrapper').addClass('active');
			}
		});

		$('form textarea').on('blur', function(){
			if( $(this).val().length > 0 ) {
				$(this).addClass('active');
			}
		});

		$('form select').on('change', function(){
			$(this).addClass('active');
		});

	})();
	// End Forms

	$(function() {
		// * Scroll Nav - https://jsfiddle.net/mariusc23/s6mLJ/31/
		var didScroll,
			lastScrollTop = 0,
			delta = 5,
			navbarHeight = $('.righty-nav').outerHeight();

		$(window).scroll(function(event){
		    didScroll = true;
		});

		setInterval(function() {
		    if (didScroll) {
		        hasScrolled();
		        didScroll = false;
		    }
		}, 250);

		function hasScrolled() {
		    var st = $(this).scrollTop();
		    // * Make sure they scroll more than delta
		    if(Math.abs(lastScrollTop - st) <= delta)
		        return;
		    
		    // * If they scrolled down and are past the navbar, add class .nav-up.
		    // * This is necessary so you never see what is "behind" the navbar.
		    if (st > lastScrollTop && st > navbarHeight){
		        // Scroll Down
		        $('.nav-down').removeClass('nav-down').addClass('nav-up');
		    } else {
		        // * Scroll Up
		        if(st + $(window).height() < $(document).height()) {
		            $('.nav-up').removeClass('nav-up').addClass('nav-down');
		        }
		    }
		    lastScrollTop = st;
		}
		// check for nav-down class and browser width -> add padding to body to compensate
		if( $('.righty-nav').hasClass('nav-down') && $(window).width() >= 768 ) {
			$('body').addClass('has-fixed-nav');
		}
		// achieving this with css min-height on .main-header at the moment
		// * End scroll nav
	});

	// * Menu Toggle
	$('#toggle').on('click', function() {
		$(this).toggleClass('open').siblings('.menu').toggleClass('mobile');
	});
	// * End Menu Toggle

	// * Modals
	$('a[data-modal]').each( function(){
		var modal = $(this).data('modal');

		$(this).on('click', function(e){
			e.preventDefault();
			$('body').toggleClass('modal-on');
			$(modal).toggleClass('show-time').end();

			if ( !$(modal).find('span.close').length ) {
				$(modal).append('<span class="close icon-cross"></span>');
			}

			$('.close').on('click', function(){
				$('body').removeClass('modal-on');
				$(this).parent().removeClass('show-time');
			})
		})
	});
	// End Modals

	// Righty Expose
	$('.righty-expose').on('click', function(e){

		var expose = $(this);
		expose.toggleClass('active'); // for styling

		$('html, body').animate({
		    scrollTop: expose.offset().top
		}, 300);
		e.preventDefault();
		
	});
	// end expose

	// Animate when in view
	$(window).scroll(function() {
		$('.in-view-slideUp').each(function(){
		var imagePos = $(this).offset().top;

		var topOfWindow = $(window).scrollTop();
			if (imagePos < topOfWindow+600) {
				$(this).addClass("fadeInUp");
			}
		});
	});
	// End Animating

	// * Cards
	(function(){
		var card = $('.righty-card'); 

		card.on("touchstart", function(e) {
			if (card.hasClass('hover')) {
		    	return true;
		 	} 
			else {
			   	card.addClass('hover');
			   	card.not(this).removeClass('hover');
			   	e.preventDefault();
		   	return false;
		  	}
		});

		$('.card-content').each( function(){
			var cardHeight 	= $(this).closest(card).outerHeight(),
				cardContent = $(this);

			if ( cardContent.outerHeight() >= cardHeight ) {
				cardContent.addClass('has-scroll');
			}
		});
	})();
	// End Cards

	// * Breakpoint Finder - Production only
	function viewportWidth() {
	    var width = $(window).width();
	    var widthEm = (1/16*width)
	    $('#browser-width').text(widthEm + 'em - ' + width + 'px').css('position', 'fixed');
	}

	$( "body.docs" )
		.append( '<span id="browser-width" style="\
			background-color:gainsboro;\
			padding:0.5em;\
			min-width:200px;\
			bottom:0;\
			right:0;\
			display:block;\
			text-align:center;\
			z-index:1000">\
		</span>' );
	viewportWidth();

	$(window).resize(viewportWidth);
	// * End Breakpoint Finder

}); // * End On Ready