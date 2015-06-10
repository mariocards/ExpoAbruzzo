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
      $('#back-button').css('display','block');
      $('#settingsModal').css('display','none');
      $('#toggle-button').css('display','none');
      
    },

    id: "itineraricatview",
    className: "i-g page",

    events: {
      "tap #itinerariCatListItem": "itinerariList",
      "tap #back-button" : "goBack"
    },
    goBack: function(){
        Backbone.history.navigate("myview", {
         trigger: true});
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