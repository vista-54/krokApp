/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


gameModule.controller('mailController', mailController);

function mailController($scope, $http, $rootScope) {
    console.log('mailController');
    $scope.sendFeedBack = function (obj) {
//        console.log(obj);
//        console.log(feedbackForm);
        $http.get($rootScope.mainUrl + 'users/feedback?subject=' + obj.subject + '&msg=' + obj.msg)
                .success(function (result) {
                    console.log(result);
            if(result){
                alert('Ваше сообщение успено отправлено');
                window.location='#/setting';
            }
                })
                .error(function (error) {
                    console.log(error);
                });
    };
}