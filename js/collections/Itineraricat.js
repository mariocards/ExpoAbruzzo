define(function(require) {

	var Backbone = require("backbone");
	
	
        
	var Itinerari = Backbone.Collection.extend({
		initialize: function() {
		
                
                },
                
               	url:  function(){
                    
                    return "http://www.expo.abruzzo.it/rest/itineraricat.php?rquest=get&languages_id=1"  
                            
                    
                }
                 
                });    
	return Itinerari;
});