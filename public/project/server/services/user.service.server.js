module.exports = function(app, userModel, movieModel) {

    app.post("/api/project/user", createUser);//register
    app.get("/api/project/user", getUser);//login
    app.get("/api/project/user/:id", getUserById);
    app.put("/api/project/user/follow", follow);
    app.put("/api/project/user/:id", updateUser);
    app.delete("/api/project/user/:id", deleteUser);
    app.get("/api/project/loggedin", loggedin);
    app.post("/api/project/logout", logout);
    app.get("/api/project/profile/:userId", profile);
    app.put("/api/project/user/:userId/role", addRole);


    function createUser (req, res) {
        var user = req.body;
        userModel.createUser(user)
            .then(
                function (doc) {
                    req.session.currentUser = doc;
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getUser (req, res) {
        if (Object.keys(req.query).length === 0) {
            userModel.findAllUsers() // /api/project/user
                .then(
                    function (users) {
                        res.json(users);
                    },
                    function ( err ) {
                        res.status(400).send(err);
                    });
        }
        else if (req.query.username) {
            if (req.query.password) {
                var credentials = {
                    username: req.query.username,
                    password: req.query.password
                };
                userModel.findUserByCredentials(credentials)// /api/project/user?username=alice&password=wonderland
                    .then(
                        function (doc) {
                            req.session.currentUser = doc;
                            res.json(doc);
                        },
                        function ( err ) {
                            res.status(400).send(err);
                        })
            }
            else {
                userModel.findUserByUsername(req.query.username)// /api/assignment/user?username=username
                    .then(
                        function (doc) {
                            res.json(doc);
                        },
                        function ( err ) {
                            res.status(400).send(err);
                        })
            }
        }
        else
            res.json(null);
    }

    function getUserById (req, res) {
        var userId = req.params.id;
        userModel.findUserById(userId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateUser (req, res) {
        var userId = req.params.id;
        var user = req.body;
        userModel.updateUser(userId, user)
            .then(
                function (doc) {
                    req.session.currentUser = doc;
                    res.json(doc);
                },
                function (err) {
                    console.log("update");
                    res.status(400).send(err);
                }
            );
    }

    function deleteUser (req, res) {
        var userId = req.params.id;
        userModel.deleteUser(userId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function loggedin(req, res) {
        res.json(req.session.currentUser);
    }

    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }

    function profile(req, res) {
        var userId = req.params.userId;
        var user = null;
        userModel.findUserById(userId)
            .then(
                function (doc) {
                    user = doc;
                    var tmdbIds = [];
                    for(var r in user.rates) {
                        tmdbIds.push(user.rates[r].tmdbId);
                    }
                    // fetch movies this user has rated
                    return movieModel.findMoviesByTmdbIDs(tmdbIds);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (movies) {
                    user.ratedMovies = movies;
                    var tmdbIds = [];
                    for(var r in user.reviews) {
                        tmdbIds.push(user.reviews[r].tmdbId);
                    }
                    // fetch movies this user has reviewed
                    return movieModel.findMoviesByTmdbIDs(tmdbIds);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (movies) {
                    user.reviewedMovies = movies;
                    res.json(user);
                },
                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function addRole(req, res) {
        var userId = req.params.userId;
        var role = req.body.role;
        userModel.findUserById(userId)
            .then(
                function (user) {
                    if(user.roles.indexOf(role)<0) {
                        user.roles.push(role);
                    }
                    return userModel.updateUser(userId, user)
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function follow(req, res) {
        var follower = req.body.follower;
        var followee = req.body.followee;
        var follow = {
            userId: followee._id,
            username: followee.username,
            rates: followee.rates,
            reviews: followee.reviews
        };
        follower.follows.push(follow);
        userModel.updateUser(follower._id, follower)
            .then(
                function (follower) {
                    req.session.currentUser = follower;
                    req.json(follower);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
};