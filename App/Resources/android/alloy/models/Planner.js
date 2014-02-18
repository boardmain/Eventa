var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("planner", exports.definition, []);

collection = Alloy.C("planner", exports.definition, model);

exports.Model = model;

exports.Collection = collection;