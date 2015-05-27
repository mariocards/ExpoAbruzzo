define(function(require) {

  var Backbone = require("backbone");
  var Events = require("collections/Events");
  var Utils = require("utils");
  var Event = require("models/Event");
  var EventView = require("views/pages/Event/EventView");
  var EventListView = Utils.Page.extend({

    constructorName: "EventListView",

    
    
    model : Events,
    initialize: function() {
    
      this.template = Utils.templates.eventlistview;
      this.model.on('sync', this.render, this);
      //this.listenTo(this.model, 'add', this.render);
     //this.bind("change", this.model.attributes, this.render);
    },

    id: "eventlistview",
    className: "i-g page",

    events: {
      "touchend #goToMap": "goToMap",
      "touchend #eventListItem": "eventDetail"
    },

    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      
      return this;
    },
    
    eventDetail: function(ev) {
      Backbone.history.navigate("eventview/"+$(ev.currentTarget).data('id'), {
         trigger: true});
    },
    
    
    goToMap: function(e) {
      Backbone.history.navigate("map", {
        trigger: true
      });
    }
  });

  return EventListView;

});