/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


gameModule.controller('selectCategoryController', selectCategoryController);
function selectCategoryController($scope, $http, $rootScope) {


//    $scope.SearchGameById = function (id) {
//        for (var i in $rootScope.gameData.games)
//        {
//            var obj = $rootScope.gameData.games[i];
//            if (obj.id === id) {
//                return i;
//            }
//        }
//    };
    var game = $rootScope.gameData.games[$scope.SearchGameById(parseInt($rootScope.CurrentGame.id))];
    $scope.categoryLists = game.EmptyCategoriesList;

    $scope.categorySelected = function (CatId) {
        var round = $rootScope.getCurrentRound(game);
        $rootScope.CurrentGame.round = round;
//        $rootScope.gameData.games[$scope.SearchGameById($rootScope.CurrentGame.id)].BusyCategoriesList.push(CatId.category);
//        $rootScope.gameData.category.push(CatId.category._name);
        console.log("CategorySelected");
        $rootScope.CurrentGame.categoryName = CatId.category.name;
        if(typeof $rootScope.gameData.games[$scope.SearchGameById(game.id)].BusyCategoriesList==='undefined'){
            $rootScope.gameData.games[$scope.SearchGameById(game.id)].BusyCategoriesList=[];
        }
        $rootScope.gameData.games[$scope.SearchGameById(game.id)].BusyCategoriesList.push($rootScope.CurrentGame.categoryName);
        var req = $http.get($rootScope.mainUrl + "multiplayer/get-questions?categotyId=" + CatId.category.id + "&round=" + round + "&idGame=" + game.id + "&lng=" + $rootScope.userData.lng + "&issecond=" + $rootScope.CurrentGame.isSecond);
        req.success(function (data, status, headers, config) {
            console.log(status, data);
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
            $rootScope.gameData.games[$scope.SearchGameById(parseInt($rootScope.CurrentGame.id))].questionsArr = $rootScope.shuffle(data.questions);
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


            $rootScope.gameData.games[$scope.SearchGameById(parseInt($rootScope.CurrentGame.id))].answeresArr = $rootScope.shuffle(data.answeres);
            window.location = "#/newgame/" + game.id + "/game";
            console.log(data);


        });
        req.error(function (data, status, headers, config) {
            console.log(data);
        });

    };
    if ($rootScope.CurrentGame.isCategotySelected) {
        $scope.categorySelected($rootScope.CurrentGame);
    }
}