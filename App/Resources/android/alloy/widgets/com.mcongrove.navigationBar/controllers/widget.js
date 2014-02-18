function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.mcongrove.navigationBar/" + s : s.substring(0, index) + "/com.mcongrove.navigationBar/" + s.substring(index + 1);
    return true && 0 !== path.indexOf("/") ? "/" + path : path;
}

function Controller() {
    function hexToHsb(_hex) {
        var result;
        result = 6 > _hex.length ? /^#?([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})$/i.exec(_hex) : /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(_hex);
        var hsb = {
            h: 0,
            s: 0,
            b: 0
        };
        if (!result) return hsb;
        if (1 == result[1].length) {
            result[1] = result[1] + result[1];
            result[2] = result[2] + result[2];
            result[3] = result[3] + result[3];
        }
        var rgb = {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        };
        rgb.r /= 255;
        rgb.g /= 255;
        rgb.b /= 255;
        var del_r, del_g, del_b, minVal = Math.min(rgb.r, rgb.g, rgb.b), maxVal = Math.max(rgb.r, rgb.g, rgb.b), delta = maxVal - minVal;
        hsb.b = maxVal;
        if (0 !== delta) {
            hsb.s = delta / maxVal;
            del_r = ((maxVal - rgb.r) / 6 + delta / 2) / delta;
            del_g = ((maxVal - rgb.g) / 6 + delta / 2) / delta;
            del_b = ((maxVal - rgb.b) / 6 + delta / 2) / delta;
            rgb.r === maxVal ? hsb.h = del_b - del_g : rgb.g === maxVal ? hsb.h = 1 / 3 + del_r - del_b : rgb.b === maxVal && (hsb.h = 2 / 3 + del_g - del_r);
            0 > hsb.h && (hsb.h += 1);
            hsb.h > 1 && (hsb.h -= 1);
        }
        hsb.h = Math.round(360 * hsb.h);
        hsb.s = Math.round(100 * hsb.s);
        hsb.b = Math.round(100 * hsb.b);
        return hsb;
    }
    new (require("alloy/widget"))("com.mcongrove.navigationBar");
    this.__widgetId = "com.mcongrove.navigationBar";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "widget";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.Wrapper = Ti.UI.createView({
        top: "0dp",
        left: "0dp",
        width: Ti.UI.FILL,
        height: "47dp",
        backgroundColor: "#000",
        id: "Wrapper"
    });
    $.__views.Wrapper && $.addTopLevelView($.__views.Wrapper);
    $.__views.overlay = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        left: "0dp",
        top: "0dp",
        id: "overlay"
    });
    $.__views.Wrapper.add($.__views.overlay);
    $.__views.back = Ti.UI.createView({
        top: "0dp",
        left: "0dp",
        width: "48dp",
        height: "47dp",
        id: "back",
        visible: "false"
    });
    $.__views.overlay.add($.__views.back);
    $.__views.backImage = Ti.UI.createImageView({
        top: "9dp",
        left: "9dp",
        width: "28dp",
        height: "28dp",
        preventDefaultImage: true,
        id: "backImage"
    });
    $.__views.back.add($.__views.backImage);
    $.__views.next = Ti.UI.createView({
        top: "0dp",
        right: "0dp",
        width: "48dp",
        height: "47dp",
        id: "next",
        visible: "false"
    });
    $.__views.overlay.add($.__views.next);
    $.__views.nextImage = Ti.UI.createImageView({
        top: "9dp",
        right: "9dp",
        width: "28dp",
        height: "28dp",
        preventDefaultImage: true,
        id: "nextImage"
    });
    $.__views.next.add($.__views.nextImage);
    $.__views.left = Ti.UI.createView({
        top: "0dp",
        left: "0dp",
        width: "48dp",
        height: "47dp",
        id: "left",
        visible: "false"
    });
    $.__views.overlay.add($.__views.left);
    $.__views.leftImage = Ti.UI.createImageView({
        top: "9dp",
        left: "9dp",
        width: "28dp",
        height: "28dp",
        id: "leftImage"
    });
    $.__views.left.add($.__views.leftImage);
    $.__views.right = Ti.UI.createView({
        top: "0dp",
        right: "0dp",
        width: "48dp",
        height: "47dp",
        id: "right",
        visible: "false"
    });
    $.__views.overlay.add($.__views.right);
    $.__views.rightImage = Ti.UI.createImageView({
        top: "9dp",
        left: "10dp",
        width: "28dp",
        height: "28dp",
        id: "rightImage"
    });
    $.__views.right.add($.__views.rightImage);
    $.__views.border = Ti.UI.createView({
        bottom: "0dp",
        height: "1dp",
        width: Ti.UI.FILL,
        backgroundColor: "#000",
        opacity: .2,
        id: "border"
    });
    $.__views.Wrapper.add($.__views.border);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var CONFIG = arguments[0] || {};
    var navigation, theme;
    parseInt(Titanium.Platform.version.split(".")[0], 10);
    if (CONFIG.image) {
        var image = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, CONFIG.image);
        if (image.exists()) {
            image = image.nativePath;
            $.title = Ti.UI.createImageView({
                image: image,
                height: "26dp",
                width: Ti.UI.SIZE,
                top: "10dp",
                bottom: "10dp",
                preventDefaultImage: true
            });
        }
    } else $.title = Ti.UI.createLabel({
        top: "0dp",
        left: "58dp",
        right: "58dp",
        height: "46dp",
        font: {
            fontSize: "18dp",
            fontFamily: "HelveticaNeue-Medium"
        },
        color: "white" == theme ? "#FFF" : "#000",
        textAlign: "center",
        text: CONFIG.text ? CONFIG.text : ""
    });
    $.addNavigation = function(_view) {
        navigation = _view;
        $.Wrapper.add(navigation);
    };
    $.removeNavigation = function() {
        $.Wrapper.remove(navigation);
    };
    $.setBackgroundColor = function(_color) {
        $.Wrapper.backgroundColor = _color;
        theme = 65 > hexToHsb(_color).b ? "white" : "black";
    };
    $.setTitle = function(_text) {
        $.title.text = _text;
    };
    $.showLeft = function(_params) {
        if (_params && "undefined" != typeof _params.callback) {
            $.left.visible = true;
            $.leftImage.image = _params.image;
            $.left.addEventListener("click", _params.callback);
        }
    };
    $.showRight = function(_params) {
        if (_params && "undefined" != typeof _params.callback) {
            $.right.visible = true;
            $.rightImage.image = _params.image;
            $.right.addEventListener("click", _params.callback);
        }
    };
    $.showBack = function(_callback) {
        if (_callback && "undefined" != typeof _callback) {
            $.backImage.image = "white" == theme ? WPATH("/images/white/back.png") : WPATH("/images/black/back.png");
            $.back.visible = true;
            $.back.addEventListener("click", _callback);
        }
    };
    $.showNext = function(_callback) {
        if (_callback && "undefined" != typeof _callback) {
            $.nextImage.image = "white" == theme ? WPATH("/images/white/next.png") : WPATH("/images/black/next.png");
            $.next.visible = true;
            $.next.addEventListener("click", _callback);
        }
    };
    $.showMenu = function(_callback) {
        _callback && "undefined" != typeof _callback && $.showLeft({
            image: "white" == theme ? WPATH("/images/white/menu.png") : WPATH("/images/black/menu.png"),
            callback: _callback
        });
    };
    $.showSettings = function(_callback) {
        _callback && "undefined" != typeof _callback && $.showRight({
            image: "white" == theme ? WPATH("/images/white/settings.png") : WPATH("/images/black/settings.png"),
            callback: _callback
        });
    };
    $.showAction = function(_callback) {
        _callback && "undefined" != typeof _callback && $.showRight({
            image: "white" == theme ? WPATH("/images/white/action.png") : WPATH("/images/black/action.png"),
            callback: _callback
        });
    };
    $.title && $.Wrapper.add($.title);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;