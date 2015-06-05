define(function(require) {

  var Backbone = require("backbone");
  var Event = require("models/Event");
  var Utils = require("utils");

  var EventView = Utils.Page.extend({

    constructorName: "EventView",

    model : Event,
    
    initialize: function() {
    
      this.template = Utils.templates.eventview;
      this.model.on('sync', this.render, this);
      
    },

    id: "eventview",
    className: "i-g page",

    events: {
      "touchend #goToMap": "goToMap",
      "touchend #back-button": "goBack"    
    },

    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      
      return this;
    },
    
     render2: function() {
      $(this.el).html(this.template(this.model.attributes.toJSON()));
      
      return this;
    },
    
    goBack : function(){
        window.history.back();
    },
    
    
    goToMap: function(e) {
      Backbone.history.navigate("map", {
        trigger: true
      });
    }
  });

  return EventView;

});