/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


gameModule.controller('globalratingController', globalratingController);
function globalratingController($scope, $rootScope) {
    $scope.statistica = $rootScope.global.global;
    $scope.rating=$rootScope.global.userRating;
    $scope.score=$rootScope.global.userScore;
}