module.exports = function(app, movieModel) {

    app.post("/api/project/movie/:tmdbId/rating/:ratedValue/user/:userId", addRating);
    app.get("/api/project/movie/:tmdbId/rating", getRating);

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
};