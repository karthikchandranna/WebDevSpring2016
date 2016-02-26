(function(){
    angular
        .module("MovieApp")
        .controller("NavController", navController);

    function navController($scope, $location){
        $scope.$location = $location;
        console.log($location.url());
    }
})();