define(function(require) {

  var $ = require("jquery");
  var Backbone = require("backbone");
  var MyModel = require("models/MyModel");
  
  var StructureView = require("views/StructureView");
  
  var MyView = require("views/pages/MyView");
  var MapView = require("views/pages/MapView");
  
  var News = require("models/News");
  var NewsView = require("views/pages/NewsView");


    //event
  var Event = require("models/Event");
  var Events = require("collections/Events");
  var EventView = require("views/pages/Event/EventView");
  var EventListView = require("views/pages/Event/EventListView");
  Backbone.emulateHTTP = true; // Use _method parameter rather than using DELETE and PUT methods
  Backbone.emulateJSON = true; // Send data to server via parameter rather than via request content

  var AppRouter = Backbone.Router.extend({

    constructorName: "AppRouter",

    routes: {
      // the default is the structure view
      "": "showStructure",
      "myview": "myView",
      "map": "map",
      "newsview": "newsView",
      "eventlistview": "eventListView",
      "eventview": "eventView"
    },

    firstView: "myview",

    initialize: function(options) {
      this.currentView = undefined;
    },

    myView: function() {
      // highlight the nav1 tab bar element as the current one
      this.structureView.setActiveTabBarElement("nav1");
      // create a model with an arbitrary attribute for testing the template engine
      var model = new MyModel({
        key: "testValue"
      });
      // create the view
      var page = new MyView({
        model: model
      });
      // show the view
      this.changePage(page);
    },
    newsView: function() {
      // highlight the nav1 tab bar element as the current one
      this.structureView.setActiveTabBarElement("nav3");
      // create a model with an arbitrary attribute for testing the template engine
      var news = new News({id:"16"});
      news.fetch();
      console.log(news);
      // create the view
      var page = new NewsView({
        model: news
      });
      // show the view
      this.changePage(page);
    },
     eventListView: function() {
      // highlight the nav1 tab bar element as the current one
      this.structureView.setActiveTabBarElement("nav4");
      // create a model with an arbitrary attribute for testing the template engine
      var model = new Events({id:16});     
      model.fetch();
      var page = new EventListView({
      model: model
      });
      // show the view
      this.changePage(page);
    },
     eventView: function() {
      // highlight the nav1 tab bar element as the current one
      this.structureView.setActiveTabBarElement("nav4");
      // create a model with an arbitrary attribute for testing the template engine
      var model = new Event({id:16});
      model.fetch();
      var page = new EventView({
        model: model
      });
      // show the view
      this.changePage(page);
    },
    map: function() {
      // highlight the nav2 tab bar element as the current one
      this.structureView.setActiveTabBarElement("nav2");
      // create the view and show it
      var page = new MapView();
      this.changePage(page);
    },

    // load the structure view
    showStructure: function() {
      if (!this.structureView) {
        this.structureView = new StructureView();
        // put the el element of the structure view into the DOM
        document.body.appendChild(this.structureView.render().el);
        this.structureView.trigger("inTheDOM");
      }
      // go to first view
      this.navigate(this.firstView, {trigger: true});
    }

  });

  return AppRouter;

});