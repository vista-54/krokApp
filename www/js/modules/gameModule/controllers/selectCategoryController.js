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
    var game = $rootScope.gameData.games[$scope.SearchGameById($rootScope.CurrentGame.id)];
    $scope.categoryLists = game.EmptyCategoriesList;

    $scope.categorySelected = function (CatId) {
        var round = $rootScope.getCurrentRound(game);
        $rootScope.CurrentGame.round = round;
//        $rootScope.gameData.games[$scope.SearchGameById($rootScope.CurrentGame.id)].BusyCategoriesList.push(CatId.category);
//        $rootScope.gameData.category.push(CatId.category._name);
        console.log("CategorySelected");
        $rootScope.CurrentGame.categoryName = CatId.category.name;
        var req = $http.get($rootScope.mainUrl + "index.php?&action=getQuestions&categotyId=" + CatId.category.id + "&round=" + round + "&idGame=" + game.id + "&lng=" + $rootScope.userData.lng);
        req.success(function (data, status, headers, config) {
            console.log(status, data);
            if (data.data) {
                $rootScope.gameData.games[$scope.SearchGameById($rootScope.CurrentGame.id)].questionsArr = $rootScope.shuffle(data.data.questions);
                $rootScope.gameData.games[$scope.SearchGameById($rootScope.CurrentGame.id)].answeresArr = $rootScope.shuffle(data.data.answeres);
                window.location = "#/newgame/" + game.id + "/game";
                console.log(data);
            }
            else {

            }
        });
        req.error(function (data, status, headers, config) {
            console.log(data);
        });

    };
    if ($rootScope.CurrentGame.isCategotySelected) {
        $scope.categorySelected($rootScope.CurrentGame);
    }
}