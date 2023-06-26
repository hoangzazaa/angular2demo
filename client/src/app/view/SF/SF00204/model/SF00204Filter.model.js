"use strict";
var SF00204FilterModel = (function () {
    function SF00204FilterModel() {
        this.dealType = SF00204FilterModel.DEAL_TYPE_NONE;
        this.shapeId = 0;
        this.printMethod = 0;
        this.dealStatus = 0;
        this.periodType = 1;
    }
    SF00204FilterModel.prototype.clone = function () {
        var ruleFilter = new SF00204FilterModel();
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
        ruleFilter.productNo = this.productNo;
        ruleFilter.customerProductCode = this.customerProductCode;
        return ruleFilter;
    };
    /** 案件区分=指定なしの値 */
    SF00204FilterModel.DEAL_TYPE_NONE = 99;
    return SF00204FilterModel;
}());
exports.SF00204FilterModel = SF00204FilterModel;
//# sourceMappingURL=SF00204Filter.model.js.map