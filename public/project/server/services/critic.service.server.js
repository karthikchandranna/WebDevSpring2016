module.exports = function(app, criticModel) {
    app.post("/api/project/critic/:userId/userName/:username/movie/:title", saveReview);
    app.get("/api/project/critic", findAllCritics);

    function saveReview(req, res) {
        var userId = req.params.userId;
        var username = req.params.username;
        var title = req.params.title;
        var review = req.body.review;
        criticModel
            .saveReview(userId, username, title, review)
            .then(
                function (doc) {
                    console.log(doc);
                    res.json(doc);
                },
                function (err) {
                    console.log("error");
                    console.log(err);
                    res.status(400).send(err);

                }
            );
    }

    function findAllCritics(req, res) {
        criticModel
            .findAllCritics()
            .then(
                function (critics) {
                    res.json(critics);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
};