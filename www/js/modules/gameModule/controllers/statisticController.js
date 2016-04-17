/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


gameModule.controller('statisticController', statisticController);
function statisticController($rootScope, $scope, $http) {
    $http.get($rootScope.mainUrl+'multiplayer/get-statistic').success(function(result){
        console.log(result);
        $scope.statistica=result;
        
    });
}