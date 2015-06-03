define(function(require) {

	var Backbone = require("backbone");
	
	
        
	var ItinerariCat = Backbone.Collection.extend({
		initialize: function() {
		
                
                },
                
               	url:  function(){
                    
                    return "http://www.expo.abruzzo.it/rest/itineraricat.php?rquest=get&language_id=1"  
                            
                    
                }
                 
                });    
	return ItinerariCat;
});