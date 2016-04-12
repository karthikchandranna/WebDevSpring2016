module.exports = function(mongoose) {

    var MovieSchema = require("./movie.schema.server.js")(mongoose);

    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        roles: [String],
        // tmdb ids of movies this user rates
        rates: [String],
        // movies this user rates
        ratedMovies: [MovieSchema],
        // tmdb ids of movies this user has reviewed
        reviews: [String],
        // movies this user has reviewed
        reviewedMovies: [MovieSchema]
    }, {collection: 'project.user'});
    return UserSchema;
};