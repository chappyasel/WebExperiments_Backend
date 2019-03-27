
(function() {
	
	const MOBILE_SIZE = 750;
	
	"use strict";
	
	$(document).ready(function() {
		$("aside").click(menuPressed);
		$(".menu-btn").click(function() { menuButtonPressed(this) });
	});
	
	function menuPressed() {
		if(isMobile()) {
			$("aside").toggleClass("full");
		}
	}
	
	function menuButtonPressed(button) {
		let offset = 20 + (isMobile() ? 40 : 0);
		$("html, body").animate({
			scrollTop: $("article." + button.id).offset().top - offset
		}, 750);
	}
	
	function isMobile() {
		return $(window).width() <= MOBILE_SIZE;
	}
	
})();