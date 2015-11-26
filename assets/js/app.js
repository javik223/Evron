$(document).ready(function(){

	var Evron = Evron || {};

	Evron.SideMenu = (function(){
		var sideMenu = $(".secondary-menu"),
			self = this,
			body = $("body"),
			html = $("html"),
			dropdownElem = $(".side-menu").find('.dropdown')
			;

		if (sideMenu.length <= 0) {
			return;
		}

		var init = function() {
			// Event Listener for Hover
			dropdownElem
				.on('mouseenter', function(){
					showDropdown($(this));
				})
				.on('mouseleave', function(){
					hideDropdown($(this));
				});

			dropdownElem.children('a').on('click', function(e){
				e.preventDefault();
			});
		};

		var repositionDropdown = function(elem) {
			// Scroll position of body
			var bodyScrollTop = parseInt(body.scrollTop()),
				// Browser bounding rectangle
				htmlRect = parseInt(html.get(0).clientHeight),
				// Dropdown Element position from top 
				elemTopPos = parseInt(elem.parent().offset().top),
				// Dropdown Element Height
				elemHeight = elem.height(),
				// Distance between Dropdown Element and top of the browser
				elemTopDist = elemTopPos - bodyScrollTop

				//dropdownCutOff = false
				;

			// Reset Dropdown Element margin
			elem.css('margin-top', 0);

			// Check if dropdown is cutoff,
			// If yes, adjust top margin to show other part of the dropdown
			// else reset top margin
			console.log(elemTopDist + elemHeight > htmlRect);
			var dropdownCutOff = (elemTopDist + elemHeight > htmlRect) ? true : false;

			if (dropdownCutOff === false) {
				elem.css('margin-top', 0);
			} else {
				elem.css('margin-top', -0.5*elemTopDist);
			}
		};

		var showDropdown = function(elem) {
			var $this = elem;
			var childElem = $this.find('ul');
			TweenMax.set(childElem, {display: 'block', autoAlpha: 0, xPercent: '-10%'});
			
			TweenMax.to(childElem, 0.3, {autoAlpha: 1, xPercent: '0%'});
			
			repositionDropdown(childElem);
		};

		var hideDropdown = function(elem) {
			var $this = elem;
			var childElem = $this.find('ul');
			TweenMax.to(childElem, 0.3, {autoAlpha: 0, xPercent: '-10%', onComplete: function(){
				TweenMax.to(childElem, 0.1, {display: 'none'});
			}});
		};




		// Initialize menu
		init();
	}());

	Evron.nav = (function(){
		var navElem = $(".nav"),
			menuBtn = $(".menu-wrapper"),
			playHead = new TimelineMax({yoyo: true, paused: true});

		playHead
			.set(navElem, {display: 'block', autoAlpha: 0, yPercent: "-10%"})
			.to(navElem, 1, {autoAlpha: 1, yPercent: "0%", ease:Expo.easeInOut});

		var init = function() {
			menuBtn
				.on('mouseenter', function(){
					showNav();
				})
				.on('mouseleave', function(){
					hideNav();
				});
		};

		var showNav = function() {
			playHead.play();
		};

		var hideNav = function() {
			playHead.reverse();
		};

		init();
	}());

	// Show Overlay
	function Overlay(options){
		this.options = {
			elem: $(".account-login"),
		};

		this.options.elemOverlay = this.options.elem.find('.overlay');
		this.options.overlayBtn = this.options.elem.find('.overlayBtn');

		var self = this;
		self.overlayVisible = false;

		$.extend(this.options, options);


		console.log(this.options);

		var showOverlay = function() {
			var height = self.options.elemOverlay.data('height');
			self.overlayVisible = true;
			TweenMax.to(self.options.elemOverlay, 0.6, {height: height, force3D: true, onComplete: function(){
			}});
		};

		var hideOverlay = function() {
			self.overlayVisible = false;
			TweenMax.to(self.options.elemOverlay, 0.3, {height: 0, force3D: true, onComplete: function(){
			}});
		};

		var getOverlayHeight = function(){
			if (!self.options.elemOverlay.data('height')) {
				self.options.elemOverlay.css('display', 'block');
				self.options.elemOverlay.data('height', self.options.elemOverlay.height());
				self.options.elemOverlay.css('height', 0);
			}
			return self.options.elemOverlay.data('height');
		};

		var init = function(){
			getOverlayHeight();
/*
			self.options.overlayBtn.on('mouseenter', function(){
				if (self.overlayVisible === false) {
					showOverlay();
				}
			});
			self.options.elem.on('mouseleave', function(){
				if (self.overlayVisible === true) {
					hideOverlay();
				}
			});*/

			self.options.overlayBtn.on('click', function(){
				if (self.overlayVisible === false) {
					showOverlay();
				} else {
					hideOverlay();
				}
			});
		};

		init();
	}

	var accountOverlay = new Overlay();
	var minicart = $(".mini-cart");
	var minicartOverlay = new Overlay({
		elem: minicart,
		overlayBtn: minicart.find('.mini-cart_icon'),
		elemOverlay: minicart.find('.mini-cart_overlay')
	});

	Evron.repositionTopMenu = (function() {
		var header = $(".header"),
			menuWrapper = header.find('.menu-wrapper'),
			topMenu = header.find('.nav');

		var posTop = parseInt(menuWrapper.height()+parseInt(header.css('padding-bottom')));
		var menuWidth = ($(".secondary-menu").length > 0) ? $(".secondary-menu") : header.width()/4;
		if (WURFL.form_factor === 'Smartphone') {
			menuWidth = header.width();
		}
		
		topMenu.css({top: posTop, width: menuWidth});

	}());

	var featuredCategoriesCarousel = $(".featured-categories").find('.owl-carousel'),
		mainBanner = $(".main-banner");





	mainBanner.owlCarousel({
		items: 1
	});

	if (WURFL.is_mobile && WURFL.form_factor !== 'Desktop') {
		featuredCategoriesCarousel.owlCarousel({
			lazyLoad: true,
			center: true,
			loop: true,
			dots: true,
			animateOut: true,
			itemElement: 'a',
			animateIn: true,

			responsive: {
				margin: 0,
				center: false,

				0: {
					items: 2,
					margin: 0,
					center: false
				},
				600: {
					items: 3,
					center: false
				},

				1000: {
					items: 5,
					center: false
				}
			}
		});
	} else {
		featuredCategoriesCarousel.removeClass('owl-carousel');
	}

	$(".promotion-carousel").owlCarousel({
		lazyLoad: true,
		margin: 10,
		center: true,
		loop: true,
		autoplay: true,
		autoplayHoverPause: true,
		smartSpeed: 500,
		fluidSpeed: 500,
		responsiveRefreshRate: 10,
		animateIn: true,
		animateOut: true,

		responsive: {
			0: {
				stagePadding: 0,
				items: 2,
				margin: 0,
				center: false
			}, 
			600: {
				items: 2,
				center: false,
				stagePadding: 0
			},
			1000: {
				items: 3
			}
		}
	});

	// Hide and reveal search box on mobile devices
	var mobileSearchBtn = $(".mobile-search-icon"),
		searchBox = $(".search_wrapper");

	mobileSearchBtn.on('click', function(){
		searchBox.toggleClass('s-hide');
	});

	// Make header sticky
	$(".header").stickyNavbar({
		animDuration: 250, 
		animateCSS: true,  
		stickyModeClass: "sticky",
		mobile: true
	});

	// Newsletter submission
	var newsletterForm = $(".newsletterForm");
	newsletterForm.on('submit', function(e){
		var form = $(this);
		var formAction = form.attr('action'),
			data = form.serialize();

		$.ajax({
			url: formAction,
			data: data,
			dataType: 'json',
			method: 'POST',
			beforeSend: function(){
				form.find('input[name="submit"]').val("Adding...");
			}
		}).done(function(data){
			console.log(data);
		}).complete(function(){
			form.find('input[name="submit"]').val("Signup");
		});
		e.preventDefault();
	});
});