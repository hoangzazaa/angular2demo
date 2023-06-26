"use strict";
/**
 * Helper class for SFN0504
 * @author haipt
 */
var SFN0504Helper = (function () {
    function SFN0504Helper() {
    }
    SFN0504Helper.getStockTypeStr = function (type) {
        if (type == 1) {
            return "在庫";
        }
        else if (type == 2) {
            return "預り";
        }
        else {
            return "";
        }
    };
    return SFN0504Helper;
}());
exports.SFN0504Helper = SFN0504Helper;
//# sourceMappingURL=SFN0504.helper.js.map