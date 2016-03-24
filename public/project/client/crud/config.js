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
                controller: "MovieCrudController",
                controllerAs: "model"
            })
            .when("/user", {
                templateUrl: "views/user/user.view.html",
                controller: "UserCrudController",
                controllerAs: "model"
            })
            .when("/review", {
                templateUrl: "views/review/review.view.html",
                controller: "ReviewCrudController",
                controllerAs: "model"
            })
            .when("/cast", {
                templateUrl: "views/cast/cast.view.html",
                controller: "CastCrudController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();