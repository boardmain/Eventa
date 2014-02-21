/**
 * Controller for the Facebook post node screen
 * 
 * @class Controllers.events_page
 * @uses core
 * @uses Widgets.com.mcongrove.detailNavigation
 */
var APP = require("core");
var DATE = require("alloy/moment");
var STRING = require("alloy/string");
var CONFIG = arguments[0] || {};
var ACTION = {};

/**
 * Initializes the controller
 */
$.init = function() {
	APP.log("debug", "events_page.init | " + JSON.stringify(CONFIG));

	$.handleData();
};

/**
 * Handles the data return
 */
$.handleData = function() {
	APP.log("debug", "events_page.handleData");

	$.handleNavigation();

	$.heading.text = CONFIG.title;
	$.date.text = CONFIG.time;
	$.webview.setHtml('<html><body>' + CONFIG.description + '</body></html>');

	$.NavigationBar.setBackgroundColor(APP.Color.primary);

	$.NavigationBar.showBack(function(_event) {
		APP.removeAllChildren();
	});	
	
	$.NavigationBar.showAction(function(_event) {
		$.showActions(_event);
	});
};

/**
 * Handles detail navigation
 */
$.handleNavigation = function() {
	
	var navigation = Alloy.createWidget("com.mcongrove.detailNavigation", null, {
		color: "white",
		down: function(_event) {
			var dataLength = DATA.events.length;
			if (CONFIG.id != dataLength - 1){
				APP.log("debug", "events_page @next");
				APP.addChild("events_page", {
					id: CONFIG.id + 1,
					title: DATA.events[CONFIG.id + 1].event.title,
					description: DATA.events[CONFIG.id + 1].event.description,
					time: DATA.events[CONFIG.id + 1].event.start_date
				}, false, true);
			}			
		},
		up: function(_event) {
			if (CONFIG.id != 1){
				APP.log("debug", "events_page @previous");
				APP.addChild("events_page", {
					id: CONFIG.id - 1,
					title: DATA.events[CONFIG.id - 1].event.title,
					description: DATA.events[CONFIG.id - 1].event.description,
					time: DATA.events[CONFIG.id - 1].event.start_date
				}, false, true);
			}			
		}
	}).getView();

	$.NavigationBar.addNavigation(navigation);
};

$.showActions = function (_event) {
	var dialog = Ti.UI.createOptionDialog({
			options: ["Add to Calendar", "Open in Browser", "Cancel"],
			cancel: 2,
			selectedIndex: 2
		});

	dialog.addEventListener("click", function(_event) {
		switch(_event.index) {
			case 0:
				$.addEventToCalendar();
				break;
			case 1:
				Ti.Platform.openURL(DATA.events[CONFIG.id].event.url);
				break;
		}
	});

	dialog.show();	
};

$.addEventToCalendar = function () {
	var calendars = Ti.Calendar.getSelectableCalendars();
	var calendar = calendars[0];    
	var startDateArray = CONFIG.time.split(" ");
	var dayArray = startDateArray[0].split("-");
	var timeArray = startDateArray[1].split(":");
	
	// Create the event
	var eventBegins = new Date(parseInt(dayArray[0]), parseInt(dayArray[1]), parseInt(dayArray[2]), parseInt(timeArray[0]), parseInt(timeArray[1]), parseInt(timeArray[2]));
	var eventEnds = new Date(parseInt(dayArray[0]), parseInt(dayArray[1]), parseInt(dayArray[2]), parseInt(timeArray[0]+1), parseInt(timeArray[1]), parseInt(timeArray[2]));
	var details = {
	    title: CONFIG.title,
	    description: CONFIG.description,
	    begin: eventBegins,
	    end: eventEnds
	};
	
	calendar.createEvent(details);
	
	// if (Ti.Calendar.eventsAuthorization == Ti.Calendar.AUTHORIZATION_AUTHORIZED) {
	    // calendar.createEvent(details);
	// } else {
	    // Ti.Calendar.requestEventsAuthorization(function(e){
	        // if (e.success) {
	            // calendar.createEvent(details);
	        // } else {
	            // alert('Access to calendar is not allowed');
	        // }
	    // });             
	// }
};

// Kick off the init
$.init();