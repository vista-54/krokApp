/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


gameModule.controller('lastErrorsController', lastErrorsController);

function lastErrorsController($rootScope, $http, $scope) {


    $http.get($rootScope.mainUrl + 'users/get-last-errors?user=' + $rootScope.userData.login + '&lng=' + $rootScope.userData.lng)
            .success(function (result) {
                for (var i in result.questions) {
                    var obj = result.questions[i];
                    switch ($rootScope.userData.lng) {
                        case 'UA':
                            result.questions[i].question = obj.question_ukr;
                            break;
                        case 'EN':
                            result.questions[i].question = obj.question_eng;
                            break;
                        case 'RU':
                            result.questions[i].question = obj.question_rus;
                            break;
                    }

                }
                for (var i in result.answeres) {
                    var obj = result.answeres[i];
                    switch ($rootScope.userData.lng) {
                        case 'UA':
                            result.answeres[i].text = obj.text_ukr;
                            break;
                        case 'EN':
                            result.answeres[i].text = obj.text_eng;
                            break;
                        case 'RU':
                            result.answeres[i].text = obj.text_rus;
                            break;
                    }

                }
                for (var i in result.corretcs) {
                    var obj = result.corretcs[i];
                    switch ($rootScope.userData.lng) {
                        case 'UA':
                            result.corretcs[i].text = obj.text_ukr;
                            break;
                        case 'EN':
                            result.corretcs[i].text = obj.text_eng;
                            break;
                        case 'RU':
                            result.corretcs[i].text = obj.text_rus;
                            break;
                    }

                }
                $rootScope.lastErrors = result;
                $scope.questions = result.questions;
                console.log(result);
            })
            .error(function (error) {
                console.log(error);
            });
    console.log('lastErrorsController');
    $scope.openQuestion = function (id) {
        console.log(id);
        window.location = '#/viewError/' + id;
    };
}
        