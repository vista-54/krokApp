/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
UserModule.controller('selectLngController', selectLngController);

function selectLngController($scope, $state, $rootScope, $location) {
    $scope.lng = $rootScope.setting.selectLng;
    console.log("selectLngController start");
    $scope.selectLang = function (lng) {
        
        $rootScope.userData = {};
        $rootScope.userData.lng = lng;
        console.log($rootScope.userData);
        window.location = "#/createuser";
    };


}