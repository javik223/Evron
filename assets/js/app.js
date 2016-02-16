/*// Utilities 
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) {
				func.apply(context, args);
			}
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) {
			func.apply(context, args);
		}
	};
}*/

jQuery(document).ready(function($){

	var Evron = Evron || {};

	Evron.SideMenu = (function(){
		var sideMenu = $(".side-menu"),
			self = this,
			body = $("body"),
			html = $("html"),
			dropdownElem = sideMenu.find('.dropdown')
			;

		if (sideMenu.length <= 0) {
			return;
		}

		var init = function() {
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
			//console.log(elemTopDist + elemHeight > htmlRect);
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
			playHead = new TimelineMax({yoyo: true, paused: true}),
			navVisible = false;

		playHead
			.set(navElem, {display: 'block', autoAlpha: 0, yPercent: "-10%"})
			.to(navElem, 1, {autoAlpha: 1, yPercent: "0%", ease:Expo.easeInOut});

		var init = function() {
			menuBtn
				.on('click', function(){
					if (navVisible === false ) {
						showNav();
					} else {
						hideNav();
					}
				})
				.on('mouseover', function(){
					showNav();
				});

			navElem.on('mouseleave', function(){
				hideNav();
			});

		};

		var showNav = function() {
			playHead.play();
			navVisible = true;

			setTimeout(function(){
				if (navVisible === true) {
					$("body").on('click', function(e){
						if (e.target != navElem && !(navElem.has(e.target).length)) {
							hideNav();
							$("body").off();
						}
					});
				}
			}, 200);
		};

		var hideNav = function() {
			playHead.reverse();
			navVisible = false;
		};

		init();
	}());

	// Show Overlay
	function Overlay(options, func){
		this.options = {
			elem: $(".account-login"),
			btnRaw: ".overlayBtn"
		};

		this.options.elemOverlay = this.options.elem.find('.overlay');
		this.options.overlayBtn = this.options.elem.find('.overlayBtn');

		var self = this;
		self.overlayVisible = false;

		$.extend(this.options, options);


		//console.log(this.options);

		var showOverlay = function() {
			if (typeof func == "function") {
				func();
			}
			var height = self.options.elemOverlay.data('height');
			self.overlayVisible = true;
			TweenMax.to(self.options.elemOverlay, 0.6, {height: height, force3D: true, onComplete: function(){
			}});

			setTimeout(function(){
				if (self.overlayVisible === true) {
					$("body").on('click', function(e){
						console.log("elemOverlay: ", self.options.elemOverlay);
						console.log("targetElement: ", e.target);
						if (e.target != self.options.elemOverlay && !(self.options.elemOverlay.has(e.target).length)) {
							hideOverlay();
							$("body").off();
						}
					});
				}
			}, 200);
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

			/*self.options.overlayBtn.on('mouseenter', function(){
				if (self.overlayVisible === false) {
					showOverlay();
				}
			});
			self.options.elem.on('mouseleave', function(){
				if (self.overlayVisible === true) {
					hideOverlay();
				}
			});
*/
			self.options.overlayBtn.on('click', function(){
				if (self.overlayVisible === false) {
					showOverlay();
				} else {
					hideOverlay();
				}
			});


			/*self.options.elem.on('mouseleave', function(){
				if (self.overlayVisible === true) {
					hideOverlay();
				}
			});
*/
			/*console.log('.'+self.options.overlayBtn.attr('class'));
			$("body").on('click', self.options.btnRaw, function(){
				if (self.overlayVisible === false) {
					showOverlay();
				} else {
					hideOverlay();
				}
			});*/
			
			/*self.options.overlayBtn.on('click', function(){
				if (self.overlayVisible === false) {
					showOverlay();
				} else {
					hideOverlay();
				}
			});*/
		};

		init();
	}

	var account = $(".account-login");
	var accountOverlay = new Overlay({
		elem: account,
		overlayBtn: account.find('.overlayBtn'),
		elemOverlay: account.find('.overlay')
	});

	var minicart = $(".mini-cart");
	var minicartOverlay = new Overlay({
		elem: minicart,
		overlayBtn: minicart.find('.mini-cart_icon'),
		elemOverlay: minicart.find('.mini-cart_overlay')
	}, function(){
		//console.log(minicart.find('.mini-cart_overlay').data('height'));
		minicart.find('.mini-cart_overlay').data('height', 1000);
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
		
		//topMenu.css({top: posTop, width: menuWidth});

	}());

	Evron.resizeMenu = (function(){
		var header = $(".header"),
			nav = header.find('.nav');
			winHeight = $(window).height();
			availableHeight = parseInt(winHeight - header.outerHeight());
			console.log(availableHeight);
			nav.css({'max-height': availableHeight+'px'});
			//console.log(winHeight);
			//console.log(header.outerHeight());
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
				0: {
					items: 2,
					margin: 0,
					center: true,
					loop: false
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
		center: true,
		//loop: true,
		autoplay: false,
		autoplayHoverPause: true,
		smartSpeed: 500,
		fluidSpeed: 500,
		responsiveRefreshRate: 10,
		animateIn: true,
		animateOut: true,
		dots: true,

		responsive: {
			0: {
				stagePadding: 0,
				items: 1,
				margin: 0,
				center: true
			}, 
			600: {
				items: 2,
				center: false,
				stagePadding: 0
			}
		}
	});

	// Hide and reveal search box on mobile devices
	var mobileSearchBtn = $(".mobile-search-icon"),
		searchBox = $(".search_wrapper");

	mobileSearchBtn.on('click', function(){
		if (!searchBox.hasClass('.s-hide')) {
			TweenMax.to(searchBox, 1, {className: "-=s-hide"});
			searchBox.focus();
			//searchBox.toggleClass('s-hide');
		} else {
			TweenMax.addClass('s-hide');
			//searchBox.toggleClass('s-hide');
		}
	});

	// Make header sticky
	$(".header").stickyNavbar({
		animDuration: 350, 
		animateCSS: true,
		stickyModeClass: "sticky",
		mobile: true,
		zindex: 500
	});

	// Newsletter submission
	var newsletterForm = $(".newsletterForm");
	newsletterForm.on('submit', function(e){
		var form = $(this);
		var formAction = form.attr('action'),
		formAction = formAction.replace('newsletter/subscriber/new', 'newsletter/subscriber/newAjax');

		data = form.serialize();

		$.ajax({
			url: formAction,
			data: data,
			dataType: 'json',
			method: 'POST',
			beforeSend: function(){
				form.find('input[name="submit"]').val("...");
			}
		}).done(function(data){
			var newsletterMessageBox = $(".newsletter-message-box");
			
			newsletterMessageBox.find('p').text(data.message);
			TweenMax.set(newsletterMessageBox, {display: 'block', autoAlpha: 0, yPercent: "30%"});
			TweenMax.to(newsletterMessageBox, 1, {autoAlpha: 1, yPercent: "0%", ease:Elastic.easeOut});

			setTimeout(function(){
				TweenMax.to(newsletterMessageBox, 1, {autoAlpha: 0, yPercent: "30%", ease:Elastic.easeIn});
			}, 5000);
		}).complete(function(){
			form.find('input[name="submit"]').val("Signup");
		});
		e.preventDefault();
	});

	// Hide Newsletter message box 
	$('.newsletter-message-box').find('.closeBtn').on('click', function(){
		var elem = $(this).parent();
		TweenMax.to(elem, 1, {autoAlpha: 0, yPercent: "30%", ease:Elastic.easeIn});
	});

	$.fn.product = function() {
		var addCartBtn = this.find('.icon-add-cart'),
			removeBtn = this.find('.icon-remove'),
			addBtn = this.find('.icon-add'),
			productForm = this.find('.product_form'),
			productQty = this.find('.product_qty'),
			productOptions = this.find('.product_options'),
			productAddCart = this.find('.product_add-cart'),
			elemForm = this.find('form')
			;

		var stateOne = function() {
			TweenMax.to(productForm, 0.1, {xPercent: "10%", autoAlpha: 0});
			TweenMax.to(productAddCart, 0.3, {yPercent: "0%", autoAlpha: 1});

			if (productOptions.length > 0) {
				TweenMax.to(productOptions, 0.6, {autoAlpha: 0});
			}
		};

		var stateTwo = function() {
			TweenMax.to(productAddCart, 0.1, {yPercent: "10%", autoAlpha: 0});
			TweenMax.fromTo(productForm, 0.3, {xPercent: "10%", autoAlpha: 0}, {xPercent: "0%", autoAlpha: 1});

			if (productOptions.length > 0) {
				TweenMax.to(productOptions, 0.6, {autoAlpha: 1});
			}
		};

		var increaseQty = function() {
			if (parseInt(productQty.val()) === 0 || productQty.val() === '')
			{
				productQty.val(1);
			}
			
			productQty.val(parseInt(productQty.val()) + 1);
		};

		var reduceQty = function() {
			if (parseInt(productQty.val()) === 1) {
				stateOne();
				setTimeout(function(){
					productQty.val(0);
				}, 300);
			} else {
				if (parseInt(productQty.val()) > 0){
					productQty.val(parseInt(productQty.val()) - 1);
				}
			}
		};

		removeBtn.on('click', function(){
			reduceQty();

			if (startProcessing) {
				clearInterval(startProcessing);
			}

			ajaxCallStack.qty -= 1;

			startProcessing = setInterval(processForm, 500);

			//var data = prepareForm({
			//	subtract: 1
			//});
			//submitForm(data);
			//updateCart();
		});

		addBtn.on('click', function(){
			if (startProcessing) {
				clearInterval(startProcessing);
			}

			increaseQty();

			ajaxCallStack.qty += 1;

			startProcessing = setInterval(processForm, 500);

			// Use default settings for data:
			// Qty: 1
			// Substract: 0

			//var data = prepareForm();
			//submitForm(data);
		});

		addCartBtn.on('click', function(){
			//var data = prepareForm();
			//submitForm(data);

			ajaxCallStack.qty += 1;

			// Set Default Quantity to 1 and animate to form and control buttons state
			productQty.val(1);
			startProcessing = processForm();
			stateTwo();
		});

		productQty.on('change', function(){
			if (parseInt($(this).val()) <= 0 || parseInt($(this).val()) <= 1 || $(this).val() === '') {
				stateOne();
			}

			var newValue = setNewValue(),
				oldValue = getOldValue();

			var qty = newValue - oldValue;

			if (qty > 0) {
				var data = prepareForm({
					qty: qty
				});
			} else {
				qty = Math.abs(qty);
				var data = prepareForm({
					qty: qty,
					subtract : 1
				});
			}

			submitForm(data);

		});

		productQty.on('focus keydown', function(){
			setOldValue();
		});

		function setNewValue() {
			elemForm.attr('data-newvalue', parseInt(productQty.val()));

			return getNewValue();
			//console.log('newValue', elemForm.attr('data-newvalue'));
		}

		function getNewValue() {
			return elemForm.attr('data-newvalue');
		}

		function setOldValue() {
			elemForm.attr('data-oldvalue', parseInt(productQty.val()));
			//console.log('oldValue', elemForm.attr('data-oldvalue'));
		}

		function getOldValue() {
			return elemForm.attr('data-oldvalue');
		}

		function addQuantity($val) {
			if ($val && parseInt($val) > 0) {
				return $val;
			}
			return 1;
		}

		function prepareForm(option) {

			var elementOptions = {
				subtract: 0,
				qty: 1
			};

			$.extend(elementOptions, option);

			//console.log(elementOptions);

		    var data = elemForm.serializeArray();
			for (var i =0; i < data.length; i++) {
				if (data[i].name === "qty") {
					//data[i].value = 1;
					//data[i].value = addQuantity(1);
					if (elementOptions.qty) {
						data[i].value = elementOptions.qty;
					} else {
						data[i].value = 0;
					}
				}
			}
			data.push({
				name: 'isAjax',
				value: 1
			});
			data.push({
				name: 'fromList',
				value: 1
			});
			if (parseInt(elemForm.attr('updateid')) > 0) {
				data.push({
					name: 'updateid',
					value: elemForm.attr('updateid')
				});
			}
			if (elementOptions.subtract === 1) {
				data.push({
					name: 'subtract',
					value: 1
				});
			}
		    //data += '&isAjax=1';   
		        //jQuery('#ajax_loader').show();

		    // Serialize Data
		    //console.log($.param(data));
		    return $.param(data);
		}

		var ajaxCallStack = {
			qty: 0
		};

		//var startProcessing = setInterval(processForm, 1500);

		function processForm() {
			var qty = ajaxCallStack.qty;
			console.log(qty);


			if (qty === 0)	{
				clearInterval(startProcessing);
				return;
			}

			if (qty > 0) {
				submitForm(prepareForm({qty: qty}));
			} else {
				submitForm(prepareForm({qty: Math.abs(qty), subtract: 1}));
			}

			ajaxCallStack.qty = 0;
		}


		// Form Actions

		function submitForm(data) {
			//console.log(data);

			var url = elemForm.attr('action'),
				lastValue = parseInt(elemForm.find('.product_qty').val());

            url = url.replace("checkout/cart","ajax/index");

			$.ajax({
                      url: url,
                      dataType: 'json',
                      type : 'get',
                      data: data,
                      success: function(data){
                            //jQuery('#ajax_loader').hide();
                           //elemForm.attr('data')
                           updateMiniCart(data);
                           elemForm.attr('data-added', true);
                           elemForm.attr('data-lastvalue', lastValue);
                           if (data.updateId) {
                           		elemForm.attr('updateid', data.updateId);
                           		//console.log(elemForm.attr('updateId'));
                           }

                           //console.log(elemForm.data('added'), elemForm.data('lastvalue'));
                      }
                });		

			console.log(ajaxCallStack);
			$.when.apply($, ajaxCallStack);
		}

		function updateCart() {
			var url = elemForm.attr('action'),
				updateUrl = elemForm.attr('data-update-url');

            url = updateUrl;

            var data = elemForm.serialize();
                data += '&isAjax=1';   
                //jQuery('#ajax_loader').show();

             try {
                $.ajax({
                      url: url,
                      dataType: 'json',
                      type : 'post',
                      data: data,
                      success: function(data){
                            //jQuery('#ajax_loader').hide();
                           //console.log(data);
                           //updateMiniCart(data);
                      }
                });
                } catch (e) {
             }
		}

		function updateMiniCart(data) {
			if($('.mini-cart')){
/*				var fragment = $('<div></div>');
				fragment.append(data);
				console.log(fragment);*/
				$('.mini-cart').find('.minicart-count').html($(data.sidebar).find('.minicart-count').html());
				$('.mini-cart').find('.mini-cart_overlay').html($(data.sidebar).find('.mini-cart_overlay').html());
               //$('.mini-cart').replaceWith(data.sidebar);
           }
		}

		elemForm.on('submit', function(){
			return false;
		});

		return this;
	};

	$(".product").each(function(){
		$(this).product();
	});
});