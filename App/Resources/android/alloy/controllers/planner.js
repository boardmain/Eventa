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
                APP.Location.region = address[4];
                APP.Location.country = e.places[0].country;
                APP.log("debug", "reverse geolocation result = " + JSON.stringify(e));
                alert(JSON.stringify(e));
                var address = e.places[0].address.split(", ");
                $.label.text = "Location: " + APP.Location.city + ", " + APP.Location.region + ", " + APP.Location.country;
            } else {
                Ti.UI.createAlertDialog({
                    title: "Reverse geo error, cannot find address",
                    message: e.error
                }).show();
                APP.log("debug", "Geo Error: " + e.error);
            }
        });
        $.label.text = "Location: " + APP.Location.city + ", " + APP.Location.region + ", " + APP.Location.country;
        alert(APP.Location.city);
    };
    $.init();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;