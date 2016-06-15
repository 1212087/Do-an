var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

// tạo cấu trúc db
var schema = mongoose.Schema({
    title: {
        type: 'String',
        required: true,
        index: true
    },
    content: {
        type: 'String',
        required: true
    },
    userId: {
        type: ObjectId,
        ref: 'User'
    },
    viewCount: {
        type: 'Number',
        default: 0
    },
    price: {
        type: 'Number',
        default: 0
    },
    activeToken: {
        type: 'String',
        default: null
    },
    isSole: {
        type: 'Boolean',
        default: false
    },
    status: {
        type: 'Boolean',
        default: false
    },
    creationDate: {
        type: 'Date',
        required: true
    },
    lastEditDate: {
        type: 'Date',
        default: Date.now
    },
    image: {
        type: 'String',
        required: false
    }, //Chỉ tồn tại nếu bài đăng được đóng.
    catelogyID: {
        type: 'String',
        default: null
    },
    isNew: {
        type: 'String',
        default: null
    },
    city: {
        type: 'String',
        default: null
    },
    district: {
        type: 'String',
        default: null
    }
});

schema.statics.findTags = function (id, callback) {
    return this.model('PostTag').find({
        PostId: id
    }, callback);
};

schema.pre('save', function (next) {
    next();
});

// tạo model cho Question và export vào app
module.exports = mongoose.model('Question', schema);