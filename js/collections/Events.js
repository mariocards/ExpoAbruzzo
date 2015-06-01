define(function(require) {

	var Backbone = require("backbone");
	var Event = require("models/Event");
	
        
	var Events = Backbone.Collection.extend({
		initialize: function() {
		this.iniziale=0;
                this.finale=8;
                },
                iniziale: 0,
                finale: 8,	
		model: Event,
		url: function(){
                    
                    return "http://www.expo.abruzzo.it/rest/event_pag.php?rquest=get&initial=" + 
                            encodeURIComponent(this.iniziale)+"&limit="+encodeURIComponent(this.finale);
                }
                });    
	return Events;
});