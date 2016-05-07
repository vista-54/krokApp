/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
UserModule.controller('CreateUserController', CreateUserController);
function CreateUserController($scope, $rootScope, $http) {
    $scope.setting = $rootScope.setting.openProfile;
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
                if (isNaN(parseInt(i))) {
                    break;
                }
                if (obj.attributes['data-number']) {
                    angular.element(obj).removeClass('greenAvatar');
                    if (obj.attributes['data-number'].value === dn) {
//                        console.log(dn);
                        angular.element(obj).addClass('greenAvatar');
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
        var devId = device.uuid;
//        var devId = 'ec334f4bcc9e5331';
//        var req = $http.get($rootScope.mainUrl + "users/create?user_login=" + $rootScope.userData.login + "&user_gender=" + $rootScope.userData.gender + "&deviceId=" + devId + "&avatar=" + $rootScope.userData.avatar + "&user_language=" + $rootScope.userData.lng + "&action=reg");
        var req = $http.get($rootScope.mainUrl + "users/create?user_login=" + $rootScope.userData.login + "&user_gender=" + $rootScope.userData.gender + "&deviceId=" + devId + "&avatar=" + $rootScope.userData.avatar + "&user_language=" + $rootScope.userData.lng + "&userId=" + $rootScope.userData.id);
        req.success(function (data, status, headers, config) {
            console.log(status, data);
            //проверяем пришла цифра или нет
            if (!isNaN(data)) {
                $rootScope.userData.id = data;
                window.location = "#/mainmenu";
            }
            else {
                console.log('ошибка');
            }
        });
        req.error(function (data, status, headers, config) {
            console.log(data);
        });

    };
}
