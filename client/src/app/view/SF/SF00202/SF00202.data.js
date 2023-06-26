"use strict";
var constants_1 = require("../../../helper/constants");
var SF00202_filter_1 = require("./model/SF00202.filter");
var SF00202Data = (function () {
    function SF00202Data() {
        this.CONSTANTS = {
            PAGE_SIZE: constants_1.Constants.PAGE_SIZE
        };
        this.deals = [];
        this.totalRecords = constants_1.Constants.ZERO;
        this.advancedSearchFlg = false;
        this.keywords = [];
        this.ruleFilter = new SF00202_filter_1.SF00202RuleFilter();
        this.currentPage = constants_1.Constants.ZERO;
    }
    Object.defineProperty(SF00202Data.prototype, "hasAtLeastOneKeyword", {
        get: function () {
            return this.keywords && this.keywords.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    return SF00202Data;
}());
exports.SF00202Data = SF00202Data;
//# sourceMappingURL=SF00202.data.js.map