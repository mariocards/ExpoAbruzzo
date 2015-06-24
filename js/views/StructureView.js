define(function (require) {

    var $ = require("jquery");
    var Backbone = require("backbone");
    var Utils = require("utils");
    var CachedObject = require("cachedobject");
    var StructureView = Backbone.View.extend({
        constructorName: "StructureView",
        id: "main",
        events: {
            "tap #nav1": "myView",
            "tap #nav2": "map",
            "tap #nav3": "newsListView",
            "tap #nav4": "eventListView",
            "tap #nav5": "itinerariCatListView",
            "tap #nav6": "search",
            "tap #nav7": "credits",
            "tap #nav8": "configuration",
            "tap #back-button": "goBack",
            "tap #settingsModal": "search",
            "tap #lang_uk": "changeToEn",
            "tap #lang_it": "changeToIt"
        },
        initialize: function (options) {
            // load the precompiled template
            this.template = Utils.templates.structure;
            //this.on("inTheDOM", this.rendered);
            // bind the back event to the goBack function
            //document.getElementById("back").addEventListener("back", this.goBack(), false);
            $('#toggle-button').css('display', 'block');
        },
        render: function () {
            // load the template
            this.el.innerHTML = this.template({});
            // cache a reference to the content element
            this.contentElement = this.$el.find('#content')[0];
            return this;
        },
        // rendered: function(e) {
        // },

        // generic go-back function
        goBack: function () {
            window.history.back();
        },
        setActiveTabBarElement: function (elementId) {
            // here we assume that at any time at least one tab bar element is active
            document.getElementsByClassName("active")[0].classList.remove("active");
            document.getElementById(elementId).classList.add("active");
        },
        map: function (event) {
            Backbone.history.navigate("map", {
                trigger: true
            });
        },
        myView: function (event) {
            Backbone.history.navigate("myview", {
                trigger: true
            });
        },
        newsView: function (event) {
            Backbone.history.navigate("newsview", {
                trigger: true
            });
        },
        newsListView: function (event) {
            Backbone.history.navigate("newslistview", {
                trigger: true
            });
        },
        eventListView: function (event) {
            Backbone.history.navigate("eventlistview", {
                trigger: true
            });
        },
        eventView: function (event) {
            Backbone.history.navigate("eventview", {
                trigger: true
            });
        },
        itinerariListView: function (event) {
            Backbone.history.navigate("itinerarilistview", {
                trigger: true
            });
        },
        itinerariCatListView: function (event) {
            Backbone.history.navigate("itineraricatlistview", {
                trigger: true
            });
        },
        search: function (event) {
            Backbone.history.navigate("paginaricerca", {
                trigger: true
            });
        },
        itinerariView: function (event) {
            Backbone.history.navigate("itinerarioview", {
                trigger: true
            });
        },
        credits: function () {
            Backbone.history.navigate("creditsview", {
                trigger: true
            });
        },
        configuration: function () {
            Backbone.history.navigate("configurationview", {
                trigger: true
            });
        },
        changeToEn: function () {
            alert("Sono entrato tin changeToEn");
            window.localStorage.setItem("lingua", 2);
            CachedObject.eraseAll();
            Backbone.history.navigate("myview", {
                trigger: true
            });
        },
        changeToIt: function () {
            alert("Sono entrato tin changeToIt");
            window.localStorage.setItem("lingua", 1);
            CachedObject.eraseAll();
            Backbone.history.navigate("myview", {
                trigger: true
            });
        }
    });

    return StructureView;

});