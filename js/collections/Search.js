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
            return [{id : 1, content : response.risultato.news, titolo: 'News', vista: 'newsview'},
                    {id : 2, content : response.risultato.eventi, titolo: 'Eventi', vista: 'eventview'}, 
                    {id : 3, content : response.risultato.itinerari, titolo: 'Itinerari', vista: 'itinerarioview'}
                ];
            
        }
        
        
    });
    return Search;
});

