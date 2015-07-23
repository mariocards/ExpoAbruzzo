define(function (require) {

    var Backbone = require("backbone");

    var Utils = require("utils");

    var AbruzzoView = Utils.Page.extend({
        constructorName: "AbruzzoView",
        initialize: function () {
            // load the precompiled template
            if(window.localStorage.getItem("lingua") == 1){
                this.template = Utils.templates.abruzzoview;
            }else{
                this.template = Utils.templates.abruzzoviewen;
            }
            
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