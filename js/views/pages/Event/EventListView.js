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
      console.log("i need to know your id");
      //console.log($(ev.current).data('id'));
      eventItem=this.model.get($(ev.currentTarget).data('id'));
      
      var item = {event : eventItem.attributes};
      
//      var page = new EventView({
//        model: eventItem.attributes
//      });
//      this.changePage(page);
      //eventItem=this.model.get(id);
//      this.model= item;
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