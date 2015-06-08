define(function(require) {

  var Backbone = require("backbone");
  
  var Utils = require("utils");

  var MyView = Utils.Page.extend({

    constructorName: "MyView",

    initialize: function() {
      // load the precompiled template
      this.template = Utils.templates.myview;
      $('#back-button').css('display','none');
      $('#settingsModal').css('display','none');
    },

    id: "myview",
    className: "i-g page",

    events: {
      "tap #goToMap": "goToMap",
      "tap #homeNews": "goToNews",
      "tap #homeEvents": "goToEvents",
      "tap #homeItinerari": "goToItinerari",
    },

    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    },

    goToMap: function(e) {
      Backbone.history.navigate("map", {
        trigger: true
      });
    },

    goToNews: function(e) {
      Backbone.history.navigate("newslistview", {
        trigger: true
      });
    },

    goToEvents: function(e) {
      Backbone.history.navigate("eventlistview", {
        trigger: true
      });
    },
    goToItinerari: function(e){
        Backbone.history.navigate("itinerarilistview", {
        trigger: true
      });
    }

  });

  return MyView;

});