(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", registerController);

    function registerController($location, $scope, UserService) {
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
            if (user.password != user.password2) {
                $scope.message = "Passwords must match";
                return;
            }
            if (!user.email) {
                $scope.message = "Please provide a email";
                return;
            }
            var user = UserService.findUserByUsername(user.username);
            if (user != null) {
                $scope.message = "User already exists";
                return;
            }
            UserService.createUser($scope.user, function(response){
                //console.log($rootScope.currentUser);
                $location.url("/profile");
                //$scope.$apply();
            });

        }
    }
})();