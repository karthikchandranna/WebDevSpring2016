var movies = require("./movie.mock.json");
var uuid = require('node-uuid');
module.exports = function() {

    var api = {
        addRatingForMovie: addRatingForMovie,
        getRatingForMovie: getRatingForMovie
    };
    return api;

    function addRatingForMovie(tmdbId, rating,userId) {
        for (var m in movies) {
            if (movies[m].tmdbId == tmdbId) {
                var newRating = {"_id": uuid.v1(),"userId": userId, "value": parseInt(rating)};
                if(movies[m].ratings)
                    movies[m].ratings.push(newRating);
                else
                    movies[m].ratings = [newRating];
                break;
            }
        }
        return getRatingForMovie(tmdbId);
    }

    function getRatingForMovie(tmdbId) {
        for (var m in movies) {
            if (movies[m].tmdbId == tmdbId) {
                var rCount = movies[m].ratings.length();
                var ratingSum = 0.0;
                for(var r in movies[m].ratings) {
                    ratingSum += parseFloat(movies[m].ratings[r].value);
                }
                return ratingSum/rCount;
            }
        }
        return 0.0;
    }
};