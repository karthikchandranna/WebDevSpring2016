(function () {
    "use strict";
    angular
        .module("FilmsterApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $routeParams, $route) {
        // display follows details too
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
                        checkToEnableFollows();

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
                    console.log(response.data);
                    vm.currentUser = response.data;
                    vm.follow = false;
                    UserService.setCurrentUser(response.data);
                    getOtherProfile();
                });
        }

        function checkToEnableFollows(){
            if(vm.currentUser && (vm.currentUser._id != vm.userProfile._id)) {
                //check if current user already follows the other user
                for(var i = 0; i < vm.currentUser.follows.length; i++) {
                    var follow = vm.currentUser.follows[i];
                    if(follow.userId==vm.userProfile._id) {
                        vm.follow = false;
                        return;
                    }
                }
                vm.follow = true;
            }
        }
    }
})();