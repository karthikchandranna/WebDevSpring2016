(function (){
    "use strict";
    angular
        .module("FilmsterApp")
        .controller("MainController", MainController);

    function MainController($scope, $location){
        $scope.$location = $location;
    }
})();