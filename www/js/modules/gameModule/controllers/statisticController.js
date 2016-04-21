/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


gameModule.controller('statisticController', statisticController);
function statisticController($rootScope, $scope, $http) {
    $scope.user=$rootScope.userData.login;
    
    $http.get($rootScope.mainUrl+'multiplayer/get-statistic?user='+$scope.user).success(function(result){
        console.log(result);
        $scope.statistica=result.statistica;
        $scope.rating=result.rating;
        $scope.score=result.score;
    });
}