(function(){
    angular.module("FilmsterAppCrud")
        .controller("MovieCrudController", MovieCrudController);

    function MovieCrudController($scope){
        var movies = [
            {id:123, title: "Avatar", year: 2010},
            {id:456, title:"Batman Begins", year:2016}
        ];
        $scope.movies = movies;
        //event handlers declaration
        $scope.addMovie = addMovie;
        $scope.removeMovie = removeMovie;
        $scope.selectMovie = selectMovie;
        $scope.updateMovie = updateMovie;

        function addMovie(movie) {
            if (movie) {
                $scope.newMovie = {
                    id: movie.id,
                    title: movie.title,
                    year: movie.year
                };
                $scope.movie = {};
                $scope.movies.push($scope.newMovie);
            }
        }

        function removeMovie(movie) {
            var index = $scope.movies.indexOf(movie);
            if ($scope.movie.id && movie.id === $scope.movie.id) {
                $scope.movie = {};
            }
            $scope.movies.splice(index,1);
        }

        function selectMovie(movie) {
            $scope.selectedMovieIndex = $scope.movies.indexOf(movie);
            $scope.movie={
                id:movie.id,
                title:movie.title,
                year:movie.year
            };
        }

        function updateMovie(movie) {
            if (movie && $scope.selectedMovieIndex) {
                $scope.movies[$scope.selectedMovieIndex] = {
                    id: movie.id,
                    title: movie.title,
                    year: movie.year
                };
                $scope.movie = {};
                $scope.selectedMovieIndex = {};
            }
        }
    }
})();
