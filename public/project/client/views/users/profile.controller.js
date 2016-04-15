(function () {
    "use strict";
    angular
        .module("FilmsterApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $routeParams) {
        var vm = this;
        vm.otherUserId = $routeParams.userId;
        vm.follow = false;
        vm.followOtherUser = followOtherUser;

        function init() {
            UserService
                .getProfile()
                .then(function (response) {
                    vm.currentUser = response.data;
                    vm.userProfile = response.data;

                    getOtherProfile();

                },
                    function (err) {
                        getOtherProfile();
                    }
                );


        }
        return init();

        function getOtherProfile(){
            if(vm.otherUserId){
                UserService
                    .getOtherProfile(vm.otherUserId)
                    .then(function (response){
                        vm.userProfile = response.data;
                        console.log(vm.currentUser);
                        console.log(vm.userProfile);
                        vm.isCritic = vm.userProfile.roles.indexOf('critic')> -1;
                        if(vm.currentUser && (vm.currentUser != vm.userProfile))
                            vm.follow = true;
                    });
            }
            else
                vm.isCritic = vm.userProfile.roles.indexOf('critic')> -1;
        }

        function followOtherUser() {
            var followDetails = {
                follower: vm.currentUser,
                followee: vm.userProfile
            };
            UserService.follow(followDetails)
                .then(function (response){
                    vm.currentUser = response.data;
                    UserService.setCurrentUser(response.data);
                    getOtherProfile();
                });
        }
    }
})();