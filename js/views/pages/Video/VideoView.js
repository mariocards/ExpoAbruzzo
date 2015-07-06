define(function(require) {

  var Backbone = require("backbone");
  var Video = require("models/Video");
  var Utils = require("utils");

  var VideoView = Utils.Page.extend({

    constructorName: "VideoView",

    model : Video,
    
    initialize: function() {
    
      this.template = Utils.templates.videoview;
      this.model.on('sync', this.render, this);
      $('#back-button').css('display','block');
      $('#settingsModal').css('display','inline-block');
      $('#toggle-button').css('display','none');
      
    },

    id: "videoview",
    className: "i-g page",

    events: {  
    },

    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      
      return this;
    }
  });

  return VideoView;

});