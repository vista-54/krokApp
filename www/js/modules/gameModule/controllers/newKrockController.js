/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


gameModule.controller('newKrockController', newKrockController);
function newKrockController($scope, $rootScope) {
    $scope.totalQuestions = $rootScope.monoPlayer.questions.length;
    $scope.questCount = 0;
    $scope.score = 0;
     $scope.CorrectsAnswerCount=0;
    $scope.getquestion = function () {
        if ($scope.questCount === $scope.totalQuestions) {
            $rootScope.monoPlayer.result = {};
            $rootScope.monoPlayer.result.correctAnsweres = $scope.score;
            $rootScope.monoPlayer.result.totalQuestions = $scope.totalQuestions;
            window.location = '#/resultKrock';
            return false;
        }
        $scope.isGetQuestBtnActive = false;
        $scope.getQuestionActive = false;
        $scope.answeres = [];
        console.log("getQe");
        $scope.currentQuestion = $rootScope.monoPlayer.questions[$scope.questCount];
        $scope.currentAnsweres = $rootScope.monoPlayer.answeres;


        for (var i in $scope.currentAnsweres) {
            var obj = $scope.currentAnsweres[i];
            if (obj.id_question === $scope.currentQuestion.id) {
                $scope.answeres.push(obj);
            }
        }

        console.log($scope.answeres);
        $scope.questCount++;
        setTimeout(function () {
            $('.BlockGetQuestionInMonoPlayer').height($('.questionText').height());
        }, 300);
    };
    $scope.checkAnswer = function (ans, key) {
        var answ = angular.element(document.getElementsByTagName('li'));
        if (ans.answer.status === "1") {
            $scope.CorrectsAnswerCount++;
            $(answ[key]).addClass('green');
//            $scope.isCorrectA = 'green';
        }
        else {
            $(answ[key]).addClass('red');

            $(answ[$scope.searchRightAnswer()]).addClass('green');
        }

        $scope.score = $scope.CorrectsAnswerCount;

//        $scope.isGetQuestBtnActive = true;
        $scope.getQuestionActive = true;
        console.log($scope.CorrectsAnswerCount);
//          setTimeout(function () {
        $('.BlockQuestion').css({'margin-top': $('.questionText').height() + 10});
//        }, 300);
    };
    $scope.searchRightAnswer = function () {
        for (var i in $scope.answeres) {
            var obj = $scope.answeres[i];
//            var curQid=$rootScope.gameData.games[$scope.SearchGameById($rootScope.CurrentGame.id)].questionsArr[ $scope.questCount].id;
            if (obj.status === '1') {
                return i;
            }
        }
    };
    $scope.getquestion();
}