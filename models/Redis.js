var redis = require('redis');
var client = redis.createClient(6379, "150.107.152.48");

module.exports = client;