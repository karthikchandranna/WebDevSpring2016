(function () {
    "use strict";
    angular
        .module("FilmsterApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html",
                controller: "HomeController"
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
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

    function checkLoggedIn(UserService, $q, $location) {

        var deferred = $q.defer();
        UserService
            .getCurrentUser()
            .then(function(response) {
                var currentUser = response.data;
                if(currentUser) {
                    UserService.setCurrentUser(currentUser);
                    deferred.resolve();
                } else {
                    deferred.reject();
                    $location.url("/home");
                }
            });
        return deferred.promise;
    }
})();