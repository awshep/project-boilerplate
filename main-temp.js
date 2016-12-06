(function() {
	console.log('+++ Task 1: Load external Accumulate file JS: true');

	// Get button via native JS
	var el = (document.querySelector(".acc-btn")) ? true : false;
	console.log('+++ Task 2: Get button via native JS:', el);

	var jqueryCheck = (window.jQuery || window.$) ? true : false;
	console.log('+++ Task 3: jQuery available:', jqueryCheck);

	// Get button via jQuery
	var button = $('.acc-btn');
	console.log('+++ Task 4: Get button via jQuery: ', button);

})();
