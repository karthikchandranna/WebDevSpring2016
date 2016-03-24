(function(){
    angular
        .module("FilmsterApp")
        .controller("CastController", CastController);

    function CastController($scope, $routeParams, TmdbApiService){
        $scope.id = $routeParams.id;
        TmdbApiService.findCastByID($scope.id,
            function(response){
                response.movie_credits.cast.splice(8, response.movie_credits.cast.length-8);
                $scope.actor = response;
            })
    }
})();