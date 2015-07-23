define(function (require) {

    var Backbone = require("backbone");
    var Search = require("collections/Search");
    var Utils = require("utils");

    var ResultView = Utils.Page.extend({
        constructorName: "ResultView",
        model: Search,
        initialize: function (options) {
            this.options = options;
            _.bindAll(this, 'render');
            if (this.options.lang == 1) {
                this.template = Utils.templates.ricercalistview;
            } else {
                this.template = Utils.templates.ricercalistviewen;
            }
            
            this.model.on('sync', this.render, this);
        },
        id: "paginaricerca",
        className: "i-g page",
        events: {
            "tap #eventListItem": "eventDetail",
            "touchend #back-button": "goBack",
            "tap #ricercaGenerale": "doSearchTap",
            "keypress #ricercaGeneraleInput": "doSearch"
        },
        render: function () {
            $(this.el).html(this.template(this.model.toJSON()));
            return this;
        },
        eventDetail: function (ev) {
            if($(ev.currentTarget).data('id') != 0){
                Backbone.history.navigate($(ev.currentTarget).data('view') + "/" + $(ev.currentTarget).data('id'), {
                trigger: true});
            }
            
            
        },
        goBack: function () {
            Backbone.history.navigate("myview", {
                trigger: true
            });
        },
        doSearch: function () {
            if (event.keyCode === 13) {
                var value = $('#ricercaGeneraleInput').val();
                Backbone.history.navigate("risultatoricerca/" + value,
                        {trigger: true});
            }
        },
        doSearchTap: function (event) {
            var value = $('#ricercaGeneraleInput').val();
            Backbone.history.navigate("risultatoricerca/" + value,
                    {trigger: true});
        }
    });



    return ResultView;

});
