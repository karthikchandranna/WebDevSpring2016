(function(){
    angular
        .module("FilmsterApp")
        .factory("MovieService", MovieService);

    function MovieService($http){

        var api = {
            searchMovies: searchMovies,
            findMovieByID: findMovieByID,
            fetchVideoById: fetchVideoById,
            findCastByID: findCastByID
        };
        var apikey = "a1aa62ec3ff2b05c1b0e804adce79c24";
        var baseUrl = "https://api.themoviedb.org/3";
        return api;

        /*function searchMovies(query, callback) {
            var moviesSearchUrl = baseUrl + '/search/movie?api_key=' + apikey + '&query=' + query;
            $http.get(moviesSearchUrl)
                .success(callback);
        }*/

        function searchMovies(query, callback) {
            var moviesSearchUrl = baseUrl + '/search/movie?api_key=' + apikey + '&query=' + query;
            return $http.get(moviesSearchUrl);
                //.success(callback);
        }

        function findMovieByID(id, callback) {
            var appendTags = 'videos,credits,reviews';
            $http.get(baseUrl + '/movie/' + id + '?api_key=' + apikey + '&append_to_response=' + appendTags)
                .success(callback);
        }

        function findCastByID(id, callback) {
            var appendTags = 'movie_credits';
            $http.get(baseUrl + '/person/' + id + '?api_key=' + apikey + '&append_to_response=' + appendTags)
                .success(callback);
        }

        function fetchVideoById(id, callback) {
            var videoUrl = baseUrl + '/movie/' + id + '/videos?api_key=' + apikey;
            return $http.get(videoUrl);
                //.success(callback);
        }
    }
})();