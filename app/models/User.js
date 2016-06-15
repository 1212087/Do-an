var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// tạo cấu trúc db
var schema = mongoose.Schema({
    username: {
        type: 'String',
        required: true
    },
    email: {
        type: 'String',
        required: true
    },
    fullname: {
        type: 'String',
        required: true
    },
    password: {
        type: 'String',
        default: null
    },
    phone: {
        type: 'String',
        default: null
    },
    avatar: {
        type: 'String',
        default: null
    },
    address: {
        type: 'String',
        default: null
    },
    birthday: {
        type: 'String',
        default: null
    },
    status: {
        type: 'Number',
        default: 0
    },
    role: {
        type: 'String',
        required: true
    },
    activeToken: {
        type: 'String',
        default: null
    },
    creationDate: {
        type: 'Date',
        default: Date.now
    },
    lastEditDate: {
        type: 'Date',
        default: Date.now
    },
    lastAccessDate: {
        type: 'Date',
        default: Date.now
    }
});

schema.statics.findPost = function (id, callback) {
    return this.model('Post').find({
        userId: id
    }, callback);
};

// tạo ra mã hash
schema.methods.generateHash = function(password) {
return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// kiểm tra mật khẩu hợp lệ
schema.methods.validPassword = function(password) {
return bcrypt.compareSync(password, this.password);
};

// tạo model cho user và export vào app
module.exports = mongoose.model('User', schema);