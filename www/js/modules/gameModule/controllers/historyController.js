/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


gameModule.controller('historyController', historyController);
function historyController($scope, $http, $rootScope) {
//    $scope.getHistoryGames = function () {
    $rootScope.IntervalStop = true;
    var req = $http.get($rootScope.mainUrl + "index.php?&action=getHistoryGames&username=" + $rootScope.userData.login);
    req.success(function (data, status, headers, config) {
        console.log(data);
//            $rootScope.gameData.games = data.data;
        $scope.Hgames = data.data;
//            $scope.CurrGame = $rootScope.gameData.games[$rootScope.SearchGameById($scope.gameId)];
    });
    req.error(function (data, status, headers, config) {
        console.log(data);
    });
    $scope.checkHost = function (hostNick) {
        if (hostNick === $rootScope.userData.login) {
            return true;
        }
        else {
            return false;
        }
    };
    $scope.getResult = function (game)
    {
        var ScoreHost = (parseInt(game.scoreP1r1) + (parseInt(game.scoreP1r2)) + parseInt(game.scoreP1r3) + parseInt(game.scoreP1r4) + parseInt(game.scoreP1r5) + parseInt(game.scoreP1r6));
        var ScorePlayer2 = (parseInt(game.scoreP2r1) + parseInt(game.scoreP2r2) + parseInt(game.scoreP2r3) + parseInt(game.scoreP2r4) + parseInt(game.scoreP2r5) + parseInt(game.scoreP2r6));
        if ($scope.checkHost(game.host)) {
            if (ScoreHost > ScorePlayer2) {
                return "Победа";
            }
            else if (ScoreHost < ScorePlayer2)
            {
                return "Поражение";
            }
            else if (ScoreHost === ScorePlayer2) {
                return "Ничья";
            }
        }
        else {
            if (ScoreHost > ScorePlayer2) {
                return "Поражение";
            } else if (ScoreHost < ScorePlayer2 && !$scope.checkHost(game.host)) {
                return "Победа";
            } else if (ScoreHost === ScorePlayer2) {
                return "Ничья";
            }

        }






        console.log("ScoreHost=>" + ScoreHost + "ScorePlayer2=>" + ScorePlayer2);
    };
//    };
}