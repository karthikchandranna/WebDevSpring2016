(function () {
    "use strict";
    angular
        .module("FilmsterApp")
        .factory("UserService", UserService);

    function UserService($rootScope, $http) {

        var model = {
            users: [
                {"_id":123, "firstName":"Alice", "lastName":"Wonderland",
                    "username":"alice", "password":"alice", "roles": ["student"]},
                {"_id":234, "firstName":"Bob", "lastName":"Hope",
                    "username":"bob", "password":"bob", "roles": ["admin"]},
                {"_id":345, "firstName":"Charlie", "lastName":"Brown",
                    "username":"charlie","password":"charlie", "roles": ["faculty"]},
                {"_id":456, "firstName":"Dan", "lastName":"Craig",
                    "username":"dan", "password":"dan", "roles": ["faculty", "admin"]},
                {"_id":567, "firstName":"Edward", "lastName":"Norton",
                    "username":"ed", "password":"ed", "roles": ["student"]}],

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
            logout: logout

        };        

        function setCurrentUser(user) {
            //$rootScope.currentUser = user;
            if(user) {
                $rootScope.currentUser = {
                    "_id": user._id, "firstName": user.firstName, "lastName": user.lastName,
                    "username": user.username, "password": user.password, "roles": user.roles, "email": user.email
                };
            }
            else {
                $rootScope.currentUser = null;
            }
        }

        function getCurrentUser() {
            //return $rootScope.currentUser;
            if ($rootScope.currentUser) {
                return {
                    "_id": $rootScope.currentUser._id, "firstName": $rootScope.currentUser.firstName,
                    "lastName": $rootScope.currentUser.lastName, "username": $rootScope.currentUser.username,
                    "password": $rootScope.currentUser.password, "roles": $rootScope.currentUser.roles,
                    "email": $rootScope.currentUser.email
                };
            }
        }

        function findUserByCredentials(username, password, callback) {
            for (var u in model.users) {
                if (model.users[u].username === username &&
                    model.users[u].password === password) {
                    callback(model.users[u]);
                    return;
                }
            }
        }

        function findAllUsers(callback) {
            callback(model.users);
        }

        function createUser(user, callback) {
            var newUser = {
                _id: (new Date).getTime(),
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                password: user.password,
                roles: user.roles,
                email: user.email
            };
            model.users.push(newUser);
            setCurrentUser(newUser);
            callback(model.users);
        }

        function deleteUserById(userId, callback) {
            var index = -1;
            for (var u in model.users) {
                if (model.users[u]._id === userId) {
                    index = u;
                    break;
                }
            }
            if (index > -1) {
                model.users.splice(index, 1);
            }
            callback(model.users);
        }

        function updateUser(userId, user, callback) {
            var index = -1;
            for (var u in model.users) {
                if (model.users[u]._id === userId) {
                    index = u;
                    break;
                }
            }
            if (index > -1) {
                model.users[index] = {
                    _id: userId,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    username: user.username,
                    password: user.password,
                    roles: user.roles,
                    email: user.email
                };
                callback(model.users[index]);
            }
        }

        function findUserByUsername (username) {
            for (var u in model.users) {
                if (model.users[u].username === username) {
                    return model.users[u];
                }
            }
            return null;
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser() {
            return $http.get("/api/project/loggedin");
        }

        function getProfile() {
            return $http.get("/api/project/user/"+$rootScope.currentUser._id);
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

        return model;
    }
})();