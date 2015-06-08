define(function(require) {

  var Backbone = require("backbone");
  var Itinerari = require("collections/Itinerari");
  var Utils = require("utils");
  var ItinerariListView = Utils.Page.extend({

    constructorName: "ItinerariListView",

    model : Itinerari,
    
    initialize: function() {       
      this.template = Utils.templates.itinerarilistview;     
      this.model.on('sync', this.render, this);
      $('#back-button').css('display','block');
      $('#settingsModal').css('display','none');
    },

    id: "itinerarilistview",
    className: "i-g page",

    events: {
      "tap #itinerariListItem": "itinerarioDetail",
      "swipeUp #loadMore" : "fetchSheets"  ,
      "tap #back-button":"goBack"
    },
    

    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    },
      
    itinerarioDetail: function(ev) {
      Backbone.history.navigate("itinerarioview/"+$(ev.currentTarget).data('id'), {
         trigger: true});
    },    
    goBack: function(){
        Backbone.history.navigate("itineraricatlistview", {
        trigger: true
      });
    },
    fetchSheets: function () {
       this.model.iniziale+=5;
       this.model.fetch({remove: false});
  }
  
  });

  return ItinerariListView;

});