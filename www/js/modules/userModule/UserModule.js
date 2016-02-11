/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var UserModule = angular.module('UserModule', ['ngRoute', 'ngCordova', 'ui.router', 'gameModule']);

UserModule.config(['$routeProvider', function ($routeProvide) {
        $routeProvide
                .when('/', {
                    templateUrl: 'views/userModule/homepage.html',
                    controller: 'AppController'
                })
                .when('/selectLng', {
                    templateUrl: 'views/userModule/selectLng.html',
                    controller: 'selectLngController'
                })

                .when('/createuser', {
                    templateUrl: 'views/userModule/createUser.html',
                    controller: 'CreateUserController'
                })
                .otherwise({
                    redirectTo: '/'
                });

    }]);


UserModule.controller('AppController', AppController);

function AppController($scope, $location, $http, $rootScope) {
    $rootScope.mainUrl = 'http://768646.okonel.web.hosting-test.net/';

//    $rootScope.checkStep=function(){
//        
//    };
    $rootScope.userData = {};
    document.addEventListener("deviceready", function () {
        var devId = device.uuid;
        console.log("Device Is ready!!!");
//        var req = $http.get($rootScope.mainUrl + "index.php?deviceId=ded3c217d39e86c1&action=getLogin");
        var req = $http.get($rootScope.mainUrl + "index.php?deviceId=" + devId + "&action=getLogin");
        req.success(function (data, status, headers, config) {
            console.log(data);
            if (data.data) {
                window.location = "#/mainmenu";
                $rootScope.userData.login = data.data[0].user_login;
                $rootScope.userData.id = data.data[0].user_login;
                $rootScope.userData.lng = data.data[0].user_language;
            }
            else {
                $scope.message = "HomeController";
                console.log($scope.message);
                window.location = "#/selectLng";
            }
        });
        req.error(function (data, status, headers, config) {
            console.log(data);

            $scope.message = "HomeController";
            console.log($scope.message);
            window.location = "#/selectLng";
        });

    }, false);

}



