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
      this.model.on('sync', this.render, this);
      $('#back-button').css('display','block');
      $('#settingsModal').css('display','block');
    },

    id: "newsview",
    className: "i-g page",

    events: {
      "touchend #goToMap": "goToMap",
      "window.history.back(); #back-button": "goBack"
    },

    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      
      return this;
    },
    goBack : function(){
        navigator.app.backHistory();
        Backbone.history.navigate("newslistview", {
        trigger: true
      });
    },
    goToMap: function(e) {
      Backbone.history.navigate("newslistview", {
        trigger: true
      });
    }
  });

  return NewsView;

});