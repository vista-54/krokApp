/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


gameModule.controller('questionsController', questionsController);
function questionsController($scope, $rootScope, $http) {
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
            window.location = "#/newgame/" + $rootScope.CurrentGame.id;
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
        var req = $http.get("http://192.168.0.101/index.php?&action=RoundEnd&idgame=" + $scope.currentGame.id + "&score=" + $scope.score + "&ishost=" + $scope.isHost() + "&round=" + $scope.currentRound);
        req.success(function (data, status, headers, config) {
            console.log(data);
            if (data.data) {

            }
        });
        req.error(function (data, status, headers, config) {
            console.log(data);
        });
    };

}