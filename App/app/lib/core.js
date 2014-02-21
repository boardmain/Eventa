/**
 * The main app singleton used throughout the app. This object contains static
 * properties, global event handling, etc.
 *
 * @class core
 * @singleton
 * @uses Modules.ti.cloud
 */
var Alloy = require("alloy");

var APP = {
	/**
	 * Application ID
	 * @type {String}
	 */
	ID: "Prosopic.001",
	/**
	 * Application version
	 * @type {String}
	 */
	VERSION: "1.0.0",
	/**
	 * Legal information
	 * @type {Object}
	 * @param {String} COPYRIGHT Copyright information
	 * @param {String} TOS Terms of Service URL
	 * @param {String} PRIVACY Privacy Policy URL
	 */
	LEGAL: {
		COPYRIGHT: "Copyright ‌2014 Prosopic, Inc.",
		TOS: "http://www.prosopic.com/legal/terms-conditions",
		PRIVACY: "http://www.prosopic.com/legal/privacy"
	},
	/**
	 * All the component nodes for the Slide Menu
	 * @type {Object}
	 */
	Nodes: [],
	/**
	 * Application Color 
	 * @param {String} primary The primary color
	 * @param {String} secondary The secondary color
	 */
	Color: {primary: "#000", secondary: "#fff"},
	/**
	 * Device information
	 * @type {Object}
	 * @param {Boolean} isHandheld Whether the device is a handheld
	 * @param {Boolean} isTablet Whether the device is a tablet
	 * @param {String} type The type of device, either "handheld" or "tablet"
	 * @param {String} os The name of the OS, either "IOS" or "ANDROID"
	 * @param {String} name The name of the device, either "IPHONE", "IPAD" or the device model if Android
	 * @param {String} version The version of the OS
	 * @param {Number} versionMajor The major version of the OS
	 * @param {Number} versionMinor The minor version of the OS
	 * @param {Number} width The width of the device screen
	 * @param {Number} height The height of the device screen
	 * @param {Number} dpi The DPI of the device screen
	 * @param {String} orientation The device orientation, either "LANDSCAPE" or "PORTRAIT"
	 * @param {String} statusBarOrientation A Ti.UI orientation value
	 */
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
	/**
	 * Network status and information
	 * @type {Object}
	 * @param {String} type Network type name
	 * @param {Boolean} online Whether the device is connected to a network
	 */
	Network: {
		type: Ti.Network.networkTypeName,
		online: Ti.Network.online
	},
	/**
	 * Device Location
	 * @type {Object}
	 * @param {String} city Closest city designation
	 * @param {String} region Closest region designation
	 * @param {String} country Closest country designation
	 */
	Location: {
		city: null,
		region: null,
		country: null
	},
	/**
	 * Current controller view stack index
	 * @type {Number}
	 */
	currentStack: -1,
	/**
	 * The previous screen in the hierarchy
	 * @type {Object}
	 */
	previousScreen: null,
	/**
	 * The view stack for controllers
	 * @type {Array}
	 */
	controllerStacks: [],
	/**
	 * The view stack for master views
	 * @type {Array}
	 */
	Master: [],
	/**
	 * The main app window
	 * @type {Object}
	 */
	MainWindow: null,
	/**
	 * The global view all screen controllers get added to
	 * @type {Object}
	 */
	GlobalWrapper: null,
	/**
	 * The global view all content screen controllers get added to
	 * @type {Object}
	 */
	ContentWrapper: null,
	/**
	 * Holder for ACS cloud module
	 * @type {Object}
	 */
	ACS: null,
	/**
	 * Slide Menu widget
	 * @type {Object}
	 */
	SlideMenu: null,
	/**
	 * Whether or not the slide menu is open
	 * @type {Boolean}
	 */
	SlideMenuOpen: false,
	/**
	 * Initializes the application
	 */
	init: function() {
		Ti.API.debug("APP.init");

		// Global system Events
		Ti.Network.addEventListener("change", APP.networkObserver);
		Ti.Gesture.addEventListener("orientationchange", APP.orientationObserver);
		Ti.App.addEventListener("pause", APP.exitObserver);
		Ti.App.addEventListener("close", APP.exitObserver);
		Ti.App.addEventListener("resumed", APP.resumeObserver);

		if(OS_ANDROID) {
			APP.MainWindow.addEventListener("androidback", APP.backButtonObserver);
		}

		// Determine device characteristics
		APP.determineDevice();

		// Builds out the Slide Menu
		APP.buildMenu();

		// Open the main window
		APP.MainWindow.open();

		// The initial screen to show
		APP.handleNavigation(0);

		// NOTICE:
		// The following sections are abstracted for PEEK

		// Set up ACS
		APP.initACS();

		// Set up push notifications
		APP.initPush();
	},
	/**
	 * Determines the device characteristics
	 */
	determineDevice: function() {
		if(OS_IOS) {
			APP.Device.os = "IOS";

			if(Ti.Platform.osname.toUpperCase() == "IPHONE") {
				APP.Device.name = "IPHONE";
			} else if(Ti.Platform.osname.toUpperCase() == "IPAD") {
				APP.Device.name = "IPAD";
			}
		} else if(OS_ANDROID) {
			APP.Device.os = "ANDROID";

			APP.Device.name = Ti.Platform.model.toUpperCase();

			// Fix the display values
			APP.Device.width = (APP.Device.width / (APP.Device.dpi / 160));
			APP.Device.height = (APP.Device.height / (APP.Device.dpi / 160));
		}
	},
	/**
	 * Builds the slide menu
	 * @param {Array} _nodes The items (menu nodes) to build
	 */
	buildMenu: function() {
		APP.log("debug", "APP.buildMenu");

		APP.SlideMenu.init({
			nodes: APP.Nodes,
			color: {
				headingBackground: "#000",
				headingText: "#FFF" 
			}
		});

		// Add a handler for the nodes (make sure we remove existing ones first)
		APP.SlideMenu.Nodes.removeEventListener("click", APP.handleMenuClick);
		APP.SlideMenu.Nodes.addEventListener("click", APP.handleMenuClick);

		// Listen for gestures on the main window to open/close the slide menu
		APP.GlobalWrapper.addEventListener("swipe", function(_event) {
			if(_event.direction == "right") {
				APP.openMenu();
			} else if(_event.direction == "left") {
				APP.closeMenu();
			}			
		});
	},
	/**
	 * Set up ACS
	 */
	initACS: function() {
		APP.log("debug", "APP.initACS");

		APP.ACS = require("ti.cloud");
	},
	/**
	 * Set up push notifications
	 */
	initPush: function() {
		APP.log("debug", "APP.initPush");
	},
	/**
	 * Handles the click event on a menu item
	 * @param {Object} _event The event
	 */
	handleMenuClick: function(_event) {
		APP.handleNavigation(_event.row.id);
		APP.toggleMenu();
	},
	/**
	 * Global event handler to change screens
	 * @param {String} _id The ID (index) of the tab being opened
	 */
	handleNavigation: function(_id) {
		APP.log("debug", "APP.handleNavigation | " + APP.Nodes[_id].title);

		// Requesting same screen as we're on
		if(_id == APP.currentStack) {
			// Do nothing
			return;
		} else {
			// Select the row for the requested item
			APP.SlideMenu.setIndex(_id);

			// Set current stack
			APP.currentStack = _id;

			// Create new controller stack if it doesn't exist
			if(typeof APP.controllerStacks[_id] === "undefined") {
				APP.controllerStacks[_id] = [];
			}


			// Set current controller stack
			var controllerStack = APP.controllerStacks[_id];

			// If we're opening for the first time, create new screen
			// Otherwise, add the last screen in the stack (screen we navigated away from earlier on)
			var screen;

			if(controllerStack.length > 0) {
				// Retrieve the last screen
				screen = controllerStack[controllerStack.length - 1];
			} else {
				// Create a new screen
				var title = APP.Nodes[_id].title.toLowerCase();

				screen = Alloy.createController(title, APP.Nodes[_id]).getView();

				// Add screen to the controller stack
				controllerStack.push(screen);
			}

			// Add the screen to the window
			APP.addScreen(screen);
		}
	},
	/**
	 * Open a child screen
	 * @param {String} _controller The name of the controller to open
	 * @param {Object} _params An optional dictionary of parameters to pass to the controller
	 * @param {Boolean} _sibling Whether this is a sibling view
	 */
	addChild: function(_controller, _params, _sibling) {
		var stack;

		stack = APP.controllerStacks[APP.currentStack];			
		
		// Create the new screen controller
		var screen = Alloy.createController(_controller, _params).getView();

		if(_sibling) {
			stack.pop();
		}

		// Add screen to the controller stack
		stack.push(screen);

		// Add the screen to the window
		APP.addScreen(screen);		
	},
	/**
	 * Removes a child screen
	 */
	removeChild: function() {
		var stack;

		stack = APP.controllerStacks[APP.currentStack];
	
		var screen = stack[stack.length - 1];
		var previousStack;
		var previousScreen;

		stack.pop();

		if(stack.length === 0) {
			previousStack = APP.controllerStacks[APP.currentStack];
			previousScreen = previousStack[previousStack.length - 1];
			APP.addScreen(previousScreen);			
		} else {
			previousScreen = stack[stack.length - 1];
			APP.addScreen(previousScreen);
		}
	},
	/**
	 * Removes all children screens
	 */
	removeAllChildren: function() {
		var stack = APP.controllerStacks[APP.currentStack];

		for(var i = stack.length - 1; i > 0; i--) {
			stack.pop();
		}

		APP.addScreen(stack[0]);
	},
	/**
	 * Global function to add a screen
	 * @param {Object} _screen The screen to add
	 */
	addScreen: function(_screen) {
		if(_screen) {
			APP.ContentWrapper.add(_screen);

			if(APP.previousScreen) {
				APP.removeScreen(APP.previousScreen);
			}

			APP.previousScreen = _screen;
		}
	},
	/**
	 * Global function to remove a screen
	 * @param {Object} _screen The screen to remove
	 */
	removeScreen: function(_screen) {
		if(_screen) {
			APP.ContentWrapper.remove(_screen);

			APP.previousScreen = null;
		}
	},
	/**
	 * Adds a screen to the Master window
	 * @param {String} _controller The name of the controller to open
	 * @param {Object} _params An optional dictionary of parameters to pass to the controller
	 * @param {Object} _wrapper The parent wrapper screen to fire events to
	 */
	addMasterScreen: function(_controller, _params, _wrapper) {
		var screen = Alloy.createController(_controller, _params).getView();
		APP.Master[APP.currentStack].add(screen);
	},
	/**
	 * Toggles the Slide Menu
	 */
	toggleMenu: function(_position) {
		if(APP.SlideMenuOpen) {
			APP.closeMenu();
		} else {
			APP.openMenu();
		}
	},
	/**
	 * Opens the Slide Menu
	 */
	openMenu: function() {
		APP.SlideMenu.Wrapper.animate({
			left: "0dp",
			duration: 250,
			curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
		});
		APP.GlobalWrapper.animate({
			left: "200dp",
			duration: 250,
			curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
		});

		APP.SlideMenuOpen = true;
	},
	/**
	 * Closes the Slide Menu
	 */
	closeMenu: function() {
		APP.SlideMenu.Wrapper.animate({
			left: "-200dp",
			duration: 250,
			curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
		});
		
		APP.GlobalWrapper.animate({
			left: "0dp",
			duration: 250,
			curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
		});

		APP.SlideMenuOpen = false;
	},
	/**
	 * Logs all console data
	 * @param {String} _severity A severity type (debug, error, info, log, trace, warn)
	 * @param {String} _text The text to log
	 */
	log: function(_severity, _text) {
		switch(_severity.toLowerCase()) {
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
				break;
		}
	},
	/**
	 * Global orientation event handler
	 * @param {Object} _event Standard Titanium event callback
	 */
	orientationObserver: function(_event) {
		APP.log("debug", "APP.orientationObserver");

		if(APP.Device.statusBarOrientation && APP.Device.statusBarOrientation == _event.orientation) {
			return;
		}

		APP.Device.statusBarOrientation = _event.orientation;

		APP.Device.orientation = (_event.orientation == Ti.UI.LANDSCAPE_LEFT || _event.orientation == Ti.UI.LANDSCAPE_RIGHT) ? "LANDSCAPE" : "PORTRAIT";

		Ti.App.fireEvent("APP:orientationChange");
	},
	/**
	 * Global network event handler
	 * @param {Object} _event Standard Titanium event callback
	 */
	networkObserver: function(_event) {
		APP.log("debug", "APP.networkObserver");

		APP.Network.type = _event.networkTypeName;
		APP.Network.online = _event.online;

		Ti.App.fireEvent("APP:networkChange");
	},
	/**
	 * Exit event observer
	 * @param {Object} _event Standard Titanium event callback
	 */
	exitObserver: function(_event) {
		APP.log("debug", "APP.exitObserver");
	},
	/**
	 * Resume event observer
	 * @param {Object} _event Standard Titanium event callback
	 */
	resumeObserver: function(_event) {
		APP.log("debug", "APP.resumeObserver");
	},
	/**
	 * Back button observer
	 * @param {Object} _event Standard Titanium event callback
	 */
	backButtonObserver: function(_event) {
		APP.log("debug", "APP.backButtonObserver");
		
		var stack;
		stack = APP.controllerStacks[APP.currentStack];		
		if(stack.length > 1) {
			APP.removeChild();
		} else {
			APP.MainWindow.close();
		}
	}	
};

module.exports = APP;