/**
 * Main application controller
 * 
 * **NOTE: This controller is opened first upon application start and
 * initializes the core application code (`APP.init`). This controller
 * also sets UI elements to global scope for easy access.**
 * 
 * @class Controllers.index
 * @uses core
 */

// Pull in the core APP singleton
var APP = require("core");

// Create the node items for the Slide Menu
var nodes = [
	{ id: 0, title: "Planner"},
	{ id: 1, title: "Collections"},
	{ id: 2, title: "Discover"},
	{ id: 3, title: "Settings" }
];

// Make sure there's always a reference to global elements throughout the APP singleton
APP.MainWindow = $.MainWindow;
APP.GlobalWrapper = $.GlobalWrapper;
APP.ContentWrapper = $.ContentWrapper;
APP.Nodes = nodes;
APP.SlideMenu = $.SlideMenu;

// Start the APP
APP.init();
