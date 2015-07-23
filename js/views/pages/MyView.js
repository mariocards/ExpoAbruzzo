define(function(require) {

  var Backbone = require("backbone");
  
  var Utils = require("utils");

  var MyView = Utils.Page.extend({

    constructorName: "MyView",

    initialize: function() {
      // load the precompiled template
      this.template = Utils.templates.myview;
      $('#back-button').css('display','none');
      
      $('#toggle-button').css('display','block');
    },

    id: "myview",
    className: "i-g page",

    events: {
      "tap #homeAbruzzo": "goToAbruzzo",
      "tap #homeNews": "goToNews",
      "tap #homeEvents": "goToEvents",
      "tap #homeItinerari": "goToItinerari",
      "tap #homeItinerari2": "goToItinerari"
    },

    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    },

    goToAbruzzo: function(e) {
      Backbone.history.navigate("abruzzoview", {
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
        Backbone.history.navigate("itineraricatlistview", {
        trigger: true
      });
    }

  });

  return MyView;

});