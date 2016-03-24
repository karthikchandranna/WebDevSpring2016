(function (){
    "use strict";
    angular
        .module("FilmsterApp")
        .controller("HomeController", HomeController);

    function HomeController($scope, TmdbApiService, $sce) {

        $scope.genreName = genreName;

        function init() {
            getGenres();
            getNowplayingMovies();
            getUpcomingMovies();
        }

        return init();

        function getGenres() {
            TmdbApiService
                .getGenres()
                .then(function (response){
                    $scope.genres = response.data.genres;
                })
        }

        function getNowplayingMovies() {
            TmdbApiService
                .getNowPlaying()
                .then(function(response){
                    $scope.nowPlaying = response.data.results;
                    TmdbApiService
                        .fetchAllVideos($scope.nowPlaying)
                        .then(function(resp){
                            fetchAllNowPlayingVideos(resp);
                        });
                });
        }

        function getUpcomingMovies() {
            TmdbApiService
                .getUpcomingMovies()
                .then(function(response){
                    $scope.upcoming = response.data.results;
                    TmdbApiService
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