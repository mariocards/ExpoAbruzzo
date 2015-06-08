define(function (require) {

    var Backbone = require("backbone");
//      var formatoData = require("helperdateformat");
    var Events = require("collections/Events");
    var Utils = require("utils");
    var EventView = require("views/pages/Event/EventView");
    var EventListView = Utils.Page.extend({
        constructorName: "EventListView",
        model: Events,
        initialize: function () {
            this.template = Utils.templates.eventlistview;
            this.model.on('sync', this.render, this);  
            $('#back-button').css('display','block');
        $('#settingsModal').css('display','none');
        },
        id: "eventlistview",
        className: "i-g page",
        events: {
            "tap #eventListItem": "eventDetail",
            "swipeUp #loadMore": "fetchSheets"
            
        },
        render: function () {
            $(this.el).html(this.template(this.model.toJSON()));
            return this;
        },
        eventDetail: function (ev) {
            Backbone.history.navigate("eventview/" + $(ev.currentTarget).data('id'), {
                trigger: true});
    },
 
        fetchSheets: function () {
            this.model.iniziale += 5;
            this.model.fetch({remove: false});
        },
    goBack: function(){
        Backbone.history.navigate("myview", {
         trigger: true});
    }
    });

    return EventListView;

});