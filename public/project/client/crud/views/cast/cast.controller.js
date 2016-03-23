(function(){
    angular.module("FilmsterAppCrud")
        .controller("CastCrudController", CastCrudController);

    function CastCrudController($scope){
        var casts = [
            {id:147, name: "Leonardo DiCaprio", role: "Actor", imageUrl:"/asjd54haskjd.jpg"},
            {id:258, name: "Megan Fox", role: "Actor", imageUrl:"/kjskza7sd6ik.jpg"},
            {id:369, name: "Steven Spielberg", role: "Director", imageUrl:"/jdhaiudygs7k.jpg"},
            {id:741, name: "Jessica Alba", role: "Actor", imageUrl:"/jkhcdas7dasy.jpg"}
        ];
        $scope.casts = casts;
        //event handlers declaration
        $scope.addCast = addCast;
        $scope.removeCast = removeCast;
        $scope.selectCast = selectCast;
        $scope.updateCast = updateCast;
        $scope.findAllCasts = findAllCasts;

        function addCast(cast) {
            $scope.newCast = {
                id: cast.id,
                name: cast.name,
                role: cast.role,
                imageUrl: cast.imageUrl
            };
            $scope.cast = {};
            $scope.casts.push($scope.newCast);

        }

        function removeCast(cast) {
            var index = $scope.casts.indexOf(cast);
            if ($scope.cast && $scope.cast.id && cast.id === $scope.cast.id) {
                $scope.cast = {};
                $scope.selectedCastIndex = {};
            }
            $scope.casts.splice(index,1);
        }

        function selectCast(cast) {
            $scope.selectedCastIndex = $scope.casts.indexOf(cast);
            $scope.cast={
                id: cast.id,
                name: cast.name,
                role: cast.role,
                imageUrl: cast.imageUrl
            };
        }

        function updateCast(cast) {
            if (cast && $scope.selectedCastIndex >= 0) {
                $scope.casts[$scope.selectedCastIndex] = {
                    id: cast.id,
                    name: cast.name,
                    role: cast.role,
                    imageUrl: cast.imageUrl
                };
                $scope.cast = {};
                $scope.selectedCastIndex = {};
            }
        }

        function findAllCasts() {
            return $scope.casts;
        }
    }
})();
