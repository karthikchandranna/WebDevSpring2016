(function(){
    angular
        .module("FilmsterApp")
        .controller("MovieController", MovieController);

    function MovieController($scope, $routeParams, MovieService, $sce, UserService) {
        $scope.id = $routeParams.id;
        $scope.isReadonly = true;

        $scope.hoveringOver = function(value) {
            $scope.overStar = value;
            $scope.percent = 100 * (value /5);
        };

        $scope.rate = function() {
            console.log($scope.movie.criticsRating);
        };

        function init() {

            UserService
                .getCurrentUser()
                .then(function (response) {
                    $scope.currentUser = response.data;
                    if($scope.currentUser) {
                        $scope.isReadonly = false;
                    }
                });

            MovieService.findMovieByID($scope.id,
                function (response) {
                    if (response.videos.results.length > 0) {
                        var embedUrl = 'https://www.youtube.com/embed/';
                        response.video_path = $sce.trustAsResourceUrl(embedUrl + response.videos.results[0].key);
                    }
                    response.credits.cast.splice(8, response.credits.cast.length - 8);
                    $scope.movie = response;
                    $scope.movie.criticsRating = response.vote_average / 2;
                    console.log($scope.movie);
                });
        }

        return init();
    }
})();