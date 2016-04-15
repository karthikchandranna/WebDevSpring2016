(function () {
    "use strict";
    angular
        .module("FilmsterApp")
        .factory("UserService", UserService);

    function UserService($rootScope, $http) {

        var api = {

            //function declarations
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            findUserByUsername: findUserByUsername,
            getProfile: getProfile,
            getOtherProfile: getOtherProfile,
            logout: logout,
            addRole: addRole,
            follow: follow
        };

        return api;

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser() {
            return $http.get("/api/project/loggedin");
        }

        function getProfile() {
            return $http.get("/api/project/profile/"+$rootScope.currentUser._id);
        }

        function getOtherProfile(userId) {
            return $http.get("/api/project/profile/"+userId);
        }

        function findUserByUsername(username) {
            return $http.get ("/api/project/user?username="+username);
        }

        function findUserByCredentials(username, password) {
            return $http.get ("/api/project/user?username="+username+"&password="+password);
        }

        function findAllUsers() {
            return $http.get ("/api/project/user");
        }

        function createUser(user) {
            return $http.post("/api/project/user", user);
        }

        function deleteUserById(userId) {
            return $http.delete ("/api/project/user/" + userId);
        }

        function updateUser(userId, user) {
            return $http.put ("/api/project/user/" + userId, user);
        }

        function logout() {
            return $http.post("/api/project/logout");
        }

        function addRole(userId, role) {
            return $http.put("/api/project/user/"+ userId+"/role", role);
        }

        function follow(followDetails) {
            return $http.put("/api/project/user/follow", followDetails);
        }
    }
})();