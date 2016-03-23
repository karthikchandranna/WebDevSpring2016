(function (){
    "use strict";
    angular
        .module("FilmsterAppCrud")
        .controller("SidebarCrudController", SidebarCrudController);

    function SidebarCrudController($scope, $location){
        $scope.$location = $location;
    }
})();