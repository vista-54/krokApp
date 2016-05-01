/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var gameModule = angular.module('gameModule', ['ngRoute', 'ngCordova', 'ui.router']);
gameModule.config(['$routeProvider', function ($routeProvide) {
        $routeProvide
                .when('/mainmenu', {
                    templateUrl: 'views/gameModule/mainMenu.html',
                    controller: 'MainMenuController'
                })
                .when('/setting', {
                    templateUrl: 'views/gameModule/setting.html',
                    controller: 'SettingController'
                })
                .when('/newgame', {
                    templateUrl: 'views/gameModule/newGame.html',
                    controller: 'NewGameController'
                })
                .when('/newgame/:gameId', {
                    templateUrl: 'views/gameModule/rounds.html',
                    controller: 'roundsListController'
                })
                .when('/newgame/:gameId/game', {
                    templateUrl: 'views/gameModule/questions.html',
                    controller: 'questionsController'
                })
                .when('/choisecategoty', {
                    templateUrl: 'views/gameModule/selectCategory.html',
                    controller: 'selectCategoryController'
                })
                .when('/history', {
                    templateUrl: 'views/gameModule/history.html',
                    controller: 'historyController'
                })
                .when('/krockList', {
                    templateUrl: 'views/gameModule/krockList.html',
                    controller: 'krockListController'
                })
                .when('/newKrock', {
                    templateUrl: 'views/gameModule/newKrock.html',
                    controller: 'newKrockController'
                })
                .when('/resultKrock', {
                    templateUrl: 'views/gameModule/resultMonoPlayer.html',
                    controller: 'resultMonoPlayerController'
                })
                .when('/statistic', {
                    templateUrl: 'views/gameModule/statistic.html',
                    controller: 'statisticController'
                })
                .when('/globalrating', {
                    templateUrl: 'views/gameModule/grating.html',
                    controller: 'globalratingController'
                })
                .when('/help', {
                    templateUrl: 'views/gameModule/help.html',
                    controller: 'helpController'
                })
                .when('/statisticForCategories', {
                    templateUrl: 'views/gameModule/statisticForCategories.html',
                    controller: 'statisticForCategoriesController'
                })
                .when('/versus', {
                    templateUrl: 'views/gameModule/versus.html',
                    controller: 'versusController'
                })

                .otherwise({
                    redirectTo: '/'
                });
    }]);
gameModule.controller('MainMenuController', MainMenuController);
function MainMenuController($scope, $http, $rootScope) {
    $rootScope.gameEnd = function (game) {
        var req = $http.get($rootScope.mainUrl + "multiplayer/game-end?idgame=" + game.id);
        req.success(function (data, status, headers, config) {
            console.log(data);
        });
        req.error(function (data, status, headers, config) {
            console.log(data);
        });
    };
    $scope.gameEnd = $rootScope.gameEnd;
    $('.mainMenu ul').height($(window).height() - $('.mainMenu nav').height() - $('.newGameBtn').height() - $('.historyCnt').height() - 30);
    $rootScope.shuffle = function (array) {
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
    $scope.successReq = false;
    $rootScope.IntervalStop = false;
    $scope.waitStepSecondPlayer = $rootScope.waitStepSecondPlayer;
    /*Проверка не закончена ли игра*/
    $rootScope.checkGameEnd = function (g) {
        if (g.scoreP1r6 !== null && g.scoreP2r6 !== null) {
            return  true;
        }
        return false;
    };
    $rootScope.gameData = {};
    $rootScope.gameData.games = [];
    $scope.checkHost = $rootScope.checkHost;
    /*Проверка не мы ли хост*/

    $rootScope.checkHost = function (hostNick) {
        if (hostNick !== '') {
            if (hostNick === $rootScope.userData.login) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }

    };
    /*Ищем порядковый номер игры в массиве по айдишнику*/
    $rootScope.SearchGameById = function (id) {
        for (var i in $rootScope.gameData.games)
        {
            var obj = $rootScope.gameData.games[i];
            if (obj.id === id) {
                return i;
            }
        }
    };
    /*Определяем текущий раунд*/
    $rootScope.getCurrentRound = function (g) {
        if (g.scoreP1r1 === null || g.scoreP2r1 === null) {
            return 1;
        }
        else if (g.scoreP1r2 === null || g.scoreP2r2 === null) {
            return 2;
        }
        else if (g.scoreP1r3 === null || g.scoreP2r3 === null) {
            return 3;
        }
        else if (g.scoreP1r4 === null || g.scoreP2r4 === null) {
            return 4;
        }
        else if (g.scoreP1r5 === null || g.scoreP2r5 === null) {
            return 5;
        }
        else if (g.scoreP1r6 === null || g.scoreP2r6 === null) {
            return 6;
        }
    };
//    intervalID='';
    $scope.getCurrentRound = $rootScope.getCurrentRound;
    /*Поулчаем список незавершенных нами игр*/
    $rootScope.getOpenGames = function () {
//        if (typeof $scope.intervalID !== 'undefined') {
//            clearInterval($scope.intervalID);
//        }

        var req = $http.get($rootScope.mainUrl + "multiplayer/get-open-games?username=" + $rootScope.userData.login);
        req.success(function (data, status, headers, config) {
//            $rootScope.getHistoryGames();
            $scope.successReq = true;
            console.log(data);
            if (data.winner !== null) {
                if (data.winner.winner === $rootScope.userData.login) {
                    if ($rootScope.userData.login === data.winner.host) {
                        alert('Вы победили игрока ' + data.winner.p2);
                    }
                    else {
                        alert('Вы победили игрока ' + data.winner.host);
                    }
                }
                else if (data.winner.winner !== $rootScope.userData.login) {
                    if ($rootScope.userData.login === data.winner.host) {
                        alert('Вы проиграли игроку ' + data.winner.p2);
                    }
                    else {
                        alert('Вы проиграли игроку ' + data.winner.host);
                    }
                }
            }
            $rootScope.gameData.games = data.opengames;
            $scope.games = $rootScope.gameData.games;
            $scope.versus = data.versus;
//            $scope.CurrGame = $rootScope.gameData.games[$rootScope.SearchGameById($scope.gameId)];
            for (var i in $scope.games) {
                $scope.CurrGame = $scope.games[i];
                if ($rootScope.checkGameEnd($scope.CurrGame)) {
                    $scope.gameEnd($scope.CurrGame);
                }
                if ($scope.CurrGame.status === 2 && $scope.CurrGame.host === $rootScope.userData.login) {
                    $scope.games[i].waitStepSecondPlayer = false;
                }
                else if ($scope.CurrGame.status === 1 && $scope.CurrGame.host !== $rootScope.userData.login) {
                    $scope.games[i].waitStepSecondPlayer = false;
                }
                else if ($scope.CurrGame.status === 0) {
                    $scope.games[i].waitStepSecondPlayer = false;
                }
                else {
                    $scope.games[i].waitStepSecondPlayer = true;
                }
                $rootScope.waitStepSecondPlayer = $scope.games[i].waitStepSecondPlayer;
            }
        });
        req.error(function (data, status, headers, config) {
            console.log(data);
        });
    };
    $rootScope.getOpenGames();
    $scope.refresh = function () {
        $rootScope.getOpenGames();
    };
    $scope.intervalID = setInterval(function () {
        if (!$rootScope.IntervalStop) {
            if ($scope.successReq) {
                $scope.successReq = false;
                $scope.refresh();
                console.log("int");
            }
        }

    }, 5000);
//    $rootScope.intervalID = $scope.intervalID;
//    $rootScope.getOpenGames();


    console.log("MainMenu Controller");
    /*Функция открытия меню*/
    $scope.openMenu = function () {
        console.log("OpenMenu");
        window.location = "#/setting";
    };
    $scope.openStatistic = function () {
        console.log('statistic open');
        window.location = '#/statistic';
    };
    $scope.accept = function (id, host, p2) {
        $http.get($rootScope.mainUrl + 'versus/accept?id=' + id + '&host=' + host + '&p2=' + p2)
                .success(function (result) {
                    console.log(result);
                })
                .error(function (result) {
                    console.log(result);
                });
        console.log(id);
    };
    $scope.reject = function (id) {
        $http.get($rootScope.mainUrl + 'versus/reject?id=' + id)
                .success(function (result) {
                    console.log(result);
                })
                .error(function (result) {
                    console.log(result);
                });
        console.log(id);
    };

}