/**
 * Main controller for the Collections section
 * 
 * @class Controllers.collections
 * @uses Models.collections
 * @uses core
 */

var APP = require("core");
var CONFIG = arguments[0];

/**
 * Initializes the controller
 */
$.init = function() {
	APP.log("debug", "collections.init | " + JSON.stringify(CONFIG));
	
	$.NavigationBar.setBackgroundColor(APP.Color.primary);

	if(CONFIG.isChild === true) {
		$.NavigationBar.showBack(function(_event) {
			APP.removeChild();
		});
	}
	
	$.NavigationBar.showMenu(function(_event) {
		APP.toggleMenu();
	});	
};

// Kick off the init
$.init();