module.exports = function(app, userModel, movieModel) {
    app.get("/api/project/movie/:tmdbId/details", getMovieDetails);
    app.post("/api/project/movie/:tmdbId/rating/:ratedValue/user/:userId", userRatesMovie);
    app.post("/api/project/movie/:tmdbId/review/:reviewContent/user/:userId/username/:username", userReviewsMovie);

    function userRatesMovie(req, res) {
        var tmdbId = req.params.tmdbId;
        var rating = req.params.ratedValue;
        var userId = req.params.userId;
        var movie = req.body;
        userModel
            .userRatesMovie(userId, movie)
            // add movie to user ratings
            .then(
                function (user) {
                    return movieModel.userRatesMovie(tmdbId, rating,userId, movie);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            // add user to movie ratings
            .then(
                function (movie) {
                    movie._doc.totalRatings = calculateRatingsForMovie(movie);
                    res.json(movie);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function userReviewsMovie(req, res) {
        var tmdbId = req.params.tmdbId;
        var review = req.params.reviewContent;
        var userId = req.params.userId;
        var username = req.params.username;
        var movie = req.body;
        userModel
            .userReviewsMovie(userId, movie)
            // add movie to user reviews
            .then(
                function (user) {
                    return movieModel.userReviewsMovie(tmdbId, review, userId, username, movie);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            // add user to movie reviews
            .then(
                function (movie) {
                    res.json(movie);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getMovieDetails(req, res) {
        var tmdbId = req.params.tmdbId;
        var movie = null;
        movieModel
            .findMovieByTmdbID(tmdbId)
            .then (
                function (doc) {
                    movie = doc;
                    if (doc) {
                        doc._doc.totalRatings = calculateRatingsForMovie(doc);
                        res.json(doc);
                    } else {
                        res.json (null);
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function calculateRatingsForMovie(movie) {
        var rCount = movie.ratings.length;
        var ratingSum = 0.0;
        for(var r in movie.ratings) {
            ratingSum += parseFloat(movie.ratings[r].value);
        }
        return ratingSum/rCount;
    }
};