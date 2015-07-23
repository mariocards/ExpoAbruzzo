define(function (require) {

    var Backbone = require("backbone");

    var Utils = require("utils");

    var ConfigurationView = Utils.Page.extend({
        constructorName: "ConfigurationView",
        initialize: function (options) {
            this.options = options;
            _.bindAll(this, 'render');
            // load the precompiled template
            this.template = Utils.templates.configurationview;

            $('#back-button').css('display', 'block');
            $('#toggle-button').css('display', 'none');
            var notify = this.options.notifiche;
            if (notify === 'yes') {
                $('#notifica').addClass("active");
            } else {
                $('#notifica').removeClass("active");
            }

        },
        id: "configurationview",
        className: "i-g page",
        events: {
            "click #notifica": "checkStatus"
        },
        checkStatus: function () {
            //Mi dice true 
            var classe = $('#notifica').hasClass("active");
            if (classe) {
                this.attiva();
            } else {
                this.disattiva();
            }
//            alert();
        },
        attiva: function () {
//            alert("Attivando");
            window.localStorage.setItem("notifica", "yes");
//            alert("RegId " + window.localStorage.getItem("regId"));
            var data = {"regId" :window.localStorage.getItem("regId")};
            $.ajax({
                type: 'POST',
                dataType: "text",
                data: data,
                contentType: "application/x-www-form-urlencoded",
                url: 'https://backend.expo.abruzzo.it/gcm/check_reg.php',
                success: function (data) {
//                    alert(data);
                    // alert('Your comment was successfully added');
                },
                error: function () {
                    //console.log(data);
//                    alert('There was an error adding your comment');
                }
            });
        },
        disattiva: function () {
//            alert("Disattivando");
            window.localStorage.setItem("notifica", "no");
//            alert("RegId " + window.localStorage.getItem("regId"));
            var data = {"regId" :window.localStorage.getItem("regId")};
            $.ajax({
                type: 'POST',
                dataType: "text",
                data: data,
                contentType: "application/x-www-form-urlencoded",
                url: 'https://backend.expo.abruzzo.it/gcm/check_reg.php',
                success: function (data) {
                    
//                    alert(data);
                    // alert('Your comment was successfully added');
                },
                error: function () {
                    //console.log(data);
//                    alert('There was an error adding your comment');
                }
            });

        },
        render: function () {
            $(this.el).html(this.template(this.options));



            return this;
        }


    });

    return ConfigurationView;

});