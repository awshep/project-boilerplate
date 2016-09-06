

// Using gulp-include task to include other javascript files first
//= include app/app.js
//= include app/utilities.js
//= include app/header.js
//= include app/menu.js
//= include app/forms.js



/*
* Main.js
* - Initialize app objects
* - UI interactions
*/

// Document Ready
$(function() {

	// Run any Utility methods first
	APP.Utils.addHtmlClasses();
	APP.Utils.embedSvgSprite();

	// Initialize components
	APP.Header.initialize();
	APP.Menu.initialize();
	APP.Forms.initialize();


	 /*
	* Add Global Event listeners
	* -------------------------------------------------------------
	*/

	// Scroll
	window.addEventListener('scroll', function() {

	});

	// Window resize
	window.addEventListener('resize', function() {

	});

	// Clicks within the document
	$(document).on('click', function(event) {
		// Close the menu if we click the darkened nav background
		// Source: http://css-tricks.com/dangers-stopping-event-propagation/
		if ($(event.target).closest('.nav').length && !$(event.target).closest('.nav__inner').length) {
			APP.Menu.closeMenu();
		}
	});

});
