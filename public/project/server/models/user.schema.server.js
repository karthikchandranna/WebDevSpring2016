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
        rates: [
            {
                name: String,
                tmdbId: String,
                rating: Number,
                imageUrl: String
            }
        ],
        // movies this user rates
        ratedMovies: [MovieSchema],
        // tmdb ids of movies this user has reviewed
        reviews: [
            {
                name: String,
                tmdbId: String,
                review: String,
                imageUrl: String
            }
        ],
        // movies this user has reviewed
        reviewedMovies: [MovieSchema],
        follows: [
            {
                userId: String,
                username: String,
                rates: [
                    {
                        name: String,
                        tmdbId: String,
                        rating: Number,
                        imageUrl: String
                    }
                ],
                reviews: [
                    {
                        name: String,
                        tmdbId: String,
                        review: String,
                        imageUrl: String
                    }
                ]
            }
        ]
    }, {collection: 'project.user'});
    return UserSchema;
};
