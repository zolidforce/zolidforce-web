(function ($) {
	skel.breakpoints({
		xlarge: '(max-width: 1680px)',
		large: '(max-width: 1280px)',
		medium: '(max-width: 980px)',
		small: '(max-width: 736px)',
		xsmall: '(max-width: 480px)'
	});
	$(function () {
		var $window = $(window),
			$body = $('body'),
			$sidebar = $('#sidebar');

		// Hack: Enable IE flexbox workarounds.
		if (skel.vars.IEVersion < 12)
			$body.addClass('is-ie');

		// Disable animations/transitions until the page has loaded.
		if (skel.canUse('transition'))
			$body.addClass('is-loading');

		$window.on('load', function () {
			window.setTimeout(function () {
				$body.removeClass('is-loading');
			}, 100);
		});
		if ($sidebar.length > 0) {
			var $sidebar_a = $sidebar.find('a');
			$sidebar_a
				.addClass('scrolly')
				.on('click', function () {

					var $this = $(this);

					if ($this.attr('href').charAt(0) != '#')
						return;

					$sidebar_a.removeClass('active');

					$this
						.addClass('active')
						.addClass('active-locked');
				})
				.each(function () {

					var $this = $(this),
						id = $this.attr('href'),
						$section = $(id);

					// No section for this link? Bail.
					if ($section.length < 1)
						return;

					// Scrollex.
					$section.scrollex({
						mode: 'middle',
						top: '-20vh',
						bottom: '-20vh',
						initialize: function () {

							// Deactivate section.
							if (skel.canUse('transition'))
								$section.addClass('inactive');

						},
						enter: function () {

							// Activate section.
							$section.removeClass('inactive');

							// No locked links? Deactivate all links and activate this section's one.
							if ($sidebar_a.filter('.active-locked').length == 0) {

								$sidebar_a.removeClass('active');
								$this.addClass('active');

							}

							// Otherwise, if this section's link is the one that's locked, unlock it.
							else if ($this.hasClass('active-locked'))
								$this.removeClass('active-locked');

						}
					});

				});

		}

		// Scrolly.
		$('.scrolly').scrolly({
			speed: 1000,
			offset: function () {

				// If <=large, >small, and sidebar is present, use its height as the offset.
				if (skel.breakpoint('large').active &&
					!skel.breakpoint('small').active &&
					$sidebar.length > 0)
					return $sidebar.height();

				return 0;

			}
		});

		// Spotlights.
		$('.spotlights > section')
			.scrollex({
				mode: 'middle',
				top: '-10vh',
				bottom: '-10vh',
				initialize: function () {

					// Deactivate section.
					if (skel.canUse('transition'))
						$(this).addClass('inactive');

				},
				enter: function () {

					// Activate section.
					$(this).removeClass('inactive');

				}
			})
			.each(function () {

				var $this = $(this),
					$image = $this.find('.image'),
					$img = $image.find('img'),
					x;

				// Assign image.
				$image.css('background-image', 'url(' + $img.attr('src') + ')');

				// Set background position.
				if (x = $img.data('position'))
					$image.css('background-position', x);

				// Hide <img>.
				$img.hide();

			});

		// Features.
		if (skel.canUse('transition'))
			$('.features')
			.scrollex({
				mode: 'middle',
				top: '-20vh',
				bottom: '-20vh',
				initialize: function () {

					// Deactivate section.
					$(this).addClass('inactive');

				},
				enter: function () {

					// Activate section.
					$(this).removeClass('inactive');

				}
			});
	});
})(jQuery);

var trigger = true;
$(window).scroll(function () {
	if (trigger) {
		if ($(window).scrollTop() + $(window).height() > $(document).height() - 400) {
			var morphing = anime({
				targets: '#morphing .polymorph',
				points: [{
						value: '-0.5,-0.5 177.5,682.5 959.5,1079.5 -0.5,1079.5 '
					},
					{
						value: '-0.5,-0.5 1246,29 959.5,1079.5 -0.5,1079.5 '
					},
					{
						value: '-0.5,-0.5 1246,29 1819,596 -0.5,1079.5 '
					},
					{
						value: '-0.5,-0.5 1857,-1 1652,540 -0.5,1079.5 '
					},
				],
				easing: 'easeOutQuad',
				duration: 2000,
				loop: false
			});
			trigger = false;
		}
	}
});

$(window).scroll(function () {
	if ($(window).scrollTop() > $(window).height() - 50) {
		$('.clicker a').css('color', 'black');
	} else {
		$('.clicker a').css('color', 'white');
	}
});