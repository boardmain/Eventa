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
	$.date.text = $.getDate(CONFIG.startDate);
	$.address.text = $.getAddress(CONFIG.id);
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
					startDate: DATA.events[CONFIG.id + 1].event.start_date,
					endDate: DATA.events[CONFIG.id + 1].event.end_date
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
					startDate: DATA.events[CONFIG.id - 1].event.start_date,
					endDate: DATA.events[CONFIG.id - 1].event.end_date
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
	
	if (OS_ANDROID){
		// Create the event
		var eventBegins = $.getDate(CONFIG.startDate);
		var eventEnds = $.getDate(CONFIG.endDate);
		var details = {
		    title: CONFIG.title,
		    description: CONFIG.description,
		    begin: eventBegins,
		    end: eventEnds
		};
		var calendars = Ti.Calendar.getSelectableCalendars();		
		var event = calendars[0].createEvent(details);
		alert("Event successfully added to calendar");
		
	} else if (OS_IOS){
		// Create the event
		var eventBegins = $.getDate(CONFIG.startDate);
		var eventEnds = $.getDate(CONFIG.endDate);
		var details = {
		    title: CONFIG.title,
		    notes: CONFIG.description,
		    begin: eventBegins,
		    end: eventEnds
		};
		var calendar = Ti.Calendar.getDefaultCalendar();
		if (Ti.Calendar.eventsAuthorization == Ti.Calendar.AUTHORIZATION_AUTHORIZED) {
		    calendar.createEvent(details);
		    alert("Event successfully added to calendar");
		} else {
		    Ti.Calendar.requestEventsAuthorization(function(e){
		        if (e.success) {
		            calendar.createEvent(details);
		            alert("Event successfully added to calendar");
		        } else {
		            alert('Access to calendar is not allowed');
		        }
		    });             
		}
	}
	
	
};

$.getDate = function (dateString) {
	var dateArray = dateString.split(" ");
	var dayArray = dateArray[0].split("-");
	var timeArray = dateArray[1].split(":");
	var date = new Date(parseInt(dayArray[0]), parseInt(dayArray[1])-1, parseInt(dayArray[2]), parseInt(timeArray[0]), parseInt(timeArray[1]), parseInt(timeArray[2]));
	return date;
};

$.getAddress = function (id) {
	var name = DATA.events[id].event.venue.name;
	var address = DATA.events[id].event.venue.address;
	var city = DATA.events[id].event.venue.city;
	return name + ", " + address + ", " + city;
};

// Kick off the init
$.init();