/**
 * Main controller for the Planner section
 * 
 * @class Controllers.planner
 * @uses Models.planner
 * @uses core
 */

var APP = require("core");
var CONFIG = arguments[0];
var eventbriteAPIKey = "PAFBRDDGNHBZDJPBJS";
DATA = null; // Hold Eventbrite event data

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
	
	APP.openLoading();
	
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
			APP.Location.region = $.convert_state(address[address.length-3], "abbrev");
			APP.Location.country = e.places[0].country;
			APP.log("debug","reverse geolocation result = "+JSON.stringify(e));
			$.label.text = "Location: " + APP.Location.city + ", " + APP.Location.region + ", " + APP.Location.country;
			$.getEventbriteEvents(APP.Location);
		}
		else {
			Ti.UI.createAlertDialog({
				title:'Cannot determine location',
				message:e.error
			}).show();
			APP.log("debug","Geo Error: "+e.error);
		}
	});
	
};

$.getEventbriteEvents = function (location) {
	var url = $.makeURL();
	var client = Ti.Network.createHTTPClient({
	    onload: function(e) {
			// this function is called when data is returned from the server and available for use
	        // this.responseText holds the raw text return of the message (used for text/JSON)
	        // this.responseXML holds any returned XML (including SOAP)
	        // this.responseData holds any returned binary data
	        $.parseData(this.responseText);
	    },
	    onerror: function(e) {
			// this function is called when an error occurs, including a timeout
	        Ti.API.debug(e.error);
	        alert(e.error);
	    },
	    timeout:15000  /* in milliseconds */
	});
	client.open("GET", url);
	client.send();  // request is actually sent with this statement  
};

$.parseData = function (response) {
	DATA = JSON.parse(response);
	$.handleData();
};

$.handleData = function() {
	APP.log("debug", "events.handleData");

	var rows = [];

	for(var i = 1, x = DATA.events.length; i < x; i++) {

		var row = Alloy.createController("events_row", {
			id: i,
			heading: DATA.events[i].event.title,
			subHeading: $.getDate(DATA.events[i].event.start_date)
		}).getView();

		rows.push(row);
	}

	$.container.setData(rows);
	APP.closeLoading();
};

$.getDate = function (dateString) {
	var dateArray = dateString.split(" ");
	var dayArray = dateArray[0].split("-");
	var timeArray = dateArray[1].split(":");
	var date = new Date(parseInt(dayArray[0]), parseInt(dayArray[1])-1, parseInt(dayArray[2]), parseInt(timeArray[0]), parseInt(timeArray[1]), parseInt(timeArray[2]));
	return date;
};

// Event listeners
$.container.addEventListener("click", function(_event) {
	APP.log("debug", "events @click " + _event.row.id);

	APP.addChild("events_page", {
		id: _event.row.id,
		title: DATA.events[_event.row.id].event.title,
		description: DATA.events[_event.row.id].event.description,
		startDate: DATA.events[_event.row.id].event.start_date,
		endDate: DATA.events[_event.row.id].event.end_date
	});
});

$.makeURL = function () {
	var url = "https://www.eventbrite.com/json/event_search?app_key=" 
				+ eventbriteAPIKey 
				+ "&city=" + $.getCity() 
				+ "&region=" + APP.Location.region
				+ "&max=" + 100;
	return url;
};

$.getCity = function ()	{
	var cityArray = APP.Location.city.split(" ");
	var cityString = "";
	if (cityArray.length > 1){
		for (var i=0; i < cityArray.length; i++){
			cityString = cityString + "+" + cityArray[i];
		}
	} else {
		cityString = APP.Location.city;
	}
	return cityString;
};

$.convert_state = function (name, to) {
    var states = new Array(                     {name:'Alabama', abbrev:'AL'},          {name:'Alaska', abbrev:'AK'},
        {name:'Arizona', abbrev:'AZ'},          {name:'Arkansas', abbrev:'AR'},         {name:'California', abbrev:'CA'},
        {name:'Colorado', abbrev:'CO'},         {name:'Connecticut', abbrev:'CT'},      {name:'Delaware', abbrev:'DE'},
        {name:'Florida', abbrev:'FL'},          {name:'Georgia', abbrev:'GA'},          {name:'Hawaii', abbrev:'HI'},
        {name:'Idaho', abbrev:'ID'},            {name:'Illinois', abbrev:'IL'},         {name:'Indiana', abbrev:'IN'},
        {name:'Iowa', abbrev:'IA'},             {name:'Kansas', abbrev:'KS'},           {name:'Kentucky', abbrev:'KY'},
        {name:'Louisiana', abbrev:'LA'},        {name:'Maine', abbrev:'ME'},            {name:'Maryland', abbrev:'MD'},
        {name:'Massachusetts', abbrev:'MA'},    {name:'Michigan', abbrev:'MI'},         {name:'Minnesota', abbrev:'MN'},
        {name:'Mississippi', abbrev:'MS'},      {name:'Missouri', abbrev:'MO'},         {name:'Montana', abbrev:'MT'},
        {name:'Nebraska', abbrev:'NE'},         {name:'Nevada', abbrev:'NV'},           {name:'New Hampshire', abbrev:'NH'},
        {name:'New Jersey', abbrev:'NJ'},       {name:'New Mexico', abbrev:'NM'},       {name:'New York', abbrev:'NY'},
        {name:'North Carolina', abbrev:'NC'},   {name:'North Dakota', abbrev:'ND'},     {name:'Ohio', abbrev:'OH'},
        {name:'Oklahoma', abbrev:'OK'},         {name:'Oregon', abbrev:'OR'},           {name:'Pennsylvania', abbrev:'PA'},
        {name:'Rhode Island', abbrev:'RI'},     {name:'South Carolina', abbrev:'SC'},   {name:'South Dakota', abbrev:'SD'},
        {name:'Tennessee', abbrev:'TN'},        {name:'Texas', abbrev:'TX'},            {name:'Utah', abbrev:'UT'},
        {name:'Vermont', abbrev:'VT'},          {name:'Virginia', abbrev:'VA'},         {name:'Washington', abbrev:'WA'},
        {name:'West Virginia', abbrev:'WV'},    {name:'Wisconsin', abbrev:'WI'},        {name:'Wyoming', abbrev:'WY'}
        );
    var returnthis = "";
    for (var i=0; i < states.length; i++){
        if (to == 'name') {
            if (states[i].abbrev.toLowerCase() == name.toLowerCase()){
                returnthis = states[i].name;
                break;
            }
        } else if (to == 'abbrev') {      	
            if (states[i].name.toLowerCase() == name.toLowerCase()){
                returnthis = states[i].abbrev.toUpperCase();
                break;
            }
        }
    }
    return returnthis;
};

// Kick off the init
$.init();
