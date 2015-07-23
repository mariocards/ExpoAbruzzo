define(function(require) {

	var Backbone = require("backbone");

	var Video = Backbone.Model.extend({
		constructorName: "Video",
		initialize: function() {
                    
		},
           
		urlRoot: "http://www.expo.abruzzo.it/rest/videos.php?rquest=get",
		url: function() {
			var base = this.urlRoot || (this.collection && this.collection.url) || "/";
			if (this.isNew()) return base;
	 
			return base + "&id=" + encodeURIComponent(this.id);
		}
		
	});

	return Video;
});