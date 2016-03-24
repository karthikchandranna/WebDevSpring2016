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

        function addRating(userId, tmdbId, rating) {
            return $http.post("/api/project/movie/" + tmdbId + "/rating/" + rating + "/user/" + userId);
        }

        function getRating(tmdbId) {
            var res = $http.get("/api/project/movie/" + tmdbId + "/rating");
            return res;
        }
    }
})();
