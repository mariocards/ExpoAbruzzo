define(function(require) {

	var Backbone = require("backbone");
	var Event = require("models/Event");
	
        
	var Events = Backbone.Collection.extend({
		initialize: function() {
			
                },	
		model: Event,
		url: "http://www.expo.abruzzo.it/rest/event.php?rquest=get"
                });    
	return Events;
});