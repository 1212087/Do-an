var redisClient = require('./Redis');

var PostCA = function () {
};

PostCA.upsert = function (pro) {
    if (!pro || !pro.productID) {
        return false;
    }
    redisClient.set(pro.productID, JSON.stringify(pro));
};

PostCA.getByProductID = function (pro, callback) {
    if (!pro) {
        return false;
    }

    redisClient.get(pro, function (err, reply) {
        var result = JSON.parse(reply);
        callback(result);
    });
};

module.exports = PostCA;