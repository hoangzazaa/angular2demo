"use strict";
var ProductListTableHelper = (function () {
    function ProductListTableHelper() {
    }
    ProductListTableHelper.getWoodenExpStr = function (woodenStatus, woodenExp) {
        if (woodenStatus == "I") {
            // I＝＞返却済
            return "返却済";
        }
        else if (woodenStatus == "H") {
            // H=＞廃棄済
            return "廃棄済";
        }
        else if (woodenStatus == "J") {
            // J＝＞保留中
            return "保留中";
        }
        else if (woodenStatus == "K") {
            // H=＞廃棄済
            return "デジタル";
        }
        else {
            if (woodenExp == undefined) {
                return "";
            }
            else {
                return "" + woodenExp;
            }
        }
    };
    return ProductListTableHelper;
}());
exports.ProductListTableHelper = ProductListTableHelper;
//# sourceMappingURL=ProductListTable.helper.js.map