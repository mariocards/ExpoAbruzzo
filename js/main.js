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
        slideout: './slideout',
        cachedobject: './cachedObject'
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
//        cordova plugin add https://github.com/phonegap-build/PushPlugin.git
//        cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-device.git
//        cordova plugin add cordova-plugin-file
//        cordova plugin add org.apache.cordova.media
//        cordova plugin add cordova-plugin-globalizations
        document.addEventListener("offline", onOffline, false);
        
        document.addEventListener("deviceready", run, false);


        function onOffline() {
//            navigator.notification.vibrate(50);
            navigator.notification.alert(
                    'Per Utilizzare Expo Abruzzo devi essere connesso ad Internet', // messagio no rete
                    alertDismissed, // Callback che non usiamo al momento
                    'Attiva una Rete', // Titolo Messaggio errore
                    'Ok'                  // Nome del Bottone
                    );
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
            return states[networkState];
        }
            function run() {

            // Here we precompile ALL the templates so that the app will be quickier when switching views
            // see utils.js

            window.localStorage.getItem("lingua");
            
            
            Utils.loadTemplates().once("templatesLoaded", function () {
                /*
                 * 
                 * @type Array
                 * 'img/pasta-663096_1920.jpg',
                 'img/newspapers-444447_1920.jpg',
                 'img/video-multiple500x333.jpg',
                 'img/8750395302_37ce8c2a6e_k.jpg',
                 'img/itinerari/delgustod.jpg',
                 'img/itinerari/inbici.jpg',
                 'img/itinerari/suglisci.jpg',
                 'img/itinerari/acavallo.jpg',
                 'img/itinerari/inmoto.jpg',
                 'img/itinerari/spirito.jpg'
                 */

                var images = ['img/pasta-663096_1920.jpg',
                    'img/pasta-663096_1920.jpg',
                    'img/newspapers-444447_1920.jpg',
                    'img/video-multiple500x333.jpg',
                    'img/8750395302_37ce8c2a6e_k.jpg',
                    'img/itinerari/delgustod.jpg',
                    'img/itinerari/inbici.jpg',
                    'img/itinerari/suglisci.jpg',
                    'img/itinerari/acavallo.jpg',
                    'img/itinerari/inmoto.jpg',
                    'img/itinerari/spirito.jpg']; // here the developer can add the paths to the images that he would like to be preloaded

                if (images.length) {
                    new PreLoader(images, {
                        onComplete: startRouter
                    });
                } else {
                    // start the router directly if there are no images to be preloaded
                    startRouter();
                }
                function startRouter() {
                    // launch the router

                    var router = new AppRouter();
                    Backbone.history.start();
                    var slideoutt = new Slideout({
                        'panel': document.getElementById('panel'),
                        'menu': document.getElementById('menu'),
                        'padding': 256,
                        'tolerance': 70,
                        'swipeRegion': 40
                    });
                    // Toggle button
                    document.querySelector('#content').addEventListener('click', function () {
                        if (slideoutt.isOpen()) {
                            slideoutt.toggle();
                        }
                    });
                    // Toggle button
                    $('#menu li span').on('click', function () {
                        slideoutt.toggle();
                    });
                    // Toggle button
                    document.querySelector('#toggle-button').addEventListener('click', function () {
                        slideoutt.toggle();
                    });

                }

            });
        }

    });

});