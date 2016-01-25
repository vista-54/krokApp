/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var gameModule = angular.module('gameModule', ['ngRoute', 'ngCordova', 'ui.router']);

gameModule.config(['$routeProvider', function ($routeProvide) {
        $routeProvide
                .when('/mainmenu', {
                    templateUrl: 'views/gameModule/mainMenu.html',
                    controller: 'MainMenuController'
                })
                .when('/setting', {
                    templateUrl: 'views/gameModule/setting.html',
                    controller: 'SettingController'
                })
                .when('/newgame', {
                    templateUrl: 'views/gameModule/newGame.html',
                    controller: 'NewGameController'
                })
                .when('/newgame/:gameId', {
                    templateUrl: 'views/gameModule/rounds.html',
                    controller: 'roundsListController'
                })
                .when('/newgame/:gameId/game', {
                    templateUrl: 'views/gameModule/questions.html',
                    controller: 'questionsController'
                })
                .when('/choisecategoty', {
                    templateUrl: 'views/gameModule/selectCategory.html',
                    controller: 'selectCategoryController'
                })
//                .when('/roundsList', {
//                    templateUrl: 'views/gameModule/rounds.html',
//                    controller: 'roundsListController'
//                })
                .otherwise({
                    redirectTo: '/'
                });

    }]);
gameModule.controller('MainMenuController', MainMenuController);
function MainMenuController($scope,$rootScope) {
    
    console.log("MainMenu Controller");
    $scope.openMenu = function () {
        console.log("OpenMenu");
        window.location="#/setting";
    };
}