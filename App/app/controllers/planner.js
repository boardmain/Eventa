/**
 * Main controller for the Planner section
 * 
 * @class Controllers.planner
 * @uses Models.planner
 * @uses core
 */

var APP = require("core");
var CONFIG = arguments[0];

/**
 * Initializes the controller
 */
$.init = function() {
	APP.log("debug", "planner.init | " + JSON.stringify(CONFIG));
	
	$.NavigationBar.setBackgroundColor(APP.Color.primary);

	if(CONFIG.isChild === true) {
		$.NavigationBar.showBack(function(_event) {
			APP.removeChild();
		});
	}
	
	$.NavigationBar.showMenu(function(_event) {
		APP.toggleMenu();
	});	
	
	var coordinates = new Object;
	// Get current position
	Titanium.Geolocation.getCurrentPosition(function(e)
	{
		if (!e.success || e.error)
		{
			alert('error ' + JSON.stringify(e.error));
			return;
		}	
		coordinates.longitude = e.coords.longitude;
		coordinates.latitude = e.coords.latitude;
		APP.log("info",'geo - current location: ' + ' long ' + coordinates.longitude + ' lat ' + coordinates.latitude);
	});
	
	// reverse geo
	Titanium.Geolocation.reverseGeocoder(coordinates.latitude,coordinates.longitude,function(e)
	{
		if (e.success) {
			APP.Location.city = e.places[0].city;
			var address = e.places[0].address.split(", ");
			APP.Location.region = address[4];
			APP.Location.country = e.places[0].country;
			APP.log("debug","reverse geolocation result = "+JSON.stringify(e));
			$.label.text = "Location: " + APP.Location.city + ", " + APP.Location.region + ", " + APP.Location.country;
		}
		else {
			Ti.UI.createAlertDialog({
				title:'Reverse geo error',
				message:e.error
			}).show();
			APP.log("debug","Geo Error: "+e.error);
		}
	});
	
};

// Kick off the init
$.init();
