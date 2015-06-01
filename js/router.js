define(function(require) {

  var $ = require("jquery");
  var Backbone = require("backbone");
  var MyModel = require("models/MyModel");
  var PageableCollection = require("paginator");
  
  var StructureView = require("views/StructureView");
  
  var MyView = require("views/pages/MyView");
  var MapView = require("views/pages/MapView");
  
  //News
  var News = require("models/News");
  var NewsC = require("collections/NewsC");
  var NewsView = require("views/pages/News/NewsView");
  var NewsListView = require("views/pages/News/NewsListView");

  //event
  var Event = require("models/Event");
  var Events = require("collections/Events");
  var EventView = require("views/pages/Event/EventView");
  var EventListView = require("views/pages/Event/EventListView");
  
  //itinerari
  var Itinerario = require("models/Itinerario");
  var Itinerari = require("collections/Itinerari");
  var ItinerariPag = require("collections/ItinerariPag");
  var ItinerarioView = require("views/pages/Itinerari/ItinerarioView");
  var ItinerariListView = require("views/pages/Itinerari/ItinerariListView");
  var ItinerariPagView = require("views/pages/Itinerari/ItinerariPagView");
  
  Backbone.emulateHTTP = true; // Use _method parameter rather than using DELETE and PUT methods
  Backbone.emulateJSON = true; // Send data to server via parameter rather than via request content

  var AppRouter = Backbone.Router.extend({

    constructorName: "AppRouter",

    routes: {
      // the default is the structure view
      "": "showStructure",
      "myview": "myView",
      "map": "map",
      "newsview/:key": "newsView",
      "newslistview": "newsListView",
      "eventlistview": "eventListView",
      "eventview/:key": "eventView",
      "itinerarilistview": "itinerariListView",
      "itineraripagview": "itinerariPagView",
      "itinerarioview/:key": "itinerarioView"
      
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
        key: "Benveuto nell'APP di Abruzzo Expo"
      });
      // create the view
      var page = new MyView({
        model: model
      });
      // show the view
      this.changePage(page);
    },
    newsView: function(key) {
      // highlight the nav1 tab bar element as the current one
      this.structureView.setActiveTabBarElement("nav3");
      var page = new NewsView({
        model: this.currentView.model.get(key)
      });
      // show the view
      this.changePage(page);
    },
    newsListView: function(key) {
      // highlight the nav1 tab bar element as the current one
      this.structureView.setActiveTabBarElement("nav3");
      // create a model with an arbitrary attribute for testing the template engine
      var model = new NewsC();
      model.fetch();
      var page = new NewsListView({
            model: model
      });
      // show the view
      this.changePage(page);
    },
     eventListView: function() {
      // highlight the nav1 tab bar element as the current one
      this.structureView.setActiveTabBarElement("nav4");
      // create a model with an arbitrary attribute for testing the template engine
      var model = new Events();     
      model.fetch();
      var page = new EventListView({
      model: model
      });
      // show the view
      this.changePage(page);
    }, 
     eventView: function(key) {
      // highlight the nav1 tab bar element as the current one
      this.structureView.setActiveTabBarElement("nav4");
      
      var page = new EventView({
        model: this.currentView.model.get(key)
      });
      // show the view
      this.changePage(page);
    },
    itinerariListView: function() {
      // highlight the nav1 tab bar element as the current one
      this.structureView.setActiveTabBarElement("nav5");
      // create a model with an arbitrary attribute for testing the template engine
      var model = new Itinerari();     
      model.fetch();
      var page = new ItinerariListView({
            model: model
      });
      // show the view
      this.changePage(page);
    }, 
    itinerariPagView: function() {
      // highlight the nav1 tab bar element as the current one
      this.structureView.setActiveTabBarElement("nav6");
      // create a model with an arbitrary attribute for testing the template engine
      var model = new ItinerariPag();     
      model.fetch({reset: true});
      var page = new ItinerariPagView({
      model: model
      });
      // show the view
      this.changePage(page);
    }, 
     itinerarioView: function(key) {
      // highlight the nav1 tab bar element as the current one
      this.structureView.setActiveTabBarElement("nav5");
      
      var page = new ItinerarioView({
        model: this.currentView.model.get(key)
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