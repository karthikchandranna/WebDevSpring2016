(function () {
    "use strict";
    angular
        .module("FilmsterApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, $scope, UserService) {
        $scope.message = null;
        $scope.register = register;

        function register(user) {
            $scope.message = null;
            if (user == null) {
                $scope.message = "Please fill in the required fields";
                return;
            }
            if (!user.username) {
                $scope.message = "Please provide a username";
                return;
            }
            if (!user.password || !user.password2) {
                $scope.message = "Please provide a password";
                return;
            }
            if (user.password !== user.password2) {
                $scope.message = "Passwords must match";
                return;
            }
            if (!user.email) {
                $scope.message = "Please provide a valid email";
                return;
            }
            var userDB = UserService.findUserByUsername(user.username);
            if (userDB !== null) {
                $scope.message = "User already exists";
                return;
            }
            UserService.createUser($scope.user, function (response) {
                $location.url("/profile");
            });
        }
    }
})();