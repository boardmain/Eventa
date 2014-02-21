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
    $.__views.NavigationBar = Alloy.createWidget("com.mcongrove.navigationBar", "widget", {
        id: "NavigationBar",
        __parentSymbol: $.__views.Wrapper
    });
    $.__views.NavigationBar.setParent($.__views.Wrapper);
    $.__views.container = Ti.UI.createScrollView({
        top: "0dp",
        layout: "vertical",
        showVerticalScrollIndicator: true,
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
            fontSize: "11dp",
            fontFamily: "HelveticaNeue"
        },
        color: "#000",
        id: "date"
    });
    $.__views.container.add($.__views.date);
    $.__views.text = Ti.UI.createTextArea({
        top: "10dp",
        left: "6dp",
        right: "6dp",
        bottom: "15dp",
        height: Ti.UI.SIZE,
        font: {
            fontSize: "14dp",
            fontFamily: "HelveticaNeue"
        },
        color: "#000",
        backgroundColor: "transparent",
        editable: false,
        autoLink: Ti.UI.AUTOLINK_URLS,
        id: "text"
    });
    $.__views.container.add($.__views.text);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var APP = require("core");
    require("alloy/moment");
    require("alloy/string");
    var CONFIG = arguments[0] || {};
    var ACTION = {};
    $.init = function() {
        APP.log("debug", "events_page.init | " + JSON.stringify(CONFIG));
        $.handleData();
    };
    $.handleData = function() {
        APP.log("debug", "events_page.handleData");
        $.heading.text = CONFIG.title;
        $.text.value = CONFIG.description;
        $.date.text = CONFIG.time;
        $.NavigationBar.setBackgroundColor(APP.Color.primary);
        $.NavigationBar.showBack(function() {
            APP.removeAllChildren();
        });
    };
    $.handleNavigation = function() {
        ACTION.next = MODEL.getNextArticle(CONFIG.id);
        ACTION.previous = MODEL.getPreviousArticle(CONFIG.id);
        var navigation = Alloy.createWidget("com.mcongrove.detailNavigation", null, {
            color: "white",
            down: function() {
                APP.log("debug", "events_page @next");
                APP.addChild("events_page", {
                    id: ACTION.next.id,
                    index: CONFIG.index
                }, false, true);
            },
            up: function() {
                APP.log("debug", "events_page @previous");
                APP.addChild("events_page", {
                    id: ACTION.previous.id,
                    index: CONFIG.index
                }, false, true);
            }
        }).getView();
        $.NavigationBar.addNavigation(navigation);
    };
    $.init();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;