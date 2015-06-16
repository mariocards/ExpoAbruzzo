define(function (require) {

    var Backbone = require("backbone");

    var Utils = require("utils");

    var AbruzzoView = Utils.Page.extend({
        constructorName: "AbruzzoView",
        initialize: function () {
            // load the precompiled template
            this.template = Utils.templates.abruzzoview;
            $('#back-button').css('display', 'block');

            $('#toggle-button').css('display', 'none');
        },
        id: "abruzzoview",
        className: "i-g page",
        events: {
        },
        render: function () {
            $(this.el).html(this.template());
            return this;
        }


    });

    return AbruzzoView;

});