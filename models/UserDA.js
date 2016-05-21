var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: '150.107.152.48:9200',
    log: 'trace'
});

var UserDA = function () {
};

UserDA.upsert = function (user) {
    client.index({
        index: 'imarket',
        type: 'user',
        id: user.username,
        body: {
            username: user.username,
            password: user.password,
            fullname: user.fullname,
            phone: user.phone,
            address: user.address,
            email: user.email,
            rights: user.rights
        }
    }, function (error, response) {
    });
};

module.exports = UserDA;