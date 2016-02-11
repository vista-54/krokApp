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
        var req = $http.get($rootScope.mainUrl + "index.php?&action=getSpecForKrock&krock_id=" + num + "&lng=" + $rootScope.userData.lng);
        req.success(function (data, status, headers, config) {
            console.log(data);
//            if ($rootScope.userData.lng === 'EN') {
            $scope.specs = data.data;
            console.log($scope.specs);
//            $scope.categories = data.data;
        });
        req.error(function (data, status, headers, config) {
            console.log(data);
        });

    };
    $scope.selectSpec = function (num) {
        var spec = angular.element(document.getElementsByName('spec'));
        for (var i = 0; i < spec.length; i++) {
            $(spec[i]).removeClass('selectSpec');
        }
        $(spec[num - 1]).addClass('selectSpec');
        $scope.isKrockSelected = true;
        console.log(num);
        var req = $http.get($rootScope.mainUrl + "index.php?&action=getCategoryForKrock&spec_id=" + num+"&lng=" + $rootScope.userData.lng);
        req.success(function (data, status, headers, config) {
            console.log(data);
//            if ($rootScope.userData.lng === 'EN') {
//            $scope.specs = data.data;
//            console.log($scope.specs);
            $scope.categories = data.data;
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
       $scope.shuffle = function (array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
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
        var req = $http.get($rootScope.mainUrl + "index.php?&action=getQuestionsByMonoPlayer&cats=" + arrSelectedCat+"&lng=" + $rootScope.userData.lng);
        req.success(function (data, status, headers, config) {
            console.log(data);
            $rootScope.monoPlayer.questions = $scope.shuffle(data.data.questions);
            $rootScope.monoPlayer.answeres = $scope.shuffle(data.data.answeres);
            window.location = "#/newKrock";
        });
        req.error(function (data, status, headers, config) {
            console.log(data);
        });
    };
}