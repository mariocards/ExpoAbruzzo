define(function(require) {

	var Backbone = require("backbone");

	var Event = Backbone.Model.extend({
		constructorName: "Event",
		initialize: function() {
        //this.on('all', function(e) { console.log(this.get('title') + " event: " + e); });
		},
		defaults: {
			id: 'undefined',
			username: 'undefined',
			creation: 'undefined',
			lastModified: 'undefined',
			title: 'undefined',
			date: 'undefined',
			category: 'undefined',
			body: 'undefined',
			atcive: 'undefined'
			
		},
		urlRoot: "http://www.disim.univaq.it/main/rest/merged_news.php?rquest=get",
		url: function() {
			var base = this.urlRoot || (this.collection && this.collection.url) || "/";
			if (this.isNew()) return base;
	 
			return base + "&id=" + encodeURIComponent(this.id);
		}
	});

	
	return Event;
});