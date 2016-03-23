(function(){
    angular
        .module("FilmsterApp")
        .controller("CastController", CastController);

    function CastController($scope, $routeParams, MovieService){
        $scope.id = $routeParams.id;
        MovieService.findCastByID($scope.id,
            function(response){
                response.movie_credits.cast.splice(8, response.movie_credits.cast.length-8);
                $scope.actor = response;
            })
    }
})();