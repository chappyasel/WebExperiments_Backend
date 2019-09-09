import about from '../src/about.js'
import projects from '../src/projects.js'

const MOBILE_SIZE = 750

new Vue({
	el: '#app-menu',
	methods: {
		dropMenu: function() {
			if (isMobile()) {
				$("aside").toggleClass("full")
			}
		},
		menuClicked: function(segment) {
			let offset = 20 + (isMobile() ? 40 : 0)
			$("html, body").animate({
				scrollTop: $("article." + segment).offset().top - offset
			}, 750)
		}
	}
})


new Vue({
	el: '#app-index',
	data: {
		about: about,
		projects: projects
	},
	methods: {
		
	}
})


function isMobile() {
	return $(window).width() <= MOBILE_SIZE
}