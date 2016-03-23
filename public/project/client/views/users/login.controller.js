(function () {
    "use strict";
    angular
        .module("FilmsterApp")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.message = null;
        vm.login = login;

        function login(user) {
            vm.message = null;
            if (user == null) {
                vm.message = "Please fill in the required fields";
                return;
            }
            if (!user.username) {
                vm.message = "Please provide a username";
                return;
            }
            if (!user.password) {
                vm.message = "Please provide a password";
                return;
            }
            var username = user.username;
            var password = user.password;
            var newUser;
            UserService
                .findUserByCredentials(username, password)
                .then(function (response) {
                    if(response.data) {
                        UserService.setCurrentUser(response.data);
                        $location.url("/profile");
                    }
                    else
                        vm.message = "Invalid login credentials";
                });
        }
    }
})();