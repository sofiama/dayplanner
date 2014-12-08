$(document).ready(function() {
	
	/*============================================
	Page Preloader
	==============================================*/
	
	$(window).load(function(){
		$('#page-loader').fadeOut(500);
	});	
	
	/*============================================
	Parallax Backgrounds
	==============================================*/
	$('.parallax-bg').each(function(){
		var bg = $(this).data('parallax-background');
		$(this).css({'background-image':'url('+bg+')'});
		
	});
	
	if((!Modernizr.touch) && ( $(window).width() > 1024) ){
		$(window).stellar({
			horizontalScrolling: false,
			responsive:true
		});
	}
	/*============================================
	Header
	==============================================*/
	
	$('.header-slider').flexslider({
		animation: "fade",
		directionNav: false,
		controlNav: false,
		slideshowSpeed: 3000,
		animationSpeed: 400,
		pauseOnHover:false,
		pauseOnAction:false,
		smoothHeight: false,
		slideshow:false
	});
	
	$(window).load(function(){
		$('.header-slider').flexslider('play');
	});
	/*============================================
	ScrollTo Links
	==============================================*/
	$('a.scrollto').click(function(e){
		$('html,body').scrollTo(this.hash, this.hash, {animation:  {easing: 'easeInOutCubic', duration: 1000}});
		e.preventDefault();

		if ($('.navbar-collapse').hasClass('in')){
			$('.navbar-collapse').removeClass('in').addClass('collapse');
		}
	});
	
	$('#main-nav').waypoint('sticky');
	
	
	/*============================================
	Counters
	==============================================*/
	$('.counters').waypoint(function(){
		$('.counter').each(count);
	},{offset:'100%'});
	
	function count(options) {
		var $this = $(this);
		options = $.extend({}, options || {}, $this.data('countToOptions') || {});
		$this.countTo(options);
	}
	
	/*============================================
	Project thumbs - Masonry
	==============================================*/
	$(window).load(function(){

		$('#projects-container').css({visibility:'visible'});

		$('#projects-container').masonry({
			itemSelector: '.project-item:not(.filtered)',
			isFitWidth: false,
			isResizable: true,
			isAnimated: !Modernizr.csstransitions,
			gutterWidth: 0
		});

		scrollSpyRefresh();
		waypointsRefresh();
		stellarRefresh();
		
	});
	
	/*============================================
	Filter Projects
	==============================================*/
	$('#filter-works a').click(function(e){
		e.preventDefault();
		
		if($('#project-preview').hasClass('open')){
			closeProject();
		}
		
		$('#filter-works li').removeClass('active');
		$(this).parent('li').addClass('active');

		var category = $(this).attr('data-filter');

		$('.project-item').each(function(){
			if($(this).is(category)){
				$(this).removeClass('filtered');
			}
			else{
				$(this).addClass('filtered');
			}

			$('#projects-container').masonry('reload');
		});

		scrollSpyRefresh();
		waypointsRefresh();
		stellarRefresh();
	});
	
	/*============================================
	Project Preview
	==============================================*/
	$('.project-item').click(function(e){
		e.preventDefault();

		var elem = $(this);
		
		if($('#project-preview').hasClass('open')){
			$('#project-preview').animate({'opacity':0},300);
			
			setTimeout(function(){
				$('#project-slider').flexslider('destroy');
				buildProject(elem);
			},300);
		}else{
			buildProject(elem);
		}
		
		
	});

	function buildProject(elem){
	
		var	title = elem.find('.project-title').text(),
			descr = elem.find('.project-description').html(),
			slidesHtml = '<ul class="slides">',
			elemDataCont = elem.find('.project-description');

		var	slides = elem.find('.project-description').data('images').split(',');

		for (var i = 0; i < slides.length; ++i) {
			slidesHtml = slidesHtml + '<li><img src='+slides[i]+' alt=""></li>';
		}
		
		slidesHtml = slidesHtml + '</ul>';
		
		$('#project-title').text(title);
		$('#project-content').html(descr);
		$('#project-slider').html(slidesHtml);
		
		openProject();
	}
	
	function openProject(){
		
		$('#project-preview').addClass('open');
		
		setTimeout(function(){
			$('#project-preview').slideDown();
			
			$('html,body').scrollTo(0,'#filter-works',
				{
					gap:{y:-10},
					animation:{
						duration:400
					}
			});
			
			$('#project-slider').flexslider({
				prevText: '<i class="fa fa-angle-left"></i>',
				nextText: '<i class="fa fa-angle-right"></i>',
				animation: 'slide',
				slideshowSpeed: 3000,
				useCSS: true,
				controlNav: true, 
				pauseOnAction: false, 
				pauseOnHover: true,
				smoothHeight: false,
				start: function(){
					$(window).trigger('resize');
					$('#project-preview').animate({'opacity':1},300);
				}
			});
			
		},300);
		
	}
	
	function closeProject(){
	
		$('#project-preview').removeClass('open');
		$('#project-preview').animate({'opacity':0},300);
		
		setTimeout(function(){
			$('#project-preview').slideUp();
				
			$('#project-slider').flexslider('destroy');
			
			scrollSpyRefresh();
			waypointsRefresh();
			stellarRefresh();
			
		},300);
		
	}
	
	$('.close-preview').click(function(){
		closeProject();
	})
		
	/*============================================
	Testimonials Slider
	==============================================*/
	
		$('#testimonials-slider').flexslider({
			prevText: '<i class="fa fa-angle-left"></i>',
			nextText: '<i class="fa fa-angle-right"></i>',
			animation: 'fade',
			slideshowSpeed: 5000,
			animationSpeed: 400,
			useCSS: true,
			directionNav: false, 
			pauseOnAction: false, 
			pauseOnHover: true,
			smoothHeight: false
		});
		
	/*============================================
	Tooltips
	==============================================*/
	$("[data-toggle='tooltip']").tooltip();
	
	/*============================================
	Placeholder Detection
	==============================================*/
	if (!Modernizr.input.placeholder) {
		$('#contact-form').addClass('no-placeholder');
	}

	/*============================================
	Scrolling Animations
	==============================================*/
	$('.scrollimation').waypoint(function(){
		$(this).addClass('in');
	},{offset:'80%'});

	/*============================================
	Resize Functions
	==============================================*/
	$(window).resize(function(){
	
		$('#projects-container').masonry('reload');
		stellarRefresh();
		scrollSpyRefresh();
		waypointsRefresh();
		
	});
	
	/*============================================
	Refresh scrollSpy function
	==============================================*/
	function scrollSpyRefresh(){
		setTimeout(function(){
			$('body').scrollspy('refresh');
		},1000);
		
	}

	/*============================================
	Refresh waypoints function
	==============================================*/
	function waypointsRefresh(){
		setTimeout(function(){
			$.waypoints('refresh');
		},1000);
	}

	/*============================================
	Refresh Parallax Backgrounds
	==============================================*/
	function stellarRefresh(){
		setTimeout(function(){
			$(window).stellar('refresh');
		},1000);
	}
});	