define(function(require) {

  var Backbone = require("backbone");
  var Events = require("collections/Events");
  var Utils = require("utils");

  var EventListView = Utils.Page.extend({

    constructorName: "EventListView",

    
    
    model : Events,
    initialize: function() {
    
      this.template = Utils.templates.eventlistview;
      this.listenTo(this.model, 'add', this.render);
      
    },

    id: "eventlistview",
    className: "i-g page",

    events: {
      "touchend #goToMap": "goToMap",
      
    },

    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      
      return this;
    },
    
    
    
    goToMap: function(e) {
      Backbone.history.navigate("map", {
        trigger: true
      });
    }
  });

  return EventListView;

});