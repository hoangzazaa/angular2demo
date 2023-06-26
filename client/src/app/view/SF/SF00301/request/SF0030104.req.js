"use strict";
var SF00301_DealFile_model_1 = require("../model/SF00301_DealFile.model");
var SF0030104Req = (function () {
    function SF0030104Req(dealFile, fileCode) {
        this.dealFile = new SF00301_DealFile_model_1.SF00301_DealFile();
        this.dealFile = dealFile;
        this.fileCode = fileCode;
    }
    return SF0030104Req;
}());
exports.SF0030104Req = SF0030104Req;
//# sourceMappingURL=SF0030104.req.js.map