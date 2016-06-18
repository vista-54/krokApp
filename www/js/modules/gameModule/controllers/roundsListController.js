/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


gameModule.controller('roundsListController', roundsListController);
function roundsListController($scope, $rootScope, $routeParams, $http) {
    $rootScope.IntervalStop = true;
    $rootScope.CurrentGame = {};//объект текущей игры
    $scope.gameId = $routeParams.gameId; //айди текущей игры
    $scope.game = $rootScope.gameData.games[$rootScope.SearchGameById(parseInt($scope.gameId))];//текущая игра
    $scope.waitStepSecondPlayer = $rootScope.waitStepSecondPlayer;//чей ход булин
    $scope.CurRoundGet = $rootScope.getCurrentRound($scope.game);
    //Подтягиваем с базы информацию о прошлых раундах
    $scope.getRoundStatistic = function () {
        var req = $http.get($rootScope.mainUrl + "multiplayer/get-round-statistic?id_game=" + $scope.gameId);
        req.success(function (data, status, headers, config) {
            console.log(status, data);
            $scope.rs = data;
            $scope.myNick = $scope.checkHost($scope.game.host) ? $scope.game.player2 : $scope.game.host;
            $scope.Anyfnt();
            console.log($scope.rs);
        });
        req.error(function (data, status, headers, config) {
            console.log(data);
        });
    };

    $scope.getRoundStatistic();
    /*Конец игры Бэта*/
    $scope.checkHost = $rootScope.checkHost;
    $scope.myNick = $rootScope.userData.login;

    $scope.isHost = function () {
        if ($scope.currentGame.host === $rootScope.userData.login) {
            $scope.currentRound = $rootScope.CurrentGame.round;
            return true;
        }
        else {
            $scope.currentRound = $rootScope.CurrentGame.round - 1;
            return false;
        }
    };
//    $scope.isHost();
    console.log("roundsListController");
    $scope.getCurrentCategory = function (catId) {
        var req = $http.get($rootScope.mainUrl + "multiplayer/get-category?id=" + catId + "&lng=" + $rootScope.userData.lng);
        req.success(function (data, status, headers, config) {
            console.log(data);
            switch ($rootScope.userData.lng) {
                case 'UA':
                    data.name = data.name_ukr;
                    break;
                case 'EN':
                    data.name = data.name_eng;
                    break;
                case 'RU':
                    data.name = data.name_rus;
                    break;
            }
            $rootScope.CurrentGame.categoryName = data.name;
        });
        req.error(function (data, status, headers, config) {
            console.log(data);
        });
    };
    $scope.play = function () {
        $rootScope.CurrentGame.isCategotySelected = false;
        //проверяем раунд 
        switch ($rootScope.getCurrentRound($scope.game)) {
            case 1:
                res = $scope.game.round1;
                break;
            case 2:
                res = $scope.game.round2;
                break;
            case 3:
                res = $scope.game.round3;
                break;
            case 4:
                res = $scope.game.round4;
                break;
            case 5:
                res = $scope.game.round5;
                break;
            case 6:
                res = $scope.game.round6;
                break;

        }
        //берем с раунда катеорию если она не НУЛЛ
        if (res !== null) {
            $scope.getCurrentCategory(res);
            $rootScope.CurrentGame.isSecond = true;//вы второй игрок, категория уже выбрана
            $rootScope.CurrentGame.category = {
                id: res
            };
            $rootScope.CurrentGame.isCategotySelected = true;
            window.location = "#/choisecategoty";
        }
        //Если нул получаем список с сервера
        else {
            $rootScope.CurrentGame.isSecond = false;
            $scope.getCategoriesList();
        }

        $rootScope.CurrentGame.id = $scope.gameId;


    };
//    $rootScope.gameData.busyCat=[];
    $rootScope.gameData.games[$scope.SearchGameById(parseInt($scope.gameId))].BusyCategoriesList = [];
    $scope.getCategoriesList = function () {
        var req = $http.get($rootScope.mainUrl + "multiplayer/get-category?id=undefined&lng=" + $rootScope.userData.lng);
        req.success(function (data, status, headers, config) {
//            console.log(status, data);
            var arr = [];

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

                var count = 0;
                for (var i in $rootScope.gameData.games[$scope.SearchGameById(parseInt($scope.gameId))].BusyCategoriesList)
                {
                    var o2 = $rootScope.gameData.games[$scope.SearchGameById(parseInf($scope.gameId))].BusyCategoriesList[i];
                    if (obj.name !== o2)
                    {
                        count++;
                    }

                }
                if ((count === 0) && (arr.length !== 3)) {
                    arr.push(obj);
                }


            }
            $rootScope.gameData.games[$scope.SearchGameById(parseInt($scope.gameId))].EmptyCategoriesList = arr;


            window.location = "#/choisecategoty";
        });
        req.error(function (data, status, headers, config) {
            console.log(data);
        });
    };

    $scope.Anyfnt = function () {
        $scope.ShowInfoForMarker = function (e) {
            var que = e.currentTarget.attributes['data-question'].nodeValue;
            var answ = e.currentTarget.attributes['data-useranswer'].nodeValue;
            var coransw = e.currentTarget.attributes['data-correctanswer'].nodeValue;
            $http.get($rootScope.mainUrl + 'multiplayer/get-full-info?que=' + que + '&answ=' + answ + '&coransw=' + coransw)
                    .success(function (result) {
                        console.log(result);
//                        for (var i in result) {
                        var obj = result;
                        switch ($rootScope.userData.lng) {
                            case 'UA':
                                quest = obj.que.question_ukr;
                                answ = obj.ans.text_ukr;
                                coransw = obj.coransw.text_ukr;
                                break;
                            case 'EN':
                                quest = obj.question_eng;
                                answ = obj.text_eng;
                                coransw = obj.coransw.text_eng;
                                break;
                            case 'RU':
                                quest = obj.question_rus;
                                answ = obj.text_rus;
                                coransw = obj.coransw.text_rus;
                                break;
                        }

//                        }
                        alert("Вопрос: " + quest + " Ваш ответ: " + answ + " Правильный ответ: " + coransw);
                    })
                    .error(function (error) {
                        console.log(error);
                    });


            console.log("test");
        };

        $scope.getRoundStat = function (Round_num, p, position) {
            var answeresUser, dn, pl;
            if (position === 'f') {
                pl = 'p1';
            }
            else {
                pl = 'p2';
            }
            if ((p) && ($scope.rs.length !== 0)) {
                switch (Round_num) {
                    case 1:
                        answeresUser = $scope.rs.r1p1;
                        dn = 'r1';
                        break;
                    case 2:
                        answeresUser = $scope.rs.r2p1;
                        dn = 'r2';
                        break;
                    case 3:
                        answeresUser = $scope.rs.r3p1;
                        dn = 'r3';
                        break;
                    case 4:
                        answeresUser = $scope.rs.r4p1;
                        dn = 'r4';
                        break;
                    case 5:
                        answeresUser = $scope.rs.r5p1;
                        dn = 'r5';
                        break;
                    case 6:
                        answeresUser = $scope.rs.r6p1;
                        dn = 'r6';
                        break;
                }
                dn += pl;
                if ((typeof answeresUser !== 'undefined') && (answeresUser !== '')) {
                    $scope.CurrAnswUser = JSON.parse(answeresUser);
                }
                else {
                    $scope.CurrAnswUser = '';
                }
                var images = angular.element(document.querySelectorAll('[data-round]'));

                for (var i = 0; i < images.length; i++) {

                    var obj = images[i];
                    var chArr = [];
                    for (var k = 0; k < 6; k++) {
                        if (obj.children[k].localName !== "br") {
                            chArr.push(obj.children[k]);
                        }

                    }


                    if (obj.attributes['data-round'].nodeValue === dn)
                    {

                        for (var j in $scope.CurrAnswUser) {
                            var obj1 = $scope.CurrAnswUser[j];
                            if (obj1.rightAnswer !== obj1.userAnswer) {
                                //                                if (obj.children[j].localName !== "br") {
                                $(chArr[j]).attr('src', 'img/krestik.png');

                                //                                }
                            }
                            //                            $(chArr[j]).attr('ng-click', 'ShowInfoForMarker()');
                            $(chArr[j]).attr('data-question', obj1.question);
                            $(chArr[j]).attr('data-userAnswer', obj1.userAnswer);
                            $(chArr[j]).attr('data-correctAnswer', obj1.rightAnswer);

                        }
                    }
                }
            }
            else {
                switch (Round_num) {
                    case 1:
                        answeresUser = $scope.rs.r1p2;
                        dn = 'r1';
                        break;
                    case 2:
                        answeresUser = $scope.rs.r2p2;
                        dn = 'r2';
                        break;
                    case 3:
                        answeresUser = $scope.rs.r3p2;
                        dn = 'r3';
                        break;
                    case 4:
                        answeresUser = $scope.rs.r4p2;
                        dn = 'r4';
                        break;
                    case 5:
                        answeresUser = $scope.rs.r5p2;
                        dn = 'r5';
                        break;
                    case 6:
                        answeresUser = $scope.rs.r6p2;
                        dn = 'r6';
                        break;
                }
                dn += pl;
                if ((typeof answeresUser !== 'undefined') && (answeresUser !== '')) {
                    $scope.CurrAnswUser = JSON.parse(answeresUser);
                }
                else {
                    $scope.CurrAnswUser = '';
                }


                var images = angular.element(document.querySelectorAll('[data-round]'));

                for (var i = 0; i < images.length; i++) {

                    var obj = images[i];
                    var chArr = [];
                    for (var k = 0; k < 6; k++) {
                        if (obj.children[k].localName !== "br") {
                            chArr.push(obj.children[k]);
                        }

                    }


                    if (obj.attributes['data-round'].nodeValue === dn)
                    {

                        for (var j in $scope.CurrAnswUser) {
                            var obj1 = $scope.CurrAnswUser[j];
                            if (obj1.rightAnswer !== obj1.userAnswer) {
//                                if (obj.children[j].localName !== "br") {
                                $(chArr[j]).attr('src', 'img/krestik.png');

                                //                                }
                            }
                            //                            $(chArr[j]).attr('ng-click', 'ShowInfoForMarker()');
                            $(chArr[j]).attr('data-question', obj1.question);
                            $(chArr[j]).attr('data-userAnswer', obj1.userAnswer);
                            $(chArr[j]).attr('data-correctAnswer', obj1.rightAnswer);

                        }
                    }
                }
            }


//            $scope.apply();
        };

    }
    ;
    $scope.capitulation = function () {
        $http.get($rootScope.mainUrl + 'multiplayer/capitulation?game=' + $scope.gameId + '&user=' + $rootScope.userData.login)
                .success(function (result) {
                    console.log(result);
                    window.location='#mainmenu';
                })
                .error(function (error) {
                    console.log(error);
                });
        console.log('capitulation');
    };

}