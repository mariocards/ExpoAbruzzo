define(function(require) {

	var Backbone = require("backbone");

	var News = Backbone.Model.extend({
		constructorName: "News",
		initialize: function() {
                    
		},
           
		urlRoot: "1.json",
		url: function() {
			var base = this.urlRoot || (this.collection && this.collection.url) || "/";
			if (this.isNew()) return base;
	 
			return base + "&id=" + encodeURIComponent(this.id);
		}
		
	});

	return News;
});