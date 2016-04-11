module.exports = function(app, movieModel) {

    app.post("/api/project/movie/:tmdbId/rating/:ratedValue/user/:userId", addRating);
    app.get("/api/project/movie/:tmdbId/rating", getRating);
    app.post("/api/project/movie/:tmdbId/review/:reviewContent/user/:userId/username/:username", addReview);
    app.get("/api/project/movie/:tmdbId/review", getReviews);

    function addRating(req, res) {
        var tmdbId = req.params.tmdbId;
        var rating = req.params.ratedValue;
        var userId = req.params.userId;
        var movie = req.body;
        var newRating = movieModel.addRatingForMovie(tmdbId, rating, userId, movie);
        res.json(newRating);
    }

    function getRating(req, res) {
        var tmdbId = req.params.tmdbId;
        var rating = movieModel.getRatingForMovie(tmdbId);
        res.json(rating);
    }

    function addReview(req, res) {
        var tmdbId = req.params.tmdbId;
        var review = req.params.reviewContent;
        var userId = req.params.userId;
        var username = req.params.username;
        var movie = req.body;
        var reviews = movieModel.addReviewForMovie(tmdbId, review, userId, username, movie);
        res.json(reviews);
    }

    function getReviews(req, res) {
        var tmdbId = req.params.tmdbId;
        var reviews = movieModel.getReviewsForMovie(tmdbId);
        res.json(reviews);
    }
};