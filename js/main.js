// here we put the paths to all the libraries and framework we will use
require.config({
    paths: {
        jquery: '../lib/zepto/zepto', // ../lib/jquery/jquery', 
        underscore: '../lib/underscore/underscore',
        backbone: "../lib/backbone/backbone",
        text: '../lib/require/text',
        async: '../lib/require/async',
        handlebars: '../lib/handlebars/handlebars',
        templates: '../templates',
        leaflet: '../lib/leaflet/leaflet',
        spin: '../lib/spin/spin.min',
        preloader: '../lib/preloader/pre-loader',
        utils: '../lib/utils/utils',
        moment: '../lib/moment/moment',
        helperdateformat: '../lib/dateformat/helper-dataformat',
        offline: '../lib/offline/offline.min',
        slideout: './slideout'
    },
    shim: {
        'jquery': {
            exports: '$'
        },
        'underscore': {
            exports: '_'
        },
        'handlebars': {
            exports: 'Handlebars'
        },
        'leaflet': {
            exports: 'L'
        },
        'moment': {
            exports: 'moment'
        },
        'helperdateformat': {
            exports: 'HelperDateformat'

        },
        'offline': {
            exports: 'Offline'
        }
    }
});

// We launch the App
require(['backbone', 'utils', 'slideout'], function (Backbone, Utils, Slideout) {
    require(['preloader', 'router'], function (PreLoader, AppRouter) {

//        Per funzionare necessita di questi Plugin
//        cordova plugin add org.apache.cordova.dialogs
//        cordova plugin add org.apache.cordova.vibration
//        cordova plugin add cordova-plugin-network-information
        document.addEventListener("offline", onOffline, false);
        document.addEventListener("online", onOline, false);
        document.addEventListener("deviceready", run, false);

        function onOffline() {
            navigator.notification.vibrate(500);
            navigator.notification.alert(
                    'Per Utilizzare questa APP devi essere Connesso', // message
                    alertDismissed, // callback
                    'Attiva una Rete', // title
                    'Ok'                  // buttonName
                    );


        }

        function alertDismissed() {
//            alert("Per utilizzare questa app devi essere connesso");
//            console.log("Per utilizzare questa app devi essere connesso");
        }

        function onOline() {
//            console.log("onOline");
//            alert("sei qualcuno");
            navigator.notification.vibrate(800);
        }

        function checkConnection() {
            var networkState = navigator.connection.type;

            var states = {};
            states[Connection.UNKNOWN] = 'Unknown connection';
            states[Connection.ETHERNET] = 'Ethernet connection';
            states[Connection.WIFI] = 'WiFi connection';
            states[Connection.CELL_2G] = 'Cell 2G connection';
            states[Connection.CELL_3G] = 'Cell 3G connection';
            states[Connection.CELL_4G] = 'Cell 4G connection';
            states[Connection.CELL] = 'Cell generic connection';
            states[Connection.NONE] = 'No network connection';

//            alert('Connection type: ' + states[networkState]);
            return states[networkState];
//            var elem = $("<div>Hello</div>");
//            elem.css('background-color', 'black');
//            elem.css('color', 'white');
//            elem.css('z-index', 100);
//            $('#panel').append(elem);
        }

//        run();

        function run() {
            if (checkConnection() === 'No network connection') {
                navigator.notification.alert(
                    'Per Utilizzare questa APP devi essere Connesso', // message
                    alertDismissed, // callback
                    'Attiva una Rete', // title
                    'Ok'                  // buttonName
                    );
            }
            // Here we precompile ALL the templates so that the app will be quickier when switching views
            // see utils.js
            Utils.loadTemplates().once("templatesLoaded", function () {

                var images = []; // here the developer can add the paths to the images that he would like to be preloaded

                if (images.length) {
                    new PreLoader(images, {
                        onComplete: startRouter
                    });
                } else {
                    // start the router directly if there are no images to be preloaded
                    startRouter();
                }

                var slideoutt = new Slideout({
                    'panel': document.getElementById('panel'),
                    'menu': document.getElementById('menu'),
                    'padding': 256,
                    'tolerance': 70
                });

                // Toggle button
                document.querySelector('#toggle-button').addEventListener('click', function () {
                    slideoutt.toggle();
                });

                function startRouter() {
                    // launch the router
                    var router = new AppRouter();
                    Backbone.history.start();
                }

            });
        }

    });
});