module.exports = function(app, userModel) {

    //app.post('/api/assignment/login', login);
    app.post("/api/assignment/register", register);//register
    app.post("/api/assignment/user", createUser);//admin create
    app.get("/api/assignment/user", getUser);//login
    app.get("/api/assignment/user/:id", getUserById);
    app.put("/api/assignment/admin/user/:id", adminUpdateUser);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUser);
    app.get("/api/assignment/loggedin", loggedin);
    app.post("/api/assignment/logout", logout);

    function createUser (req, res) {
        var user = req.body;
        userModel.createUser(user)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function register (req, res) {
        var user = req.body;
        user.roles = ["student"];
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
            userModel.findAllUsers() // /api/assignment/user
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
                userModel.findUserByCredentials(credentials)
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
                    res.status(400).send(err);
                }
            );
    }

    function adminUpdateUser (req, res) {
        var userId = req.params.id;
        var user = req.body;
        userModel.updateUser(userId, user)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
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
};
