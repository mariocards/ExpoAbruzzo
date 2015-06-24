define(function () {
    var $ = require("jquery");

    var CachedObject = {
        news: {},
        events: {},
        iti: {},
        getNews: function (id) {
            if (!this.news[id]) {
                return undefined;
            }
            return this.news[id];
        },
        setNews: function (id, object) {
            this.news[id] = object;
        },
        getEvents: function (id) {
            if (!this.events[id]) {
                return undefined;
            }
            return this.events[id];
        },
        setEvents: function (id, object) {
            this.events[id] = object;
        },
        getIti: function (id) {
            if (!this.iti[id]) {
                return undefined;
            }
            return this.iti[id];
        },
        setIti: function (id, object) {
            this.iti[id] = object;
        },
        emptyNews: function () {
            return $.isEmptyObject(this.news);
        },
        emptyEvents: function () {
            return $.isEmptyObject(this.events);
        },
        emptyIti: function () {
            return $.isEmptyObject(this.iti);
        },
        eraseAll: function () {
            this.news.length= 0;
            this.events.length = 0;
            this.iti.length = 0;
            
        }
    };
    return CachedObject;
});