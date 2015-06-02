define(function (require) {

    var Backbone = require("backbone");


    var Search = Backbone.Collection.extend({
        initialize: function () {
            //this.on('all', function(e) { console.log("People event: " + e); });
        },
        urlRoot: "http://www.expo.abruzzo.it/rest/search.php?rquest=get",
	url: function() {
			var base = this.urlRoot || (this.collection && this.collection.url) || "/";
			if (this.isNew()) return base;
	 
			return base + "&text=" + encodeURIComponent(this.id);
	}
        
    });
    return Search;
});

