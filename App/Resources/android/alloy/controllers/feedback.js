function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "feedback";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.Wrapper = Ti.UI.createView({
        layout: "vertical",
        id: "Wrapper",
        name: "Feedback"
    });
    $.__views.Wrapper && $.addTopLevelView($.__views.Wrapper);
    $.__views.NavigationBar = Alloy.createWidget("com.mcongrove.navigationBar", "widget", {
        id: "NavigationBar",
        __parentSymbol: $.__views.Wrapper
    });
    $.__views.NavigationBar.setParent($.__views.Wrapper);
    $.__views.webview = Ti.UI.createWebView({
        id: "webview",
        url: "https://docs.google.com/forms/d/17F76NCXieNeRbs440sC0OR_cysoGxQizzu4vbke7nFg/viewform"
    });
    $.__views.Wrapper.add($.__views.webview);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var APP = require("core");
    var CONFIG = arguments[0];
    $.init = function() {
        APP.log("debug", "feedback.init | " + JSON.stringify(CONFIG));
        $.NavigationBar.setBackgroundColor(APP.Color.primary);
        true === CONFIG.isChild && $.NavigationBar.showBack(function() {
            APP.removeChild();
        });
        $.NavigationBar.showMenu(function() {
            APP.toggleMenu();
        });
        $.webview.setLoading(true);
    };
    $.init();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;