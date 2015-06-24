define(function (require) {

    var Backbone = require("backbone");
    var News = require("models/News");
    var lingua = window.localStorage.getItem("lingua");
    var NewsC = Backbone.Collection.extend({
        initialize: function() {
		this.iniziale=0;
                this.finale=8;
        },
        iniziale: 0,
        finale: 8,
	model: 	News,
        lingua: lingua,
        url:  function(){
                    
                    return "http://www.expo.abruzzo.it/rest/news_pag.php?rquest=get&initial=" + 
                            encodeURIComponent(this.iniziale)+"&limit="+encodeURIComponent(this.finale)+'&languages_id=' + lingua;
                    
                }
    });
    return NewsC;
});