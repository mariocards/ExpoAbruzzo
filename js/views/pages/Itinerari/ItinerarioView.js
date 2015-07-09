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
      $('#back-button').css('display','block');
      $('#settingsModal').css('display','inline-block'); 
      
    },

    id: "itinerarioview",
    className: "i-g page",

    events: {
      "tap #map-button": "codeAddress",
      "tap .modal" : "doSomething",
      "tap .media" : "goToPoi"
     
    },
    goToPoi: function(){
        alert("");
    },
    doSomething: function(){
        $('.modal').scrollTop(0);
    },
    codeAddress: function() {
        var address = this.model.get('partenza');
        var geocoder = new google.maps.Geocoder();
        var self=this;
        geocoder.geocode({'address': address}, function(results, status) {

            if (status == google.maps.GeocoderStatus.OK) {

             self.addMap(results[0].geometry.location);
                 } else {
            addMap();
            }
        });
    },
    
    addMap: function(posizione) {
         $("#content").append("<div id=\"map\" style=\"height:100%;\"></div>");
      // the center of the map is the address of the University of L'Aquila
  
      var mapCenter = {
        lat: posizione.A,
        lon: posizione.F
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
      
    },
 
    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
     
      return this;
    }
    
  });

  return ItinerarioView;

});