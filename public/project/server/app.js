module.exports = function(app) {
    var userModel    = require("./models/user.model.js")();
    var movieModel = require("./models/movie.model.js")();

    var userService  = require("./services/user.service.server.js") (app, userModel);
    var movieService  = require("./services/movie.service.server.js") (app, movieModel);
};