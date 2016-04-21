/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


gameModule.controller('krockListController', krockListController);
function krockListController($rootScope, $scope, $http) {
    $rootScope.monoPlayer = {};
    $scope.krocks = $rootScope.krocks;
    console.log('krockListController');
    $scope.isKrockSelected = false;
    $scope.selectKrock = function (num) {
        var krock = angular.element(document.getElementsByTagName('li'));
        for (var i = 0; i < krock.length; i++) {
            $(krock[i]).removeClass('selectKrock');
        }
        $(krock[num - 1]).addClass('selectKrock');
//        $scope.isKrockSelected = true;
        console.log(num);
//        var req = $http.get($rootScope.mainUrl + "index.php?&action=getCategoryForKrock&krock_id=" + num);
        var req = $http.get($rootScope.mainUrl + "monoplayer/get-spec?id_krock=" + num + "&lng=" + $rootScope.userData.lng);
        req.success(function (data, status, headers, config) {
            console.log(data);
//            if ($rootScope.userData.lng === 'EN') {

            for (var i in data) {
                var obj = data[i];
                switch ($rootScope.userData.lng) {
                    case 'UA':
                        data[i].name = obj.name_ukr;
                        break;
                    case 'EN':
                        data[i].name = obj.name_eng;
                        break;
                    case 'RU':
                        data[i].name = obj.name_rus;
                        break;
                }

            }
            $scope.specs = data;
            console.log($scope.specs);
//            $scope.categories = data.data;
        });
        req.error(function (data, status, headers, config) {
            console.log(data);
        });

    };
    $scope.selectSpec = function (num, key) {
        $('.krockPage').css({'height': 'initial'});
        var spec = angular.element(document.getElementsByName('spec'));
        for (var i = 0; i < spec.length; i++) {
            $(spec[i]).removeClass('selectSpec');
        }
        $(spec[key]).addClass('selectSpec');
        $scope.isKrockSelected = true;
        console.log(num);
        var req = $http.get($rootScope.mainUrl + "monoplayer/get-categories?spec_id=" + num + "&lng=" + $rootScope.userData.lng);
        req.success(function (data, status, headers, config) {
            console.log(data);
            for (var i in data) {
                var obj = data[i];
                switch ($rootScope.userData.lng) {
                    case 'UA':
                        data[i].name = obj.name_ukr;
                        break;
                    case 'EN':
                        data[i].name = obj.name_eng;
                        break;
                    case 'RU':
                        data[i].name = obj.name_rus;
                        break;
                }

            }
            $scope.categories = data;
        });
        req.error(function (data, status, headers, config) {
            console.log(data);
        });

    };
    $scope.setCategory = function (num) {

        var cat = angular.element(document.getElementsByName('category'));
        if ($(cat[num]).hasClass('isSelectedCat')) {
            $(cat[num]).removeClass('isSelectedCat');
            $(cat[num]).addClass('isUnselectedCat');
        } else {
            $(cat[num]).removeClass('isUnselectedCat');
            $(cat[num]).addClass('isSelectedCat');

        }
        console.log(num);
    };

    $scope.playCrock = function () {
        var cat = angular.element(document.getElementsByName('category'));
        var arrSelectedCat = [];
        for (var i = 0; i < cat.length; i++) {
            var obj = cat[i];

            if ($(obj).hasClass('isSelectedCat')) {
                arrSelectedCat.push(obj.parentElement.attributes[0].value);
            }


        }
        console.log(arrSelectedCat);
        if (arrSelectedCat.length === 0) {
            return false;
        }
//        $rootScope.monoPlayer.arrSelectedCat=arrSelectedCat;
        var req = $http.get($rootScope.mainUrl + "monoplayer/get-questions?&cats=" + arrSelectedCat + "&lng=" + $rootScope.userData.lng);
        req.success(function (data, status, headers, config) {
            console.log(data);
            for (var i in data.questions) {
                var obj = data.questions[i];
                switch ($rootScope.userData.lng) {
                    case 'UA':
                        data.questions[i].question = obj.question_ukr;
                        break;
                    case 'EN':
                       data.questions[i].question = obj.question_ukr;
                        break;
                    case 'RU':
                        data.questions[i].question = obj.question_ukr;
                        break;
                }

            }
            for (var i in data.answeres) {
                var obj = data.answeres[i];
                switch ($rootScope.userData.lng) {
                    case 'UA':
                        data.answeres[i].text = obj.text_ukr;
                        break;
                    case 'EN':
                       data.answeres[i].text = obj.text_ukr;
                        break;
                    case 'RU':
                        data.answeres[i].text = obj.text_ukr;
                        break;
                }

            }
            $rootScope.monoPlayer.questions = $rootScope.shuffle(data.questions);
            $rootScope.monoPlayer.answeres = $rootScope.shuffle(data.answeres);
            window.location = "#/newKrock";
        });
        req.error(function (data, status, headers, config) {
            console.log(data);
        });
    };
}