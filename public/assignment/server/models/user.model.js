//var mock = require("./user.mock.json");
var uuid = require('node-uuid');
// load q promise library
var q = require("q");
module.exports = function(db, mongoose) {

    // load user schema
    var UserSchema = require("./user.schema.server.js")(mongoose);
    // create user model from schema
    var UserModel = mongoose.model('User', UserSchema);

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
        /*user._id = uuid.v1();
        mock.push(user);
        return user;*/

        // use q to defer the response
        var deferred = q.defer();
        // insert new user with mongoose user model's create()
        UserModel.create(user, function (err, doc) {
            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                deferred.resolve(doc);
            }
        });
        // return a promise
        return deferred.promise;
    }

    function findAllUsers() {
        //return mock;
        var deferred = q.defer();
        UserModel.find(function (err, users) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(users);
            }
        });
        return deferred.promise;
    }

    function findUserById(userId) {
        /*for(var u in mock) {
         if( mock[u]._id == userId ) {
         return mock[u];
         }
         }
         return null;*/

        var deferred = q.defer();
        UserModel.findById(userId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function updateUser(userId, user) {
        /*for (var u in mock) {
            if (mock[u]._id == userId) {
                mock[u].firstName = user.firstName;
                mock[u].lastName = user.lastName;
                mock[u].username = user.username;
                mock[u].password = user.password;
                mock[u].email = user.email;
                return mock[u];
            }
        }
        return null;*/
        var deferred = q.defer();
        UserModel.update({ "_id": id }, { $set: user },  function (err, status) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });

        return deferred.promise;
    }

    function deleteUser(userId) {
        /*var index = -1;
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
        return null;*/
        var deferred = q.defer();
        UserModel.remove({_id: id}, function(err, users){
            deferred.resolve(users);
        });

        return deferred.promise;
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
        /*for(var u in mock) {
            if( mock[u].username === credentials.username &&
                mock[u].password === credentials.password) {
                return mock[u];
            }
        }
        return null;*/

        var deferred = q.defer();

        // find one retrieves one document
        UserModel.findOne(

            // first argument is predicate
            { username: credentials.username,
                password: credentials.password },

            // doc is unique instance matches predicate
            function(err, doc) {

                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }
            });

        return deferred.promise;
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