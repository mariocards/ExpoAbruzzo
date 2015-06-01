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
      this.model.on('add', this.render, this);
    },
    
    id: "newslistview",
    className: "i-g page",
    
    events: {
      "touchend #goToMap": "goToMap",
      "touchend #eventListItem": "newsDetail",
      "touchend #loadMore" : "fetchSheets"
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
      addSheet: function () {
          
        $(this.el).append(this.template(this.model.toJSON()));
  },
    
    fetchSheets: function () {
       this.model.iniziale+=8;
       this.model.finale+=8;
       this.model.fetch({success: this.addSheet()});
  }
    
  });

  return NewsListView;

});