var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("settings", exports.definition, []);

collection = Alloy.C("settings", exports.definition, model);

exports.Model = model;

exports.Collection = collection;