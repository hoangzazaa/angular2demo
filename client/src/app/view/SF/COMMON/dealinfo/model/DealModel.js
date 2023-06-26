"use strict";
var mst_data_type_1 = require("../../../../../helper/mst-data-type");
var DealInfoModel = (function () {
    function DealInfoModel() {
    }
    Object.defineProperty(DealInfoModel.prototype, "confirmedOrder", {
        get: function () {
            return this.dealStatus == mst_data_type_1.DEAL_STATUS_VALUES.SHIPMENT_CONFIRMED;
        },
        enumerable: true,
        configurable: true
    });
    return DealInfoModel;
}());
exports.DealInfoModel = DealInfoModel;
//# sourceMappingURL=DealModel.js.map