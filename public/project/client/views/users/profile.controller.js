(function () {
    "use strict";
    angular
        .module("FilmsterApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $routeParams) {
        var vm = this;
        vm.error = null;
        vm.message = null;
        vm.otherUserId = $routeParams.userId;
        console.log(vm.otherUserId);
        vm.update = update;

        function init() {
            UserService
                .getProfile()
                .then(function (response) {
                    vm.currentUser = response.data;
                    console.log("Movie details of rated and reviewed being fetched but not storing them except ids");
                    console.log(vm.currentUser);
                });
            if(vm.otherUserId){
                UserService
                    .getOtherProfile(vm.otherUserId)
                    .then(function (response){
                        vm.otherUser = response.data;
                        console.log(vm.otherUser);
                    });
            }
        }

        return init();

        function update (user) {
            vm.error = null;
            vm.message = null;

            if (user === null) {
                vm.error = "Please fill in the required fields";
                return;
            }
            if (!user.username) {
                vm.error = "Please provide a username";
                return;
            }
            if (!user.password) {
                vm.error = "Please provide a password";
                return;
            }
            if (!user.email) {
                vm.error = "Please provide a valid email";
                return;
            }
            UserService
                .updateUser(user._id, user)
                .then(function (response) {
                    if(response.data) {
                        vm.message = "User updated successfully";
                        UserService.setCurrentUser(response.data);
                    }
                    else
                        vm.error = "Unable to update the user";
                });
        }
    }
})();