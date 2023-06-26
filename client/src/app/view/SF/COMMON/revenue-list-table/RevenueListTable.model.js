"use strict";
var RevenueListTable_data_1 = require("./RevenueListTable.data");
var RevenueListTableModel = (function () {
    function RevenueListTableModel() {
        this.data = new RevenueListTable_data_1.RevenueListTableData();
    }
    RevenueListTableModel.prototype.getDataList = function () {
        return this.data.originDataList.slice(0, 10);
    };
    RevenueListTableModel.prototype.getFullData = function () {
        return this.data.originDataList;
    };
    RevenueListTableModel.prototype.navigateToDeal = function (record) {
    };
    RevenueListTableModel.prototype.navigateToProduct = function (record) {
    };
    RevenueListTableModel.prototype.onCheck = function (row, checked) {
        if (checked) {
            for (var _i = 0, _a = this.data.dataList; _i < _a.length; _i++) {
                var rlbRevenue = _a[_i];
                if (rlbRevenue.rlt_selected != undefined) {
                    rlbRevenue.rlt_selected = false;
                }
            }
            this.data.dataList[row].rlt_selected = true;
        }
        else {
            this.data.dataList[row].rlt_selected = false;
        }
    };
    RevenueListTableModel.PROVIDER = "RevenueListTable";
    return RevenueListTableModel;
}());
exports.RevenueListTableModel = RevenueListTableModel;
//# sourceMappingURL=RevenueListTable.model.js.map