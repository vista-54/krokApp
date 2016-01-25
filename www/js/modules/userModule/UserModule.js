/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var UserModule = angular.module('UserModule', ['ngRoute', 'ngCordova', 'ui.router', 'gameModule']);
//document.addEventListener("deviceready", function () {
//    console.log("Device Is ready!!!");
//}, false);
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
    $rootScope.userData = {};
    var req = $http.get("http://krockappbackend/index.php?deviceId=testid&action=getLogin");
    req.success(function (data, status, headers, config) {
        console.log(data);
        if (data.data) {
            window.location = "#/mainmenu";
            $rootScope.userData.login = data.data[0].user_login;
            $rootScope.userData.id = data.data[0].id;
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

}



