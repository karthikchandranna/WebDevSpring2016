(function (){
    "use strict";
    angular
        .module("FilmsterApp")
        .controller("SearchController", SearchController);

    function SearchController($routeParams, TmdbApiService, $sce) {
        var vm = this;
        vm.search = search;
        vm.query = $routeParams.query;
        vm.fetchAllVideos = fetchAllVideos;
        vm.genreName = genreName;

        function init() {
            if (vm.query) {
                search(vm.query);
                getGenres();
            }
        }

        return init();

        function search(query) {
            TmdbApiService
                .searchMovies(query)
                .then(function(response){
                    vm.movies = response.data.results;
                    /*TmdbApiService
                        .fetchAllVideos(vm.movies)
                        .then(function(resp){
                            fetchAllVideos(resp);
                        });*/
                });
        }

        function fetchAllVideos(resp) {
            var embedUrl = 'https://www.youtube.com/embed/';
            for (var r in resp) {
                if(resp[r].data.results.length > 0) {
                    vm.movies[r].video_url = $sce.trustAsResourceUrl(embedUrl + resp[r].data.results[0].key);
                }
            }
        }

        function getGenres() {
            TmdbApiService
                .getGenres()
                .then(function (response){
                    vm.genres = response.data.genres;
                })
        }

        function genreName(id) {
            for (var genre in vm.genres) {
                if (vm.genres[genre].id === id){
                    return vm.genres[genre].name;
                }
            }
        };
    }
})();