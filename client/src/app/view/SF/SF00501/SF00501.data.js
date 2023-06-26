"use strict";
var SF00501_datarepo_1 = require("./SF00501.datarepo");
var SF00501_Filter_model_1 = require("./model/SF00501_Filter.model");
var SF00501Data = (function () {
    function SF00501Data() {
        // redraw dataTable/chart
        this.displayTable = false;
        this.displayGraph = false;
        this.dataRepo = new SF00501_datarepo_1.SF00501DataRepo();
        this.currentFilter = new SF00501_Filter_model_1.FilterModel();
        this.selectedFilter = new SF00501_Filter_model_1.FilterModel();
        this.showDealList = false;
        this.mstLaminations = [];
        // Trello 846 集計方法を「出荷済」のみにするため、summaryTypeは固定値の1を代入
        this.currentFilter.sumaryType = 1;
        this.selectedFilter.sumaryType = 1;
    }
    return SF00501Data;
}());
exports.SF00501Data = SF00501Data;
//# sourceMappingURL=SF00501.data.js.map