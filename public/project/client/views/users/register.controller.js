(function () {
    "use strict";
    angular
        .module("FilmsterApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm = this;
        vm.message = null;
        vm.register = register;

        function register() {
            vm.message = null;
            if (vm.user == null) {
                vm.message = "Please fill in the required fields";
                return;
            }
            if (!vm.user.username) {
                vm.message = "Please provide a username";
                return;
            }
            if (!vm.user.password || !vm.user.password2) {
                vm.message = "Please provide a password";
                return;
            }
            if (vm.user.password !== vm.user.password2) {
                vm.message = "Passwords must match";
                return;
            }
            if (!vm.user.email) {
                vm.message = "Please provide a valid email";
                return;
            }
            vm.user.roles = ["user"];
            var userDB;
            UserService
                .findUserByUsername(vm.user.username)
                .then(function(response){
                    if (response.data) {
                        vm.message = "User already exists";
                    }
                    else{
                        UserService
                            .createUser(vm.user)
                            .then(function(response) {
                                var currentUser = response.data;
                                if(currentUser != null) {
                                    UserService.setCurrentUser(currentUser);
                                    $location.url("/profile");
                                }
                            });
                    }
                });
        }
    }
})();