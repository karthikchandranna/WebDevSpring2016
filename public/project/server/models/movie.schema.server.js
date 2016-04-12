module.exports = function(mongoose) {

    // use mongoose to declare a movie schema
    var MovieSchema = mongoose.Schema({
        tmdbId: String,
        title: String,
        imageUrl: String,
        videoUrl: [String],
        // ids of ratings for this movie
        ratings: [
            {
                userId: String,
                username: String,
                value: Number
            }
        ],
        // list of users who rated this movie
        ratedByUsers: [String],
        // list of reviews for this movie
        reviews: [
            {
                userId: String,
                username: String,
                text: String
            }
        ],
        // list of users who reviewed this movie
        reviewedByUsers: [String]
        // store movie documents in this collection
    }, {collection: 'project.movie'});
    return MovieSchema;
};