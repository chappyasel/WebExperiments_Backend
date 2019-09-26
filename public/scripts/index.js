import about from '../src/about.js'
import projects from '../src/projects.js'
import resume from '../src/resume.js'
import contact from '../src/contact.js'

const MOBILE_SIZE = 750


new Vue({
	el: '#app-menu',
	data: {
		showMenu: false
	},
	methods: {
		menuClicked: function(segment) {
			let offset = 20 + (isMobile() ? 40 : 0)
			$('html, body').animate({
				scrollTop: $('article.' + segment).offset().top - offset
			}, 750)
		}
	}
})


new Vue({
	el: '#app-index',
	data: {
		about: about,
		projects: projects,
		resume: resume,
		contact: contact
	},
	methods: {
		openLink: function(link) {
			window.open(link, '_blank'); 
		}
	}
})


function isMobile() {
	return $(window).width() <= MOBILE_SIZE
}