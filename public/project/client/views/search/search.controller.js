(function (){
    "use strict";
    angular
        .module("FilmsterApp")
        .controller("SearchController", SearchController);

    function SearchController($scope, $routeParams, MovieService, $sce) {
        $scope.search = search;
        $scope.query = $routeParams.query;
        $scope.fetchAllVideos = fetchAllVideos;
        $scope.genreName = genreName;

        function init() {
            if ($scope.query) {
                search($scope.query);
                getGenres();
            }
        }

        return init();

        function search(query) {
            MovieService
                .searchMovies(query)
                .then(function(response){
                    $scope.movies = response.data.results;
                    MovieService
                        .fetchAllVideos($scope.movies)
                        .then(function(resp){
                            fetchAllVideos(resp);
                        });
                });
        }

        function fetchAllVideos(resp) {
            var embedUrl = 'https://www.youtube.com/embed/';
            for (var r in resp) {
                if(resp[r].data.results.length > 0) {
                    $scope.movies[r].video_url = $sce.trustAsResourceUrl(embedUrl + resp[r].data.results[0].key);
                }
            }
        }

        function getGenres() {
            MovieService
                .getGenres()
                .then(function (response){
                    $scope.genres = response.data.genres;
                })
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