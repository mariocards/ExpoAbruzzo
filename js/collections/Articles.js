define(function(require) {

	var Backbone = require("backbone");
	var Article = require("models/Article");
	
	var Articles = Backbone.Collection.extend({
    initialize: function() {
        //this.on('all', function(e) { console.log("People event: " + e); });
    },
    model: Article,
    url: "rest/article.php?rquest=GET"
	});  
	return Articles;
});