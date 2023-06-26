"use strict";
/**
 * Created by hoangtd on 2/14/2017.
 */
var CustomerDataItem = (function () {
    function CustomerDataItem() {
    }
    CustomerDataItem.prototype.setCustomerDataItem = function (data) {
        this.month = data["month"];
        this.productType = data["productType"];
        this.totalMoney = data["totalMoney"];
        this.numberOfOrder = data["numberOfOrder"];
    };
    return CustomerDataItem;
}());
exports.CustomerDataItem = CustomerDataItem;
//# sourceMappingURL=CustomerDataItem.model.js.map