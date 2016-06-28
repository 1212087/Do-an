var mongoose = require('mongoose');

// tạo cấu trúc db
var schema = mongoose.Schema({
    tagName: {
        type: 'String',
        required: true
    },
    description: {
        type: 'String',
        required: true
    },
    count: {
        type: 'Number',
        default: 0
    },
    dateCreated: {
        type: 'Date',
        default: Date.now
    },
    dateUpdated: {
        type: 'Date',
        default: Date.now
    }

});
schema.statics.getPostByTag = function (id, callback) {
    return this.model('PostTag').find({
        tagId: id
    }, callback);
};
// tạo model cho Tag và export vào app
module.exports = mongoose.model('Tag', schema);
