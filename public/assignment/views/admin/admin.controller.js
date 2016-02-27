(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($scope, $location, UserService) {

        $scope.currentUser = UserService.getCurrentUser();
        if (!$scope.currentUser || !$scope.currentUser.roles || $scope.currentUser.roles.indexOf('admin') < 0) {
            $location.url("/home");
        }
    }
})();