angular.module('starter.controllers', ['ionic', 'ngCordova', 'starter.services', 'ngStorage'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('TasklistsCtrl' ,function($scope, $http) {
    
/*    
           
        taskService.tasklist().success(function(data) {
        $scope.date = new Date();
             console.log($scope.date);
                $scope.Task = data;
                console.log(data);
        })
            .error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });

         */
    
    
 
  $http.get('http://192.168.1.126/serv/service/get_taskJson').success(function (data) {
                $scope.date = new Date();
             console.log($scope.date);
                $scope.Task = data;
                console.log(data);
               
            });
      
})



.controller('CameraCtrl' ,function($scope, $http,  $localStorage, $sessionStorage) {
    
    $scope.doc_types=[{opt: 'Complete'}, {opt: 'Not Complete'}];
    $scope.data = {};
    
    //$localStorage.data=$data;
    //$localStorage.data.data=
    
    $scope.takePic = function() {
        var options =   {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: 1,      // 0:Photo Library, 1=Camera, 2=Saved Photo Album
            encodingType: 0     // 0=JPG 1=PNG
        }

         navigator.camera.getPicture(onSuccess,onFail,options);
    }
    var onSuccess = function(FILE_URI) {
        console.log(FILE_URI);
        $scope.picData = FILE_URI;
        $scope.$apply();
        alert("image"+FILE_URI)
    };
    var onFail = function(e) {
        console.log("On fail " + e);
        alert("fail;");
    }
    
    $scope.uploadFile = function(text, drop_down) {

        $scope.data={    
            data: text,
            document_type: drop_down,
        };        
        
        $scope.myImg = $scope.picData;
        alert("myImg"+$scope.myImg);
        
        var options = new FileUploadOptions();
        options.fileKey="file";
        options.fileName="helloo"
        options.chunkedMode = false;
        options.mimeType="text/plain";
        options.params = $scope.data;
        
        //params.user_token = localStorage.getItem('auth_token');
        //params.user_email = localStorage.getItem('email');
       // options.params = $scope.params;
        
        var ft = new FileTransfer();
        alert("phauch gaya");

        if(window.Connection) {
        if(navigator.connection.type == Connection.NONE) {
           
                alert("The internet is disconnected on your device.");  
            localStorage.setItem("image", $scope.myImg);    
            localStorage.setItem("data", JSON.stringify($scope.data));
                
            alert("image=" + localStorage.getItem("image"));    
            alert("data="+localStorage.getItem("data"));
                
}

else{
              
                ft.upload($scope.myImg, encodeURI("http://192.168.1.126/serv/service/get_image"), 
                function(res)
                {
              //navigator.notification.activityStop();
                alert('success :'+JSON.stringify(res));
                },             
               function(err)
               {
               alert('error :'+JSON.stringify(err));
               }, options); 
} 
            
            
        }
    }; 
})




.controller('AccountCtrl',  function($scope, LoginService, $ionicPopup, $state, $ionicSideMenuDelegate, $ionicHistory) {
    
    $ionicHistory.nextViewOptions({
    disableBack: true
  });
  
    $scope.data = { 
    };
 
    $scope.account = function() {
           // alert(JSON.stringify($scope.data));
        LoginService.loginUser($scope.data).success(function(data) {
        //alert("welcome");  
         $state.go('app.tasklists');
        })
            .error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });

        //LoginService.loginUser('user','secret').then(function (res){
          //  alert(JSON.stringify(res));
   // })
    }
})


//leave controller

.controller('leaveCtrl',['$scope','$http',function($scope,$http){
  alert("in controller");

     $scope.data={




     };
  

  $scope.submitForm = function() {


  alert(JSON.stringify($scope.data));
   
      $http({
          method  : 'POST',
          url     : 'http://192.168.1.126/serv/service/leave',
          data    :  $scope.data,
          headers : { 'Content-Type': 'application/x-www-form-urlencoded' } 
         })
          .success(function(data) {

            alert("saved");
             $state.go('app.tasklists');
         
          });



  
  }




}])



//asset controller
.controller('assetinfo',function($scope,$state){

alert("in controller");

$scope.assets=["Asset1","Asset2","Asset3","Asset4","Asset5","Asset6","Asset7"];
$scope.btclicked=function()
{
 //window.location = "new_asset.html";
$state.go("app.new_asset");

}



})

/*.controller('availableAssets',function($scope){

  alert("in availableAssets");
    $scope.allAssets=["NewAsset1","NewAsset2","NewAsset3","NewAsset4","NewAsset5","NewAsset6","NewAsset7"];
})

.controller('request',function($scope,$http){
  alert("in req");

$scope.data={};

$scope.submitRequest=function(){
  alert("is clicked ");
 $http({
        method  : 'POST',
          url     : 'http://192.168.1.126/serv/service/get_asset',
          data    :  $scope.data,
          headers : { 'Content-Type': 'application/x-www-form-urlencoded' } 

         }).success(function(res) {
              alert(res);

          })

}




})*/




//get asset data from server

.controller('availableAssets',function($scope,$http){

alert("availble");
 
 $http.get("http://192.168.1.126/serv/service/send_asset")
.success(function(response) {   
//.then(function(response) {
alert("hit");
alert(JSON.stringify(response));

        $scope.allAssets = response;

})
})

.controller('request',function($scope,$http){
  alert("in req");

$scope.data={};

$scope.submitRequest=function(){
  alert("is clicked ");
 $http({
        method  : 'POST',
          url     : 'http://192.168.1.126/serv/service/get_asset',
          data    :  $scope.data,
          headers : { 'Content-Type': 'application/x-www-form-urlencoded' } 

         }).success(function(res) {
              alert(res);

          })

}




})





//travel

.controller('myCtrl',function($scope){
  alert("In myCtrl");

  $scope.todos=["Project1","Project2","Project3","Project4","Project5","Project6","Project7"];
})


.controller('formCtrl',function($scope, $http,  $localStorage, $sessionStorage) {  
 
  alert("in formCtrl");
   $scope.data = {};
   alert(JSON.stringify($scope.data));

    $scope.takePicture = function() {
        var options =   {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: 1,      
            encodingType: 0     
        }

         navigator.camera.getPicture(onSuccess,onFail,options);
    }
    var onSuccess = function(FILE_URI) {
        console.log(FILE_URI);
        $scope.picData = FILE_URI;
        $scope.$apply();
        alert("image"+FILE_URI)
    };
    var onFail = function(e) {
        console.log("On fail " + e);
        alert("fail;");
    }


    $scope.submitForm = function() {       
        
        $scope.myImg = $scope.picData;
        alert("myImg"+$scope.myImg);
         var options = new FileUploadOptions();
        options.fileKey="file";
        options.fileName="helloo"
        options.chunkedMode = false;
        options.mimeType="text/plain";
        $scope.params = $scope.data;
   
        options.params = $scope.params;
        var ft = new FileTransfer();
        alert("phauch gaya");

       
              
                ft.upload($scope.myImg, encodeURI("http://192.168.1.126/serv/service/travel_expense"), 
                function(res)
                {
              //navigator.notification.activityStop();
                alert('success :'+JSON.stringify(res));
                },             
               function(err)
               {
               alert('error :'+JSON.stringify(err));
               }, options); 
} 
            
            
        
    });


