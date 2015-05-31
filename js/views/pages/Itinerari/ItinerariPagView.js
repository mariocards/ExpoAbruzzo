define(function(require) {

  var Backbone = require("backbone");
  var ItinerariPag = require("collections/ItinerariPag");
  var Utils = require("utils");
  var ItinerarioView = require("views/pages/Itinerari/ItinerarioView");
  var ItinerariPagView = Utils.Page.extend({

    constructorName: "ItinerariPagView",

    model : ItinerariPag,
    
    initialize: function() {
    
      this.template = Utils.templates.itinerarilistview;
       this.listenTo(this.collection.fullCollection, "add", this.addSheet);
        this.render;
      //this.listenTo(this.model, 'add', this.render);
     //this.bind("change", this.model.attributes, this.render);
    },

    id: "itinerarilistview",
    className: "i-g page",

    events: {
      "touchend #goToMap": "goToMap",
      "touchend #itinerariListItem": "itinerarioDetail",
      "scroll": "fetchSheets"
    },

    render: function() {
     
      $(this.el).html(this.template(this.model.toJSON()));
      
      return this;
    },
    
    itinerarioDetail: function(ev) {
      Backbone.history.navigate("itinerarioview/"+$(ev.currentTarget).data('id'), {
         trigger: true});
    },
    
     addSheet: function () {
     $(this.el).html(this.template(this.model.toJSON()));
  },
    
    fetchSheets: function () {
    this.collection.getNextPage();
  },
    
    
    goToMap: function(e) {
      Backbone.history.navigate("map", {
        trigger: true
      });
    }
  });

  return ItinerariPagView;

});