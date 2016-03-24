(function(){
    angular.module("FilmsterAppCrud")
        .controller("MovieCrudController", MovieCrudController);

    function MovieCrudController(){
        var vm = this;
        vm.movies = [
            {id:123, title: "Avatar", imageUrl: "/fhds6fsf8768.jpg", tmdbId:545084, rating: 3.5, videoUrl: "/djsajd68hdna"},
            {id:456, title: "Batman", imageUrl: "/jcds7rwe9yfiusdk.jpg", tmdbId:78654, rating: 4.5, videoUrl: "/dsfds978yis"},
            {id:789, title: "Captain America", imageUrl: "/kjdsfh78f6ysdiu.jpg", tmdbId:56845, rating: 3.0, videoUrl: "/vys7diusdjfk7"},
            {id:987, title: "Titanic", imageUrl: "/cs8f67syddsfs83.jpg", tmdbId:89654, rating: 4.5, videoUrl: "/7fiuskdfsdffd"}
        ];
        //event handlers declaration
        vm.addMovie = addMovie;
        vm.removeMovie = removeMovie;
        vm.selectMovie = selectMovie;
        vm.updateMovie = updateMovie;
        vm.findAllMovies = findAllMovies;

        function addMovie(movie) {
            vm.newMovie = {
                id: movie.id,
                title: movie.title,
                imageUrl: movie.imageUrl,
                tmdbId: movie.tmdbId,
                rating: movie.rating,
                videoUrl: movie.videoUrl
            };
            vm.movie = {};
            vm.movies.push(vm.newMovie);
        }

        function removeMovie(movie) {
            var index = vm.movies.indexOf(movie);
            if (vm.movie && vm.movie.id && movie.id === vm.movie.id) {
                vm.movie = {};
                vm.selectedReviewIndex = {};
            }
            vm.movies.splice(index,1);
        }

        function selectMovie(movie) {
            vm.selectedMovieIndex = vm.movies.indexOf(movie);
            vm.movie={
                id: movie.id,
                title: movie.title,
                imageUrl: movie.imageUrl,
                tmdbId: movie.tmdbId,
                rating: movie.rating,
                videoUrl: movie.videoUrl
            };
        }

        function updateMovie(movie) {
            if (movie && vm.selectedMovieIndex >= 0) {
                vm.movies[vm.selectedMovieIndex] = {
                    id: movie.id,
                    title: movie.title,
                    imageUrl: movie.imageUrl,
                    tmdbId: movie.tmdbId,
                    rating: movie.rating,
                    videoUrl: movie.videoUrl
                };
                vm.movie = {};
                vm.selectedMovieIndex = {};
            }
        }

        function findAllMovies() {
            return vm.movies;
        }
    }
})();
