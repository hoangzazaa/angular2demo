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
var common_service_1 = require("../../../service/common.service");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var SFN0504_constants_1 = require("./SFN0504.constants");
var SFN0504_User_model_1 = require("./model/SFN0504_User.model");
var SFN0504_Department_model_1 = require("./model/SFN0504_Department.model");
var SFN0504_Stock_model_1 = require("./model/SFN0504_Stock.model");
var SFN0504_helper_1 = require("./SFN0504.helper");
var date_util_1 = require("../../../util/date-util");
var SFN0504Service = (function (_super) {
    __extends(SFN0504Service, _super);
    function SFN0504Service(http, router) {
        _super.call(this, http, router);
    }
    /**
     * send SF0050201 get request
     * @returns {Promise<TResult>}
     */
    SFN0504Service.prototype.sfn050401 = function () {
        var _this = this;
        return this.getApi("/SFN050401").then(function (res) {
            var data = res["data"];
            var messageCode = res["messageCode"];
            // INF001 data
            if (messageCode == "INF001") {
                // 1. departments
                var departmentList = [];
                _this.pageData.departments = departmentList;
                // 1.1 add all company option
                departmentList.push(SFN0504_constants_1.SFN0504Constants.OPTION_ALL_COMPANY);
                _this.pageData.dataRepo.addUser(SFN0504_constants_1.SFN0504Constants.OPTION_ALL_USER, SFN0504_constants_1.SFN0504Constants.OPTION_ALL_COMPANY.id);
                // 1.2 add data from server
                var departments = data["departments"];
                for (var _i = 0, departments_1 = departments; _i < departments_1.length; _i++) {
                    var deparment = departments_1[_i];
                    var dept = new SFN0504_Department_model_1.DepartmentModel();
                    departmentList.push(dept);
                    // parse department data
                    dept.id = deparment["id"];
                    dept.name = deparment["name"];
                    // update repo: add all_staff option
                    _this.pageData.dataRepo.addUser(SFN0504_constants_1.SFN0504Constants.OPTION_ALL_USER, dept.id);
                }
                // 2. users
                var users = data["users"];
                for (var _a = 0, users_1 = users; _a < users_1.length; _a++) {
                    var user = users_1[_a];
                    var um = new SFN0504_User_model_1.UserModel();
                    // parse user data
                    um.id = user["id"];
                    um.name = user["name"];
                    um.departmentId = user["departmentId"];
                    // update repo: add user to department
                    _this.pageData.dataRepo.addUser(user, user.departmentId);
                }
            }
        });
    };
    /**
     * send SF0050202 post request
     */
    SFN0504Service.prototype.sfn050402 = function () {
        var _this = this;
        var currentFilter = this.pageData.currentFilter;
        var requestData = {
            departmentId: currentFilter.department.id,
            userId: currentFilter.user.id,
            stockDays: currentFilter.stockDays,
            stockType: currentFilter.stockType
        };
        return this.postApi("/SFN050402", requestData).then(function (res) {
            var data = res["data"];
            var messageCode = res["messageCode"];
            // INF001 data
            if (messageCode == "INF001") {
                var repo = _this.pageData.dataRepo;
                // 1. hits
                _this.pageData.hits = data["hits"];
                // 2. result list
                var stocksData = data["stocks"];
                var stockList = [];
                _this.pageData.stockList = stockList;
                for (var _i = 0, stocksData_1 = stocksData; _i < stocksData_1.length; _i++) {
                    var stockData = stocksData_1[_i];
                    var stock = new SFN0504_Stock_model_1.StockModel();
                    stockList.push(stock);
                    // id
                    stock.id = stockData["id"];
                    // 選択
                    stock.selected = false;
                    // 種別
                    stock.type = stockData["type"];
                    stock.typeStr = SFN0504_helper_1.SFN0504Helper.getStockTypeStr(stock.type);
                    // 得意先名
                    stock.customerCode = stockData["customerCode"];
                    stock.customerName = stockData["customerName"];
                    // 案件ID
                    stock.dealCode = stockData["dealCode"];
                    // 品名
                    stock.productName = stockData["productName"];
                    stock.productCode = stockData["productCode"];
                    stock.productType = stockData["productType"];
                    stock.productShapeId = stockData["productShapeId"];
                    // 数量
                    stock.quantity = stockData["quantity"];
                    // 単価
                    stock.unitPrice = stockData["unitPrice"];
                    // 合計
                    stock.total = stockData["total"];
                    // 製造日
                    stock.manufactureDate = date_util_1.DateUtil.getDate(stockData["manufactureDate"]);
                    stock.manufactureDateStr = date_util_1.DateUtil.formatDate(stock.manufactureDate, SFN0504_constants_1.SFN0504Constants.DATE_DISPLAY);
                    // 保管日数
                    stock.storageDays = stockData["storageDays"];
                }
            }
            else if (messageCode == "ERR001") {
                throw 1;
            }
        });
    };
    SFN0504Service = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Router])
    ], SFN0504Service);
    return SFN0504Service;
}(common_service_1.CommonService));
exports.SFN0504Service = SFN0504Service;
//# sourceMappingURL=SFN0504.service.js.map