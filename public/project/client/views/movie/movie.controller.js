(function(){
    angular
        .module("FilmsterApp")
        .controller("MovieController", MovieController);

    function MovieController($scope, $routeParams, $sce, TmdbApiService, UserService, MovieService) {
        $scope.id = $routeParams.id;
        $scope.isReadonly = true;
        $scope.hoveringOver = hoveringOver;
        $scope.addRating = addRating;

        function init() {

            setCurrentUser();
            getMovieDetails();

        }

        return init();

        function setCurrentUser() {
            UserService
                .getCurrentUser()
                .then(function (response) {
                    $scope.currentUser = response.data;
                    if($scope.currentUser) {
                        $scope.isReadonly = false;
                    }
                });
        }

        function getMovieDetails() {
            TmdbApiService.findMovieByID($scope.id,
                function (response) {
                    if (response.videos.results.length > 0) {
                        var embedUrl = 'https://www.youtube.com/embed/';
                        response.video_path = $sce.trustAsResourceUrl(embedUrl + response.videos.results[0].key);
                    }
                    response.credits.cast.splice(8, response.credits.cast.length - 8);
                    $scope.movie = response;
                    $scope.movie.criticsRating = response.vote_average / 2;
                    getUsersRating();
                    getReviews();
                    console.log($scope.movie);
                });
        }

        function hoveringOver(value) {
            $scope.overStar = value;
            $scope.percent = 100 * (value /5);
        }

        function addRating() {
            console.log($scope.movie.usersRating);
            MovieService
                .addRating($scope.currentUser._id, $scope.movie.id, $scope.movie.usersRating)
                .then(function (response) {
                    $scope.movie.usersRating = response.data;
                });
        }

        function getUsersRating() {
            MovieService
                .getRating($scope.movie.id)
                .then(function (response) {
                    console.log(response.data);
                    $scope.movie.usersRating = response.data;
                })
        }

        function getReviews() {
            // TODO
        }
    }
})();