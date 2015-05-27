define(function(require) {

	var Backbone = require("backbone");
	var Itinerario = require("models/Itinerario");
	
        
	var Itinerari = Backbone.Collection.extend({
		initialize: function() {
			
                },	
		model: Itinerario,
		url: "http://www.expo.abruzzo.it/rest/itinerari.php?rquest=get"
                });    
	return Itinerari;
});