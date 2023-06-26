"use strict";
var SFN0401_Filter_model_1 = require("./model/SFN0401_Filter.model");
var SFN0401_constants_1 = require("./SFN0401.constants");
var SFN0401Data = (function () {
    function SFN0401Data() {
        this.screenMode = SFN0401_constants_1.SFN0401Constants.MODE_REPEAT;
        this.currentFilter = new SFN0401_Filter_model_1.FilterModel();
        this.partnerList = [];
        this.hits = 0;
        this.canSelectPartner = true;
    }
    return SFN0401Data;
}());
exports.SFN0401Data = SFN0401Data;
//# sourceMappingURL=SFN0401.data.js.map