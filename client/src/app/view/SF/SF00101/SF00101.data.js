"use strict";
var constants_1 = require("../../../helper/constants");
var SF001_ChartData_1 = require("./model/SF001_ChartData");
var SF001_ModelFilter_1 = require("./model/SF001_ModelFilter");
var SF00101Data = (function () {
    function SF00101Data(page) {
        this.page = page;
        //revenue
        this.product_Type0 = 0;
        this.product_Type1 = 0;
        this.product_Type2 = 0;
        //filter date
        this.periods = [1, 2, 3];
        // total records when search|load page
        this.totalRecords = constants_1.Constants.ZERO;
        // records per page to paginator
        this.pageSize = constants_1.Constants.PAGE_SIZE;
        this.receipts = new SF001_ChartData_1.ChartModel();
        this.newReceipts = new SF001_ChartData_1.ChartModel();
        this.recordNew = new SF001_ChartData_1.ChartModel();
        this.digitalSale = new SF001_ChartData_1.ChartModel();
        this.dataTable = [];
        this.departments = [];
        this.salesTab1 = [];
        this.salesTab2 = [];
        this.deals = [];
        this.inprogressDeals = [];
        this.modelFilterTab1 = new SF001_ModelFilter_1.ModelFilter();
        this.modelFilterTab1.timeFilter = 1;
        this.modelFilterTab2 = new SF001_ModelFilter_1.ModelFilter();
        this.modelFilterTab2.timeFilter = 1;
    }
    Object.defineProperty(SF00101Data.prototype, "sumTotal", {
        get: function () {
            return this.product_Type0 + this.product_Type1 + this.product_Type2;
        },
        enumerable: true,
        configurable: true
    });
    SF00101Data.prototype.loadDataTable = function () {
        var self = this;
        setTimeout(function () {
            var headers = ['日付', '案件ID', '案件名', '製品種類', '注文数', '単価', '売上(税抜）'];
            var config = {
                columns: [
                    {
                        data: 'invoiceDate',
                        type: 'text',
                        className: 'text-center'
                    },
                    {
                        data: 'dealCode',
                        type: 'text',
                        // renderer: linkRender,
                        className: 'text-left'
                    },
                    {
                        data: 'dealName',
                        type: 'text',
                        // renderer: linkRender,
                        className: 'text-left'
                    },
                    {
                        data: 'productTypeDisplay',
                        type: 'text',
                        className: 'text-center'
                    },
                    {
                        data: 'numberOfOrder',
                        type: 'numeric',
                        format: '0,000'
                    },
                    {
                        data: 'unitPrice',
                        type: 'text',
                        className: 'text-center'
                    },
                    {
                        data: 'amountOfMoney',
                        type: 'numeric',
                        format: '0,000',
                    }
                ],
                colWidths: [80, 120, 250, 80, 80, 80, 80],
                stretchH: 'all',
                autoWrapRow: true,
                rowHeaders: false,
                colHeaders: headers,
                columnSorting: true,
                readOnly: true,
                sortIndicator: true,
            };
            function linkRender(instance, td, row, col, prop, value, cellProperties) {
                if (value != undefined) {
                    var dealCode_1 = instance.getDataAtCell(row, 1); // always at second column
                    var escaped = Handsontable.helper.stringify(value);
                    var link = '<button class="btn btn-link" style="padding-left: 0px">' + escaped + '</button>';
                    td.innerHTML = link;
                    $(td).click(function (event) { return self.onClickLink(dealCode_1); });
                    return td;
                }
            }
            var container = document.getElementById('revenueOntable');
            self.handsonTable = new Handsontable(container, config);
        }, 1);
    };
    SF00101Data.prototype.onClickLink = function (dealCode) {
        this.page.viewDealDetail(dealCode);
    };
    return SF00101Data;
}());
exports.SF00101Data = SF00101Data;
//# sourceMappingURL=SF00101.data.js.map