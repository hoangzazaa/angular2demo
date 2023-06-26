"use strict";
var StockListTable_data_1 = require("./StockListTable.data");
var StockListTableModel = (function () {
    function StockListTableModel() {
        this.data = new StockListTable_data_1.StockListTableData();
    }
    StockListTableModel.prototype.getDataList = function () {
        return this.data.originDataList.slice(0, 10);
    };
    StockListTableModel.prototype.getFullData = function () {
        return this.data.originDataList;
    };
    StockListTableModel.prototype.navigateToDeal = function (record) {
    };
    StockListTableModel.prototype.navigateToProduct = function (record) {
    };
    StockListTableModel.prototype.onCheck = function (row, checked) {
        if (checked) {
            for (var _i = 0, _a = this.data.dataList; _i < _a.length; _i++) {
                var sltStock = _a[_i];
                if (sltStock.slt_selected != undefined) {
                    sltStock.slt_selected = false;
                }
            }
            this.data.dataList[row].slt_selected = true;
        }
        else {
            this.data.dataList[row].slt_selected = false;
        }
    };
    StockListTableModel.PROVIDER = "StockListTable";
    return StockListTableModel;
}());
exports.StockListTableModel = StockListTableModel;
//# sourceMappingURL=StockListTable.model.js.map