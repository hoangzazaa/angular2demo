"use strict";
var Customer_model_1 = require("./core/Customer.model");
var CustomerDataItem_model_1 = require("./CustomerDataItem.model");
/**
 * Created by hoangtd on 2/14/2017.
 */
var CustomerData = (function () {
    function CustomerData() {
        this.customer = new Customer_model_1.Customer();
        this.customerDataItems = [];
    }
    CustomerData.prototype.setCustomerData = function (data) {
        this.picId = data["picId"];
        this.year = data["year"];
        if (data["customer"] !== undefined) {
            this.customer = new Customer_model_1.Customer();
            this.customer.setCustomer(data["customer"]);
        }
        if (data["customerDataItems"] !== undefined) {
            this.customerDataItems = [];
            for (var i = 0; i < data["customerDataItems"].length; i++) {
                var tmp = new CustomerDataItem_model_1.CustomerDataItem();
                tmp.setCustomerDataItem(data["customerDataItems"][i]);
                this.customerDataItems.push(tmp);
            }
        }
    };
    return CustomerData;
}());
exports.CustomerData = CustomerData;
//# sourceMappingURL=CustomerData.model.js.map