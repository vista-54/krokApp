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
    $scope.game = $rootScope.gameData.games[$rootScope.SearchGameById($scope.gameId)];//текущая игра
    $scope.waitStepSecondPlayer = $rootScope.waitStepSecondPlayer;//чей ход булин
    $scope.CurRoundGet = $rootScope.getCurrentRound($scope.game);
    //Подтягиваем с базы информацию о прошлых раундах
    $scope.getRoundStatistic = function () {
        var req = $http.get($rootScope.mainUrl + "index.php?&action=getRoundStatistic&id_game=" + $scope.gameId);
        req.success(function (data, status, headers, config) {
            console.log(status, data);
            $scope.Anyfnt();
            $scope.rs = data.data[0];
//            for (var i in $scope.rs) {
//                console.log(i);
//            }
            console.log($scope.rs);
            /* for (var i in data.data) {
             var obj = data.data[i];
             if ($rootScope.checkHost) {
             $scope.host = obj;
             //                    $rootScope.CurrentGame.lastAnsH = obj;
             
             //                    $scope.ready = true;
             //                    $scope.$apply();
             }
             else {
             $scope.p2 = obj;
             }
             
             }*/
//            console.log($scope.roundsP1 + " => " + $scope.roundsP2);

        });
        req.error(function (data, status, headers, config) {
            console.log(data);
        });
    };
    $scope.getRoundStatistic();
    /*Конец игры Бэта*/
    $scope.checkHost = $rootScope.checkHost;
    $scope.myNick = $rootScope.userData.login;
    $rootScope.gameEnd = function (game) {
        var req = $http.get($rootScope.mainUrl + "index.php?&action=gameEnd&idgame=" + $scope.gameId);
        req.success(function (data, status, headers, config) {
            console.log(data);
        });
        req.error(function (data, status, headers, config) {
            console.log(data);
        });
    };
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
        var req = $http.get($rootScope.mainUrl + "index.php?&action=getCurrCat&idcat=" + catId + "&lng=" + $rootScope.userData.lng);
        req.success(function (data, status, headers, config) {
            console.log(data);
            $rootScope.CurrentGame.categoryName = data.data[0];
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
            $rootScope.CurrentGame.category = {
                id: res
            };
            $rootScope.CurrentGame.isCategotySelected = true;
            window.location = "#/choisecategoty";
        }
        //Если нул получаем список с сервера
        else {
            $scope.getCategoriesList();
        }

        $rootScope.CurrentGame.id = $scope.gameId;


    };
    $scope.getCategoriesList = function () {
        var req = $http.get($rootScope.mainUrl + "index.php?&action=getCategory&lng=" + $rootScope.userData.lng);
        req.success(function (data, status, headers, config) {
//            console.log(status, data);
            $rootScope.gameData.games[$scope.SearchGameById($scope.gameId)].EmptyCategoriesList = data.data;
            $rootScope.gameData.games[$scope.SearchGameById($scope.gameId)].BusyCategoriesList = [];
            window.location = "#/choisecategoty";
        });
        req.error(function (data, status, headers, config) {
            console.log(data);
        });
    };

    $scope.Anyfnt = function () {

//        $scope.ready = false;

//    $scope.PlayButton='';
//    $scope.waitStep=' '



//    $scope.currentRound=1;
        /*
         $scope.getOpenGames = function () {
         var req = $http.get("http://192.168.0.101/index.php?&action=createRoom?&action=getOpenGames&username=" + $rootScope.userData.login);
         req.success(function (data, status, headers, config) {
         console.log(data);
         $rootScope.gameData.games = data.data;
         $scope.game = $rootScope.gameData.games[$scope.SearchGameById($scope.gameId)];
         if ($rootScope.checkGameEnd($scope.game)) {
         $scope.gameEnd($scope.game);
         }
         if ($scope.game.status === "2" && $scope.game.host === $rootScope.userData.login) {
         $scope.waitStepSecondPlayer = false;
         
         }
         else if ($scope.game.status === "1" && $scope.game.host !== $rootScope.userData.login) {
         $scope.waitStepSecondPlayer = false;
         
         }
         else {
         $scope.waitStepSecondPlayer = true;
         }
         $rootScope.waitStepSecondPlayer=$scope.waitStepSecondPlayer;
         //            $scope.games = $rootScope.gameData.games;
         });
         req.error(function (data, status, headers, config) {
         console.log(data);
         });
         };
         */

        //$scope.getOpenGames();
//    $scope.SearchGameById = function (id) {
//        for (var i in $rootScope.gameData.games)
//        {
//            var obj = $rootScope.gameData.games[i];
//            if (obj.id === id) {
//                return parseInt(i);
//            }
//        }
//    };
//    $scope.currentRound = $rootScope.getCurrentRound();




        $scope.getRoundStat = function (Round_num, p) {
            var answeresUser, dn;
            if (p) {
                switch (Round_num) {
                    case 1:
                        answeresUser = $scope.rs.r1p1;
                        dn = 'r1p1';
                        break;
                    case 2:
                        answeresUser = $scope.rs.r2p1;
                        dn = 'r2p1';
                        break;
                    case 3:
                        answeresUser = $scope.rs.r3p1;
                        dn = 'r3p1';
                        break;
                    case 4:
                        answeresUser = $scope.rs.r4p1;
                        dn = 'r4p1';
                        break;
                    case 5:
                        answeresUser = $scope.rs.r5p1;
                        dn = 'r5p1';
                        break;
                    case 6:
                        answeresUser = $scope.rs.r6p1;
                        dn = 'r6p1';
                        break;
                }
                $scope.CurrAnswUser = JSON.parse(answeresUser);
                var images = angular.element(document.querySelectorAll('[data-round]'));

                for (var i in images) {

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
                            if (obj1.user_ans_status === '0') {
//                                if (obj.children[j].localName !== "br") {
                                $(chArr[j]).attr('src', 'img/krestik.png');
//                                }
                            }
                        }
                    }
                }
            }
            else {
                switch (Round_num) {
                    case 1:
                        answeresUser = $scope.rs.r1p2;
                        dn = 'r1p2';
                        break;
                    case 2:
                        answeresUser = $scope.rs.r2p2;
                        dn = 'r2p2';
                        break;
                    case 3:
                        answeresUser = $scope.rs.r3p2;
                        dn = 'r3p2';
                        break;
                    case 4:
                        answeresUser = $scope.rs.r4p2;
                        dn = 'r4p2';
                        break;
                    case 5:
                        answeresUser = $scope.rs.r5p2;
                        dn = 'r5p2';
                        break;
                    case 6:
                        answeresUser = $scope.rs.r6p2;
                        dn = 'r6p2';
                        break;
                }
                $scope.CurrAnswUser = JSON.parse(answeresUser);
                var images = angular.element(document.querySelectorAll('[data-round]'));

                for (var i in images) {

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
                            if (obj1.user_ans_status === '0') {
//                                if (obj.children[j].localName !== "br") {
                                $(chArr[j]).attr('src', 'img/krestik.png');
//                                }
                            }
                        }
                    }
                }
            }



        };
    }
    ;
}