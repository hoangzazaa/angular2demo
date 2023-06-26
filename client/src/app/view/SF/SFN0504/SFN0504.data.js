"use strict";
var SFN0504_datarepo_1 = require("./SFN0504.datarepo");
var SFN0504_Filter_model_1 = require("./model/SFN0504_Filter.model");
var SFN0504Data = (function () {
    function SFN0504Data() {
        this.dataRepo = new SFN0504_datarepo_1.SFN0504DataRepo();
        this.currentFilter = new SFN0504_Filter_model_1.FilterModel();
        this.departments = [];
        this.users = [];
        this.stockList = [];
        this.hits = 0;
    }
    return SFN0504Data;
}());
exports.SFN0504Data = SFN0504Data;
//# sourceMappingURL=SFN0504.data.js.map