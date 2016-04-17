/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


gameModule.controller('NewGameController', NewGameController);
function NewGameController($scope, $http, $rootScope) {


 
//clearInterval($rootScope.intervalID);
    $rootScope.IntervalStop = true;
    $rootScope.checkGameEnd = function (g) {
        if (g.scoreP1r6 !== null || g.scoreP2r6 !== null) {
            true;
        }
        return false;
    };
//    $rootScope.gameData = {};
//    $rootScope.gameData.games = [];


    $scope.getHistory = function () {
        var req = $http.get($rootScope.mainUrl + "index.php?&action=getHistoryGames&userId=" + $rootScope.userData.id);
        req.success(function (data, status, headers, config) {
            console.log(data);
            $scope.gamesHistory = data.data;
        });
        req.error(function (data, status, headers, config) {
            console.log(data);
        });
    };
//    $scope.getOpenGames();
//    $scope.getHistory();
    $scope.monoPlayer = function () {
//        $rootScope.krocks={};
        var req = $http.get($rootScope.mainUrl + "monoplayer/create");
        req.success(function (data, status, headers, config) {
            console.log(status, data);
            $rootScope.krocks = data;
            window.location = "#/krockList";
        });
        console.log("Monoplayer");
    };
    $scope.RandomOpponent = function (data) {
        var type = data.currentTarget.attributes['data-number'].nodeValue;
        $rootScope.gameData.type = type;
        console.log("CategorySelected");
        var req = $http.get($rootScope.mainUrl + "multiplayer/create?&username=" + $rootScope.userData.login);
        req.success(function (data, status, headers, config) {
            console.log(status, data);
            if(!isNaN(data)){
                window.location = "#/mainmenu";
            }
            else{
                alert('Неизвесная ошибка');
            }
            
        });
        req.error(function (data, status, headers, config) {
            console.log(data);
        });
    };
//        console.log(src);


    console.log("NewGameController");
}