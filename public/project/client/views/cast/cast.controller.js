(function(){
    angular
        .module("FilmsterApp")
        .controller("CastController", CastController);

    function CastController($routeParams, TmdbApiService) {
        var vm = this;
        vm.id = $routeParams.id;
        TmdbApiService.findCastByID(vm.id,
            function(response){
                response.movie_credits.cast.splice(8, response.movie_credits.cast.length-8);
                vm.actor = response;
            })
    }
})();