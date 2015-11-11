$(document).ready(function(){
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
});