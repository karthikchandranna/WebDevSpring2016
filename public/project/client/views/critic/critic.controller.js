(function () {
    "use strict";
    angular
        .module("FilmsterApp")
        .controller("CriticController", CriticController);

    function CriticController(UserService, TmdbApiService, $location) {
        var vm = this;
        vm.error = null;
        vm.message = null;
        vm.cancelOrGoBack = "Cancel";
        vm.submitCritic = submitCritic;

        function init() {
            UserService
                .getProfile()
                .then(function (response) {
                    vm.currentUser = response.data;
                });
            TmdbApiService
                .getNowPlaying()
                .then(function(response){
                    vm.nowPlaying = response.data.results;
                    console.log(vm.nowPlaying);
                });
        }
        return init();

        function submitCritic(){
            if(!vm.movie){
                vm.error = "Please select a movie";
                return;
            }
            if(!vm.review){
                vm.error = "Please write a review";
                return;
            }
            vm.error = null;
            vm.message = "Critic application submitted successfully";
            vm.submitted = true;
            vm.cancelOrGoBack = "Go Back to Profile";
            console.log(vm.movie);
            console.log(vm.review);
            console.log(vm.currentUser);
        }
    }
})();