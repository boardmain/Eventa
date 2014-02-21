/**
 * Controller for the Events post table row
 * 
 * @class Controllers.events.row
 * @uses core
 */
var APP = require("core");

var CONFIG = arguments[0] || {};

$.Wrapper.id = CONFIG.id || 0;
$.heading.text = CONFIG.heading || "";
$.subHeading.text = CONFIG.subHeading || "";