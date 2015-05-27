define(function(require) {

  var Backbone = require("backbone");
  
  var Utils = require("utils");

  var MyView = Utils.Page.extend({

    constructorName: "MyView",

    initialize: function() {
      // load the precompiled template
      this.template = Utils.templates.myview;
      
    },

    id: "myview",
    className: "i-g page",

    events: {
      "touchend #goToMap": "goToMap",
      "touchend #homeNews": "goToNews",
      "touchend #homeEvents": "goToEvents"
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
    }

  });

  return MyView;

});