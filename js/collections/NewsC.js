define(function (require) {

    var Backbone = require("backbone");
    var News = require("models/News");
    var NewsC = Backbone.Collection.extend({
        initialize: function() {
		this.iniziale=0;
                this.finale=5;
                },
                iniziale: 0,
                finale: 5,
		model: 	News,
               	url:  function(){
                    
                    return "http://www.expo.abruzzo.it/rest/news_pag.php?rquest=get&initial=" + 
                            encodeURIComponent(this.iniziale)+"&limit="+encodeURIComponent(this.finale);
                    
                }
    });
    return NewsC;
});