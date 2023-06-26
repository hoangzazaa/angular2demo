"use strict";
var SFN0307_datarepo_1 = require("./SFN0307.datarepo");
var DealModel_1 = require("../COMMON/dealinfo/model/DealModel");
var SFN0307Data = (function () {
    function SFN0307Data() {
        this.dataRepo = new SFN0307_datarepo_1.SFN0307DataRepo();
        this.dealInfo = new DealModel_1.DealInfoModel();
        this.orders = [];
        this.destinations = [];
        this.loadings = [];
        this.canChangeMode = true;
        this.screenMode = 1;
    }
    return SFN0307Data;
}());
exports.SFN0307Data = SFN0307Data;
//# sourceMappingURL=SFN0307.data.js.map