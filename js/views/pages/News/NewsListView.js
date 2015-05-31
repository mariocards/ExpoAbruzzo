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
      this.model.on('sync', this.render, this);
    },
    
    id: "newslistview",
    className: "i-g page",
    
    events: {
      "touchend #goToMap": "goToMap",
      "touchend #eventListItem": "newsDetail",
      "scroll" : "checkScroll"
    },

    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    },

    goToMap: function(e) {
      Backbone.history.navigate("map", {
        trigger: true
      });
    },
    newsDetail: function(ev){
        newsItem=this.model.get($(ev.currentTarget).data('id'));
        var item = {news : newsItem.attributes};
        Backbone.history.navigate("newsview/"+$(ev.currentTarget).data('id'),
        {trigger: true});
    },
    checkScroll : function(){
        
    }
    
  });

  return NewsListView;

});