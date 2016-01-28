/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


gameModule.controller('roundsListController', roundsListController);
function roundsListController($scope, $rootScope, $routeParams, $http) {
    $scope.waitStepSecondPlayer = $rootScope.waitStepSecondPlayer;//чей ход булин
    $scope.gameId = $routeParams.gameId; //айди текущей игры
    $scope.game = $rootScope.gameData.games[$rootScope.SearchGameById($scope.gameId)];//текущая игра
    $rootScope.CurrentGame = {};//объект текущей игры
    /*Конец игры Бэта*/
    $rootScope.gameEnd = function (game) {
//        if (game.host === $rootScope.gameData.login) {
        var result;
        var TotalScoreHost = game.scoreP1r1 + game.scoreP1r2 + game.scoreP1r3 + game.scoreP1r4 + game.scoreP1r5 + game.scoreP1r6;
//        }
//        else if (game.player2 === $rootScope.gameData.login)
//        {
        var TotalScorePlayer2 = game.scoreP2r1 + game.scoreP2r2 + game.scoreP2r3 + game.scoreP2r4 + game.scoreP2r5 + game.scoreP2r6;
//        }
        var winner;
        if (TotalScoreHost > TotalScorePlayer2)
        {
            winner = game.host;
        }
        else {
            winner = game.player2;
        }
        if (winner === $rootScope.gameData.login)
        {
            result = "Победа";
        }
        else {
            result = "Поражение";
        }
        var req = $http.get($rootScope.mainUrl+"index.php?&action=gameEnd&idgame=" + $scope.gameId + "&user_id=" + $rootScope.userData.id + "&resultGame=" + result);
        req.success(function (data, status, headers, config) {
            console.log(data);
        });
        req.error(function (data, status, headers, config) {
            console.log(data);
        });
    };
    /*
     $scope.getOpenGames = function () {
     var req = $http.get("http://192.168.0.101/index.php?&action=createRoom?&action=getOpenGames&username=" + $rootScope.userData.login);
     req.success(function (data, status, headers, config) {
     console.log(data);
     $rootScope.gameData.games = data.data;
     $scope.game = $rootScope.gameData.games[$scope.SearchGameById($scope.gameId)];
     if ($rootScope.checkGameEnd($scope.game)) {
     $scope.gameEnd($scope.game);
     }
     if ($scope.game.status === "2" && $scope.game.host === $rootScope.userData.login) {
     $scope.waitStepSecondPlayer = false;
     
     }
     else if ($scope.game.status === "1" && $scope.game.host !== $rootScope.userData.login) {
     $scope.waitStepSecondPlayer = false;
     
     }
     else {
     $scope.waitStepSecondPlayer = true;
     }
     $rootScope.waitStepSecondPlayer=$scope.waitStepSecondPlayer;
     //            $scope.games = $rootScope.gameData.games;
     });
     req.error(function (data, status, headers, config) {
     console.log(data);
     });
     };
     */

    //$scope.getOpenGames();
//    $scope.SearchGameById = function (id) {
//        for (var i in $rootScope.gameData.games)
//        {
//            var obj = $rootScope.gameData.games[i];
//            if (obj.id === id) {
//                return parseInt(i);
//            }
//        }
//    };
    $scope.isHost = function () {
        if ($scope.currentGame.host === $rootScope.userData.login) {
            $scope.currentRound = $rootScope.CurrentGame.round;
            return true;
        }
        else {
            $scope.currentRound = $rootScope.CurrentGame.round - 1;
            return false;
        }
    };
    console.log("roundsListController");
    $scope.play = function () {
        $rootScope.CurrentGame.isCategotySelected = false;
        //проверяем раунд 
        switch ($rootScope.getCurrentRound($scope.game)) {
            case 1:
                res = $scope.game.round1;
                break;
            case 2:
                res = $scope.game.round2;
                break;
            case 3:
                res = $scope.game.round3;
                break;
            case 4:
                res = $scope.game.round4;
                break;
            case 5:
                res = $scope.game.round5;
                break;
            case 6:
                res = $scope.game.round6;
                break;

        }
        //берем с раунда катеорию если она не НУЛЛ
        if (res !== null) {
            $rootScope.CurrentGame.category = {
                id: res
            };
            $rootScope.CurrentGame.isCategotySelected = true;
            window.location = "#/choisecategoty";
        }
        //Если нул получаем список с сервера
        else {
            $scope.getCategoriesList();
        }

        $rootScope.CurrentGame.id = $scope.gameId;


    };
    $scope.getCategoriesList = function () {
        var req = $http.get($rootScope.mainUrl+"index.php?&action=getCategory");
        req.success(function (data, status, headers, config) {
//            console.log(status, data);
            $rootScope.gameData.games[$scope.SearchGameById($scope.gameId)].EmptyCategoriesList = data.data;
            $rootScope.gameData.games[$scope.SearchGameById($scope.gameId)].BusyCategoriesList = [];
            window.location = "#/choisecategoty";
        });
        req.error(function (data, status, headers, config) {
            console.log(data);
        });
    };
}