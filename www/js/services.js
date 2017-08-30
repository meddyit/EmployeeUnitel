angular.module('starter.services', [])

.service('LoginService', function ($q, $http) {
    return {
        loginUser: function (loginData) {
                
            var deferred = $q.defer(),
            promise = deferred.promise;

            $http({
                url: 'http://192.168.1.126/serv/service/check_login',
                method: "POST",
                data: loginData,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
                .then(function (response) {
                    
                    alert(response.data[0].error);
                   
                       if( response.data[0].error==="0"){
                        console.log("User login successful: " + JSON.stringify(response.data));
                        deferred.resolve(response.data);
                    } else {
                        console.log("User login failed: " + JSON.stringify(response.data.error));
                        deferred.reject(response.data);
                    }
                }, function (error) {
                    console.log("Server Error on login: " + JSON.stringify(error));
                    deferred.reject(error);
                });

            promise.success = function (fn) {
                promise.then(fn);
                return promise;
            };
            promise.error = function (fn) {
                promise.then(null, fn);
                return promise;
            };
            return promise;
        }
    }
 
   })

/*.service('taskService', function ($q, $http) {
     
     $get_task : function (data) 
             {
               return $http({ 
               url:'https://www.minbazaar.com/subs/admin/driver_service/verification',
               method:'GET',
               params : ''
                });
            },
})*/














   
