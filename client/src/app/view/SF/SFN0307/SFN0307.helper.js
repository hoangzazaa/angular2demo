"use strict";
var ShippingPlan_model_1 = require("./model/ShippingPlan.model");
/**
 * Helper class for SFN0307
 * @author haipt
 */
var SFN0307Helper = (function () {
    function SFN0307Helper() {
    }
    SFN0307Helper.createNewShipping = function (order, pageData) {
        var shippingPlan = new ShippingPlan_model_1.ShippingPlanModel();
        // default values
        // 出荷予定数
        var quantity = order.quantity;
        if (quantity != undefined) {
            if (order.shippings != undefined) {
                for (var _i = 0, _a = order.shippings; _i < _a.length; _i++) {
                    var shipping = _a[_i];
                    if (shipping.quantity != undefined) {
                        quantity -= shipping.quantity;
                    }
                }
            }
            if (quantity < 0) {
                quantity = 0;
            }
            shippingPlan.quantity = quantity;
        }
        // 出荷便 = 自社便 -> http://fridaynight.vnext.vn/issues/3429
        shippingPlan.shippingCompany = 1;
        // 納入場所 = last
        var destinationList = pageData.destinations;
        if (destinationList.length > 0) {
            shippingPlan.destinationId = destinationList[destinationList.length - 1].id;
        }
        return shippingPlan;
    };
    SFN0307Helper.isRevProduct = function (product) {
        var code = product.itemCode;
        if (code != undefined) {
            if (code.indexOf("-") > 0) {
                return true;
            }
        }
        return false;
    };
    return SFN0307Helper;
}());
exports.SFN0307Helper = SFN0307Helper;
//# sourceMappingURL=SFN0307.helper.js.map