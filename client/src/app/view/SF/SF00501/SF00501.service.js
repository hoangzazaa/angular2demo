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
var SF00501_Department_model_1 = require("./model/SF00501_Department.model");
var SF00501_constants_1 = require("./SF00501.constants");
var SF00501_Staff_model_1 = require("./model/SF00501_Staff.model");
var SF00501_Detail_model_1 = require("./model/SF00501_Detail.model");
var SF00501_Agent_model_1 = require("./model/SF00501_Agent.model");
var SF00501_Deal_model_1 = require("./model/SF00501_Deal.model");
var ProductInfo_model_1 = require("../COMMON/productinfo/model/ProductInfo.model");
var MstLamination_model_1 = require("../COMMON/model/MstLamination.model");
var SF00501Service = (function (_super) {
    __extends(SF00501Service, _super);
    function SF00501Service(http, router) {
        _super.call(this, http, router);
    }
    /**
     * send SF0050101 get request
     * @returns {Promise<TResult>}
     */
    SF00501Service.prototype.sf0050101 = function () {
        var _this = this;
        return this.getApi("/SF0050101").then(function (res) {
            var data = res["data"];
            var messageCode = res["messageCode"];
            // INF001 data
            if (messageCode == "INF001") {
                // 1. departments
                var departmentList = [];
                _this.pageData.departments = departmentList;
                // add default department
                departmentList.push(SF00501_constants_1.SF00501Constants.OPTION_ALL_DEPT);
                // add default option for department
                _this.pageData.dataRepo.addStaff(SF00501_constants_1.SF00501Constants.OPTION_ALL_STAFF, SF00501_constants_1.SF00501Constants.OPTION_ALL_DEPT.id);
                var departments = data["departments"];
                for (var _i = 0, departments_1 = departments; _i < departments_1.length; _i++) {
                    var department = departments_1[_i];
                    var dept = new SF00501_Department_model_1.DepartmentModel();
                    departmentList.push(dept);
                    // parse department data
                    dept.id = department["id"];
                    dept.name = department["name"];
                    // update repo: add all_staff option
                    _this.pageData.dataRepo.addStaff(SF00501_constants_1.SF00501Constants.OPTION_ALL_STAFF, dept.id);
                }
                // 2. staffs
                var staffs = data["staffs"];
                for (var _a = 0, staffs_1 = staffs; _a < staffs_1.length; _a++) {
                    var staff = staffs_1[_a];
                    var stf = new SF00501_Staff_model_1.StaffModel();
                    // parse staff data
                    stf.id = staff["id"];
                    stf.name = staff["name"];
                    stf.departmentId = staff["departmentId"];
                    // update repo: add staff to department
                    _this.pageData.dataRepo.addStaff(staff, staff.departmentId);
                }
                // 3. now
                _this.pageData.currentTime = new Date(data["now"]);
            }
        });
    };
    /**
     * send SF0050102 post request
     */
    SF00501Service.prototype.sf0050102 = function () {
        var _this = this;
        var requestData = {
            departmentId: this.pageData.selectedFilter.department.id,
            staffId: this.pageData.selectedFilter.staff.id,
            startYear: this.pageData.selectedFilter.date.startYear,
            startMonth: this.pageData.selectedFilter.date.startMonth,
            endYear: this.pageData.selectedFilter.date.endYear,
            endMonth: this.pageData.selectedFilter.date.endMonth,
            customerType: this.pageData.selectedFilter.customerType,
            // summaryType : this.pageData.selectedFilter.sumaryType
            summaryType: 1
        };
        var repo = this.pageData.dataRepo;
        return this.postApi("/SF0050102", requestData).then(function (res) {
            var data = res["data"];
            var messageCode = res["messageCode"];
            // INF001 data
            if (messageCode == "INF001") {
                _this.pageData.details = [];
                // 1. departments
                repo.clearAgents();
                _this.pageData.dataAgents = [];
                var agentDatas = data["agents"];
                if (agentDatas != undefined) {
                    for (var _i = 0, agentDatas_1 = agentDatas; _i < agentDatas_1.length; _i++) {
                        var agentData = agentDatas_1[_i];
                        var agent = new SF00501_Agent_model_1.AgentModel();
                        agent.id = agentData["id"];
                        agent.name = agentData["name"];
                        repo.setAgent(agent, agent.id);
                        _this.pageData.dataAgents.push(agent);
                    }
                }
                // 2. revenues
                var revenueDatas = data["revenues"];
                var revenueDetails = [];
                var revenueMap = {};
                for (var _a = 0, revenueDatas_1 = revenueDatas; _a < revenueDatas_1.length; _a++) {
                    var revenueData = revenueDatas_1[_a];
                    var id = revenueData["id"];
                    var tmpMap = revenueMap[id];
                    if (tmpMap == undefined) {
                        tmpMap = {};
                        revenueMap[id] = tmpMap;
                    }
                    var revenueAmountDatas = revenueData["amounts"];
                    for (var _b = 0, revenueAmountDatas_1 = revenueAmountDatas; _b < revenueAmountDatas_1.length; _b++) {
                        var revenueAmountData = revenueAmountDatas_1[_b];
                        var productType = revenueAmountData["productType"];
                        var tmpDetail = tmpMap[productType];
                        if (tmpDetail == undefined) {
                            // create new detail model
                            tmpDetail = new SF00501_Detail_model_1.DetailModel();
                            tmpMap[productType] = tmpDetail;
                            revenueDetails.push(tmpDetail);
                            tmpDetail.id = id;
                            tmpDetail.productType = productType;
                            tmpDetail.amountType = SF00501_constants_1.SF00501Constants.TYPE_AMOUNT_OLD;
                            tmpDetail.amounts = {};
                        }
                        var date = revenueAmountData["date"];
                        var value = revenueAmountData["value"];
                        tmpDetail.amounts[date] = value;
                    }
                }
                _this.pageData.details = _this.pageData.details.concat(revenueDetails);
                // 3. orders
                var orderDatas = data["orders"];
                var orderDetails = [];
                var orderMap = {};
                for (var _c = 0, orderDatas_1 = orderDatas; _c < orderDatas_1.length; _c++) {
                    var orderData = orderDatas_1[_c];
                    var id = orderData["id"];
                    var tmpMap = orderMap[id];
                    if (tmpMap == undefined) {
                        tmpMap = {};
                        orderMap[id] = tmpMap;
                    }
                    var orderAmountDatas = orderData["amounts"];
                    for (var _d = 0, orderAmountDatas_1 = orderAmountDatas; _d < orderAmountDatas_1.length; _d++) {
                        var orderAmountData = orderAmountDatas_1[_d];
                        var productType = orderAmountData["productType"];
                        var tmpDetail = tmpMap[productType];
                        if (tmpDetail == undefined) {
                            // create new detail model
                            tmpDetail = new SF00501_Detail_model_1.DetailModel();
                            tmpMap[productType] = tmpDetail;
                            orderDetails.push(tmpDetail);
                            tmpDetail.id = id;
                            tmpDetail.productType = productType;
                            tmpDetail.amountType = SF00501_constants_1.SF00501Constants.TYPE_AMOUNT_NEW;
                            tmpDetail.amounts = {};
                        }
                        var date = orderAmountData["date"];
                        var value = orderAmountData["value"];
                        tmpDetail.amounts[date] = value;
                    }
                }
                _this.pageData.details = _this.pageData.details.concat(orderDetails);
                // 4. goal
                var goalData = data["goal"];
                var goalAmountData = goalData["amounts"];
                var goalDetail = new SF00501_Detail_model_1.DetailModel();
                goalDetail.name = SF00501_constants_1.SF00501Constants.TITLE_GOAL;
                goalDetail.amountType = SF00501_constants_1.SF00501Constants.TYPE_AMOUNT_GOAL;
                goalDetail.amounts = {};
                for (var _e = 0, goalAmountData_1 = goalAmountData; _e < goalAmountData_1.length; _e++) {
                    var goalAmount = goalAmountData_1[_e];
                    var date = goalAmount["date"];
                    var value = goalAmount["value"];
                    goalDetail.amounts[date] = value;
                }
                _this.pageData.details.push(goalDetail);
            }
            else if (messageCode == "WRN001") {
                // WRN001 no data
                throw 1;
            }
            else if (messageCode == "ERR001") {
                // ERR dept not found
                throw 1;
            }
        });
    };
    SF00501Service.prototype.sf0050103 = function () {
        var _this = this;
        var requestData = {
            staffId: this.pageData.currentFilter.staff.id,
            year: this.pageData.currentFilter.date.endYear,
            month: this.pageData.currentFilter.date.endMonth,
            customerType: this.pageData.currentFilter.customerType,
            summaryType: this.pageData.currentFilter.sumaryType,
            dealType: this.pageData.selectedDealType
        };
        // read data deal filter
        return this.postApi("/SF0050103", requestData).then(function (res) {
            var data = res["data"];
            _this.pageData.deals = [];
            _this.pageData.products = [];
            //1.Get list product
            var products = data["products"];
            for (var _i = 0, products_1 = products; _i < products_1.length; _i++) {
                var product = products_1[_i];
                var pd = new ProductInfo_model_1.ProductInfoModel();
                pd.setData(product);
                _this.pageData.products.push(pd);
            }
            //2. get list deal and products by dealId
            var deals = data["deals"];
            for (var _a = 0, deals_1 = deals; _a < deals_1.length; _a++) {
                var deal = deals_1[_a];
                var dealTmp = new SF00501_Deal_model_1.DealModel();
                dealTmp.dealId = deal["dealCode"];
                dealTmp.dealName = deal["dealName"];
                dealTmp.updatedDate = deal["updatedDate"] == null ? null : new Date(deal["updatedDate"]);
                dealTmp.customerName = deal["customerName"];
                dealTmp.saleName = deal["saleName"];
                dealTmp.dealType = deal["dealType"];
                dealTmp.estTotalDeal = deal["estTotalDeal"];
                dealTmp.deliveryDate = deal["deliveryDate"] == null ? null : new Date(deal["deliveryDate"]);
                dealTmp.dealStatus = deal["dealStatus"];
                dealTmp.closedFlag = deal["closedFlag"];
                dealTmp.selectedProductId = deal["selectedProductId"];
                var productIds = deal["productIds"];
                // get list productIds
                if (productIds) {
                    for (var _b = 0, productIds_1 = productIds; _b < productIds_1.length; _b++) {
                        var productId = productIds_1[_b];
                        var id = productId;
                        dealTmp.productIds.push(parseInt(id));
                    }
                }
                // get list orderItems
                var orderItems = deal["orderItems"];
                if (orderItems) {
                    dealTmp.orderItems = [];
                    for (var _c = 0, orderItems_1 = orderItems; _c < orderItems_1.length; _c++) {
                        var orderItem = orderItems_1[_c];
                        var orderItemTmp = new SF00501_Deal_model_1.OrderItemModel();
                        orderItemTmp.productId = orderItem["productId"];
                        orderItemTmp.updatedDate = orderItem["updatedDate"] == null ? null : new Date(orderItem["updatedDate"]);
                        orderItemTmp.quantity = orderItem["quantity"];
                        orderItemTmp.submittedPrice = orderItem["submittedPrice"];
                        orderItemTmp.total = orderItem["total"];
                        dealTmp.orderItems.push(orderItemTmp);
                    }
                }
                _this.pageData.deals.push(dealTmp);
            }
            _this.pageData.mstLaminations = (data["laminations"] || []).map(function (item) {
                var lam = new MstLamination_model_1.MstLamination();
                lam.setData(item);
                return lam;
            });
        }).catch(function (err) {
            throw err;
        });
    };
    SF00501Service = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Router])
    ], SF00501Service);
    return SF00501Service;
}(common_service_1.CommonService));
exports.SF00501Service = SF00501Service;
//# sourceMappingURL=SF00501.service.js.map