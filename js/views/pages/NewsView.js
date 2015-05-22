define(function(require) {

  var Backbone = require("backbone");
  var News = require("models/News");
  var Utils = require("utils");

  var NewsView = Utils.Page.extend({

    constructorName: "NewsView",

    model: News,

    initialize: function() {
      // load the precompiled template
      this.template = Utils.templates.newsview;
      // here we can register to inTheDOM or removing events
      // this.listenTo(this, "inTheDOM", function() {
      //   $('#content').on("swipe", function(data){
      //     console.log(data);
      //   });
      // });
      // this.listenTo(this, "removing", functionName);

      // by convention, all the inner views of a view must be stored in this.subViews
    },

    id: "newsview",
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

  return NewsView;

});