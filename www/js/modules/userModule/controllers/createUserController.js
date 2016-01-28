/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
UserModule.controller('CreateUserController', CreateUserController);
function CreateUserController($scope, $rootScope, $http) {
    console.log("CreateUserController started");
    $rootScope.userData.gender = 'F';
    $scope.ChangeGender = function (gender) {
        $scope.SelectedImg = $scope.SelectedImg ? false : true;
        $rootScope.userData.gender = gender;


    };
    $scope.isSelected = false;
    $scope.getAvatar = function (data) {
        var src = data.currentTarget.attributes['src'].nodeValue;
        var dn = data.currentTarget.dataset.number;
        activeAvata(dn);
        function activeAvata(dn) {
            
//            var el = angular.element(document.querySelector("[data-number='" + dn + "']"));
//            el.addClass('green');
            var elms = angular.element(document.getElementsByTagName('img'));
            for (var i in elms) {
                var obj = elms[i];
                   if(isNaN(parseInt(i))){
                    break;
                }
                if (obj.attributes['data-number']) {
                    angular.element(obj).removeClass('green');
                    if (obj.attributes['data-number'].value === dn) {
//                        console.log(dn);
                        angular.element(obj).addClass('green');
                    }
                }
             
            }
        }
        $rootScope.userData.avatar = src;
        $scope.isSelected = true;
//        console.log(id);
    };
    $scope.EndCreateUser = function () {
        console.log("EndCreateUser");
        $rootScope.userData.login = $scope.login;
        console.log($rootScope.userData);
        var req = $http.get($rootScope.mainUrl+"index.php?user_login=" + $rootScope.userData.login + "&user_gender=" + $rootScope.userData.gender + "&deviceId=test&avatar=" + $rootScope.userData.avatar + "&user_language=" + $rootScope.userData.lng + "&action=reg");
        req.success(function (data, status, headers, config) {
            console.log(status, data);
            if (data.data) {
                window.location = "#/mainmenu";
            }
            else {

            }
        });
        req.error(function (data, status, headers, config) {
            console.log(data);
        });

    };
}
