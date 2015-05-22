define(function(require) {

	var Backbone = require("backbone");

	var News = Backbone.Model.extend({
		constructorName: "News",
		defaults: {
			title: 'undefined',
			body: 'undefined',
			date: 'undefined',
			subtitle: 'undefined',
			picture: 'undefined',
			category: 'undefined'
		},
		urlRoot: "http://www.expo.abruzzo.it/rest/news.php?rquest=GET",
		url: function() {
			var base = this.urlRoot || (this.collection && this.collection.url) || "/";
			if (this.isNew()) return base;
	 
			return base + "?id=" + encodeURIComponent(this.id);
		}
		
	});

	return News;
});