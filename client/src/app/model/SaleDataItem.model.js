"use strict";
/**
 * Created by hoangtd on 2/14/2017.
 */
var SaleDataItem = (function () {
    function SaleDataItem() {
    }
    SaleDataItem.prototype.setSaleDataItem = function (data) {
        this.month = data["month"];
        this.productType = data["productType"];
        this.totalMoney = data["totalMoney"];
    };
    return SaleDataItem;
}());
exports.SaleDataItem = SaleDataItem;
//# sourceMappingURL=SaleDataItem.model.js.map