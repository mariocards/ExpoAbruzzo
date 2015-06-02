define(function(require) {

  var Backbone = require("backbone");
  var Search = require("utils");
  var Utils = require("utils");

  var ResultView = Utils.Page.extend({

    constructorName: "ResultView",

    model: Search,

    initialize: function() {
      // load the precompiled template
      this.template = Utils.templates.ricercalistview;
      this.render;
    },

    id: "paginaricerca",
    className: "i-g page",

    events: {
      "touchend #back-button": "goBack",
      "tap #ricercaGenerale" :"doSearch"
    },

    render: function() {
      $(this.el).html(this.template());
      
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