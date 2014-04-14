function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.eventa.detailNavigation/" + s : s.substring(0, index) + "/com.eventa.detailNavigation/" + s.substring(index + 1);
    return path;
}

module.exports = [ {
    isId: true,
    priority: 100000.0015,
    key: "Wrapper",
    style: {
        width: "66dp",
        height: "12dp",
        top: "17dp"
    }
}, {
    isId: true,
    priority: 100000.0016,
    key: "arrowUpWrapper",
    style: {
        width: "22dp",
        height: "12dp",
        top: "0dp",
        left: "0dp"
    }
}, {
    isId: true,
    priority: 100000.0017,
    key: "arrowUp",
    style: {
        width: "22dp",
        height: "12dp",
        top: "0dp",
        left: "0dp",
        preventDefaultImage: true
    }
}, {
    isId: true,
    priority: 100000.0018,
    key: "arrowDownWrapper",
    style: {
        width: "22dp",
        height: "12dp",
        top: "0dp",
        right: "0dp"
    }
}, {
    isId: true,
    priority: 100000.0019,
    key: "arrowDown",
    style: {
        width: "22dp",
        height: "12dp",
        top: "0dp",
        right: "0dp",
        preventDefaultImage: true
    }
} ];