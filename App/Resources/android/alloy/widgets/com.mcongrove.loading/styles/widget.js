function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.mcongrove.loading/" + s : s.substring(0, index) + "/com.mcongrove.loading/" + s.substring(index + 1);
    return true && 0 !== path.indexOf("/") ? "/" + path : path;
}

module.exports = [ {
    isId: true,
    priority: 100000.002,
    key: "Wrapper",
    style: {
        width: Ti.UI.FILL,
        top: "0dp"
    }
}, {
    isId: true,
    priority: 100000.0021,
    key: "Background",
    style: {
        backgroundColor: "#000",
        opacity: .3,
        width: Ti.UI.FILL,
        height: Ti.UI.FILL
    }
}, {
    isId: true,
    priority: 100000.0022,
    key: "Modal",
    style: {
        width: "92dp",
        height: "92dp",
        borderRadius: 10,
        backgroundColor: "#000"
    }
}, {
    isId: true,
    priority: 100000.0023,
    key: "Loading",
    style: {
        height: "33dp",
        width: "33dp",
        top: "17dp",
        left: "29dp",
        backgroundColor: "#000",
        images: [ WPATH("images/00.png"), WPATH("images/01.png"), WPATH("images/02.png"), WPATH("images/03.png"), WPATH("images/04.png"), WPATH("images/05.png"), WPATH("images/06.png"), WPATH("images/07.png"), WPATH("images/08.png"), WPATH("images/09.png"), WPATH("images/10.png"), WPATH("images/11.png") ]
    }
}, {
    isId: true,
    priority: 100000.0024,
    key: "Label",
    style: {
        top: "60dp",
        left: "0dp",
        width: "92dp",
        height: "20dp",
        color: "#FFF",
        textAlign: "center",
        font: {
            fontSize: 13,
            fontWeight: "bold"
        }
    }
} ];