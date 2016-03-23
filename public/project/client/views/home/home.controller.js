(function (){
    "use strict";
    angular
        .module("FilmsterApp")
        .controller("HomeController", HomeController);

    function HomeController($scope, MovieService, $sce) {

        $scope.genreName = genreName;

        function init() {
            getGenres();
            getNowplayingMovies();
            getUpcomingMovies();
        }

        return init();

        function getGenres() {
            MovieService
                .getGenres()
                .then(function (response){
                    $scope.genres = response.data.genres;
                    console.log($scope.genres);
                })
        }

        function getNowplayingMovies() {
            MovieService
                .getNowPlaying()
                .then(function(response){
                    $scope.nowPlaying = response.data.results;
                    MovieService
                        .fetchAllVideos($scope.nowPlaying)
                        .then(function(resp){
                            fetchAllNowPlayingVideos(resp);
                        });
                });
        }

        function getUpcomingMovies() {
            MovieService
                .getUpcomingMovies()
                .then(function(response){
                    $scope.upcoming = response.data.results;
                    console.log($scope.upcoming);
                    MovieService
                        .fetchAllVideos($scope.upcoming)
                        .then(function(resp){
                            fetchAllUpComingVideos(resp);
                        });
                });
        }

        function fetchAllUpComingVideos(resp) {
            var embedUrl = 'https://www.youtube.com/embed/';
            for (var r in resp) {
                if (resp[r].data.results.length > 0) {
                    $scope.upcoming[r].video_url = $sce.trustAsResourceUrl(embedUrl + resp[r].data.results[0].key);
                }
            }
        }

        function fetchAllNowPlayingVideos(resp) {
            var embedUrl = 'https://www.youtube.com/embed/';
            for (var r in resp) {
                if (resp[r].data.results.length > 0) {
                    $scope.nowPlaying[r].video_url = $sce.trustAsResourceUrl(embedUrl + resp[r].data.results[0].key);
                }
            }
        }

        function genreName(id) {
            for (var genre in $scope.genres) {
                if ($scope.genres[genre].id === id){
                    return $scope.genres[genre].name;
                }
            }
        };
    }
})();