module.exports = function(app, userModel) {

    app.post("/api/assignment/user", createUser);//register
    app.get("/api/assignment/user", getUser);//login
    app.get("/api/assignment/user/:id", getUserById);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUser);
    app.get("/api/assignment/loggedin", loggedin);
    app.post("/api/assignment/logout", logout);

    function createUser (req, res) {
        var user = req.body;
        /*user = userModel.createUser(user);
        req.session.currentUser = user;
        res.json(user);*/

        user = userModel.createUser(user)
            // handle model promise
            .then(
                // login user if promise resolved
                function ( doc ) {
                    req.session.currentUser = doc;
                    res.json(user);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function getUser (req, res) {
        if (Object.keys(req.query).length === 0) {
            var users = userModel.findAllUsers(); // /api/assignment/user
            res.json(users);
        }
        else if (req.query.username) {
            var user;
            if (req.query.password) {
                var credentials = {
                    username: req.query.username,
                    password: req.query.password
                };
                /*user = userModel.findUserByCredentials(credentials); // /api/assignment/user?username=alice&password=wonderland
                req.session.currentUser = user;*/

                user = userModel.findUserByCredentials(credentials)
                    .then(
                        function (doc) {
                            req.session.currentUser = doc;
                            res.json(doc);
                        },
                        // send error if promise rejected
                        function ( err ) {
                            res.status(400).send(err);
                        })
            }
            else {
                user = userModel.findUserByUsername(req.query.username);// /api/assignment/user?username=username
            }
            res.json(user);
        }
        else
            res.json(null);
    }

    function getUserById (req, res) {
        /*var userId = req.params.id;
        var user = userModel.findUserById(userId);
        res.json(user);*/

        var userId = req.params.id;

        // use model to find user by id
        var user = userModel.findUserById(userId)
            .then(
                // return user if promise resolved
                function (doc) {
                    res.json(doc);
                },
                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateUser (req, res) {
        var userId = req.params.id;
        var user = req.body;
        user = userModel.updateUser(userId, user);
        req.session.currentUser = user;
        res.json(user);
    }

    function deleteUser (req, res) {
        var userId = req.params.id;
        var users = userModel.deleteUser(userId);
        res.json(users);
    }

    function loggedin(req, res) {
        res.json(req.session.currentUser);
    }

    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }

};