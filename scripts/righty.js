jQuery(document).ready(function($){
	
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


	// * Scroll Nav - https://jsfiddle.net/mariusc23/s6mLJ/31/
	var didScroll;
	var lastScrollTop = 0;
	var delta = 5;
	var navbarHeight = $('.righty-nav').outerHeight();

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
	        $('.righty-nav').removeClass('nav-down').addClass('nav-up');
	    } else {
	        // * Scroll Up
	        if(st + $(window).height() < $(document).height()) {
	            $('.righty-nav').removeClass('nav-up').addClass('nav-down');
	        }
	    }
	    lastScrollTop = st;
	}
	// * End scroll nav

	// * Menu Toggle

	$('#toggle').on('click', function(){
		$(this).toggleClass('open').siblings('.menu').toggleClass('mobile');
	});

	// * End Menu Toggle

	// * Modals
	$('a[data-modal]').each( function(){
		var modal = $(this).data('modal');
		$(this).on('click', function(e){
			e.preventDefault();
			$('body').toggleClass('modal-on');
			$(modal).toggleClass('show-time')//.append('<span class="close icon-cross"></span>');
			$('.close').on('click', function(){
				$('body').removeClass('modal-on');
				$(this).parent().removeClass('show-time');
			})
		})

	});
	// End Modals

	// * Breakpoint Finder
	function viewportWidth() {
	    var width = $(window).width();
	    var widthEm = (1/16*width)
	    $('#browser-width').text(widthEm + ' em').css('position', 'fixed');
	}

	$( "body" )
		.append( '<span id="browser-width" style="\
				background-color:gainsboro;\
				padding:0.5em;\
				min-width:125px;\
				bottom:0;\
				right:0;\
				display:block;\
				z-index:1000">\
			</span>' );
	viewportWidth();

	$(window).resize(viewportWidth);
	// * End Breakpoint Finder

}); // * End On Ready