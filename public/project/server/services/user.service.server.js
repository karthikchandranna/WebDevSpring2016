module.exports = function(app, userModel) {

    app.post("/api/project/user", createUser);//register
    app.get("/api/project/user", getUser);//login
    app.get("/api/project/user/:id", getUserById);
    app.put("/api/project/user/:id", updateUser);
    app.delete("/api/project/user/:id", deleteUser);
    app.get("/api/project/loggedin", loggedin);
    app.post("/api/project/logout", logout);

    function createUser (req, res) {
        var user = req.body;
        user = userModel.createUser(user);
        req.session.currentUser = user;
        res.json(user);
    }

    function getUser (req, res) {
        if (Object.keys(req.query).length === 0) {
            var users = userModel.findAllUsers(); // /api/project/user
            res.json(users);
        }
        else if (req.query.username) {
            var user;
            if (req.query.password) {
                var credentials = {
                    username: req.query.username,
                    password: req.query.password
                };
                user = userModel.findUserByCredentials(credentials); // /api/project/user?username=alice&password=wonderland
                req.session.currentUser = user;
            }
            else {
                user = userModel.findUserByUsername(req.query.username);// /api/project/user?username=username
            }
            res.json(user);
        }
        else
            res.json(null);
    }

    function getUserById (req, res) {
        var userId = req.params.id;
        var user = userModel.findUserById(userId);
        res.json(user);
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