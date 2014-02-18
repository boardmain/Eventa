var Alloy = require("alloy");

var APP = {
    ID: "Prosopic.001",
    VERSION: "1.0.0",
    LEGAL: {
        COPYRIGHT: "Copyright ‌2014 Prosopic, Inc.",
        TOS: "http://www.prosopic.com/legal/terms-conditions",
        PRIVACY: "http://www.prosopic.com/legal/privacy"
    },
    Nodes: [],
    Color: {
        primary: "#000",
        secondary: "#fff"
    },
    Device: {
        isHandheld: Alloy.isHandheld,
        isTablet: Alloy.isTablet,
        type: Alloy.isHandheld ? "handheld" : "tablet",
        os: null,
        name: null,
        version: Ti.Platform.version,
        versionMajor: parseInt(Ti.Platform.version.split(".")[0], 10),
        versionMinor: parseInt(Ti.Platform.version.split(".")[1], 10),
        width: Ti.Platform.displayCaps.platformWidth > Ti.Platform.displayCaps.platformHeight ? Ti.Platform.displayCaps.platformHeight : Ti.Platform.displayCaps.platformWidth,
        height: Ti.Platform.displayCaps.platformWidth > Ti.Platform.displayCaps.platformHeight ? Ti.Platform.displayCaps.platformWidth : Ti.Platform.displayCaps.platformHeight,
        dpi: Ti.Platform.displayCaps.dpi,
        orientation: Ti.Gesture.orientation == Ti.UI.LANDSCAPE_LEFT || Ti.Gesture.orientation == Ti.UI.LANDSCAPE_RIGHT ? "LANDSCAPE" : "PORTRAIT",
        statusBarOrientation: null
    },
    Network: {
        type: Ti.Network.networkTypeName,
        online: Ti.Network.online
    },
    currentStack: -1,
    previousScreen: null,
    controllerStacks: [],
    Master: [],
    MainWindow: null,
    GlobalWrapper: null,
    ContentWrapper: null,
    ACS: null,
    SlideMenu: null,
    SlideMenuOpen: false,
    init: function() {
        Ti.API.debug("APP.init");
        Ti.Network.addEventListener("change", APP.networkObserver);
        Ti.Gesture.addEventListener("orientationchange", APP.orientationObserver);
        Ti.App.addEventListener("pause", APP.exitObserver);
        Ti.App.addEventListener("close", APP.exitObserver);
        Ti.App.addEventListener("resumed", APP.resumeObserver);
        APP.determineDevice();
        APP.buildMenu();
        APP.MainWindow.open();
        APP.handleNavigation(0);
        APP.initACS();
        APP.initPush();
    },
    determineDevice: function() {
        APP.Device.os = "IOS";
        "IPHONE" == Ti.Platform.osname.toUpperCase() ? APP.Device.name = "IPHONE" : "IPAD" == Ti.Platform.osname.toUpperCase() && (APP.Device.name = "IPAD");
    },
    buildMenu: function() {
        APP.log("debug", "APP.buildMenu");
        APP.SlideMenu.init({
            nodes: APP.Nodes,
            color: {
                headingBackground: "#000",
                headingText: "#FFF"
            }
        });
        APP.SlideMenu.Nodes.removeEventListener("click", APP.handleMenuClick);
        APP.SlideMenu.Nodes.addEventListener("click", APP.handleMenuClick);
        APP.GlobalWrapper.addEventListener("swipe", function(_event) {
            "right" == _event.direction ? APP.openMenu() : "left" == _event.direction && APP.closeMenu();
        });
    },
    initACS: function() {
        APP.log("debug", "APP.initACS");
        APP.ACS = require("ti.cloud");
    },
    initPush: function() {
        APP.log("debug", "APP.initPush");
    },
    handleMenuClick: function(_event) {
        APP.handleNavigation(_event.row.id);
        APP.toggleMenu();
    },
    handleNavigation: function(_id) {
        APP.log("debug", "APP.handleNavigation | " + APP.Nodes[_id].title);
        if (_id == APP.currentStack) return;
        APP.SlideMenu.setIndex(_id);
        APP.currentStack = _id;
        "undefined" == typeof APP.controllerStacks[_id] && (APP.controllerStacks[_id] = []);
        var controllerStack = APP.controllerStacks[_id];
        var screen;
        if (controllerStack.length > 0) screen = controllerStack[controllerStack.length - 1]; else {
            var title = APP.Nodes[_id].title.toLowerCase();
            screen = Alloy.createController(title, APP.Nodes[_id]).getView();
            controllerStack.push(screen);
        }
        APP.addScreen(screen);
    },
    addChild: function(_controller, _params, _sibling) {
        var stack;
        stack = APP.controllerStacks[APP.currentStack];
        var screen = Alloy.createController(_controller, _params).getView();
        _sibling && stack.pop();
        stack.push(screen);
        APP.addScreen(screen);
    },
    removeChild: function() {
        var stack;
        stack = APP.controllerStacks[APP.currentStack];
        stack[stack.length - 1];
        var previousStack;
        var previousScreen;
        stack.pop();
        if (0 === stack.length) {
            previousStack = APP.controllerStacks[APP.currentStack];
            previousScreen = previousStack[previousStack.length - 1];
            APP.addScreen(previousScreen);
        } else {
            previousScreen = stack[stack.length - 1];
            APP.addScreen(previousScreen);
        }
    },
    removeAllChildren: function() {
        var stack = APP.controllerStacks[APP.currentStack];
        for (var i = stack.length - 1; i > 0; i--) stack.pop();
        APP.addScreen(stack[0]);
    },
    addScreen: function(_screen) {
        if (_screen) {
            APP.ContentWrapper.add(_screen);
            APP.previousScreen && APP.removeScreen(APP.previousScreen);
            APP.previousScreen = _screen;
        }
    },
    removeScreen: function(_screen) {
        if (_screen) {
            APP.ContentWrapper.remove(_screen);
            APP.previousScreen = null;
        }
    },
    addMasterScreen: function(_controller, _params) {
        var screen = Alloy.createController(_controller, _params).getView();
        APP.Master[APP.currentStack].add(screen);
    },
    toggleMenu: function() {
        APP.SlideMenuOpen ? APP.closeMenu() : APP.openMenu();
    },
    openMenu: function() {
        APP.SlideMenu.Wrapper.left = "0dp";
        APP.GlobalWrapper.animate({
            left: "200dp",
            duration: 250,
            curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
        });
        APP.SlideMenuOpen = true;
    },
    closeMenu: function() {
        APP.SlideMenu.Wrapper.left = "-200dp";
        APP.GlobalWrapper.animate({
            left: "0dp",
            duration: 250,
            curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
        });
        APP.SlideMenuOpen = false;
    },
    log: function(_severity, _text) {
        switch (_severity.toLowerCase()) {
          case "debug":
            Ti.API.debug(_text);
            break;

          case "error":
            Ti.API.error(_text);
            break;

          case "info":
            Ti.API.info(_text);
            break;

          case "log":
            Ti.API.log(_text);
            break;

          case "trace":
            Ti.API.trace(_text);
            break;

          case "warn":
            Ti.API.warn(_text);
        }
    },
    orientationObserver: function(_event) {
        APP.log("debug", "APP.orientationObserver");
        if (APP.Device.statusBarOrientation && APP.Device.statusBarOrientation == _event.orientation) return;
        APP.Device.statusBarOrientation = _event.orientation;
        APP.Device.orientation = _event.orientation == Ti.UI.LANDSCAPE_LEFT || _event.orientation == Ti.UI.LANDSCAPE_RIGHT ? "LANDSCAPE" : "PORTRAIT";
        Ti.App.fireEvent("APP:orientationChange");
    },
    networkObserver: function(_event) {
        APP.log("debug", "APP.networkObserver");
        APP.Network.type = _event.networkTypeName;
        APP.Network.online = _event.online;
        Ti.App.fireEvent("APP:networkChange");
    },
    exitObserver: function() {
        APP.log("debug", "APP.exitObserver");
    },
    resumeObserver: function() {
        APP.log("debug", "APP.resumeObserver");
    },
    backButtonObserver: function() {
        APP.log("debug", "APP.backButtonObserver");
        var stack;
        stack = APP.controllerStacks[APP.currentStack];
        stack.length > 1 ? APP.removeChild() : APP.MainWindow.close();
    }
};

module.exports = APP;