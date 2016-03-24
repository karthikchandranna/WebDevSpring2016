(function (){
    "use strict";
    angular
        .module("FilmsterApp")
        .controller("HomeController", HomeController);

    function HomeController(TmdbApiService, $sce) {
        var vm = this;
        vm.genreName = genreName;

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
                    vm.genres = response.data.genres;
                })
        }

        function getNowplayingMovies() {
            TmdbApiService
                .getNowPlaying()
                .then(function(response){
                    vm.nowPlaying = response.data.results;
                    TmdbApiService
                        .fetchAllVideos(vm.nowPlaying)
                        .then(function(resp){
                            fetchAllNowPlayingVideos(resp);
                        });
                });
        }

        function getUpcomingMovies() {
            TmdbApiService
                .getUpcomingMovies()
                .then(function(response){
                    vm.upcoming = response.data.results;
                    TmdbApiService
                        .fetchAllVideos(vm.upcoming)
                        .then(function(resp){
                            fetchAllUpComingVideos(resp);
                        });
                });
        }

        function fetchAllUpComingVideos(resp) {
            var embedUrl = 'https://www.youtube.com/embed/';
            for (var r in resp) {
                if (resp[r].data.results.length > 0) {
                    vm.upcoming[r].video_url = $sce.trustAsResourceUrl(embedUrl + resp[r].data.results[0].key);
                }
            }
        }

        function fetchAllNowPlayingVideos(resp) {
            var embedUrl = 'https://www.youtube.com/embed/';
            for (var r in resp) {
                if (resp[r].data.results.length > 0) {
                    vm.nowPlaying[r].video_url = $sce.trustAsResourceUrl(embedUrl + resp[r].data.results[0].key);
                }
            }
        }

        function genreName(id) {
            for (var genre in vm.genres) {
                if (vm.genres[genre].id === id){
                    return vm.genres[genre].name;
                }
            }
        }
    }
})();