/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

gameModule.controller('SettingController', SettingController);
function SettingController($scope,$rootScope) {
    $rootScope.setting={};
   
    console.log("SettingController");
    $scope.openProfile = function () {
         $rootScope.setting.openProfile=1;
        console.log('open profile');
        window.location = '#/createuser';
    };
    $scope.changeLang = function () {
         $rootScope.setting.selectLng=1;
        console.log('changeLang');
        window.location = '#/selectLng';
    };
}