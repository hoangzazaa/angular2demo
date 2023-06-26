"use strict";
var SF00301_ProductFile_model_1 = require("../model/SF00301_ProductFile.model");
var SF0030105Req = (function () {
    function SF0030105Req(productFile, fileCode) {
        this.productFile = new SF00301_ProductFile_model_1.SF00301_ProductFile();
        this.productFile = productFile;
        this.fileCode = fileCode;
    }
    return SF0030105Req;
}());
exports.SF0030105Req = SF0030105Req;
//# sourceMappingURL=SF0030105.req.js.map