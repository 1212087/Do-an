var User = require('../models/User');
var Post = require('../models/Post');
var randtoken = require('rand-token');
var fs = require('fs');

module.exports = function (app, passport) {

    // Upload avatar
    app.post('/api/user/upload/avatar', function (req, res) {
        var fstream;
        req.pipe(req.busboy);
        req.busboy.on('file', function (fieldname, file, filename) {
            console.log('Uploading: ' + filename);
            var extension = (/[.]/.exec(filename)) ? /[^.] + $/.exec(filename) : undefined;
            var strand = randtoken.generate(20);
            fstream = fs.createWriteStream('public/uploads/users/' + strand + '.' + extension);
            file.pipe(fstream);
            fstream.on('close', function (err) {
                if (err) {
                    return res.send(err);
                }
                return res.send(strand + '.' + extension);
            });
        });
    });

    // edit avatar
    app.get('/api/user/edit/avatar/:avatar', function (req, res) {
        User.findById(req.user._id, function (err, user) {
            if (err) {
                return res.send(err);
            }
            user.avatar = '/uploads/users/' + req.params.avatar;
            user.save(function (err, user) {
                if (err) {
                    return res.send(err);
                }
                return res.json(user);
            });
        });
    });

    // get user
    app.get('/api/user', function (req, res) {
        User.find(function (err, user) {
            if (err) {
                return res.send(err);
            }
            return res.json(user);
        });
    });

    // get user theo userID
    app.get('/api/user/profile/:user_id', function (req, res) {
        User.findById(req.params.user_id, function (err, user) {
            if (err) {
                return res.send(err);
            }
            return res.json(user);
        });
    });

    // get tong user
    app.get('/api/countUser', function (req, res) {
        User.find({
            status: 1
        }).count(function (err, user) {
            if (err) {
                return res.send(err);
            }
            return res.json(user);
        });
    });

    // get tong post theo user
    app.get('/api/user/count/post/:user_id', function (req, res) {
        var id = req.params.user_id;
        Post.count({
            userId: id
        }, function (err, c) {
            if (err) {
                return res.send(err);
            }
            return res.json(c);
        });
    });

    // Edit user
    app.post('/api/user/edit', function (req, res) {
        User.findById(req.body._id, function (err, user) {
            if (err) {
                return res.send(err);
            }
            user.fullname = req.body.displayName;
            user.address = req.body.location;
            user.birthday = req.body.birthday;
            user.save(function (err, u) {
                if (err) {
                    return res.send(err);
                }
                return res.json(u);
            });
        });
    });

    // Change password
    app.post('/api/user/changePassword', function (req, res, done) {
        User.findById(req.body._id, function (err, user) {
            if (err) {
                return res.send(err);
            }
            if (!user || !user.validPassword(req.body.CurrentPassword)) {
                return done(null, false);
            } else {
                user.password = user.generateHash(req.body.NewPassword);
                user.dateUpdated = new Date();
                user.save(function (err, u) {
                    if (err) {
                        return res.send(err);
                    }
                    return res.json(u);
                });
            }
        });
    });
    
    
    // user up hinh
    app.post('/api/user/upload', function (req, res) {
        var fstream;
        req.pipe(req.busboy);
        req.busboy.on('file', function (fieldname, file, filename) {
            console.log('Uploading: ' + filename);
            var extension = (/[.]/.exec(filename)) ? /[^.] + $/.exec(filename) : undefined;
            var strand = randtoken.generate(20);
            fstream = fs.createWriteStream('public/uploads/images/' + strand + '.' + extension);
            file.pipe(fstream);
            fstream.on('close', function (err) {
                if (err) {
                    return res.send(err);
                }
                return res.send(strand + '.' + extension);
            });
        });
    });
    
    
    // test create user
        app.get('/api/user/create', function (req, res) {
        var newUser = new User();
        newUser.username = "kenstephoang";
        newUser.email = "kenstephoang@gmail.com";
        newUser.password = "123456";
        newUser.fullname = "Hoang Nguyen Anh Khoa";
        newUser.role = "user";
        newUser.creationDate = new Date();
        newUser.lastEditDate = new Date();

        newUser.save(function (err, post) {
            if (err) {
                res.send(err); // nếu có lỗi sẽ trả về thông báo lỗi
            } else {
                res.json(post);
            }
            // nếu thêm thành công sẽ trả về giá trị mà ta mới chèn vào dưới dạng json
        });
    });
};