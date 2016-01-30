/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


gameModule.controller('questionsController', questionsController);
function questionsController($scope, $rootScope, $http) {
    $scope.categoryName = $rootScope.CurrentGame.categoryName;
    $scope.CorrectsAnswerCount = 0;
    $scope.isGetQuestBtnActive = true;
//    $scope.questions = $rootScope.gameData.questionsArr;

//    $scope.answeres=$rootScope.gameData.answeresArr;
    console.log("questionsController");
    $scope.questCount = 0;
    $scope.SearchGameById = function (id) {
        for (var i in $rootScope.gameData.games)
        {
            var obj = $rootScope.gameData.games[i];
            if (obj.id === id) {
                return i;
            }
        }
    };
    $scope.Getquestion = function () {
        if ($scope.questCount === 5) {
//            window.location = "#/newgame/" + $rootScope.CurrentGame.id;
            window.location = "#/mainmenu";
            return false;
        }
        $scope.isGetQuestBtnActive = false;
        $scope.answeres = [];
        console.log("getQe");
        $scope.currentQuestion = $rootScope.gameData.games[$scope.SearchGameById($rootScope.CurrentGame.id)].questionsArr[ $scope.questCount].question;
        $scope.currentAnsweres = $rootScope.gameData.games[$scope.SearchGameById($rootScope.CurrentGame.id)].answeresArr;


        $scope.currentGame = $rootScope.gameData.games[$scope.SearchGameById($rootScope.CurrentGame.id)];
        $scope.currentRound = $rootScope.getCurrentRound($scope.currentGame);
        for (var i in $scope.currentAnsweres) {
            var obj = $scope.currentAnsweres[i];
            if (obj.id_question === $rootScope.gameData.games[$scope.SearchGameById($rootScope.CurrentGame.id)].questionsArr[ $scope.questCount].id) {
                $scope.answeres.push(obj);
            }
        }
        console.log($scope.answeres);
        $scope.questCount++;
    };
    $scope.checkAnswer = function (ans) {

        if (ans.answer.status === "1") {
            $scope.CorrectsAnswerCount++;
        }

        $scope.score = $scope.CorrectsAnswerCount;
        if ($scope.questCount === 5) {
            $scope.sendRoundInfo();
        }
        $scope.isGetQuestBtnActive = true;
        console.log($scope.CorrectsAnswerCount);

    };
    $scope.isHost = function () {
        if ($scope.currentGame.host === $rootScope.userData.login) {
            return true;
        }
        else {
            return false;
        }
    };

    $scope.sendRoundInfo = function () {
        if ($scope.currentRound === 6) {
            if ($scope.isLastStep) {
                alert($scope.getResultIfLastStep($scope.currentGame));
//                return false;
                window.location = "#/mainmenu";
            }
        }
        var req = $http.get($rootScope.mainUrl + "index.php?&action=RoundEnd&idgame=" + $scope.currentGame.id + "&score=" + $scope.score + "&ishost=" + $scope.isHost() + "&round=" + $scope.currentRound);
        req.success(function (data, status, headers, config) {
            console.log(data);
            if (data.data) {

            }
        });
        req.error(function (data, status, headers, config) {
            console.log(data);
        });
    };
    $scope.isLastStep = function () {
        if ($scope.currentGame.scoreP1r6 === null && $scope.currentGame.scoreP2r6 === null) {
            return false;
        }
        else {
            return true;
        }
    };
    $scope.getResultIfLastStep = function (game)
    {
        var lastScore = parseInt($scope.score);
        if ($scope.isHost())
        {
            var ScoreHost = (parseInt(game.scoreP1r1) + (parseInt(game.scoreP1r2)) + parseInt(game.scoreP1r3) + parseInt(game.scoreP1r4) + parseInt(game.scoreP1r5) + lastScore);
            var ScorePlayer2 = (parseInt(game.scoreP2r1) + parseInt(game.scoreP2r2) + parseInt(game.scoreP2r3) + parseInt(game.scoreP2r4) + parseInt(game.scoreP2r5) + parseInt(game.scoreP2r6));

        }
        else {
            var ScoreHost = (parseInt(game.scoreP1r1) + (parseInt(game.scoreP1r2)) + parseInt(game.scoreP1r3) + parseInt(game.scoreP1r4) + parseInt(game.scoreP1r5) + parseInt(game.scoreP1r6));
            var ScorePlayer2 = (parseInt(game.scoreP2r1) + parseInt(game.scoreP2r2) + parseInt(game.scoreP2r3) + parseInt(game.scoreP2r4) + parseInt(game.scoreP2r5) + lastScore);
        }
        if ($scope.checkHost(game.host)) {
            if (ScoreHost > ScorePlayer2) {
                return "Вы победили игрока " + game.player2;
            }
            else if (ScoreHost < ScorePlayer2)
            {
                return "Вы проиграли игроку " + game.player2;
            }
            else if (ScoreHost === ScorePlayer2) {
                return "Ничья в игре с игроком " + game.player2;
            }
        }
        else {
            if (ScoreHost > ScorePlayer2) {
                return "Вы победили игрока " + game.host;
            } else if (ScoreHost < ScorePlayer2 && !$scope.checkHost(game.host)) {
                return "Вы проиграли игроку " + game.host;
            } else if (ScoreHost === ScorePlayer2) {
                return "Ничья в игре с игроком " + game.host;
            }

        }






        console.log("ScoreHost=>" + ScoreHost + "ScorePlayer2=>" + ScorePlayer2);
    };

}