define(function(require) {

	var Backbone = require("backbone");
	var Itinerario = require("models/Itinerario");
	
        
	var Itinerari = Backbone.Collection.extend({
		initialize: function() {
		this.iniziale=0;
                this.finale=5;
                },
                iniziale: 0,
                finale: 5,
		model: 	Itinerario,
               	url:  function(){
                    
                    return "http://www.expo.abruzzo.it/rest/itinerari_pag.php?rquest=get&initial=" + 
                            encodeURIComponent(this.iniziale)+"&limit="+encodeURIComponent(this.finale);
                    
                }
                 
                });    
	return Itinerari;
});