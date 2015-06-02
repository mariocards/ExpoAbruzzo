define(function(require) {

  var Backbone = require("backbone");
  var Search = require("utils");
  var Utils = require("utils");

  var SearchView = Utils.Page.extend({

    constructorName: "SearchView",

    model: Search,

    initialize: function() {
      // load the precompiled template
      this.template = Utils.templates.paginaricerca;
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
    },
    goToMap: function(e) {
      Backbone.history.navigate("map", {
        trigger: true
      });
    },
    doSearch: function(){
    var value = $('#ricercaGeneraleInput').val();
    Backbone.history.navigate("newsview/"+value,
        {trigger: true});  
    }
  });

  return SearchView;

});