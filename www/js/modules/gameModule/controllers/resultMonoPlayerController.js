/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


gameModule.controller('resultMonoPlayerController', resultMonoPlayerController);
function resultMonoPlayerController($rootScope,$scope) {
    $scope.CorrectsAnswerCount=$rootScope.monoPlayer.result.correctAnsweres;
    $scope.totalQues=$rootScope.monoPlayer.result.totalQuestions;
    console.log('resultMonoPlayerController');
}