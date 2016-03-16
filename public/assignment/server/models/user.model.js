var mock = require("./user.mock.json");
var uuid = require('node-uuid');
module.exports = function() {
    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        findUsersByIds: findUsersByIds
    };
    return api;

    function createUser(user) {
        user._id = uuid.v1();
        mock.push(user);
        return user;
    }

    function findAllUsers() {
        return mock;
    }

    function findUserById(userId) {
        for(var u in mock) {
            if( mock[u]._id == userId ) {
                return mock[u];
            }
        }
        return null;
    }

    function updateUser(userId, user) {
        var index = -1;
        for (var u in mock) {
            if (mock[u]._id == userId) {
                index = u;
                break;
            }
        }
        if (index > -1) {
            mock[index] = {
                _id: userId,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                password: user.password
            };
            return mock;
        }
        return null;
    }

    function deleteUser(userId) {
        var index = -1;
        for (var u in mock) {
            if (mock[u]._id == userId) {
                index = u;
                break;
            }
        }
        if (index > -1) {
            mock.splice(index, 1);
            return mock;
        }
        return null;
    }

    function findUserByUsername(username) {
        for(var u in mock) {
            if( mock[u].username == username ) {
                return mock[u];
            }
        }
        return null;
    }

    function findUserByCredentials(credentials) {
        for(var u in mock) {
            if( mock[u].username === credentials.username &&
                mock[u].password === credentials.password) {
                return mock[u];
            }
        }
        return null;
    }

    function findUsersByIds (userIds) {
        var users = [];
        for (var u in userIds) {
            var user = findUserById (userIds[u]);
            if (user) {
                users.push ({
                    username: user.username,
                    _id: user._id
                });
            }
        }
        return users;
    }
};