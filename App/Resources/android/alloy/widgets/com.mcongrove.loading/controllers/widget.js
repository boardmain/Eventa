function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.mcongrove.loading/" + s : s.substring(0, index) + "/com.mcongrove.loading/" + s.substring(index + 1);
    return true && 0 !== path.indexOf("/") ? "/" + path : path;
}

function Controller() {
    new (require("alloy/widget"))("com.mcongrove.loading");
    this.__widgetId = "com.mcongrove.loading";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "widget";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.Wrapper = Ti.UI.createView({
        width: Ti.UI.FILL,
        top: "0dp",
        id: "Wrapper"
    });
    $.__views.Wrapper && $.addTopLevelView($.__views.Wrapper);
    $.__views.Background = Ti.UI.createView({
        backgroundColor: "#000",
        opacity: .3,
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "Background"
    });
    $.__views.Wrapper.add($.__views.Background);
    $.__views.Modal = Ti.UI.createView({
        width: "92dp",
        height: "92dp",
        borderRadius: 10,
        backgroundColor: "#000",
        id: "Modal"
    });
    $.__views.Wrapper.add($.__views.Modal);
    $.__views.Loading = Ti.UI.createImageView({
        height: "33dp",
        width: "33dp",
        top: "17dp",
        left: "29dp",
        backgroundColor: "#000",
        images: [ WPATH("images/00.png"), WPATH("images/01.png"), WPATH("images/02.png"), WPATH("images/03.png"), WPATH("images/04.png"), WPATH("images/05.png"), WPATH("images/06.png"), WPATH("images/07.png"), WPATH("images/08.png"), WPATH("images/09.png"), WPATH("images/10.png"), WPATH("images/11.png") ],
        id: "Loading"
    });
    $.__views.Modal.add($.__views.Loading);
    $.__views.Label = Ti.UI.createLabel({
        top: "60dp",
        left: "0dp",
        width: "92dp",
        height: "20dp",
        color: "#FFF",
        textAlign: "center",
        font: {
            fontSize: 13,
            fontWeight: "bold"
        },
        id: "Label",
        text: "Loading"
    });
    $.__views.Modal.add($.__views.Label);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.Loading.start();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;