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
      $('#settingsModal').css('display','inline-block');
      $('#toggle-button').css('display','none');
      
    },

    id: "newsview",
    className: "i-g page",

    events: {

    },

    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      
      return this;
    }
  });

  return NewsView;

});