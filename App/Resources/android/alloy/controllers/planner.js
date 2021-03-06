function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "planner";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.Wrapper = Ti.UI.createView({
        layout: "vertical",
        id: "Wrapper",
        name: "Planner"
    });
    $.__views.Wrapper && $.addTopLevelView($.__views.Wrapper);
    $.__views.NavigationBar = Alloy.createWidget("com.mcongrove.navigationBar", "widget", {
        id: "NavigationBar",
        image: "data/logo.png",
        __parentSymbol: $.__views.Wrapper
    });
    $.__views.NavigationBar.setParent($.__views.Wrapper);
    $.__views.label = Ti.UI.createLabel({
        top: "10dp",
        left: "15dp",
        right: "15dp",
        bottom: "15dp",
        height: Ti.UI.SIZE,
        font: {
            fontSize: "14dp",
            fontFamily: "HelveticaNeue"
        },
        color: "#000",
        text: "Planner Todo",
        id: "label"
    });
    $.__views.Wrapper.add($.__views.label);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var APP = require("core");
    var CONFIG = arguments[0];
    var eventbriteAPIKey = "PAFBRDDGNHBZDJPBJS";
    $.init = function() {
        APP.log("debug", "planner.init | " + JSON.stringify(CONFIG));
        $.NavigationBar.setBackgroundColor(APP.Color.primary);
        true === CONFIG.isChild && $.NavigationBar.showBack(function() {
            APP.removeChild();
        });
        $.NavigationBar.showMenu(function() {
            APP.toggleMenu();
        });
        var coordinates = new Object();
        Titanium.Geolocation.getCurrentPosition(function(e) {
            if (!e.success || e.error) {
                alert("error " + JSON.stringify(e.error));
                return;
            }
            coordinates.longitude = e.coords.longitude;
            coordinates.latitude = e.coords.latitude;
            APP.log("info", "geo - current location:  long " + coordinates.longitude + " lat " + coordinates.latitude);
        });
        Titanium.Geolocation.reverseGeocoder(coordinates.latitude, coordinates.longitude, function(e) {
            if (e.success) {
                APP.Location.city = e.places[0].city;
                var address = e.places[0].address.split(", ");
                APP.Location.region = $.convert_state(address[address.length - 3], "abbrev");
                APP.Location.country = e.places[0].country;
                APP.log("debug", "reverse geolocation result = " + JSON.stringify(e));
                $.label.text = "Location: " + APP.Location.city + ", " + APP.Location.region + ", " + APP.Location.country;
                $.getEventbriteEvents(APP.Location);
            } else {
                Ti.UI.createAlertDialog({
                    title: "Reverse geo error",
                    message: e.error
                }).show();
                APP.log("debug", "Geo Error: " + e.error);
            }
        });
    };
    $.getEventbriteEvents = function() {
        var url = $.makeURL();
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                alert(this.responseText);
                $.parseData(this.responseText);
            },
            onerror: function(e) {
                Ti.API.debug(e.error);
                alert("error");
            },
            timeout: 5e3
        });
        client.open("GET", url);
        client.send();
    };
    $.parseData = function(response) {
        data = JSON.parse(response);
        alert(data.events[1].event.timezone);
    };
    $.makeURL = function() {
        var url = "https://www.eventbrite.com/json/event_search?app_key=" + eventbriteAPIKey + "&city=" + $.getCity() + "&region=" + APP.Location.region;
        return url;
    };
    $.getCity = function() {
        var cityArray = APP.Location.city.split(" ");
        var cityString = "";
        if (cityArray.length > 1) for (var i = 0; cityArray.length > i; i++) cityString = cityString + "+" + cityArray[i]; else cityString = APP.Location.city;
        return cityString;
    };
    $.convert_state = function(name, to) {
        var states = new Array({
            name: "Alabama",
            abbrev: "AL"
        }, {
            name: "Alaska",
            abbrev: "AK"
        }, {
            name: "Arizona",
            abbrev: "AZ"
        }, {
            name: "Arkansas",
            abbrev: "AR"
        }, {
            name: "California",
            abbrev: "CA"
        }, {
            name: "Colorado",
            abbrev: "CO"
        }, {
            name: "Connecticut",
            abbrev: "CT"
        }, {
            name: "Delaware",
            abbrev: "DE"
        }, {
            name: "Florida",
            abbrev: "FL"
        }, {
            name: "Georgia",
            abbrev: "GA"
        }, {
            name: "Hawaii",
            abbrev: "HI"
        }, {
            name: "Idaho",
            abbrev: "ID"
        }, {
            name: "Illinois",
            abbrev: "IL"
        }, {
            name: "Indiana",
            abbrev: "IN"
        }, {
            name: "Iowa",
            abbrev: "IA"
        }, {
            name: "Kansas",
            abbrev: "KS"
        }, {
            name: "Kentucky",
            abbrev: "KY"
        }, {
            name: "Louisiana",
            abbrev: "LA"
        }, {
            name: "Maine",
            abbrev: "ME"
        }, {
            name: "Maryland",
            abbrev: "MD"
        }, {
            name: "Massachusetts",
            abbrev: "MA"
        }, {
            name: "Michigan",
            abbrev: "MI"
        }, {
            name: "Minnesota",
            abbrev: "MN"
        }, {
            name: "Mississippi",
            abbrev: "MS"
        }, {
            name: "Missouri",
            abbrev: "MO"
        }, {
            name: "Montana",
            abbrev: "MT"
        }, {
            name: "Nebraska",
            abbrev: "NE"
        }, {
            name: "Nevada",
            abbrev: "NV"
        }, {
            name: "New Hampshire",
            abbrev: "NH"
        }, {
            name: "New Jersey",
            abbrev: "NJ"
        }, {
            name: "New Mexico",
            abbrev: "NM"
        }, {
            name: "New York",
            abbrev: "NY"
        }, {
            name: "North Carolina",
            abbrev: "NC"
        }, {
            name: "North Dakota",
            abbrev: "ND"
        }, {
            name: "Ohio",
            abbrev: "OH"
        }, {
            name: "Oklahoma",
            abbrev: "OK"
        }, {
            name: "Oregon",
            abbrev: "OR"
        }, {
            name: "Pennsylvania",
            abbrev: "PA"
        }, {
            name: "Rhode Island",
            abbrev: "RI"
        }, {
            name: "South Carolina",
            abbrev: "SC"
        }, {
            name: "South Dakota",
            abbrev: "SD"
        }, {
            name: "Tennessee",
            abbrev: "TN"
        }, {
            name: "Texas",
            abbrev: "TX"
        }, {
            name: "Utah",
            abbrev: "UT"
        }, {
            name: "Vermont",
            abbrev: "VT"
        }, {
            name: "Virginia",
            abbrev: "VA"
        }, {
            name: "Washington",
            abbrev: "WA"
        }, {
            name: "West Virginia",
            abbrev: "WV"
        }, {
            name: "Wisconsin",
            abbrev: "WI"
        }, {
            name: "Wyoming",
            abbrev: "WY"
        });
        var returnthis = "";
        for (var i = 0; states.length > i; i++) if ("name" == to) {
            if (states[i].abbrev.toLowerCase() == name.toLowerCase()) {
                returnthis = states[i].name;
                break;
            }
        } else if ("abbrev" == to && states[i].name.toLowerCase() == name.toLowerCase()) {
            returnthis = states[i].abbrev.toUpperCase();
            break;
        }
        return returnthis;
    };
    $.init();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;