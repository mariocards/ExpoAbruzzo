define(function (require) {

    var Backbone = require("backbone");
    var Videos = require("collections/Videos");
    var Utils = require("utils");
    var VideoListView = Utils.Page.extend({
        constructorName: "VideoListView",
        model: Videos,
        initialize: function (options) {
            this.options = options;
            this.template = Utils.templates.videolistview;
            _.bindAll(this, 'render');
            
            
            this.model.on('sync', this.render, this);
            $('#back-button').css('display', 'block');
            $('#settingsModal').css('display', 'none');
            $('#toggle-button').css('display', 'none');
        },
        id: "videolistview",
        className: "i-g page",
        events: {
            "tap #itinerariListItem": "videoDetail",
            "scroll": "fetchSheets"

        },
        render: function () {
      
            $(this.el).html(this.template(this.model.toJSON()));
            
            return this;
        },
        videoDetail: function (ev) {
            Backbone.history.navigate("videoview/" + $(ev.currentTarget).data('id'), {
                trigger: true});
        },
        fetchSheets: function () {

                var delta = this.checkScroll();

            if (delta > -60) {
                this.model.iniziale += 5;
                this.model.fetch({remove: false});
            }
        },
        checkScroll: function () {
            var scrollHeight = this.el.offsetHeight;
//            console.log("scrollHeight " + scrollHeight);
            var scrollTop = this.el.scrollHeight;// Altezza del contenuto di Page
//            console.log("scrollTop " + scrollTop);
            var offsetHeight = this.el.scrollTop;  // Delta spostamento dello spostamento
//            console.log("offsetHeight" + offsetHeight);
            return (scrollHeight - (scrollTop - offsetHeight));
        }
    });

    return VideoListView;

});