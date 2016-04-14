(function () {
    "use strict";
    angular
        .module("FilmsterApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $routeParams) {
        var vm = this;
        vm.otherUserId = $routeParams.userId;

        function init() {
            UserService
                .getProfile()
                .then(function (response) {
                    vm.currentUser = response.data;
                    vm.userProfile = response.data;

                    getOtherProfile();

                });


        }
        return init();

        function getOtherProfile(){
            if(vm.otherUserId){
                UserService
                    .getOtherProfile(vm.otherUserId)
                    .then(function (response){
                        vm.userProfile = response.data;
                        vm.isCritic = vm.userProfile.roles.indexOf('critic')> -1;
                    });
            }
            else
                vm.isCritic = vm.userProfile.roles.indexOf('critic')> -1;
        }
    }
})();