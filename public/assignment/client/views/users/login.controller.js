(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $location, UserService) {
        $scope.message = null;
        $scope.login = login;

        function login(user) {
            $scope.message = null;
            if (user == null) {
                $scope.message = "Please fill in the required fields";
                return;
            }
            if (!user.username) {
                $scope.message = "Please provide a username";
                return;
            }
            if (!user.password) {
                $scope.message = "Please provide a password";
                return;
            }
            var username = user.username;
            var password = user.password;
            var newUser;
            UserService.findUserByCredentials(username, password, function (response) {
                UserService.setCurrentUser(response);
                newUser = response;
                $location.url("/profile");
            });
            if (!newUser) {
                $scope.message = "Invalid login credentials";
            }
        }
    }
})();