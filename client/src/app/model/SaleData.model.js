"use strict";
var SaleDataItem_model_1 = require("./SaleDataItem.model");
/**
 * Created by hoangtd on 2/14/2017.
 */
var SaleData = (function () {
    function SaleData() {
        this.saleDataItems = [];
    }
    SaleData.prototype.setSaleData = function (data) {
        this.year = data["year"];
        if (data["saleDataItems"] !== undefined) {
            this.saleDataItems = [];
            for (var i = 0; i < data["saleDataItems"].length; i++) {
                var tmp = new SaleDataItem_model_1.SaleDataItem();
                tmp.setSaleDataItem(data["saleDataItems"][i]);
                this.saleDataItems.push(tmp);
            }
        }
    };
    return SaleData;
}());
exports.SaleData = SaleData;
//# sourceMappingURL=SaleData.model.js.map