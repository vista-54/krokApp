/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


gameModule.controller('statisticController', statisticController);
function statisticController($rootScope, $scope, $http) {
    $scope.user = $rootScope.userData.login;

    $http.get($rootScope.mainUrl + 'multiplayer/get-statistic?user=' + $scope.user).success(function (result) {
        console.log(result);
        $rootScope.global = {
            global: result.statistica,
            userRating: result.user.rating,
            userScore: result.user.score
        };
        $scope.statistica = result.statistica;
        $scope.rating = result.user.rating;
        $scope.score = result.user.score;
        $scope.multistat = result.multiplayer;
        $scope.monoplayer = result.monoplayer;
        $scope.totalBattlesMulti = $scope.multistat.win + $scope.multistat.lose + $scope.multistat.draw;
        $scope.totalQuestions = $scope.totalBattlesMulti + $scope.monoplayer.total;
    });
    $scope.globalRating = function () {
        console.log('global rating');
        window.location = '#/globalrating';
    };
}