var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("collections", exports.definition, []);

collection = Alloy.C("collections", exports.definition, model);

exports.Model = model;

exports.Collection = collection;