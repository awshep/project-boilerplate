
/*
* Global APP object
* - available before DOM ready
*/
(function($, window) {

	window.$document = $(document);
	window.$window   = $(window);
	window.$html     = $('html');
	window.$body     = $(document.body);
	window.APP        = {};

	/**
	 * Device detection properties
	 */
	APP.Device = {
		isleIE8  : typeof window.browser_ltIE8 !== 'undefined',
		isIE8    : typeof window.browser_ltIE9 !== 'undefined',
		isIE9    : typeof window.browser_IE9 !== 'undefined',
		isIE10   : (navigator.appVersion.indexOf("MSIE 10") !== -1) ? true : false,
		isIE     : /Trident/.test(navigator.userAgent) || /MSIE/.test(navigator.userAgent),
		isWebKit : /WebKit/.test(navigator.userAgent),
		isFirefox: /firefox/i.test(navigator.userAgent),
		isiOS    : /(iPad|iPhone|iPod)/g.test(navigator.userAgent),
		isRetina : window.devicePixelRatio > 1
	};

}(jQuery, window));

