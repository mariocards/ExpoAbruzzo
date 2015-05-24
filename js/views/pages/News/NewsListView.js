define(function(require) {

  var Backbone = require("backbone");
  var NewsC = require("collections/NewsC");
  var Utils = require("utils");

  var NewsListView = Utils.Page.extend({

    constructorName: "NewsListView",

    model: NewsC,

    initialize: function() {
      // load the precompiled template
      this.template = Utils.templates.newslistview;
      this.listenTo(this.model, 'change', this.render);
    },
    
    id: "newslistview",
    className: "i-g page",
    
    events: {
      "touchend #goToMap": "goToMap"
    },

    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    },

    goToMap: function(e) {
      Backbone.history.navigate("map", {
        trigger: true
      });
    }
  });

  return NewsListView;

});