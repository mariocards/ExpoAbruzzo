define(function(require) {

  var Backbone = require("backbone");
  var Search = require("collections/Search");
  var Utils = require("utils");

  var ResultView = Utils.Page.extend({

    constructorName: "ResultView",

    model: Search,

    initialize: function() {
     
      this.template = Utils.templates.ricercalistview;
      console.log(this.model);
       this.model.on('sync', this.render, this);
    },

    id: "paginaricerca",
    className: "i-g page",

    events: {
      "touchend #back-button": "goBack",
      "tap #ricercaGenerale" :"doSearch"
    },

    render: function() {
        console.log("ecchiteli");
        console.log(this.model);
      $(this.el).html(this.template(this.model.toJSON()));
      
      return this;
    },
    goBack : function(){
        Backbone.history.navigate("myview", {
        trigger: true
      });
    }
  });

  return ResultView;

});