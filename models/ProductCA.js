var redisClient = require('./Redis');

var ProductCA = function () {
};

ProductCA.upsert = function (pro) {
    if (!pro || !pro.productID) {
        return false;
    }
    redisClient.set(pro.productID, JSON.stringify(pro));
};

ProductCA.getByProductID = function (pro, callback) {
    if (!pro) {
        return false;
    }

    redisClient.get(pro, function (err, reply) {
        var result = JSON.parse(reply);
        callback(result);
    });
};

module.exports = ProductCA;