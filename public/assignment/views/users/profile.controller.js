(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", profileController);

    function profileController($scope, UserService, $location, $rootScope) {

        $scope.error = null;
        $scope.message = null;

        $scope.currentUser = UserService.getCurrentUser();
        if (!$scope.currentUser) {
            $location.url("/home");
            //$scope.$apply();
        }

        $scope.update = update;

        function update (user) {
            $scope.error = null;
            $scope.message = null;

            if (user == null) {
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
                $scope.error = "Please provide a email";
                return;
            }
            /*console.log($rootScope.currentUser);
            console.log($scope.currentUser);*/
            var newUser;
            UserService.updateUser(user._id, user, function(response) {
                $scope.message = "User updated successfully";
                UserService.setCurrentUser(response);
                /*console.log($rootScope.currentUser);
                console.log($scope.currentUser);*/
                newUser = response;
            });

            if (!newUser)
                $scope.error = "Unable to update the user";
        }
    }
})();