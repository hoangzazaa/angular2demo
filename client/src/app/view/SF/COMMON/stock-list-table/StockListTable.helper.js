"use strict";
var StockListTableHelper = (function () {
    function StockListTableHelper() {
    }
    StockListTableHelper.getInventoryTypeStr = function (type) {
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
    return StockListTableHelper;
}());
exports.StockListTableHelper = StockListTableHelper;
//# sourceMappingURL=StockListTable.helper.js.map