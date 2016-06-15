var redisClient = require('./Redis');

var UserCA = function () {
};

UserCA.upsert = function (user) {
    if (!user || !user.username) {
        return false;
    }
    redisClient.set(user.username, JSON.stringify(user));
};

UserCA.getByUsername = function (username, callback) {
    if (!username) {
        return false;
    }

    redisClient.get(username, function (err, reply) {
        var result = JSON.parse(reply);
        callback(result);
    });
};

module.exports = UserCA;