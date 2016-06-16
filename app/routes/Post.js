var Post = require('../models/Post');
var Tag = require('../models/Tag');
var PostTag = require('../models/PostTag');
//var User = require('../models/User');
//var ObjectId = require('mongodb');


module.exports = function (app, passport) {
    //Lấy toàn bộ post
    app.get('/api/post/all', function (req, res) {
        Post.find({}).populate('userId').exec(function (err, posts) {
            if (err) {
                return res.send(err);
            }
            return res.json(posts);
        });
    });

    // Search Title
    app.get('/api/title/search/:title', function (req, res) {
        var title = req.params.title;
        Post.find({
            $text: {
                '$search': title
            }
        }, {
            score: {
                $meta: 'textScore'
            }
        }).sort({
            score: {
                $meta: 'textScore'
            }
        }).exec(function (err, posts) {
            if (err) {
                return res.send(err);
            }
            return res.json(posts);
        });
    });

    // Tong so post
    app.get('/api/post/count', function (req, res) {
        Post.count(function (err, post) {
            if (err) {
                return res.send(err);
            }
            return res.json(post);
        });
    });

    //Lấy Post nổi bật - show ở trang chủ
    app.get('/api/post/popular', function (req, res) {
        Post.find({
            status: true
        }).where('dateCreated').gt(new Date() - 3600 * 1000 * 24 * 7).populate({
            path: 'userId',
            select: 'avatar',
            options: {
                limit: 5
            }
        })
                .select('title dateCreated userId')
                .sort('-score')
                .exec(function (err, posts) {
                    if (err) {
                        return res.send(err);
                    }
                    return res.json(posts);
                });
    });

    // Them bai viet
    app.get('/api/post/create', function (req, res) {
        req.body.title = "tieu de";
        req.body.content = "noi dung";
        req.body.tag = "banhang";

        // Thêm câu hỏi mới.
        var newPost = new Post();
        newPost.title = req.body.title;
        newPost.content = req.body.content;
//        newPost.userId = req.user._id;
//        newPost.userId = ObjectId("57622072e6ee17224883e8fe");
        newPost.dateCreated = new Date();

        var listTag = req.body.tag;
        newPost.save(function (err, post) {
            if (err) {
                throw err;
            }
            //Thêm các tag liên kết vào bảng PostTag
            listTag.forEach(function (item) {
                Tag.find({
                    tagName: item.tagName
                }).exec(function (err, t) {
                    if (err) {
                        return res.send(err);
                    }
                    t.forEach(function (item) {
                        var postTag = new PostTag();
                        postTag.postId = post._id;
                        postTag.tagId = item._id;
                        postTag.save(function (err) {
                            if (err) {
                                throw err;
                            }
                        });
                    });

                    //Cập nhật số lần sử dụng của các tag lên 1 đơn vị
                    t.forEach(function (item) {
                        Tag.findById(item._id, function (err, tag) {
                            if (err) {
                                return res.send(err);
                            }
                            tag.count += 1;
                            tag.save(function (err, tag) {
                                if (err) {
                                    return res.send(err);
                                }
                            });
                        });
                    });
                });
            });
            return res.json(post);
        });
    });

    // Get bài viết
    app.get('/api/post/detail/:post_id', function (req, res) {
        var id = req.params.post_id;
        Post.findById(id).populate('userId').exec(function (err, post) {
            if (err) {
                return res.send(err);
            }
            return res.json(post);
        });
    });

    //Xóa bài viết
    app.delete('/api/post/detete/:post_id', function (req, res) {
        var id = req.params.post_id;

        //Giảm số lần sử dụng các tag có trong câu hỏi xuống 1 đơn vị
        Post.findTags(id).populate({
            path: 'tagId',
            select: '_id'
        }).exec(function (err, t) {
            if (err) {
                return res.send(err);
            }
            t.forEach(function (item) {
                Tag.findById(item.tagId, function (err, tag) {
                    if (err) {
                        return res.send(err);
                    }
                    if (tag.count > 0) {
                        tag.count -= 1;
                    }
                    tag.save(function (err, tag) {
                        if (err) {
                            return res.send(err);
                        }
                    });
                });
            });
        });

        //Xóa các tag liên kết trước khi xóa câu hỏi
        PostTag.remove({
            postId: id
        }, function (err, tags) {
            if (err) {
                return res.send(err);
            }
        });

        Post.remove({
            _id: id
        }, function (err, posts) {
            if (err) {
                return res.send(err);
            }

            // Trả về danh sách câu hỏi mới.
            Post.find({}).populate('userId').exec(function (err, posts) {
                if (err) {
                    return res.send(err);
                }
                return res.json(posts);
            });
        });
    });

    //Lấy toàn bộ giá trị trong PostTag
    app.get('/api/posttag/getall', function (req, res) {
        PostTag.find({}).populate('tagId').exec(function (err, tags) {
            if (err) {
                return res.send(err);
            }
            return res.json(tags);
        });
    });

    // Lay DS bai viet theo user
    app.get('/api/post/getPostByUser/:user_id', function (req, res) {
        Post.find({
            userId: req.params.user_id
        }).populate('userId').exec(function (err, list) {
            if (err) {
                return res.send(err);
            }
            return res.json(list);
        });
    });

};