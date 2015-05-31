define(function (require) {

    var Backbone = require("backbone");
    var News = require("models/News");
    var NewsC = Backbone.Collection.extend({
        initialize: function () {
            //this.on('all', function(e) { console.log("People event: " + e); });
            var initial = 0;
            var limit = 6;
        },
        model: News,
        url: function (initial, limit) {

            return "http://www.expo.abruzzo.it/rest/news.php?rquest=get&initial=" + initial + "&limit=" + limit;
        },
        loadMore: function (){
            this.inital += 6;
            this.limit +=6;
        }
    });
    return NewsC;
});