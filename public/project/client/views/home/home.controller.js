(function (){
    "use strict";
    angular
        .module("FilmsterApp")
        .controller("HomeController", HomeController);

    function HomeController($scope, MovieService, $sce) {
        function init() {
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

            MovieService
                .getUpcomingMovies()
                .then(function(response){
                    $scope.upcoming = response.data.results;
                    MovieService
                        .fetchAllVideos($scope.upcoming)
                        .then(function(resp){
                            fetchAllUpComingVideos(resp);
                        });
                });
        }

        return init();

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
    }
})();