function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.MainWindow = Ti.UI.createWindow(function() {
        var o = {};
        _.extend(o, {
            backgroundColor: "#EEE"
        });
        Alloy.isHandheld && _.extend(o, {
            orientationModes: [ Ti.UI.PORTRAIT ]
        });
        _.extend(o, {
            id: "MainWindow"
        });
        return o;
    }());
    $.__views.MainWindow && $.addTopLevelView($.__views.MainWindow);
    $.__views.SlideMenu = Alloy.createWidget("com.mcongrove.slideMenu", "widget", {
        id: "SlideMenu",
        __parentSymbol: $.__views.MainWindow
    });
    $.__views.SlideMenu.setParent($.__views.MainWindow);
    $.__views.GlobalWrapper = Ti.UI.createView({
        width: "100%",
        id: "GlobalWrapper"
    });
    $.__views.MainWindow.add($.__views.GlobalWrapper);
    $.__views.ContentWrapper = Ti.UI.createView({
        top: "0dp",
        bottom: "0dp",
        id: "ContentWrapper"
    });
    $.__views.GlobalWrapper.add($.__views.ContentWrapper);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var APP = require("core");
    var nodes = [ {
        id: 0,
        title: "Events"
    }, {
        id: 1,
        title: "Feedback"
    } ];
    APP.MainWindow = $.MainWindow;
    APP.GlobalWrapper = $.GlobalWrapper;
    APP.ContentWrapper = $.ContentWrapper;
    APP.Nodes = nodes;
    APP.SlideMenu = $.SlideMenu;
    APP.init();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;