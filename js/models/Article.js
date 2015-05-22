define(function(require) {

	var Backbone = require("backbone");

	var Article = Backbone.Model.extend({
		constructorName: "Article",
		initialize: function() {
        //this.on('all', function(e) { console.log(this.get('title') + " event: " + e); });
		},
		defaults: {
			title: 'undefined',
			description: 'undefined',
			date: 'undefined',
			subtitle: 'undefined'
		},
		url: "rest/article.php?rquest=GET"
	});

	return Article;
});