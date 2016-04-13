(function() {
    angular
        .module("FilmsterApp")
        .factory("CriticService", CriticService);

    function CriticService($http, $q) {

        var api = {
            saveReview: saveReview,
            getAllCritics: getAllCritics
        };
        return api;

        function saveReview(userId, username,title, review) {
            return $http.post("/api/project/critic/" + userId + "/userName/" + username + "/movie/" + title, review);
        }

        function getAllCritics(){
            return $http.get("/api/project/critic/");
        }
    }
})();