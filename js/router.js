define(function (require) {

    var $ = require("jquery");
    var Backbone = require("backbone");
    var moment = require("moment");
//    var Slideout = require("slideout");
    var CachedObject = require("cachedobject");
    var MyModel = require("models/MyModel");


    var StructureView = require("views/StructureView");
    var AbruzzoView = require("views/pages/Abruzzo/AbruzzoView");
    var CreditsView = require("views/pages/Abruzzo/CreditsView");
    var ConfigurationView = require("views/pages/Abruzzo/ConfigurationView");
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
    var ItinerariCat = require("collections/ItinerariCat");
    var ItinerarioView = require("views/pages/Itinerari/ItinerarioView");
    var ItinerariListView = require("views/pages/Itinerari/ItinerariListView");
    var ItinerariCatView = require("views/pages/Itinerari/ItinerariCatView");
    //ricerca
    var SearchView = require("views/pages/Search/SearchView");
    var ResultView = require("views/pages/Search/ResultView");
    var Search = require("collections/Search");
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
            "itineraricatlistview": "itinerariCatView",
            "itinerarilistview/:key": "itinerariListView",
            "itinerarioview/:key": "itinerarioView",
            "paginaricerca": "paginaRicerca",
            "risultatoricerca/:key": "risultatoRicerca",
            "newsviewFromSearch/:key": "newsViewFromSearch",
            "eventviewFromSearch/:key": "eventViewFromSearch",
            "itinerarioviewFromSearch/:key": "itinerarioViewFromSearch",
            "abruzzoview": "abruzzoView",
            "creditsview": "creditView",
            "configurationview": "configurationView",
            "restart": "restartView"
        },
        firstView: "myview",
        initialize: function (options) {



            this.currentView = undefined;

        },
        myView: function () {
            // highlight the nav1 tab bar element as the current one
            this.structureView.setActiveTabBarElement("nav1");
            // create a model with an arbitrary attribute for testing the template engine
            var model = new MyModel({
                key: "Benveuto nell'APP di Abruzzo Expo"
            });
//            alert("dentro myview" + window.localStorage.getItem("lingua"));
            // create the view
            var page = new MyView({
                model: model
            });
            // show the view
            this.changePage(page);
        },
        newsViewFromSearch: function (key) {
            this.structureView.setActiveTabBarElement("nav3");
            var news = new News({id: key});
            news.fetch();
            var page = new NewsView({
                model: news
            });
            // show the view
            this.changePage(page);
        },
        eventViewFromSearch: function (key) {
            this.structureView.setActiveTabBarElement("nav4");
            var eventi = new Event({id: key});
            eventi.fetch();
            var page = new EventView({
                model: eventi
            });
            this.changePage(page);
        },
        itinerarioViewFromSearch: function (key) {
            this.structureView.setActiveTabBarElement("nav5");
            var itinerario = new Itinerario({id: key});
            itinerario.fetch();
            var page = new ItinerarioView({
                model: itinerario
            });
            this.changePage(page);
        },
        newsView: function (key) {
            // highlight the nav1 tab bar element as the current one
            this.structureView.setActiveTabBarElement("nav3");

            var page = new NewsView({
                model: this.currentView.model.get(key)
            });
            // show the view
            this.changePage(page);
        },
        newsListView: function () {
            // highlight the nav1 tab bar element as the current one
            this.structureView.setActiveTabBarElement("nav3");
            // create a model with an arbitrary attribute for testing the template engine


            if (CachedObject.emptyNews()) {
//                console.log("Indefinito");

                var model = new NewsC();
                model.fetch();
                CachedObject.setNews(1, model);
                var page = new NewsListView({
                    model: model
                });
            } else {
//                console.log("definito");
                var page = new NewsListView({
                    model: CachedObject.getNews(1)
                });

            }

            // show the view
            this.changePage(page);
        },
        eventListView: function () {
            // highlight the nav1 tab bar element as the current one
            this.structureView.setActiveTabBarElement("nav4");
            // create a model with an arbitrary attribute for testing the template engine
            if (CachedObject.emptyEvents()) {
//                console.log("if");
                var model = new Events();
                model.fetch();
                CachedObject.setEvents(1, model);
                var page = new EventListView({
                    model: model
                });
            } else {
//                console.log("else");
                var page = new EventListView({
                    model: CachedObject.getEvents(1)
                });
            }

            // show the view
            this.changePage(page);
        },
        eventView: function (key) {
            // highlight the nav1 tab bar element as the current one
            this.structureView.setActiveTabBarElement("nav4");
            var page = new EventView({
                model: this.currentView.model.get(key)
            });
            // show the view
            this.changePage(page);
        },
        itinerariCatView: function () {
            // highlight the nav1 tab bar element as the current one
            this.structureView.setActiveTabBarElement("nav5");
            // create a model with an arbitrary attribute for testing the template engine
            var model = new ItinerariCat();
            model.fetch();
            var page = new ItinerariCatView({
                model: model
            });
            // show the view
            this.changePage(page);
        },
        itinerariListView: function (key) {
            // highlight the nav1 tab bar element as the current one
            this.structureView.setActiveTabBarElement("nav5");
            console.log();
            // create a model with an arbitrary attribute for testing the template engine
            if (CachedObject.getEvents(key) === undefined) {
//                console.log("ostie");
                var model = new Itinerari(key);
                model.fetch();
                CachedObject.setIti(key, model);
                var page = new ItinerariListView({
                    model: model
                });
            } else {
//                console.log("diobon");
                var page = new ItinerariListView({
                    model: CachedObject.getIti(key)
                });
            }


            // show the view
            this.changePage(page);
        },
        itinerarioView: function (key) {
            // highlight the nav1 tab bar element as the current one
            this.structureView.setActiveTabBarElement("nav5");
            var page = new ItinerarioView({
                model: this.currentView.model.get(key)
            });
            // show the view
            this.changePage(page);
        },
        risultatoRicerca: function (key) {
            var model = new Search();
            model.text = key;
            model.fetch({success: function () {
                }});
            var page = new ResultView({
                model: model
            });

            this.changePage(page);
        },
        map: function () {
            // highlight the nav2 tab bar element as the current one
            this.structureView.setActiveTabBarElement("nav2");
            // create the view and show it
            var page = new MapView();
            this.changePage(page);
        },
        paginaRicerca: function () {
            this.structureView.setActiveTabBarElement("nav6");
            var page = new SearchView();
            this.changePage(page);
        },
        // load the structure view
        showStructure: function () {
            if (!this.structureView) {
                this.structureView = new StructureView();
                // put the el element of the structure view into the DOM
                document.body.appendChild(this.structureView.render().el);
                this.structureView.trigger("inTheDOM");
            }
            // go to first view
            this.navigate(this.firstView, {trigger: true});
        },
        abruzzoView: function () {
            var page = new AbruzzoView();
            this.changePage(page);
        },
        creditView: function () {
            var page = new CreditsView();
            this.changePage(page);
        },
        configurationView: function () {


            var page = new ConfigurationView({
                notifiche: window.localStorage.getItem("notifica")

            });
            this.changePage(page);
        },
        restartView: function () {
           
        }
    });

    return AppRouter;

});