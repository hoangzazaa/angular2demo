"use strict";
var constants_1 = require("../../../helper/constants");
var SF00204Filter_model_1 = require("./model/SF00204Filter.model");
var SF00204Data = (function () {
    function SF00204Data() {
        this.CONSTANTS = {
            PAGE_SIZE: constants_1.Constants.PAGE_SIZE
        };
        this.totalRecords = constants_1.Constants.ZERO;
        this.advancedSearchFlg = false;
        this.keywords = [];
        this.ruleFilter = new SF00204Filter_model_1.SF00204FilterModel();
        this.currentPage = constants_1.Constants.ZERO;
        this.mstLaminations = [];
    }
    Object.defineProperty(SF00204Data.prototype, "hasAtLeastOneKeyword", {
        get: function () {
            return this.keywords && this.keywords.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    return SF00204Data;
}());
exports.SF00204Data = SF00204Data;
//# sourceMappingURL=SF00204.data.js.map