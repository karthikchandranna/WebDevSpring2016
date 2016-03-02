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

            MovieService.searchMovies(
                query, function (response) {
                    $scope.data = response;
                    console.log($scope.data);
                    //getVideos();
                });
        }

        function getVideos() {
            var embedUrl = 'https://www.youtube.com/embed/';
            var m = 0;
            for (m in $scope.data.results) {
                MovieService.fetchVideoById(
                    $scope.data.results[m].id, function (response) {
                        if(response.results.length > 0) {
                            alert(m);
                            $scope.data.results[m].video_url = $sce.trustAsResourceUrl(embedUrl + response.results[0].key);
                        }
                    });

            }
            console.log($scope.data.results);
        }
    }
})();