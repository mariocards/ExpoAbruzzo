define(function(require) {

  var Backbone = require("backbone");
  var Itinerario = require("models/Itinerario");
  var Utils = require("utils");

  var ItinerarioView = Utils.Page.extend({

    constructorName: "ItinerarioView",

    model : Itinerario,
    
    initialize: function() {

      this.template = Utils.templates.itinerarioview;
      this.render;
      
    },

    id: "itinerarioview",
    className: "i-g page",

    events: {
      "touchend #goToMap": "goToMap"
     
    },

    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      
      return this;
    },
    
     render2: function() {
      $(this.el).html(this.template(this.model.attributes.toJSON()));
      
      return this;
    },
    
    
    
    
    goToMap: function(e) {
      Backbone.history.navigate("map", {
        trigger: true
      });
    }
  });

  return ItinerarioView;

});