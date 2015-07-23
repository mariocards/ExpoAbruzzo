define(function(require) {

	var Backbone = require("backbone");

	var Itinerario = Backbone.Model.extend({
		constructorName: "Itinerario",
		initialize: function() {
                    
		},
                
		urlRoot: "http://www.expo.abruzzo.it/rest/itinerari.php?rquest=get",
		url: function() {
			var base = this.urlRoot || (this.collection && this.collection.url) || "/";
			if (this.isNew()) return base;
	 
			return base + "&id=" + encodeURIComponent(this.id);
		}
	});

	
	return Itinerario;
});