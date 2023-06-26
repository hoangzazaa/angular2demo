"use strict";
var SF00301_DealFile_model_1 = require("../model/SF00301_DealFile.model");
var SF0030103Req = (function () {
    function SF0030103Req(dealFile, fileCode) {
        this.dealFile = new SF00301_DealFile_model_1.SF00301_DealFile();
        this.dealFile = dealFile;
        this.fileCode = fileCode;
    }
    return SF0030103Req;
}());
exports.SF0030103Req = SF0030103Req;
//# sourceMappingURL=SF0030103.req.js.map