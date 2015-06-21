define(function (require) {

    var Backbone = require("backbone");

    var Utils = require("utils");

    var SearchView = Utils.Page.extend({
        constructorName: "SearchView",
        initialize: function () {
            // load the precompiled template
            this.template = Utils.templates.paginaricerca;
            this.render;
        },
        id: "paginaricerca",
        className: "i-g page",
        events: {
            "window.history.back(); #back-button": "goBack",
            "tap #ricercaGenerale": "doSearchTap",
            "keypress #ricercaGeneraleInput": "doSearch"
        },
        render: function () {
            $(this.el).html(this.template());

            return this;
        },
        goBack: function () {
            Backbone.history.navigate("myview", {
                trigger: true
            });
        },
        doSearch: function (event) {
            if (event.keyCode === 13) {
                var value = $('#ricercaGeneraleInput').val();
                Backbone.history.navigate("risultatoricerca/" + value,
                        {trigger: true});
            }
        },
        doSearchTap: function(event){
            var value = $('#ricercaGeneraleInput').val();
                Backbone.history.navigate("risultatoricerca/" + value,
                        {trigger: true});
        }
    });

    return SearchView;

});
/*keypress mi sestituscire un  un evento e, se è == 13 fai blur*/