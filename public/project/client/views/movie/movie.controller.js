(function(){
    angular
        .module("FilmsterApp")
        .controller("MovieController", MovieController);

    function MovieController($scope, $routeParams, MovieService, $sce){
        $scope.id = $routeParams.id;
        MovieService.findMovieByID($scope.id,
            function(response){
                if(response.videos.results.length>0) {
                    var embedUrl = 'https://www.youtube.com/embed/';
                    response.video_path = $sce.trustAsResourceUrl(embedUrl + response.videos.results[0].key);
                }
                response.credits.cast.splice(8, response.credits.cast.length-8);
                $scope.movie = response;
            })
    }
})();