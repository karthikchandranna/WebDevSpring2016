module.exports = function(app, userModel) {

    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", getUser);
    app.get("/api/assignment/user/:id", getUserById);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUser);

    function createUser (req, res) {
        var user = req.body;
        var users = userModel.createUser(user);
        res.json(users);
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
                user = userModel.findUserByCredentials(credentials); // /api/assignment/user?username=alice&password=wonderland
            }
            else {
                user = userModel.findUserByUsername(req.query.username);// /api/assignment/user?username=username
            }
            res.json(user);
        }
    }

    function getUserById (req, res) {
        var userId = req.params.id;
        var user = userModel.findUserById(userId);
        res.json(user);
    }

    function updateUser (req, res) {
        var userId = req.params.id;
        var user = req.body;
        var users = userModel.updateUser(userId, user);
        res.json(users);
    }

    function deleteUser (req, res) {
        var userId = req.params.id;
        var users = userModel.deleteUser(userId);
        res.json(users);
    }

};