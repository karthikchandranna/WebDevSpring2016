(function (){
    "use strict";
    angular
        .module("FilmsterApp")
        .controller("SearchController", SearchController);

    function SearchController($scope, $routeParams, MovieService, $sce) {
        $scope.search = search;
        $scope.query = $routeParams.query;
        $scope.getVideos = getVideos;

        if ($scope.query) {
            search($scope.query);
        }

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
                    //getVideos();
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

        function getVideos() {
            var embedUrl = 'https://www.youtube.com/embed/';
            var m = 0;
            for (m in $scope.movies) {
                MovieService
                    .fetchVideoById($scope.movies[m].id)
                    .then(function (res) {
                        if(res.data.results.length > 0) {
                            $scope.movies[m].video_url = $sce.trustAsResourceUrl(embedUrl + res.data.results[0].key);
                            console.log($scope.movies[m]);

                        }
                    });
            }
            //console.log($scope.data.results);
        }
    }
})();