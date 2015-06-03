define(function(require) {

  var Backbone = require("backbone");
  var Search = require("collections/Search");
  var Utils = require("utils");

  var ResultView = Utils.Page.extend({

    constructorName: "ResultView",

    model: Search,

    initialize: function() {
      this.template = Utils.templates.ricercalistview;
      this.model.on('sync', this.render, this);
    },

    id: "paginaricerca",
    className: "i-g page",

    events: {
        "tap #eventListItem": "eventDetail",
      "touchend #back-button": "goBack",
      "tap #ricercaGenerale" :"doSearch"
    },

    render: function() {
        console.log("ecchiteli");
        console.log(this.model);
      $(this.el).html(this.template(this.model.toJSON()));
      
      return this;
    },
    eventDetail: function (ev) {
        console.log($(ev.currentTarget).data('view') +"/" + $(ev.currentTarget).data('id'));
        
        Backbone.history.navigate($(ev.currentTarget).data('view') +"/" + $(ev.currentTarget).data('id'), {
                trigger: true});
    },
    goBack : function(){
        Backbone.history.navigate("myview", {
        trigger: true
      });
    },
    doSearch: function(){
    var value = $('#ricercaGeneraleInput').val();
    console.log("Ho Preso il valore " + "risultatoricerca/"+value);
    Backbone.history.navigate("risultatoricerca/"+value,
        {trigger: true});  
    }
  });

  

return ResultView;

});
