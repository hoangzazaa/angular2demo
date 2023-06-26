"use strict";
var SFN0505_datarepo_1 = require("./SFN0505.datarepo");
var SFN0505_Filter_model_1 = require("./model/SFN0505_Filter.model");
var SFN0505Data = (function () {
    function SFN0505Data() {
        this.dataRepo = new SFN0505_datarepo_1.SFN0505DataRepo();
        this.currentFilter = new SFN0505_Filter_model_1.FilterModel();
        this.departments = [];
        this.users = [];
        this.shippingList = [];
        this.hits = 0;
    }
    return SFN0505Data;
}());
exports.SFN0505Data = SFN0505Data;
//# sourceMappingURL=SFN0505.data.js.map