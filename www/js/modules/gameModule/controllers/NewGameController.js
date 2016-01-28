/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


gameModule.controller('NewGameController', NewGameController);

function NewGameController($scope, $http, $rootScope) {

    $rootScope.checkGameEnd = function (g) {
        if (g.scoreP1r6 !== null || g.scoreP2r6 !== null) {
            true;
        }
        return false;
    };
 
//    $rootScope.gameData = {};
//    $rootScope.gameData.games = [];


    $scope.getHistory = function () {
        var req = $http.get($rootScope.mainUrl+"index.php?&action=getHistoryGames&userId=" + $rootScope.userData.id);
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
    $scope.RandomOpponent = function (data) {
        var type = data.currentTarget.attributes['data-number'].nodeValue;
        $rootScope.gameData.type = type;

        console.log("CategorySelected");
        var req = $http.get($rootScope.mainUrl+"index.php?&action=createRoom?&action=searchEmptyRoom&username=" + $rootScope.userData.login);
        req.success(function (data, status, headers, config) {
            console.log(status, data);
//
//            if (typeof (data.data) === "object") {
////                $rootScope.gameData.categoryLists = data.data.category;
////                $rootScope.gameData.round = data.data.gameround;
////                $rootScope.gameData.idGame = data.data.idGame;
//                var game = {id: data.data.idGame, round: data.data.gameroun, categoryLists: data.data.category};
//                $rootScope.gameData.games.push(game);
            $rootScope.getOpenGames();
            window.location = "#/mainmenu";
////                $rootScope.gameData.games.push($rootScope.gameData.idGame);
////                .push($rootScope.gameData.idGame);
////                window.location = "#/mainmenu";
////                $scope.categoryLists = data.data;
//                console.log($scope.games);
////            }
//            else if (data.data) {
//                console.log(data);
//            }
        });
        req.error(function (data, status, headers, config) {
            console.log(data);
        });

    };
//        console.log(src);


    console.log("NewGameController");
}