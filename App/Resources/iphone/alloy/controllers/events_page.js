function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "events_page";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.Wrapper = Ti.UI.createView({
        backgroundColor: "#FFF",
        layout: "vertical",
        id: "Wrapper",
        name: "Event Page"
    });
    $.__views.Wrapper && $.addTopLevelView($.__views.Wrapper);
    $.__views.NavigationBar = Alloy.createWidget("com.eventa.navigationBar", "widget", {
        id: "NavigationBar",
        __parentSymbol: $.__views.Wrapper
    });
    $.__views.NavigationBar.setParent($.__views.Wrapper);
    $.__views.container = Ti.UI.createScrollView({
        top: "0dp",
        layout: "vertical",
        showVerticalScrollIndicator: true,
        scrollType: "vertical",
        contentHeight: Ti.UI.SIZE,
        id: "container"
    });
    $.__views.Wrapper.add($.__views.container);
    $.__views.heading = Ti.UI.createLabel({
        top: "15dp",
        left: "15dp",
        right: "15dp",
        height: Ti.UI.SIZE,
        font: {
            fontSize: "18dp",
            fontFamily: "HelveticaNeue-Light"
        },
        id: "heading"
    });
    $.__views.container.add($.__views.heading);
    $.__views.date = Ti.UI.createLabel({
        top: "5dp",
        left: "15dp",
        right: "15dp",
        height: Ti.UI.SIZE,
        font: {
            fontSize: "12dp",
            fontFamily: "HelveticaNeue"
        },
        color: "#000",
        id: "date"
    });
    $.__views.container.add($.__views.date);
    $.__views.address = Ti.UI.createLabel({
        top: "5dp",
        left: "15dp",
        right: "15dp",
        height: Ti.UI.SIZE,
        font: {
            fontSize: "12dp"
        },
        id: "address"
    });
    $.__views.container.add($.__views.address);
    $.__views.webview = Ti.UI.createWebView({
        id: "webview"
    });
    $.__views.container.add($.__views.webview);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var APP = require("core");
    require("alloy/moment");
    require("alloy/string");
    var CONFIG = arguments[0] || {};
    $.init = function() {
        APP.log("debug", "events_page.init | " + JSON.stringify(CONFIG));
        $.handleData();
    };
    $.handleData = function() {
        APP.log("debug", "events_page.handleData");
        $.handleNavigation();
        $.heading.text = CONFIG.title;
        $.date.text = $.getDate(CONFIG.startDate);
        $.address.text = $.getAddress(CONFIG.id);
        $.webview.setHtml("<html><body>" + CONFIG.description + "</body></html>");
        $.NavigationBar.setBackgroundColor(APP.Color.primary);
        $.NavigationBar.showBack(function() {
            APP.removeAllChildren();
        });
        $.NavigationBar.showAction(function(_event) {
            $.showActions(_event);
        });
    };
    $.handleNavigation = function() {
        var navigation = Alloy.createWidget("com.eventa.detailNavigation", null, {
            color: "white",
            down: function() {
                var dataLength = DATA.events.length;
                if (CONFIG.id != dataLength - 1) {
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
            up: function() {
                if (1 != CONFIG.id) {
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
    $.showActions = function() {
        var dialog = Ti.UI.createOptionDialog({
            options: [ "Add to Calendar", "Open in Browser", "Cancel" ],
            cancel: 2,
            selectedIndex: 2
        });
        dialog.addEventListener("click", function(_event) {
            switch (_event.index) {
              case 0:
                $.addEventToCalendar();
                break;

              case 1:
                Ti.Platform.openURL(DATA.events[CONFIG.id].event.url);
            }
        });
        dialog.show();
    };
    $.addEventToCalendar = function() {
        var eventBegins;
        var eventEnds;
        var details;
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
        } else Ti.Calendar.requestEventsAuthorization(function(e) {
            if (e.success) {
                calendar.createEvent(details);
                alert("Event successfully added to calendar");
            } else alert("Access to calendar is not allowed");
        });
    };
    $.getDate = function(dateString) {
        var dateArray = dateString.split(" ");
        var dayArray = dateArray[0].split("-");
        var timeArray = dateArray[1].split(":");
        var date = new Date(parseInt(dayArray[0]), parseInt(dayArray[1]) - 1, parseInt(dayArray[2]), parseInt(timeArray[0]), parseInt(timeArray[1]), parseInt(timeArray[2]));
        return date;
    };
    $.getAddress = function(id) {
        var name = DATA.events[id].event.venue.name;
        var address = DATA.events[id].event.venue.address;
        var city = DATA.events[id].event.venue.city;
        return name + ", " + address + ", " + city;
    };
    $.init();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;