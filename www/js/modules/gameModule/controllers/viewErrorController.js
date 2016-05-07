/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


gameModule.controller('viewErrorController', viewErrorController);

function viewErrorController($routeParams, $scope, $rootScope) {
    $scope.questionId = parseInt($routeParams.questionId);
    console.log($scope.questionId);
    for (var i in $rootScope.lastErrors.questions) {
        var obj = $rootScope.lastErrors.questions[i];
        if (obj.id === $scope.questionId) {
            $scope.question = obj.question;
        }

    }
    for (var i in $rootScope.lastErrors.answeres) {
        var obj = $rootScope.lastErrors.answeres[i];
        if (obj.id_question === $scope.questionId) {
            $scope.answer = obj.text;
        }
    }
    
       for (var i in $rootScope.lastErrors.corretcs) {
        var obj = $rootScope.lastErrors.corretcs[i];
        if (obj.id_question === $scope.questionId) {
            $scope.correct = obj.text;
        }
    }
}