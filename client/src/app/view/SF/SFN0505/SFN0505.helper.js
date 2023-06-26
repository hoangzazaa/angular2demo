"use strict";
var mst_data_type_1 = require("../../../helper/mst-data-type");
var SFN0505_constants_1 = require("./SFN0505.constants");
/**
 * Helper class for SFN0505
 * @author haipt
 */
var SFN0505Helper = (function () {
    function SFN0505Helper() {
    }
    SFN0505Helper.getRestrictionText = function (restriction) {
        var name = mst_data_type_1.QUANTITY_RESTRICTION[restriction];
        if (name == undefined) {
            name = "";
        }
        return name;
    };
    SFN0505Helper.getShippingStatus = function (plan, actual) {
        if (actual == undefined || actual == 0) {
            // 出荷待ち
            return 1;
        }
        else if (actual == plan) {
            // 出荷済
            return 2;
        }
        else if (actual > plan) {
            // 出荷済（超過）
            return 3;
        }
        else {
            // 出荷済（不足）
            return 4;
        }
    };
    SFN0505Helper.getShippingStatusText = function (status) {
        switch (status) {
            case 1:
                return SFN0505_constants_1.SFN0505Constants.STATUS_1;
            case 2:
                return SFN0505_constants_1.SFN0505Constants.STATUS_2;
            case 3:
                return SFN0505_constants_1.SFN0505Constants.STATUS_3;
            case 4:
                return SFN0505_constants_1.SFN0505Constants.STATUS_4;
            default:
                return "";
        }
    };
    SFN0505Helper.getShippingHighlight = function (shipping) {
        // issues/2838 Date: 04/08/2017
        // id = [2,3,4,7,8]
        var arrId = [2, 3, 4, 7, 8];
        var index = arrId.findIndex(function (item) { return shipping.restriction == item; });
        if (index > -1 && shipping.actualAmount > 0 && shipping.actualAmount != shipping.planAmount) {
            // 数量制限は「✕／✕」で「出荷予定数と出荷実績数が異なる」行については、行を赤くしてください。
            return 1;
        }
        return 0;
    };
    return SFN0505Helper;
}());
exports.SFN0505Helper = SFN0505Helper;
//# sourceMappingURL=SFN0505.helper.js.map