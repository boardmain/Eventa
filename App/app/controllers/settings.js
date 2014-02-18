/**
 * Main controller for the Settings section
 * 
 * @class Controllers.settings
 * @uses Models.settings
 * @uses core
 */

var APP = require("core");
var CONFIG = arguments[0];

/**
 * Initializes the controller
 */
$.init = function() {
	APP.log("debug", "settings.init | " + JSON.stringify(CONFIG));
	
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
