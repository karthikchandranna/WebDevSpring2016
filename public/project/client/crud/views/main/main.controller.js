(function (){
    "use strict";
    angular
        .module("FilmsterAppCrud")
        .controller("MainCrudController", MainCrudController);

    function MainCrudController($scope, $location){
        $scope.$location = $location;
    }
})();