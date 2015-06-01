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
            this.model.on('add', this.render, this);
            //this.listenTo(this.model, 'add', this.render);
            //this.bind("change", this.model.attributes, this.render);
            
        },
        id: "eventlistview",
        className: "i-g page",
        events: {
            "touchend #goToMap": "goToMap",
            "touchend #eventListItem": "eventDetail",
            "touchend #loadMore": "fetchSheets"
        },
        render: function () {
            $(this.el).html(this.template(this.model.toJSON()));

            return this;
        },
        eventDetail: function (ev) {
            Backbone.history.navigate("eventview/" + $(ev.currentTarget).data('id'), {
                trigger: true});
    },
        goToMap: function (e) {
            Backbone.history.navigate("map", {
                trigger: true
            });
        },
        addSheet: function () {
            $(this.el).append(this.template(this.model.toJSON()));
        },
        fetchSheets: function () {
            this.model.iniziale += 8;
            this.model.finale += 8;
            this.model.fetch({success: this.addSheet()});
        }
    });

    return EventListView;

});