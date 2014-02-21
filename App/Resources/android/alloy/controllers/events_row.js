function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "events_row";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.Wrapper = Ti.UI.createTableViewRow({
        height: Ti.UI.SIZE,
        selectedBackgroundColor: "#EEE",
        backgroundColor: "#FFF",
        id: "Wrapper"
    });
    $.__views.Wrapper && $.addTopLevelView($.__views.Wrapper);
    $.__views.container = Ti.UI.createView({
        height: Ti.UI.SIZE,
        layout: "vertical",
        top: "0dp",
        left: "0dp",
        id: "container"
    });
    $.__views.Wrapper.add($.__views.container);
    $.__views.subHeading = Ti.UI.createLabel({
        left: "15dp",
        right: "38dp",
        top: "15dp",
        height: Ti.UI.SIZE,
        font: {
            fontSize: "12dp",
            fontFamily: "HelveticaNeue"
        },
        color: "#000",
        id: "subHeading"
    });
    $.__views.container.add($.__views.subHeading);
    $.__views.heading = Ti.UI.createLabel({
        top: "5dp",
        bottom: "15dp",
        left: "15dp",
        right: "38dp",
        height: Ti.UI.SIZE,
        font: {
            fontSize: "18dp",
            fontFamily: "HelveticaNeue-Light"
        },
        color: "#000",
        id: "heading"
    });
    $.__views.container.add($.__views.heading);
    $.__views.arrow = Ti.UI.createImageView({
        width: "8dp",
        height: "13dp",
        right: "15dp",
        id: "arrow",
        image: "/images/arrow.png"
    });
    $.__views.Wrapper.add($.__views.arrow);
    exports.destroy = function() {};
    _.extend($, $.__views);
    require("core");
    var CONFIG = arguments[0] || {};
    $.Wrapper.id = CONFIG.id || 0;
    $.heading.text = CONFIG.heading || "";
    $.subHeading.text = CONFIG.subHeading || "";
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;