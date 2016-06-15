var redisClient = require('./Redis');

var CatelogyCA = function () {
};

CatelogyCA.upsert = function (catelog) {
    if (!catelog || !catelog.catelogyID) {
        return false;
    }
    redisClient.set(catelog.catelogyID, JSON.stringify(catelog));
};

CatelogyCA.getBycatelogyID = function (catelog, callback) {
    if (!catelog) {
        return false;
    }

    redisClient.get(catelog, function (err, reply) {
        var result = JSON.parse(reply);
        callback(result);
    });
};

module.exports = CatelogyCA;