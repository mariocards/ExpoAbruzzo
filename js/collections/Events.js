define(function(require) {

	var Backbone = require("backbone");
	var Event = require("models/Event");
	
	var Events = Backbone.Collection.extend({
		initialize: function() {
			//this.on('all', function(e) { console.log("People event: " + e); });
		},
		model: Event,
		url: "rest/event.php?rquest=GET"
	});  
	return Events;
});