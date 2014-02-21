function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.mcongrove.detailNavigation/" + s : s.substring(0, index) + "/com.mcongrove.detailNavigation/" + s.substring(index + 1);
    return true && 0 !== path.indexOf("/") ? "/" + path : path;
}

function Controller() {
    new (require("alloy/widget"))("com.mcongrove.detailNavigation");
    this.__widgetId = "com.mcongrove.detailNavigation";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "widget";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.Wrapper = Ti.UI.createView({
        width: "66dp",
        height: "12dp",
        top: "17dp",
        id: "Wrapper"
    });
    $.__views.Wrapper && $.addTopLevelView($.__views.Wrapper);
    $.__views.arrowUpWrapper = Ti.UI.createView({
        width: "22dp",
        height: "12dp",
        top: "0dp",
        left: "0dp",
        id: "arrowUpWrapper"
    });
    $.__views.Wrapper.add($.__views.arrowUpWrapper);
    $.__views.arrowUp = Ti.UI.createImageView({
        width: "22dp",
        height: "12dp",
        top: "0dp",
        left: "0dp",
        preventDefaultImage: true,
        id: "arrowUp"
    });
    $.__views.arrowUpWrapper.add($.__views.arrowUp);
    $.__views.arrowDownWrapper = Ti.UI.createView({
        width: "22dp",
        height: "12dp",
        top: "0dp",
        right: "0dp",
        id: "arrowDownWrapper"
    });
    $.__views.Wrapper.add($.__views.arrowDownWrapper);
    $.__views.arrowDown = Ti.UI.createImageView({
        width: "22dp",
        height: "12dp",
        top: "0dp",
        right: "0dp",
        preventDefaultImage: true,
        id: "arrowDown"
    });
    $.__views.arrowDownWrapper.add($.__views.arrowDown);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var CONFIG = arguments[0] || {};
    $.arrowUp.image = "white" == CONFIG.color.toLowerCase() ? WPATH("/images/white/arrowUp.png") : WPATH("/images/black/arrowUp.png");
    $.arrowDown.image = "white" == CONFIG.color.toLowerCase() ? WPATH("/images/white/arrowDown.png") : WPATH("/images/black/arrowDown.png");
    CONFIG.up && "function" == typeof CONFIG.up ? $.arrowUpWrapper.addEventListener("click", CONFIG.up) : $.arrowUp.opacity = .4;
    CONFIG.down && "function" == typeof CONFIG.down ? $.arrowDownWrapper.addEventListener("click", CONFIG.down) : $.arrowDown.opacity = .4;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;