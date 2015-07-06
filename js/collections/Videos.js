define(function (require) {

    var Backbone = require("backbone");
    var Video = require("models/Video");
    var lingua = window.localStorage.getItem("lingua");
    var Videos = Backbone.Collection.extend({
        initialize: function() {
		this.iniziale=0;
                this.finale=5;
        },
        iniziale: 0,
        finale: 5,
	model: 	Video,
        lingua: lingua,
        url:  function(){
                    
                    return "http://www.expo.abruzzo.it/rest/videos.php?rquest=get&initial=" + 
                            encodeURIComponent(this.iniziale)+"&limit="+encodeURIComponent(this.finale)+'&languages_id=' + encodeURIComponent(this.lingua);
                    
                }
                
     
                
    });
    
   
    return Videos;
});