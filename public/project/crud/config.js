(function () {
    "use strict";
    angular
        .module("FilmsterAppCrud")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html"
            })
            .when("/movie", {
                templateUrl: "views/movie/movie.view.html",
                controller: "MovieCrudController"
            })
            .when("/user", {
                templateUrl: "views/user/user.view.html",
                controller: "UserCrudController"
            })
            .when("/review", {
                templateUrl: "views/review/review.view.html",
                controller: "ReviewCrudController"
            })
            .when("/cast", {
                templateUrl: "views/cast/cast.view.html",
                controller: "CastCrudController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();