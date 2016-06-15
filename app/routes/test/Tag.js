var Tag = require('../../models/Tag');

module.exports = function (app, passport) {
    //Quản lý tag
    app.post('/test/tag/create', function (req, res) {
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
                    creationDate: new Date()
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

};
