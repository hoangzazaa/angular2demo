"use strict";
var SFN0402_Partner_model_1 = require("./model/SFN0402_Partner.model");
var SFN0402Data = (function () {
    function SFN0402Data() {
        this.partner = new SFN0402_Partner_model_1.PartnerModel();
        this.revenues = [];
        this.inventories = [];
        this.products = [];
    }
    return SFN0402Data;
}());
exports.SFN0402Data = SFN0402Data;
//# sourceMappingURL=SFN0402.data.js.map