module.exports = function(mongoose) {

    // use mongoose to declare a movie schema
    var MovieSchema = mongoose.Schema({
        tmdbId: String,
        title: String,
        imageUrl: String,
        videoUrl: [String],
        // ids of users that like this movie
        ratings: [
            {
                userId: String,
                value: Number
            }
        ],
        // list of reviews for this movie
        reviews: [
            {
                userId: String,
                username: String,
                text: String
            }
        ]
        // store movie documents in this collection
    }, {collection: 'project.movie'});

    return MovieSchema;

};