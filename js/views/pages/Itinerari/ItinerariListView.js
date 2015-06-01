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
       
      this.model.on('add', this.render, this);
      //this.listenTo(this, 'scroll', this.fetchSheets());
     //this.bind("change", this.model.attributes, this.render);
    },

    id: "itinerarilistview",
    className: "i-g page",

    events: {
      "touchend #goToMap": "goToMap",
     // "touchend #itinerariListItem": "itinerarioDetail",
      //"touchend #gimmemore" :  "fetchSheets",
      "mousewheel" : "fetchSheets"
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
        
       this.model.iniziale+=8;
       this.model.finale+=8;
       this.model.fetch({success: this.addSheet()});
  },
    
    
    goToMap: function(e) {
      Backbone.history.navigate("map", {
        trigger: true
      });
    }
  });

  return ItinerariListView;

});