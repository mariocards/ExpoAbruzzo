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
        document.addEventListener("offline", onOffline, false);
        document.addEventListener("online", onOline, false);
//        document.addEventListener("deviceready", run, false);
        
        run();

        function onOffline() {
            navigator.notification.vibrate(50);
            navigator.notification.alert(
                    'Per Utilizzare Expo Abruzzo devi essere connesso ad Internet', // messagio no rete
                    alertDismissed, // Callback che non usiamo al momento
                    'Attiva una Rete', // Titolo Messaggio errore
                    'Ok'                  // Nome del Bottone
                    );
        }

        function alertDismissed() {
            //Al momento non è usata, questa è òa collback della alert.
            //magari la usiamo per gestire meglio l'errore della rete assente
        }

        function onOline() {
            navigator.notification.vibrate(80);
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




        var pushNotification;

        function onDeviceReady2() {
//            alert('deviceready event received');
            $("#main").append('<li>deviceready event received</li>');


            try
            {
//                alert(window.plugins.pushNotification);
                pushNotification = window.plugins.pushNotification;

//                alert(pushNotification);
                $("#main").append('<li>registering ' + device.platform + '</li>');
                if (device.platform == 'android' || device.platform == 'Android' ||
                        device.platform == 'amazon-fireos') {
//                    alert("gioia");


                    pushNotification.register(successHandler, errorHandler, {"senderID": "431217405561", "ecb": "onNotification"});		// required!
                } else {
                    pushNotification.register(tokenHandler, errorHandler, {"badge": "true", "sound": "true", "alert": "true", "ecb": "onNotificationAPN"});	// required!
                }
            }
            catch (err)
            {
                txt = "There was an error on this page.\n\n";
                txt += "Error description: " + err.message + "\n\n";

//                alert(txt);
            }
            onNotification = function (e) {

                $("#app-status-ul").append('<li>EVENT -> RECEIVED:' + e.event + '</li>');
//                alert(e);
                switch (e.event)
                {
                    case 'registered':
//                        alert(e.regid);
//                        alert("registrato");
                        if (e.regid.length > 0)
                        {
//                            alert(e.regid);
                            $("#app-status-ul").append('<li>REGISTERED -> REGID:' + e.regid + "</li>");

                            var postData = {regId: e.regid, type: device.platform, device: device.model};

                            //alert(JSON.stringify(postData));

                            $.ajax({
                                type: 'POST',
                                dataType: "text",
                                data: postData,
                                contentType: "application/x-www-form-urlencoded",
                                url: 'https://backend.expo.abruzzo.it/gcm/register.php',
                                success: function (data) {
                                    var decode = JSON.parse(data);
                                      // alert(decode.flag);
                                    window.localStorage.setItem("notifica", decode.flag);
                                    window.localStorage.setItem("regId", e.regId);
                                    //alert('Your comment was successfully added');
                                 
                                  
                                },
                                error: function () {
                                    //console.log(data);
                                    alert('There was an error adding your comment');
                                }
                            });


                            
                        }
                        break;

                    case 'message':

                       // alert("message" + JSON.stringify(e));
                        navigator.notification.alert(e.payload.message);

                        // if this flag is set, this notification happened while we were in the foreground.
                        // you might want to play a sound to get the user's attention, throw up a dialog, etc.
                        if (e.foreground)
                        {

//                            alert("messageif");
                            $("#app-status-ul").append('<li>--INLINE NOTIFICATION--' + '</li>');

                            // on Android soundname is outside the payload. 
                            // On Amazon FireOS all custom attributes are contained within payload
                            var soundfile = e.soundname || e.payload.sound;
                            // if the notification contains a soundname, play it.
                            // playing a sound also requires the org.apache.cordova.media plugin
                            var my_media = new Media("/android_asset/www/" + soundfile);

                            my_media.play();
                        }
                        else
                        {	// otherwise we were launched because the user touched a notification in the notification tray.
//                            alert("messageelse");
                            if (e.coldstart)
                                $("#app-status-ul").append('<li>--COLDSTART NOTIFICATION--' + '</li>');
                            else
                                $("#app-status-ul").append('<li>--BACKGROUND NOTIFICATION--' + '</li>');
                        }
                        
                        $("#app-status-ul").append('<li>MESSAGE -> MSG: ' + e.payload.message + '</li>');
                        //android only
                        $("#app-status-ul").append('<li>MESSAGE -> MSGCNT: ' + e.payload.msgcnt + '</li>');
                        //amazon-fireos only
                        $("#app-status-ul").append('<li>MESSAGE -> TIMESTAMP: ' + e.payload.timeStamp + '</li>');
                        break;

                    case 'error':
//                        alert("errore");
                        $("#app-status-ul").append('<li>ERROR -> MSG:' + e.msg + '</li>');
                        break;

                    default:
//                        alert("defauult");
                        $("#app-status-ul").append('<li>EVENT -> Unknown, an event was received and we do not know what it is</li>');
                        break;
                }
            };
        }

        // handle APNS notifications for iOS
        function onNotificationAPN(e) {
            if (e.alert) {
                $("#app-status-ul").append('<li>push-notification: ' + e.alert + '</li>');
                // showing an alert also requires the org.apache.cordova.dialogs plugin
                navigator.notification.alert(e.alert);
            }

            if (e.sound) {
                // playing a sound also requires the org.apache.cordova.media plugin
                var snd = new Media(e.sound);
                snd.play();
            }

            if (e.badge) {
                pushNotification.setApplicationIconBadgeNumber(successHandler, e.badge);
            }
        }

        // handle GCM notifications for Android


        function tokenHandler(result) {
            $("#app-status-ul").append('<li>token: ' + result + '</li>');
            // Your iOS push server needs to know the token before it can push to this device
            // here is where you might want to send it the token for later use.
        }

        function successHandler(result) {
            // $("#app-status-ul").append('<li>success:' + result + '</li>');
            //onNotification(result);
//            alert('success:' + result);
        }

        function errorHandler(error) {
            $("#app-status-ul").append('<li>error:' + error + '</li>');
            navigator.notification.alert(
                    'Errore Notifiche', // messagio no rete
                    alertDismissed, // Callback che non usiamo al momento
                    'Problema Notifiche', // Titolo Messaggio errore
                    'Ok'                  // Nome del Bottone
                    );

        }



        function run() {
//            if (checkConnection() === 'No network connection') {
//                navigator.notification.alert(
//                    'Per Utilizzare questa APP devi essere Connesso', // messagio no rete
//                    alertDismissed, // Callback che non usiamo al momento
//                    'Attiva una Rete', // Titolo Messaggio errore
//                    'Ok'                  // Nome del Bottone
//                    );
//            }
            // Here we precompile ALL the templates so that the app will be quickier when switching views
            // see utils.js

            onDeviceReady2();

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
                       if(slideoutt.isOpen()){
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