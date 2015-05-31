define(function(require) {

	var Backbone = require("backbone");
	var Itinerario = require("models/Itinerario");
	var PageableCollection = require("paginator");
        
	var ItinerariPag = Backbone.PageableCollection.extend({
		initialize: function() {
		 },
               	model: Itinerario,
		url: "http://www.expo.abruzzo.it/rest/itinerari.php?rquest=get",  
                mode: "infinite",
               
                state: {

                // You can use 0-based or 1-based indices, the default is 1-based.
                // You can set to 0-based by setting ``firstPage`` to 0.
                pageSize: 6,
                firstPage: 0

              },

              // You can configure the mapping from a `Backbone.PageableCollection#state`
              // key to the query string parameters accepted by your server API.
              queryParams: {

                // `Backbone.PageableCollection#queryParams` converts to ruby's
                // will_paginate keys by default.
                currentPage: "initial",
                pageSize: "limit"
  }        
        });
        return ItinerariPag;
});