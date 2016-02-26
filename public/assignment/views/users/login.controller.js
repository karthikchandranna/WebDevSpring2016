(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", loginController);

    function loginController($location, $scope, UserService) {
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
            UserService.findUserByCredentials(username, password, function(response) {
                UserService.setCurrentUser(response);
                //console.log($rootScope.currentUser);
                newUser = response;
                $location.url("/profile");
                //$scope.$apply();
            });
            if(!newUser)
                $scope.message = "Invalid login credentials";
        }
    }
})();