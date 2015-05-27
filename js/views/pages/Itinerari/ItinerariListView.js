define(function(require) {

  var Backbone = require("backbone");
  var Itinerari = require("collections/Itinerari");
  var Utils = require("utils");
  var ItinerarioView = require("views/pages/Itinerari/ItinerarioView");
  var ItinerariListView = Utils.Page.extend({

    constructorName: "ItinerariListView",

    model : Itinerari,
    
    initialize: function() {
    
      this.template = Utils.templates.itinerarilistview;
      this.model.on('sync', this.render, this);
      //this.listenTo(this.model, 'add', this.render);
     //this.bind("change", this.model.attributes, this.render);
    },

    id: "itinerarilistview",
    className: "i-g page",

    events: {
      "touchend #goToMap": "goToMap",
      "touchend #itinerariListItem": "itinerarioDetail"
    },

    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      
      return this;
    },
    
    itinerarioDetail: function(ev) {
      Backbone.history.navigate("itinerarioview/"+$(ev.currentTarget).data('id'), {
         trigger: true});
    },
    
    
    goToMap: function(e) {
      Backbone.history.navigate("map", {
        trigger: true
      });
    }
  });

  return ItinerariListView;

});