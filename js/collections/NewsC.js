define(function(require) {

	var Backbone = require("backbone");
	var News = require("models/News");
	var NewsC = Backbone.Collection.extend({
		initialize: function() {
			//this.on('all', function(e) { console.log("People event: " + e); });
		},
		model: News,
		url: "http://www.expo.abruzzo.it/rest/news.php?rquest=GET"
	});  
	return NewsC;
});