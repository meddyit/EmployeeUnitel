// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova', 'ngStorage'])

.run(function($ionicPlatform, $ionicPopup, $state, $ionicHistory, $http, $localStorage, $sessionStorage) {
    
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
      
    document.addEventListener("offline", onOffline, false);
    document.addEventListener("online", onOnline, false);
   
    function onOffline() {
		alert('offline');
		//$state.go('app.network_connection');
	} 
      
      
	function onOnline() {
        
        //JSON.parse(window.localStorage.get(""));
        
		alert('online agaya');
        
        alert("image=" + localStorage.getItem("image"));
        alert("data="+localStorage.getItem("data"));
        
        var image = localStorage.getItem("image");
        alert(image);
        
        var data = localStorage.getItem("data");
        alert(data);
        
       // var data1 = JSON.parse(data);
      //    alert(data1);
        
         var options = new FileUploadOptions();
         options.fileKey="file";
         options.fileName="helloo"
         options.chunkedMode = false;
         options.mimeType="text/plain";
        
        options.params=JSON.parse(data);
        
        
        alert(JSON.stringify(options));
        var ft = new FileTransfer();
        ft.upload(image, encodeURI("http://192.168.1.126/serv/service/get_image"), 
                function(res)
                {
                    alert('success :'+JSON.stringify(res));
                    localStorage.clear();
                },             
               function(err)
               {
                    alert('error :'+JSON.stringify(err));
               }, options); 
        
        /* http({  
                url:"http://192.168.1.126/serv/service/get_image",
                method:"post",
                Header:{'content_type': undefined},
                params: image
       }).then(function (response) {
                    alert('success :'+JSON.stringify(response));
                }    
                , function (error) {
                    alert("Error" + JSON.stringify(error));
                });*/
                alert("bhai gaya kya");
        
 		//$ionicHistory.goBack();
	}  
      
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.travel_details', {
      url: '/travel_details',
      views: {
        'menuContent': {
          templateUrl: 'templates/travel_details.html'
        }
      }
    })
    .state('app.tasklists', {
      url: '/tasklists',
      views: {
        'menuContent': {
          templateUrl: 'templates/task.html',
          controller: 'TasklistsCtrl'
        }
      }
    })
     
  .state('app.camera', {
    url: '/tasklists/:taskId',
    views: {
      'menuContent': {
        templateUrl: 'templates/camera.html',
        controller: 'CameraCtrl'
      }
    }
  })
    
    .state('app.network_connection', {
      url: '/network_connection',
      views: {
        'menuContent': {
          templateUrl: 'templates/network_connection.html',
          
        }
      }
    })
    .state('app.leave', {
    url: '/leave',
    views: {
      'menuContent': {
        templateUrl: 'templates/leave.html',
        controller: 'leaveCtrl'
      }
    }
  })

     .state('app.new_asset', {
    url: '/new_asset',
    views: {
      'menuContent': {
        templateUrl: 'templates/new_asset.html',
       
      }
    }
  })

      .state('app.asset_info', {
    url: '/asset_info',
    views: {
      'menuContent': {
        templateUrl: 'templates/asset_info.html',
        controller: 'assetinfo'
      }
    }
  })
    
    .state('login', {
        url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'AccountCtrl'
          });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});


