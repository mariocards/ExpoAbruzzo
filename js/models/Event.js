define(function(require) {

	var Backbone = require("backbone");

	var Event = Backbone.Model.extend({
		constructorName: "Event",
		initialize: function() {
        //this.on('all', function(e) { console.log(this.get('title') + " event: " + e); });
		},
		defaults: {
			title: 'undefined',
			description: 'undefined',
			date: 'undefined',
			subtitle: 'undefined',
			photo: 'undefined',
			ora: 'undefined',
			inizio: 'undefined',
			fine: 'undefined',
			location: 'undefined',
			place: 'undefined',
			lat: 'undefined',
			lon: 'undefined',
			address: 'undefined'
		},
		url: "rest/event.php?rquest=GET"
		
	});

	return Event;
});