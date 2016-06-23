var tag = require('./Tag');
var post = require('./Post');
var user = require('./User');
var report = require('./Report');

module.exports = function (app, passport) {

    // quản lý các tag
    tag(app);
    //quản lý các post
    post(app);
    //quản l1y các user
    user(app);

    //Tất cả request phải đi qua trang index.html để xử lý.
    app.get('*', function (req, res) {
        res.sendfile('public/index.html');
    });
};