(function() {
    "use strict";
    angular
        .module("FilmsterApp")
        .factory("MovieService", MovieService);
    function MovieService($http) {

        var api = {
            addRating: addRating,
            getRating: getRating
        };
        return api;

        function addRating(userId, tmdbId, rating,movie) {
            return $http.post("/api/project/movie/" + tmdbId + "/rating/" + rating + "/user/" + userId, movie);
        }

        function getRating(tmdbId) {
            return $http.get("/api/project/movie/" + tmdbId + "/rating");
        }
    }
})();
