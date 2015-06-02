define(function (require) {

    var Backbone = require("backbone");


    var Search = Backbone.Collection.extend({
        initialize: function () {
            //this.on('all', function(e) { console.log("People event: " + e); });
        },
        defaults: {
                text: ''
        },
        text: '',
	url: function() {
            return "http://www.expo.abruzzo.it/rest/search.php?rquest=get" + "&text=" + encodeURIComponent(this.text);
	},
        parse:function(response){
            
            console.log("respoooooooooooooooooooooonse");
            console.log(response.risultato);
            console.log(response);
             
            return [{id : 0, content : response.risultato.news},{id:1, content : response.risultato.eventi}, {id : 2, content : response.risultato.itinerari}];
            
        }
        
        
    });
    return Search;
});

