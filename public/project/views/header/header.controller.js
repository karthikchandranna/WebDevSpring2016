(function (){
    "use strict";
    angular
        .module("FilmsterApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location){
        $scope.$location = $location;
        /*$scope.logout = logout;

        function logout() {
            UserService.setCurrentUser(null);
            $location.url("/home");
        }*/
    }
})();