(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $location, UserService) {
        var vm = this;
        vm.error = null;
        vm.message = null;
        vm.update = update;

        function init() {
            UserService
                .getProfile()
                .then(function (response) {
                    vm.profile = response.data;
                    console.log(vm.profile);
                });
        }
        return init();

        function update (user) {
            $scope.error = null;
            $scope.message = null;

            if (user === null) {
                $scope.error = "Please fill in the required fields";
                return;
            }
            if (!user.username) {
                $scope.error = "Please provide a username";
                return;
            }
            if (!user.password) {
                $scope.error = "Please provide a password";
                return;
            }
            if (!user.email) {
                $scope.error = "Please provide a valid email";
                return;
            }
            var newUser;
            UserService
                .updateUser(user._id, user)
                .then(function (response) {
                $scope.message = "User updated successfully";
                UserService.setCurrentUser(response);
                newUser = response;
            });

            if (!newUser) {
                $scope.error = "Unable to update the user";
            }
        }
    }
})();