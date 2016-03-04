(function(){
    angular.module("FilmsterAppCrud")
        .controller("MovieCrudController", MovieCrudController);

    function MovieCrudController($scope){
        var movies = [
            {id:123, title: "Avatar", imageUrl: "/fhds6fsf8768.jpg", tmdbId:545084, rating: 3.5, videoUrl: "/djsajd68hdna"},
            {id:456, title: "Batman", imageUrl: "/jcds7rwe9yfiusdk.jpg", tmdbId:78654, rating: 4.5, videoUrl: "/dsfds978yis"},
            {id:789, title: "Captain America", imageUrl: "/kjdsfh78f6ysdiu.jpg", tmdbId:56845, rating: 3.0, videoUrl: "/vys7diusdjfk7"},
            {id:987, title: "Titanic", imageUrl: "/cs8f67syddsfs83.jpg", tmdbId:89654, rating: 4.5, videoUrl: "/7fiuskdfsdffd"}
        ];
        $scope.movies = movies;
        //event handlers declaration
        $scope.addMovie = addMovie;
        $scope.removeMovie = removeMovie;
        $scope.selectMovie = selectMovie;
        $scope.updateMovie = updateMovie;
        $scope.findAllMovies = findAllMovies;

        function addMovie(movie) {
            $scope.newMovie = {
                id: movie.id,
                title: movie.title,
                imageUrl: movie.imageUrl,
                tmdbId: movie.tmdbId,
                rating: movie.rating,
                videoUrl: movie.videoUrl
            };
            $scope.movie = {};
            $scope.movies.push($scope.newMovie);

        }

        function removeMovie(movie) {
            var index = $scope.movies.indexOf(movie);
            if ($scope.movie && $scope.movie.id && movie.id === $scope.movie.id) {
                $scope.movie = {};
                $scope.selectedReviewIndex = {};
            }
            $scope.movies.splice(index,1);
        }

        function selectMovie(movie) {
            $scope.selectedMovieIndex = $scope.movies.indexOf(movie);
            $scope.movie={
                id: movie.id,
                title: movie.title,
                imageUrl: movie.imageUrl,
                tmdbId: movie.tmdbId,
                rating: movie.rating,
                videoUrl: movie.videoUrl
            };
        }

        function updateMovie(movie) {
            if (movie && $scope.selectedMovieIndex >= 0) {
                $scope.movies[$scope.selectedMovieIndex] = {
                    id: movie.id,
                    title: movie.title,
                    imageUrl: movie.imageUrl,
                    tmdbId: movie.tmdbId,
                    rating: movie.rating,
                    videoUrl: movie.videoUrl
                };
                $scope.movie = {};
                $scope.selectedMovieIndex = {};
            }
        }

        function findAllMovies() {
            return $scope.movies;
        }
    }
})();
