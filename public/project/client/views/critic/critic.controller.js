(function () {
    "use strict";
    angular
        .module("FilmsterApp")
        .controller("CriticController", CriticController);

    function CriticController(UserService, TmdbApiService, CriticService) {
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
            CriticService
                .saveReview(vm.currentUser._id, vm.currentUser.username,vm.movie.title, {"review": vm.review})
                .then(
                    function (response) {
                        vm.error = null;
                        vm.message = "Application submitted successfully";
                        vm.submitted = true;
                        vm.cancelOrGoBack = "Go Back to Profile";
                    },
                    function (errResp) {
                        vm.error = "Failed to submit. Try again"
                    });
        }
    }
})();