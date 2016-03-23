(function (){
    "use strict";
    angular
        .module("FilmsterAppCrud")
        .controller("HeaderCrudController", HeaderCrudController);

    function HeaderCrudController($scope, $location){
        $scope.$location = $location;
    }
})();