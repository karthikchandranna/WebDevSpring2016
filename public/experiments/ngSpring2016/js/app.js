(function(){
    angular.module("MovieDBApp",[])
        .controller("MovieDBController", MovieDBController);

    function MovieDBController($scope){
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
            console.log(movie);
            $scope.newMovie = {
                id:movie.id,
                title:movie.title,
                year:movie.year
            };
            $scope.movie={};
            $scope.movies.push($scope.newMovie);
        }

        /*function removeMovieByIndex(index) {
         console.log(index);
         $scope.movies.splice(index,1);
         }*/

        function removeMovie(movie) {
            var index = $scope.movies.indexOf(movie);
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
            $scope.movies[$scope.selectedMovieIndex] = {
                id:movie.id,
                title:movie.title,
                year:movie.year
            };
            $scope.movie={};
            $scope.selectedMovieIndex={};
        }
    }

})();
