define(function (require) {

    var Backbone = require("backbone");
    var Itinerari = require("collections/Itinerari");
    var Utils = require("utils");
    var ItinerariListView = Utils.Page.extend({
        constructorName: "ItinerariListView",
        model: Itinerari,
        initialize: function () {
            this.template = Utils.templates.itinerarilistview;
            this.model.on('sync', this.render, this);
            $('#back-button').css('display', 'block');
            $('#settingsModal').css('display', 'none');
            $('#toggle-button').css('display', 'none');
        },
        id: "itinerarilistview",
        className: "i-g page",
        events: {
            "tap #itinerariListItem": "itinerarioDetail",
            "scroll": "fetchSheets"
        },
        render: function () {
            $(this.el).html(this.template(this.model.toJSON()));
            return this;
        },
        itinerarioDetail: function (ev) {
            Backbone.history.navigate("itinerarioview/" + $(ev.currentTarget).data('id'), {
                trigger: true});
        },
        
        fetchSheets: function () {
            var delta = this.checkScroll();
            console.log("Delta " + delta);
            if (delta > -30) {
                this.model.iniziale += 5;
                this.model.fetch({remove: false});
            }
        },
        checkScroll: function () {
            var scrollHeight = this.el.offsetHeight;
            console.log("scrollHeight " + scrollHeight);
            var scrollTop = this.el.scrollHeight;// Altezza del contenuto di Page
            console.log("scrollTop " + scrollTop);
            var offsetHeight = this.el.scrollTop;  // Delta spostamento dello spostamento
            console.log("offsetHeight" + offsetHeight);
            return (scrollHeight - (scrollTop - offsetHeight));
        }

    });

    return ItinerariListView;

});