"use strict";
var SFN0506_datarepo_1 = require("./SFN0506.datarepo");
var SFN0506_Filter_model_1 = require("./model/SFN0506_Filter.model");
var SFN0506Data = (function () {
    function SFN0506Data() {
        this.dataRepo = new SFN0506_datarepo_1.SFN0506DataRepo();
        this.currentFilter = new SFN0506_Filter_model_1.FilterModel();
        this.departments = [];
        this.users = [];
        this.paymentList = [];
        this.hits = 0;
    }
    return SFN0506Data;
}());
exports.SFN0506Data = SFN0506Data;
//# sourceMappingURL=SFN0506.data.js.map