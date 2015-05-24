define(function(require) {

	var Backbone = require("backbone");

	var Event = Backbone.Model.extend({
		constructorName: "Event",
		initialize: function() {
                    
		},
                
		urlRoot: "http://www.expo.abruzzo.it/rest/event.php?rquest=get",
		url: function() {
			var base = this.urlRoot || (this.collection && this.collection.url) || "/";
			if (this.isNew()) return base;
	 
			return base + "&id=" + encodeURIComponent(this.id);
		}
	});

	
	return Event;
});