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
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController"
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html"
            })
            .when("/critic", {
                templateUrl: "views/critic/critic.view.html"
            })
            .when("/search", {
                templateUrl: "views/search/search.view.html",
                controller: "SearchController"
            })
            .when("/search/:query", {
                templateUrl: "views/search/search.view.html",
                controller: "SearchController"
            })
            .when("/movie", {
                templateUrl: "views/movie/movie.view.html",
                controller: "MovieController"
            })
            .when("/movie/:id", {
                templateUrl: "views/movie/movie.view.html",
                controller: "MovieController"
            })
            .when("/cast", {
                templateUrl: "views/cast/cast.view.html",
                controller: "CastController"
            })
            .when("/cast/:id", {
                templateUrl: "views/cast/cast.view.html",
                controller: "CastController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();