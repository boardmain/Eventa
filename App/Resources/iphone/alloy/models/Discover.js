var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("discover", exports.definition, []);

collection = Alloy.C("discover", exports.definition, model);

exports.Model = model;

exports.Collection = collection;