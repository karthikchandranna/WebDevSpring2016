var movies = require("./movie.mock.json");
var uuid = require('node-uuid');
module.exports = function() {

    var api = {
        addRatingForMovie: addRatingForMovie,
        getRatingForMovie: getRatingForMovie,
        addMovieToDB: addMovieToDB,
        addReviewForMovie: addReviewForMovie,
        getReviewsForMovie: getReviewsForMovie
    };
    return api;

    function addRatingForMovie(tmdbId, rating, userId, movie) {
        isMovieInDB = false;
        for (var m in movies) {
            if (movies[m].tmdbId == tmdbId)
                isMovieInDB = true;
        }
        if(!isMovieInDB) {
            addMovieToDB(movie);
        }
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
                var rCount = movies[m].ratings.length;
                var ratingSum = 0.0;
                for(var r in movies[m].ratings) {
                    ratingSum += parseFloat(movies[m].ratings[r].value);
                }
                return ratingSum/rCount;
            }
        }
        return 0.0;
    }

    function addReviewForMovie(tmdbId, review, userId, username, movie) {
        isMovieInDB = false;
        for (var m in movies) {
            if (movies[m].tmdbId == tmdbId)
                isMovieInDB = true;
        }
        if(!isMovieInDB) {
            addMovieToDB(movie);
        }
        for (var m in movies) {
            if (movies[m].tmdbId == tmdbId) {
                var newReview = {"_id": uuid.v1(),"userId": userId, "username": username, "text": review};
                if(movies[m].reviews)
                    movies[m].reviews.unshift(newReview);
                else
                    movies[m].reviews = [newReview];
                break;
            }
        }
        return getReviewsForMovie(tmdbId);
    }


    function getReviewsForMovie(tmdbId) {
        for (var m in movies) {
            if (movies[m].tmdbId == tmdbId) {
                return movies[m].reviews;
            }
        }
    }

    function addMovieToDB(movie) {
        var newMovie = {
            "_id": uuid.v1(),
            "tmdbId": movie.id,
            "title": movie.title,
            "imageUrl": movie.poster_path,
            "videoUrl": movie.untrusted_video_url,
            "ratings": [],
            "reviews": []
        };
        movies.push(newMovie);
    }
};