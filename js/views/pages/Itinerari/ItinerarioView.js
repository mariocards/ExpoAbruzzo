define(function(require) {

  var Backbone = require("backbone");
  var Itinerario = require("models/Itinerario");
   var L = require("leaflet");
  var Utils = require("utils");

  var ItinerarioView = Utils.Page.extend({

    constructorName: "ItinerarioView",

    model : Itinerario,
    
    initialize: function() {

      this.template = Utils.templates.itinerarioview;
      this.model.on('sync', this.render, this);
       
    },

    id: "itinerarioview",
    className: "i-g page",

    events: {

      "touchend #goToMap": "goToMap",
      "tap #back-button": "goBack",
      "tap #map-button": "addMap"  
     
    },
    
    addMap: function() {
         $("#content").append("<div id=\"map\" style=\"height:100%;\"></div>");
      // the center of the map is the address of the University of L'Aquila
      var mapCenter = {
        lat: 42.3676443,
        lon: 13.3496695
      };

      var options = {
        center: new L.LatLng(mapCenter.lat, mapCenter.lon),
        zoom: 12
      };

      // create the map
      var map = L.map('map', options);
      // say thanks to Leaflet
      map.attributionControl.setPrefix("Leaflet");

      // create a marker and add it to the map
      L.marker([mapCenter.lat, mapCenter.lon]).addTo(map);

      // add a layer showing Open Street Map's tiles
      var layer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; OpenStreetMap',
        maxZoom: 20
      });
      map.addLayer(layer);
      console.log(map);
    },
 
    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
     
      return this;
    },
    
    goBack : function(){

    window.history.back();
    },
    goToMap: function(e) {
      Backbone.history.navigate("map", {
        trigger: true
      });
    }
    
  });

  return ItinerarioView;

});