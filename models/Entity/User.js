var User = function () {
    this.username = null;
    this.password = null;
    this.fullname = null;
    this.phone = null;
    this.address = null;
    this.email = null;
    this.rights = null;
};

User.prototype.log = function(){
};

module.exports = User;