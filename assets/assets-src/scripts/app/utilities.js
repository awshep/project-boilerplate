
/*
* Utilities / helper methods
*/

(function($, APP) {

	APP.Utils = {
		svgFilePath        : '/assets/assets-built/svg/icons.svg',
		svgWrapperClass    : 'icons-svg',

		/*
		* Add helpful CSS classes to <html> element
		*/
		addHtmlClasses: function() {
			var classes = '';

			if (APP.Device.isFirefox) classes += 'firefox ';
			if (APP.Device.isIE) classes      += 'is-ie ';
			if (APP.Device.isIE10) classes    += 'is-ie10 ';
			if (APP.Device.isIE9) classes     += 'is-ie9 ';
			if (APP.Device.isIE8) classes     += 'is-ie8 ';
			if (APP.Device.isiOS) classes     += 'is-ios ';

			$html.addClass(classes);
		},

		/*
		* Embeds our SVG sprite file into the page while enabling caching
		*/
		embedSvgSprite: function() {
			var fullSvgFilePath = this.getDomain() + this.svgFilePath;

			var _this = this;
			$.get(fullSvgFilePath, function(data) {
			    var div = document.createElement("div");
			    div.className = _this.svgWrapperClass;
			    div.innerHTML = new XMLSerializer().serializeToString(data.documentElement);
			    document.body.insertBefore(div, document.body.childNodes[0]);
			})
			.fail(function() {
				console.error('++ Failed to retrieve SVG file.', fullSvgFilePath);
			});
		},

		/*
		* Get full domain URL of the site
		*/
		getDomain: function() {
			// Internet Explorer
			if (!window.location.origin) {
				window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
			}

			var domainUrl = window.location.origin + '/',
				subDomain = window.location.pathname.replace(/^\/([^\/]*).*$/, '$1');

			// Matches Staging server
			if (subDomain === 'staging') {
				domainUrl = domainUrl + 'staging/';
			}

			return domainUrl;
		},

		/*
		* Return viewport width
		*/
		getViewportWidth: function() {
			return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
		},

		/*
		* Return viewport height
		*/
		getViewportHeight: function() {
			return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
		},

		/*
		* Scroll to top of page
		*/
		scrollToTop: function (animate) {
			if (animate) {
				$('html, body').animate({scrollTop : 0}, 400);
			}
			else {
				window.scrollTo(0, 0);
			}
		},


		/*
		* Debounce
		* 
		* Creates and returns a new debounced version of the passed function 
		* which will postpone its execution until after _delay_ milliseconds have 
		* elapsed since the last time it was invoked. Useful for implementing 
		* behavior that should only happen after the input has stopped arriving. 
		* For example: rendering a preview of a Markdown comment, recalculating a 
		* layout after the window has stopped being resized, and so on.
		*/
		debounce: function(fn, delay, scope) {
			var timer = null,
				delay = delay || 300;

			return function() {
				var context = scope || this, 
					args    = arguments;

				clearTimeout(timer);
				timer = setTimeout(function() {
					fn.apply(context, args);
				}, delay);
			};
		},

		/*
		* Throttle
		*
		* Creates and returns a new, throttled version of the passed function,
		* that, when invoked repeatedly, will only actually call the original 
		* function at most once per every wait milliseconds. Useful for 
		* rate-limiting events that occur faster than you can keep up with.
		*/
		throttle: function(fn, t, scope) {
			var threshold = t || 250,
				last,
				deferTimer;

			return function () {
				var context = scope || this,
					now     = +new Date(),
					args    = arguments;

				if (last && now < last + threshold) {
					// hold on to it
					clearTimeout(deferTimer);

					deferTimer = setTimeout(function () {
						last = now;
						fn.apply(context, args);
					}, threshold);
				} else {
					last = now;
					fn.apply(context, args);
				}
			};
		}
	};

})(jQuery, window.APP || {});

