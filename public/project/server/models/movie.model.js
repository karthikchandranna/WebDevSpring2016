var q = require("q");
module.exports = function(db, mongoose) {

    var MovieSchema = require("./movie.schema.server.js")(mongoose);
    var Movie  = mongoose.model("Movie", MovieSchema);

    var api = {
        createMovie: createMovie,
        addReviewForMovie: addReviewForMovie,
        getReviewsForMovie: getReviewsForMovie,
        findMovieByTmdbID: findMovieByTmdbID,
        findMoviesByTmdbIDs: findMoviesByTmdbIDs,
        userRatesMovie: userRatesMovie,
        userReviewsMovie: userReviewsMovie
    };
    return api;

    function userRatesMovie (tmdbId, rating, userId, movie) {
        var deferred = q.defer();
        // find the movie by tmdb ID
        Movie.findOne({tmdbId: movie.id},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                }
                // if there's a movie
                if (doc) {
                    // add user to ratings
                    doc.ratings.push ({"userId": userId, "value": parseInt(rating)});
                    doc.save(function(err, doc){
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });
                }
                else {
                    // if there's no movie, create a new instance
                    movie = new Movie({
                        "tmdbId": tmdbId,
                        "title": movie.title,
                        "imageUrl": movie.poster_path,
                        "videoUrl": movie.untrusted_video_url,
                        "ratings": [],
                        "reviews": []
                    });
                    // add user to likes
                    movie.ratings.push ({"userId": userId, "value": parseInt(rating)});
                    // save new instance
                    movie.save(function(err, doc) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });
                }
            });

        return deferred.promise;
    }

    function userReviewsMovie (tmdbId, review, userId, username, movie) {
        var deferred = q.defer();
        // find the movie by tmdb ID
        Movie.findOne({tmdbId: movie.id},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                }
                // if there's a movie
                if (doc) {
                    // add user to reviews
                    doc.reviews.push ({"userId": userId, "username": username, "text": review});
                    doc.save(function(err, doc){
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });
                }
                else {
                    // if there's no movie, create a new instance
                    movie = new Movie({
                        "tmdbId": tmdbId,
                        "title": movie.title,
                        "imageUrl": movie.poster_path,
                        "videoUrl": movie.untrusted_video_url,
                        "ratings": [],
                        "reviews": []
                    });
                    // add user to reviews
                    movie.reviews.push ({"userId": userId, "username": username, "text": review});
                    // save new instance
                    movie.save(function(err, doc) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });
                }
            });

        return deferred.promise;
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
                var newReview = {"userId": userId, "username": username, "text": review};
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

    function createMovie(movie) {
        // create instance of movie
        var movie = new Movie({
            "tmdbId": movie.id,
            "title": movie.title,
            "imageUrl": movie.poster_path,
            "videoUrl": movie.untrusted_video_url,
            "ratings": [],
            "reviews": []
        });
        var deferred = q.defer();
        // save movie to database
        movie.save(function (err, doc) {
            if (err) {
                defferred.reject(err)
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findMovieByTmdbID(tmdbId) {
        var deferred = q.defer();
        Movie.findOne({tmdbId: tmdbId}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findMoviesByTmdbIDs (tmdbIds) {
        var deferred = q.defer();
        Movie.find({
            tmdbId: {$in: tmdbIds}
        }, function (err, movies) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(movies);
            }
        });
        return deferred.promise;
    }
};