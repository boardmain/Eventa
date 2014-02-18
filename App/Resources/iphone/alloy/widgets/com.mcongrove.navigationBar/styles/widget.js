function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.mcongrove.navigationBar/" + s : s.substring(0, index) + "/com.mcongrove.navigationBar/" + s.substring(index + 1);
    return path;
}

module.exports = [ {
    isId: true,
    priority: 100000.0002,
    key: "Wrapper",
    style: {
        top: "0dp",
        left: "0dp",
        width: Ti.UI.FILL,
        height: "47dp",
        backgroundColor: "#000"
    }
}, {
    isId: true,
    priority: 100000.0003,
    key: "border",
    style: {
        bottom: "0dp",
        height: "1dp",
        width: Ti.UI.FILL,
        backgroundColor: "#000",
        opacity: .2
    }
}, {
    isId: true,
    priority: 100000.0004,
    key: "overlay",
    style: {
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        left: "0dp",
        top: "0dp"
    }
}, {
    isId: true,
    priority: 100000.0005,
    key: "left",
    style: {
        top: "0dp",
        left: "0dp",
        width: "48dp",
        height: "47dp"
    }
}, {
    isId: true,
    priority: 100000.0006,
    key: "leftImage",
    style: {
        top: "9dp",
        left: "9dp",
        width: "28dp",
        height: "28dp"
    }
}, {
    isId: true,
    priority: 100000.0007,
    key: "back",
    style: {
        top: "0dp",
        left: "0dp",
        width: "48dp",
        height: "47dp"
    }
}, {
    isId: true,
    priority: 100000.0008,
    key: "backImage",
    style: {
        top: "9dp",
        left: "9dp",
        width: "28dp",
        height: "28dp",
        preventDefaultImage: true
    }
}, {
    isId: true,
    priority: 100000.0009,
    key: "next",
    style: {
        top: "0dp",
        right: "0dp",
        width: "48dp",
        height: "47dp"
    }
}, {
    isId: true,
    priority: 100000.001,
    key: "nextImage",
    style: {
        top: "9dp",
        right: "9dp",
        width: "28dp",
        height: "28dp",
        preventDefaultImage: true
    }
}, {
    isId: true,
    priority: 100000.0011,
    key: "right",
    style: {
        top: "0dp",
        right: "0dp",
        width: "48dp",
        height: "47dp"
    }
}, {
    isId: true,
    priority: 100000.0012,
    key: "rightImage",
    style: {
        top: "9dp",
        left: "10dp",
        width: "28dp",
        height: "28dp"
    }
} ];