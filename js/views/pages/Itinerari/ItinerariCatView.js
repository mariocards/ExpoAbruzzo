define(function(require) {

  var Backbone = require("backbone");
  var ItinerariCat = require("collections/ItinerariCat");
  var Utils = require("utils");
  var ItinerariCatView = Utils.Page.extend({

    constructorName: "ItinerariCatView",

    model : ItinerariCat,
    
    initialize: function() {       
      this.template = Utils.templates.itineraricat;     
      this.model.on('sync', this.render, this);
    },

    id: "itineraricatview",
    className: "i-g page",

    events: {
      "tap #itinerariCatListItem": "itinerariList"
    
    },
    

    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    },
      
    itinerariList: function(ev) {
      Backbone.history.navigate("itinerarilistview/"+$(ev.currentTarget).data('id'), {
         trigger: true});
    }
  
  });

  return ItinerariCatView;

});