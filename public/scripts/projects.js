
(function() {
	
	const PROJ_PATH = "src/projects.json"
	const OT_PATH = "img/projects/";
	
	"use strict";
	
	$(document).ready(function() {
  	let url = PROJ_PATH;
		fetch(url)
			.then(checkStatus)
			.then(JSON.parse)
			.then(processProjects)
			.catch(console.log);
	});
	
	function processProjects(response) {
		//alert(response);
	}
	
	function checkStatus(response) {
		if (response.status >= 200 && response.status < 300) {
			return response.text();
		} else {
			return Promise.reject(new Error(response.status + ": " + response.statusText));
		}
	}
	
})();