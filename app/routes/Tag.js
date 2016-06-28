var Tag = require('../models/Tag');

module.exports = function (app, passport) {
    //Quản lý tag
    app.post('/api/tag/create', function (req, res) {
        req.body.name = "tag 1";
        req.body.description = "mota khoa anh";

        Tag.findOne({
            'tagName': req.body.name
        }, function (err, existTag) {
            if (err) { // Nếu có lỗi thì trả về lỗi.
                return res.send(err);
            }

            if (existTag) { // Nếu tồn tại thì không insert
                return res.send("insert thất bại: tag " + req.body.name + " Đã tồn tại");
            } else { // Insert
                Tag.create({
                    tagName: req.body.name,
                    description: req.body.description,
                    dateCreated: new Date()
                }, function (err, tags) {
                    if (err) {
                        return res.send(err);
                    }
                });
            }
        });
    });


//    app.get('/test/tag/create', function (req, res) {
//        var newTag = new Tag();
//        newTag.tagName = "tag 1";
//        newTag.description = "mo ta tag 1";
//        newTag.count = 1;
//        newTag.creationDate = new Date();
//        newTag.lastEditDate = new Date();
//
//        newTag.save(function (err, post) {
//            if (err) {
//                res.send(err); // nếu có lỗi sẽ trả về thông báo lỗi
//            } else {
//                res.json(post);
//            }
//            // nếu thêm thành công sẽ trả về giá trị mà ta mới chèn vào dưới dạng json
//        });
//    });

    app.get('/api/tag/getTagById/:tag_id', function (req, res) {
        var id = req.params.tag_id;
        Tag.find({
            _id: id
        }).exec(function (err, tag) {
            if (err) {
                return res.send(err);
            }
            return res.json(tag);
        });
    });

    app.get('/api/tag/getTagByName/:tag_name', function (req, res) {
        var name = req.params.tag_name;
        Tag.find({
            tagName: name
        }).exec(function (err, tag) {
            if (err) {
                return res.send(err);
            }
            return res.json(tag);
        });
    });

    //Lấy toàn bộ tag
    app.get('/api/tag', function (req, res) {
        Tag.find({}).sort({
            dateCreated: -1
        }).exec(function (err, tags) {
            if (err) {
                return res.send(err);
            }
            return res.json(tags);
        });
    });

    app.get('/api/tag/count', function (req, res) {
        Tag.count(function (err, c) {
            if (err) {
                return res.send(err);
            }
            return res.json(c);
        });
    });

    //Lấy tag nổi bật - show ở trang chủ
    app.get('/api/tag/popular-home', function (req, res) {
        Tag.aggregate({
            $limit: 10
        }, function (err, tags) {
            if (err) {
                return res.send(err);
            }
            return res.json(tags);
        });
    });

    // Xóa tag
    app.delete('/api/tag/detete/:tag_id', function (req, res) {
        Tag.remove({
            _id: req.params.tag_id
        }, function (err, tags) {
            if (err) {
                return res.send(err);
            }

            // Trả về danh sách tag mới.
            Tag.find(function (err, tags) {
                if (err) {
                    return res.send(err);
                }
                return res.json(tags);
            });
        });
    });

    app.get('/api/getPostByTag/:tag_id', function (req, res) {
        var id = req.params.tag_id;
        Tag.getPostByTag(id).populate('postId userId').exec(function (err, question) {
            return res.json(question);
        });
    });

    app.get('/api/tag/detail/:tag_id', function (req, res) {
        Tag.findById(req.params.tag_id, function (err, tag) {
            if (err) {
                return res.send(err);
            }
            return res.json(tag);
        });
    });

    app.post('/api/tag/edit', function (req, res) {
        Tag.findById(req.body._id, function (err, data) {
            if (err) {
                return res.send(err);
            }
            data.description = req.body.description;
            data.lastEditDate = new Date();
            data.save(function (err, t) {
                if (err) {
                    return res.send(err);
                }
                return res.send(t);
            });
        });
    });
};
