define(function(require) {

	var Backbone = require("backbone");
       var lingua = window.localStorage.getItem("lingua");
       if(lingua === null){
       window.localStorage.setItem("lingua",1)
       lingua = window.localStorage.getItem("lingua");
       }
        
	var ItinerariCat = Backbone.Collection.extend({
		initialize: function() {
		
                
                },
                lingua: lingua,
               	url:  function(){
                    
                    return "http://www.expo.abruzzo.it/rest/itineraricat.php?rquest=get&language_id="  + lingua;
                            
                    
                }
                 
                });    
	return ItinerariCat;
});