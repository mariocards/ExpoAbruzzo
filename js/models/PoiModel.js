define(function(require) {

	var Backbone = require("backbone");

	var PoiModel = Backbone.Model.extend({
		constructorName: "PoiModel"
	});

	return PoiModel;
});