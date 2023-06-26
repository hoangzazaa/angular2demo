"use strict";
var ProductListTable_data_1 = require("./ProductListTable.data");
var ProductListTableModel = (function () {
    function ProductListTableModel() {
        this.data = new ProductListTable_data_1.ProductListTableData();
    }
    ProductListTableModel.prototype.getDataList = function () {
        return this.data.originDataList.slice(0, 10);
    };
    ProductListTableModel.prototype.getFullData = function () {
        return this.data.originDataList;
    };
    ProductListTableModel.prototype.navigateToProduct = function (record) {
    };
    ProductListTableModel.prototype.onCheck = function (row, checked) {
        if (checked) {
            for (var _i = 0, _a = this.data.dataList; _i < _a.length; _i++) {
                var pltProduct = _a[_i];
                if (pltProduct.plt_selected != undefined) {
                    pltProduct.plt_selected = false;
                }
            }
            this.data.dataList[row].plt_selected = true;
        }
        else {
            this.data.dataList[row].plt_selected = false;
        }
    };
    ProductListTableModel.PROVIDER = "ProductListTable";
    return ProductListTableModel;
}());
exports.ProductListTableModel = ProductListTableModel;
//# sourceMappingURL=ProductListTable.model.js.map