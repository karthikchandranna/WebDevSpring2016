(function (){
    "use strict";
    angular
        .module("FilmsterApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location,UserService){
        $scope.$location = $location;
        $scope.query = '';
        $scope.submit = submit;
        $scope.logout = logout;

        function logout() {
            UserService.setCurrentUser(null);
            $location.url("/home");
        }

        function submit(){
            if($scope.query) {
                console.log($scope.query);
                $location.url("/search/"+$scope.query);
                $scope.query = '';
            }
        }
    }
})();