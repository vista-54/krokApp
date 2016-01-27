/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


gameModule.controller('NewGameController', NewGameController);

function NewGameController($scope, $http, $rootScope) {
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
        var req = $http.get("http://192.168.1.113/index.php?&action=gameEnd&idgame=" + $scope.gameId + "&user_id=" + $rootScope.userData.id + "&resultGame=" + result);
        req.success(function (data, status, headers, config) {
            console.log(data);
        });
        req.error(function (data, status, headers, config) {
            console.log(data);
        });
    };
    $rootScope.checkGameEnd = function (g) {
        if (g.scoreP1r6 !== null || g.scoreP2r6 !== null) {
            true;
        }
        return false;
    };
    $rootScope.getCurrentRound = function (g) {
        if (g.scoreP1r1 === null || g.scoreP2r1 === null) {
            return 1;
        }
        else if (g.scoreP1r2 === null || g.scoreP2r2 === null) {
            return 2;
        }
        else if (g.scoreP1r3 === null || g.scoreP2r3 === null) {
            return 3;
        }
        else if (g.scoreP1r4 === null || g.scoreP2r4 === null) {
            return 4;
        }
        else if (g.scoreP1r5 === null || g.scoreP2r5 === null) {
            return 5;
        }
        else if (g.scoreP1r6 === null || g.scoreP2r6 === null) {
            return 6;
        }


    };
    $rootScope.gameData = {};
    $rootScope.gameData.games = [];

    $scope.getOpenGames = function () {
        var req = $http.get("http://192.168.1.113/index.php?&action=getOpenGames&username=" + $rootScope.userData.login);
        req.success(function (data, status, headers, config) {
            console.log(data);
            $rootScope.gameData.games = data.data;
            $scope.games = $rootScope.gameData.games;
        });
        req.error(function (data, status, headers, config) {
            console.log(data);
        });
    };
    $scope.getHistory = function () {
        var req = $http.get("http://192.168.1.113/index.php?&action=getHistoryGames&userId=" + $rootScope.userData.id);
        req.success(function (data, status, headers, config) {
            console.log(data);

            $scope.gamesHistory = data.data;
        });
        req.error(function (data, status, headers, config) {
            console.log(data);
        });
    };
    $scope.getOpenGames();
//    $scope.getHistory();
    $scope.RandomOpponent = function (data) {
        var type = data.currentTarget.attributes['data-number'].nodeValue;
        $rootScope.gameData.type = type;

        console.log("CategorySelected");
        var req = $http.get("http://192.168.1.113/index.php?&action=createRoom?&action=searchEmptyRoom&username=" + $rootScope.userData.login);
        req.success(function (data, status, headers, config) {
            console.log(status, data);
//
//            if (typeof (data.data) === "object") {
////                $rootScope.gameData.categoryLists = data.data.category;
////                $rootScope.gameData.round = data.data.gameround;
////                $rootScope.gameData.idGame = data.data.idGame;
//                var game = {id: data.data.idGame, round: data.data.gameroun, categoryLists: data.data.category};
//                $rootScope.gameData.games.push(game);
            $scope.getOpenGames();
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