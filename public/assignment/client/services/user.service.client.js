(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http, $rootScope) {

        var api = {
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            getProfile: getProfile,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            adminUpdateUser: adminUpdateUser,
            logout: logout,
            login: login,
            register: register
        };
        return api;

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser() {
            return $http.get("/api/assignment/loggedin");
        }

        function login(user) {
            return $http.post("/api/assignment/login", user);
        }

        function register(user) {
            return $http.post("/api/assignment/register", user);
        }

        function getProfile() {
            return $http.get("/api/assignment/user/"+$rootScope.currentUser._id);
        }

        function findUserByUsername(username) {
            return $http.get ("/api/assignment/user?username="+username);
        }

        function findUserByCredentials(username, password) {
            return $http.get ("/api/assignment/user?username="+username+"&password="+password);
        }

        function findAllUsers() {
            return $http.get ("/api/assignment/user");
        }

        function createUser(user) {
            return $http.post("/api/assignment/user", user);
        }

        function deleteUserById(userId) {
            return $http.delete ("/api/assignment/user/" + userId);
        }

        function updateUser(userId, user) {
            return $http.put ("/api/assignment/user/" + userId, user);
        }

        function adminUpdateUser(userId, user) {
            return $http.put ("/api/assignment/admin/user/" + userId, user);
        }

        function logout() {
            return $http.post("/api/assignment/logout");
        }
    }
})();