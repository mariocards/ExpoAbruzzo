define(function (require) {

    var Backbone = require("backbone");

    var Utils = require("utils");

    var CreditsView = Utils.Page.extend({
        constructorName: "CreditsView",
        initialize: function () {
            // load the precompiled template
            this.template = Utils.templates.creditsview;
            $('#back-button').css('display', 'block');

            $('#toggle-button').css('display', 'none');
        },
        id: "creditsview",
        className: "i-g page",
        events: {
        },
        render: function () {
            $(this.el).html(this.template());
            return this;
        }


    });

    return CreditsView;

});