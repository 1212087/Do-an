var Catelogy = function () {
    this.catelogyID = null;
    this.name = null;
    this.listSubCatalogy = null;
};

var SubCatelogy = function () {
    this.subCatelogyID = null;
    this.catelogyID = null;
    this.name = null;
};

module.exports = Catelogy;
module.exports = SubCatelogy;