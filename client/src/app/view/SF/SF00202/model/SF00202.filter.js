"use strict";
var SF00202RuleFilter = (function () {
    function SF00202RuleFilter() {
        this.dealType = 99;
        this.shapeId = 0;
        this.printMethod = 0;
        this.dealStatus = 0;
        this.periodType = 1;
    }
    SF00202RuleFilter.prototype.clone = function () {
        var ruleFilter = new SF00202RuleFilter();
        ruleFilter.dealCode = this.dealCode;
        ruleFilter.dealName = this.dealName;
        ruleFilter.salesName = this.salesName;
        ruleFilter.dealType = this.dealType;
        ruleFilter.customerCode = this.customerCode;
        ruleFilter.customerName = this.customerName;
        ruleFilter.contactName = this.contactName;
        ruleFilter.productName = this.productName;
        ruleFilter.shapeId = this.shapeId;
        ruleFilter.productCode = this.productCode;
        ruleFilter.productApplication = this.productApplication;
        ruleFilter.sizeW = this.sizeW;
        ruleFilter.sizeD = this.sizeD;
        ruleFilter.sizeH = this.sizeH;
        ruleFilter.paperName = this.paperName;
        ruleFilter.printMethod = this.printMethod;
        ruleFilter.orderValueFrom = this.orderValueFrom;
        ruleFilter.orderValueTo = this.orderValueTo;
        ruleFilter.lotFrom = this.lotFrom;
        ruleFilter.lotTo = this.lotTo;
        ruleFilter.dealStatus = this.dealStatus;
        ruleFilter.periodFrom = this.periodFrom;
        ruleFilter.periodTo = this.periodTo;
        ruleFilter.periodType = this.periodType;
        return ruleFilter;
    };
    return SF00202RuleFilter;
}());
exports.SF00202RuleFilter = SF00202RuleFilter;
//# sourceMappingURL=SF00202.filter.js.map