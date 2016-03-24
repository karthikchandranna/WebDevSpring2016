(function(){
    angular
        .module("FilmsterApp")
        .controller("MovieController", MovieController);

    function MovieController($scope, $routeParams, MovieService, $sce){
        $scope.id = $routeParams.id;

        $scope.rate = 3;
        $scope.max = 5;
        $scope.isReadonly = false;

        $scope.hoveringOver = function(value) {
            $scope.overStar = value;
            $scope.percent = 100 * (value / $scope.max);
        };

        $scope.ratingStates = [
            {stateOn: 'orange-star', stateOff: 'grey-star'},
            {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
            {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
            {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
            {stateOn: 'glyphicon-heart'},
            {stateOff: 'glyphicon-off'}
        ];

        MovieService.findMovieByID($scope.id,
            function(response){
                if(response.videos.results.length>0) {
                    var embedUrl = 'https://www.youtube.com/embed/';
                    response.video_path = $sce.trustAsResourceUrl(embedUrl + response.videos.results[0].key);
                }
                response.credits.cast.splice(8, response.credits.cast.length-8);
                $scope.movie = response;
                $scope.movie.criticsRating = response.vote_average/2;
                console.log($scope.movie);
            })
    }
})();