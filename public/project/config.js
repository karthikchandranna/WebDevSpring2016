(function () {
    "use strict";
    angular
        .module("FilmsterApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html"
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html"
            })
            /*.when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController"
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html",
                controller: "AdminController"
            })            */
            .when("/critic", {
                templateUrl: "views/critic/critic.view.html"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();