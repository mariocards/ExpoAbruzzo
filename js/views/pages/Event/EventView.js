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
      $('#back-button').css('display','block');
      $('#settingsModal').css('display','inline-block');
      $('#toggle-button').css('display','none');
    },

    id: "eventview",
    className: "i-g page",

    events: {  
    },

    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      
      return this;
    }
  });

  return EventView;

});