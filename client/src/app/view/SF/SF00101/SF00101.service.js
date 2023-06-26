"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var activity_model_1 = require("../../../component/activity/model/activity.model");
var mst_data_type_1 = require("../../../helper/mst-data-type");
var common_service_1 = require("../../../service/common.service");
var data_util_1 = require("../../../util/data-util");
var format_util_1 = require("../../../util/format-util");
var MstLamination_model_1 = require("../COMMON/model/MstLamination.model");
var ProductInfo_model_1 = require("../COMMON/productinfo/model/ProductInfo.model");
var SF001_ChartData_1 = require("./model/SF001_ChartData");
var SF001_DataTable_1 = require("./model/SF001_DataTable");
var SF001_Deal_1 = require("./model/SF001_Deal");
var SF001_Department_1 = require("./model/SF001_Department");
var SF001_User_1 = require("./model/SF001_User");
var SF00101_data_1 = require("./SF00101.data");
var SF00101_page_1 = require("./SF00101.page");
var math_util_1 = require("../../../util/math-util");
var THOUSAND_YEN = 1000;
var SF00101Service = (function (_super) {
    __extends(SF00101Service, _super);
    function SF00101Service(http, router, route) {
        _super.call(this, http, router);
        this.page = new SF00101_page_1.SF00101Page(router, null, null, null, null);
    }
    //get departments/SF0010101
    SF00101Service.prototype.initDataScreen = function () {
        var _this = this;
        return this.getApi("/SF0010101").then(function (res) {
            //parse data
            var data = res.data;
            //1.get department
            _this.pageData = new SF00101_data_1.SF00101Data(_this.page);
            var departments = data["departments"];
            _this.pageData.departments = [];
            if (!!departments) {
                departments.forEach(function (department) {
                    //get department
                    var tmp = _this.parseDepartment(department);
                    _this.pageData.departments.push(tmp);
                });
            }
            //2. inprogressDeals
            var inprogressDeals = data["inprogressDeals"];
            if (!!inprogressDeals) {
                inprogressDeals.forEach(function (deal) {
                    _this.pageData.inprogressDeals.push(SF00101Service.parseDeal(deal));
                });
            }
            //3. get systemDate
            _this.pageData.systemDate = data["systemDate"] == undefined ? undefined : new Date(data["systemDate"]);
            //4 read mst lamination
            _this.pageData.mstLaminations = [];
            if (data["laminationJsons"]) {
                for (var i = 0; i < data["laminationJsons"].length; i++) {
                    var mstLamination = new MstLamination_model_1.MstLamination();
                    mstLamination.setData(data["laminationJsons"][i]);
                    _this.pageData.mstLaminations.push(mstLamination);
                }
            }
            //5 total records
            _this.pageData.totalRecords = data["totalRecords"];
        });
    };
    //initTab1 /SF0010102
    SF00101Service.prototype.initDataTab1 = function () {
        var _this = this;
        var request = {
            departmentID: this.pageData.modelFilterTab1.departmentID,
            picId: this.pageData.modelFilterTab1.picId,
            timeFilter: this.pageData.modelFilterTab1.timeFilter,
        };
        return this.postApi("SF0010102", request).then(function (res) {
            var data = res.data;
            //1. get receipts
            var receipts = data["receipts"];
            if (receipts) {
                _this.pageData.receipts = SF00101Service.parseChartData(receipts, true);
            }
            //2. get newReceipts
            var newReceipts = data["newReceipts"];
            if (newReceipts) {
                _this.pageData.newReceipts = SF00101Service.parseChartData(newReceipts, true);
            }
            //3. get recordNew
            var recordNew = data["recordNew"];
            if (recordNew) {
                _this.pageData.recordNew = SF00101Service.parseChartData(recordNew);
            }
            //4. get digitalSale
            var digitalSale = data["digitalSale"];
            if (digitalSale) {
                _this.pageData.digitalSale = SF00101Service.parseChartData(digitalSale, true);
            }
        });
    };
    //initTab2 /SF0010103
    // 売上実績タブ押下時
    SF00101Service.prototype.initDataTab2 = function () {
        var _this = this;
        var request = {
            departmentID: this.pageData.modelFilterTab2.departmentID,
            picId: this.pageData.modelFilterTab2.picId,
            timeFilter: this.pageData.modelFilterTab2.timeFilter,
        };
        return this.postApi("SF0010103", request).then(function (res) {
            var data = res.data;
            _this.pageData.product_Type0 = 0;
            _this.pageData.product_Type1 = 0;
            _this.pageData.product_Type2 = 0;
            var count0 = 0;
            var count1 = 0;
            var count2 = 0;
            var countDefault = 0;
            //1. deals data table
            var deals = data["deals"];
            _this.pageData.dataTable = [];
            deals.forEach(function (deal) {
                // list deal
                var dataTable = _this.parseDataTable(deal);
                // product_type
                // let amount    = MathUtil.round(FormatUtil.isNaN(dataTable.amountOfMoney) / THOUSAND_YEN, 0);
                var amount = format_util_1.FormatUtil.isNaN(dataTable.amountOfMoney);
                switch (dataTable.productType) {
                    case 0:
                        _this.pageData.product_Type0 += amount;
                        count0++;
                        break;
                    case 1:
                        _this.pageData.product_Type1 += amount;
                        count1++;
                        break;
                    case 2:
                        _this.pageData.product_Type2 += amount;
                        count2++;
                        break;
                    default:
                        countDefault++;
                        break;
                }
                _this.pageData.dataTable.push(dataTable);
            });
            // check handsonTable undefiend
            if (!!_this.pageData.handsonTable) {
                _this.pageData.handsonTable.clear();
                _this.pageData.handsonTable.loadData(_this.pageData.dataTable);
                _this.pageData.handsonTable.render();
            }
            if (_this.pageData.dataTable.length == 0) {
                _this.pageData.handsonTable.updateSettings({
                    height: 40,
                });
            }
            else {
                _this.pageData.handsonTable.updateSettings({
                    height: 317,
                });
            }
        });
    };
    //saveData /SF0010104
    SF00101Service.prototype.saveDataInput = function () {
        var request = {
            departmentID: this.pageData.modelFilterTab1.departmentID,
            picId: this.pageData.modelFilterTab1.picId,
            recordNew: this.pageData.recordNew.goal,
            digitalSales: this.pageData.digitalSale.goal
        };
        return this.postApi("SF0010104", request).then(function (res) {
        });
    };
    SF00101Service.prototype.parseDepartment = function (data) {
        var department = new SF001_Department_1.DepartmentModel();
        department.id = data["id"];
        department.department = data["department"];
        department.type = data["type"];
        if (!!data["users"]) {
            department.users = [];
            for (var i = 0; i < data["users"].length; i++) {
                var tmp = this.parseUser(data["users"][i]);
                department.users.push(tmp);
            }
        }
        return department;
    };
    SF00101Service.prototype.parseUser = function (data) {
        var user = new SF001_User_1.UserModel();
        user.id = data["id"];
        user.username = data["username"];
        user.departmentId = data["departmentId"];
        return user;
    };
    SF00101Service.prototype.parseDataTable = function (data) {
        var dataTable = new SF001_DataTable_1.DataTableModel();
        dataTable.invoiceDate = format_util_1.FormatUtil.formatDateToString(data["invoiceDate"], "yyyy/MM/dd");
        dataTable.dealCode = data["dealCode"];
        dataTable.dealName = data["dealName"];
        //parse product type
        dataTable.productType = data["productType"];
        var distances = data_util_1.default.toSelectBoxDataSource(mst_data_type_1.PRODUCT_TYPE_1);
        var dataType = distances.find(function (item) {
            return item.id == dataTable.productType;
        });
        if (!!dataType) {
            dataTable.productTypeDisplay = dataType.name;
        }
        dataTable.numberOfOrder = data["numberOfOrder"];
        //parse unit price
        if (!!data["unitPrice"]) {
            dataTable.unitPrice = "@" + format_util_1.FormatUtil.formatNumber(data["unitPrice"], 2);
        }
        dataTable.amountOfMoney = data["amountOfMoney"];
        return dataTable;
    };
    SF00101Service.parseDeal = function (data) {
        var _this = this;
        var dealInfo = new SF001_Deal_1.DealModel();
        dealInfo.id = data["id"];
        dealInfo.createdDate = !!data["createdDate"] ? new Date(data["createdDate"]) : undefined;
        dealInfo.updatedDate = !!data["updatedDate"] ? new Date(data["updatedDate"]) : undefined;
        dealInfo.dealCode = data["dealCode"];
        dealInfo.saleName = data["saleName"];
        dealInfo.customerName = data["customerName"];
        dealInfo.dealName = data["dealName"];
        dealInfo.dealStatus = data["dealStatus"];
        dealInfo.dealType = data["dealType"];
        dealInfo.estTotalDeal = data["estTotalDeal"];
        dealInfo.deliveryDate = !!data["deliveryDate"] ? new Date(data["deliveryDate"]) : undefined;
        dealInfo.selectedProductId = data["selectedProductId"];
        dealInfo.isEdit = data["isEdit"];
        //parse product
        var products = data["products"];
        if (!!products) {
            dealInfo.products = [];
            products.forEach(function (product) {
                dealInfo.products.push(_this.parseProduct(product));
            });
        }
        //parse activities
        var activity = data["activity"];
        if (!!activity) {
            dealInfo.activity = this.parseActivity(activity);
        }
        return dealInfo;
    };
    SF00101Service.parseProduct = function (data) {
        var ret = new ProductInfo_model_1.ProductInfoModel();
        ret.setData(data);
        return ret;
    };
    SF00101Service.parseChartData = function (data, issue3435) {
        var chartModel = new SF001_ChartData_1.ChartModel();
        if (!!issue3435) {
            chartModel.current = math_util_1.default.round(data["current"] / 1000, 0);
            chartModel.goal = data["goal"];
        }
        else {
            chartModel.current = data["current"];
            chartModel.goal = data["goal"];
        }
        return chartModel;
    };
    SF00101Service.prototype.getDeals = function (req) {
        var _this = this;
        App.loader('show');
        return this.postApi("/SF0010105", req).then(function (res) {
            // reset data
            _this.pageData.inprogressDeals = [];
            // update total
            _this.pageData.totalRecords = res.data["totalRecords"];
            // parse deal info
            var dealsInprocess = res.data["inprogressDeals"];
            if (!!dealsInprocess) {
                dealsInprocess.forEach(function (deal) {
                    _this.pageData.inprogressDeals.push(SF00101Service.parseDeal(deal));
                });
            }
            App.loader('hide');
        }).catch(function (err) {
            App.loader('hide');
            throw err;
        });
    };
    SF00101Service.parseActivity = function (item) {
        var comment = new activity_model_1.Activity();
        comment.setComment(item);
        return comment;
    };
    SF00101Service = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Router, router_1.ActivatedRoute])
    ], SF00101Service);
    return SF00101Service;
}(common_service_1.CommonService));
exports.SF00101Service = SF00101Service;
//# sourceMappingURL=SF00101.service.js.map