/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

gameModule.controller('versusController', versusController);
function versusController($scope, $rootScope, $http) {
    $('.battle').height('100vh');
    $scope.isSearched = false;
    $scope.searchFriend = function (name) {
        $http.get($rootScope.mainUrl + 'versus/create?host=' + $rootScope.userData.login + '&p2=' + name)
                .success(function (result) {
                    $scope.user = result;
                    if (typeof result === 'object') {
                        $scope.isSearched = true;
                    }
                    if(result===22){
                        $scope.isSearched = false;
                        alert('У вас уже есть активный вызов этому игроку');
                    }
                    console.log(result);
                })
                .error(function (error) {
                    console.log(error);
                });
    };
}
