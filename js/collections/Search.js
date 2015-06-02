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
	}
        
    });
    return Search;
});

