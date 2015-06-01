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
      console.log(this.model);
       //this.listenTo(this.model.fullCollection , "add", this.addSheet);
      
      this.model.fullCollection.on('reset', this.render, this);
      this.model.fullCollection.on('change', this.addSheet, this);
      
      //this.listenTo(this.model.fullCollection, 'add', this.render);
      
     //this.bind("change", this.model.attributes, this.render);
    },

    id: "itinerarilistview",
    className: "i-g page",

    events: {
      "touchend #goToMap": "goToMap",
      "touchend #itinerariListItem": "itinerarioDetail",
      "touchend #gimmemore" :  "fetchSheets"
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
         console.log("addsheet");
     $(this.el).append(this.template(this.model.toJSON()));
  },
    
    fetchSheets: function () {
        console.log("manda altri");
        console.log("iamo");
        console.log("oooo");
        console.log(this.model.state);
       
        this.model.getPageByOffset(16);
  },
    
    
    goToMap: function(e) {
      Backbone.history.navigate("map", {
        trigger: true
      });
    }
  });

  return ItinerariPagView;

});