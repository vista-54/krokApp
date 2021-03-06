/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


gameModule.controller('questionsController', questionsController);
function questionsController($scope, $rootScope, $http, $interval) {
    var time = undefined;
    $scope.categoryName = $rootScope.CurrentGame.categoryName;
    if (typeof ($scope.categoryName.name) !== "undefined") {
        $scope.categoryName = $scope.categoryName.name;
    }
    $scope.userAnsweres = {};
    $scope.userAnsweres.right = [];
    $scope.userAnsweres.userans = [];
    $scope.CorrectsAnswerCount = 0;
    $scope.isGetQuestBtnActive = true;
    $scope.getQuestionActive = true;
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
    $('.BlockQuestion').height($(window).height()-140);
    $scope.Getquestion = function () {
        $scope.line = {'background': '-webkit-linear-gradient(right, rgb( 224, 10, 10) ' + 0 + '%, rgb(48, 216, 84)' + 0 + '%)'};//наша линия времени
        $scope.timeLine = 0;
        if (angular.isDefined(time)) {
            $interval.cancel(time);
            time = undefined;
        }
        /*запускаем таймер 20 сек*/

        $scope.changeLine = function () {
            $scope.timeLine += 5;
            console.log($scope.timeLine);
            $scope.line = {'background': '-webkit-linear-gradient(right, rgb( 224, 10, 10) ' + $scope.timeLine + '%, rgb(48, 216, 84)' + $scope.timeLine + '%)'};//наша линия времени
            if ($scope.timeLine > 100) {
                $interval.cancel(time);
                time = undefined;
                $scope.checkAnswer('none', 'none');
            }
        };
        time = $interval($scope.changeLine, 1000);
        /**/
        if ($scope.questCount === 5) {
//            window.location = "#/newgame/" + $rootScope.CurrentGame.id;
            window.location = "#/mainmenu";
            return false;
        }
        $scope.isGetQuestBtnActive = false;
        $scope.getQuestionActive = false;
        $scope.answeres = [];
        console.log("getQe");
        $scope.currentQuestion = $rootScope.gameData.games[$scope.SearchGameById(parseInt($rootScope.CurrentGame.id))].questionsArr[ $scope.questCount].question;
        $scope.currentQuestionId = $rootScope.gameData.games[$scope.SearchGameById(parseInt($rootScope.CurrentGame.id))].questionsArr[ $scope.questCount].id;
        $scope.currentAnsweres = $rootScope.gameData.games[$scope.SearchGameById(parseInt($rootScope.CurrentGame.id))].answeresArr;


        $scope.currentGame = $rootScope.gameData.games[$scope.SearchGameById(parseInt($rootScope.CurrentGame.id))];
        $scope.currentRound = $rootScope.getCurrentRound($scope.currentGame);
        for (var i in $scope.currentAnsweres) {
            var obj = $scope.currentAnsweres[i];
            if (obj.id_question === $rootScope.gameData.games[$scope.SearchGameById(parseInt($rootScope.CurrentGame.id))].questionsArr[$scope.questCount].id) {
                $scope.answeres.push(obj);
            }
        }
        console.log($scope.answeres);
        $scope.questCount++;
    };
    $scope.searchRightAnswer = function () {
        for (var i in $scope.answeres) {
            var obj = $scope.answeres[i];
//            var curQid=$rootScope.gameData.games[$scope.SearchGameById($rootScope.CurrentGame.id)].questionsArr[ $scope.questCount].id;
            if (obj.status === 1) {
                return i;
            }
        }
    };
    $scope.checkAnswer = function (ans, key) {
        var isNone = false;
        if (ans === 'none') {
            var ans = {answer: {status: 0}};
//           $interval.cancel(time);
//                time = undefined;
            isNone = true;

        }
        if (angular.isDefined(time)) {
            $interval.cancel(time);
            time = undefined;
//            return false;
        }
        var answ = angular.element(document.getElementsByTagName('li'));
        if (!isNone) {
            
            var curRoundInf = {'question': $scope.currentQuestionId, 'userAnswer': ans.answer.id, 'rightAnswer': $scope.answeres[$scope.searchRightAnswer()].id};
            $scope.userAnsweres.right.push(curRoundInf);
        }


        if (ans.answer.status === 1) {
            $scope.CorrectsAnswerCount++;
            $(answ[key]).addClass('green');
//            $scope.isCorrectA = 'green';
        }
        else {
            if (!isNone) {
                $(answ[key]).addClass('red');
            }
            $(answ[$scope.searchRightAnswer()]).addClass('green');
        }
        console.log($scope.userAnsweres);
        $scope.score = $scope.CorrectsAnswerCount;
        if ($scope.questCount === 5) {
            $scope.sendRoundInfo();
        }
//        $scope.isGetQuestBtnActive = true;
        $scope.getQuestionActive = true;
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

//                alert($scope.getResultIfLastStep($scope.currentGame));
//                return false;
                window.location = "#/mainmenu";
            }
        }
//        $scope.old = $rootScope.CurrentGame.lastAnsH;
        var roundResultAnsweres = JSON.stringify($scope.userAnsweres.right);
//        var lastResultAnsweres = $scope.old.game;
        var req = $http.get($rootScope.mainUrl + "multiplayer/round-end?idgame=" + $scope.currentGame.id + "&score=" + $scope.score + "&ishost=" + $scope.isHost() + "&round=" + $scope.currentRound + "&answeres=" + roundResultAnsweres);
        req.success(function (data, status, headers, config) {
            console.log(data);
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