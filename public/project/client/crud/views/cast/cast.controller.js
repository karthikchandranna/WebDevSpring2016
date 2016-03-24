(function(){
    angular.module("FilmsterAppCrud")
        .controller("CastCrudController", CastCrudController);

    function CastCrudController(){
        var vm = this;
        vm.casts = [
            {id:147, name: "Leonardo DiCaprio", role: "Actor", imageUrl:"/asjd54haskjd.jpg"},
            {id:258, name: "Megan Fox", role: "Actor", imageUrl:"/kjskza7sd6ik.jpg"},
            {id:369, name: "Steven Spielberg", role: "Director", imageUrl:"/jdhaiudygs7k.jpg"},
            {id:741, name: "Jessica Alba", role: "Actor", imageUrl:"/jkhcdas7dasy.jpg"}
        ];
        //event handlers declaration
        vm.addCast = addCast;
        vm.removeCast = removeCast;
        vm.selectCast = selectCast;
        vm.updateCast = updateCast;
        vm.findAllCasts = findAllCasts;

        function addCast(cast) {
            vm.newCast = {
                id: cast.id,
                name: cast.name,
                role: cast.role,
                imageUrl: cast.imageUrl
            };
            vm.cast = {};
            vm.casts.push(vm.newCast);

        }

        function removeCast(cast) {
            var index = vm.casts.indexOf(cast);
            if (vm.cast && vm.cast.id && cast.id === vm.cast.id) {
                vm.cast = {};
                vm.selectedCastIndex = {};
            }
            vm.casts.splice(index,1);
        }

        function selectCast(cast) {
            vm.selectedCastIndex = vm.casts.indexOf(cast);
            vm.cast={
                id: cast.id,
                name: cast.name,
                role: cast.role,
                imageUrl: cast.imageUrl
            };
        }

        function updateCast(cast) {
            if (cast && vm.selectedCastIndex >= 0) {
                vm.casts[vm.selectedCastIndex] = {
                    id: cast.id,
                    name: cast.name,
                    role: cast.role,
                    imageUrl: cast.imageUrl
                };
                vm.cast = {};
                vm.selectedCastIndex = {};
            }
        }

        function findAllCasts() {
            return vm.casts;
        }
    }
})();
