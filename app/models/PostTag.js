var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

// tạo cấu trúc db
var schema = mongoose.Schema({
    postId: {
        type: ObjectId,
        ref: 'Post'
    },
    tagId: {
        type: ObjectId,
        ref: 'Tag'
    }

});

// tạo model cho PostTag và export vào app
module.exports = mongoose.model('PostTag', schema);
