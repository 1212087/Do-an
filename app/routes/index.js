var tag = require('./test/Tag');

module.exports = function (app, passport) {

    tag(app);

    //Tất cả request phải đi qua trang index.html để xử lý.
    app.get('*', function (req, res) {
        res.sendfile('public/index.html');
    });
};