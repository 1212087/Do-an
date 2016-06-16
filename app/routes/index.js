var tag = require('./Tag');
var post = require('./Post');
var user = require('./User');
var report = require('Report');

module.exports = function (app, passport) {

    tag(app);
    post(app);
    user(app);

    //Tất cả request phải đi qua trang index.html để xử lý.
    app.get('*', function (req, res) {
        res.sendfile('public/index.html');
    });
};