var q = require("q");
module.exports = function(db, mongoose) {

    var CriticSchema = require("./critic.schema.server.js")(mongoose);
    var Critic  = mongoose.model("Critic", CriticSchema);

    var api = {
        saveReview: saveReview,
        findAllCritics: findAllCritics,
        findCritic: findCritic
    };
    return api;

    function saveReview(userId, username, title, review){
        // create instance of critic
        var critic = new Critic({
            "userId": userId,
            "username": username,
            "title": title,
            "review": review
        });
        var deferred = q.defer();
        // save critic to database
        critic.save(function (err, doc) {
            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findAllCritics() {
        var deferred = q.defer();
        Critic.find(function (err, users) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(users);
            }
        });
        return deferred.promise;
    }

    function findCritic(userId) {
        var deferred = q.defer();
        Critic.findOne({userId: userId},function (err, users) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(users);
            }
        });
        return deferred.promise;
    }
};
