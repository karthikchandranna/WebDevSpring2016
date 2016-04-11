(function() {
    "use strict";
    angular
        .module("FilmsterApp")
        .factory("MovieService", MovieService);
    function MovieService($http) {

        var api = {
            addRating: addRating,
            addReview: addReview,
            getMovieDetails: getMovieDetails
        };
        return api;

        function addRating(userId, tmdbId, rating,movie) {
            return $http.post("/api/project/movie/" + tmdbId + "/rating/" + rating + "/user/" + userId, movie);
        }

        function addReview(userId, username, tmdbId, review,movie) {
            return $http.post("/api/project/movie/" + tmdbId + "/review/" + review + "/user/" + userId + "/username/" + username, movie);
        }

        function getMovieDetails(tmdbId) {
            return $http.get("/api/project/movie/" + tmdbId + "/details");
        }
    }
})();
