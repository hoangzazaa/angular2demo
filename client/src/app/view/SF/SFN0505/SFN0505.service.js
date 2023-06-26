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
var SFN0505_constants_1 = require("./SFN0505.constants");
var SFN0505_User_model_1 = require("./model/SFN0505_User.model");
var SFN0505_Department_model_1 = require("./model/SFN0505_Department.model");
var SFN0505_Shipping_model_1 = require("./model/SFN0505_Shipping.model");
var date_util_1 = require("../../../util/date-util");
var SFN0505_helper_1 = require("./SFN0505.helper");
var SFN0505Service = (function (_super) {
    __extends(SFN0505Service, _super);
    function SFN0505Service(http, router) {
        _super.call(this, http, router);
    }
    /**
     * send SF0050201 get request
     * @returns {Promise<TResult>}
     */
    SFN0505Service.prototype.sfn050501 = function () {
        var _this = this;
        return this.getApi("/SFN050501").then(function (res) {
            var data = res["data"];
            var messageCode = res["messageCode"];
            // INF001 data
            if (messageCode == "INF001") {
                // 1. departments
                var departmentList = [];
                _this.pageData.departments = departmentList;
                // 1.1 add all company option
                departmentList.push(SFN0505_constants_1.SFN0505Constants.OPTION_ALL_COMPANY);
                _this.pageData.dataRepo.addUser(SFN0505_constants_1.SFN0505Constants.OPTION_ALL_USER, SFN0505_constants_1.SFN0505Constants.OPTION_ALL_COMPANY.id);
                // 1.2 add data from server
                var departments = data["departments"];
                for (var _i = 0, departments_1 = departments; _i < departments_1.length; _i++) {
                    var deparment = departments_1[_i];
                    var dept = new SFN0505_Department_model_1.DepartmentModel();
                    departmentList.push(dept);
                    // parse department data
                    dept.id = deparment["id"];
                    dept.name = deparment["name"];
                    // update repo: add all_staff option
                    _this.pageData.dataRepo.addUser(SFN0505_constants_1.SFN0505Constants.OPTION_ALL_USER, dept.id);
                }
                // 2. users
                var users = data["users"];
                for (var _a = 0, users_1 = users; _a < users_1.length; _a++) {
                    var user = users_1[_a];
                    var um = new SFN0505_User_model_1.UserModel();
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
    SFN0505Service.prototype.sfn050502 = function () {
        var _this = this;
        var currentFilter = this.pageData.currentFilter;
        var requestData = {
            departmentId: currentFilter.department.id,
            userId: currentFilter.user.id,
            startDate: currentFilter.startDate,
            endDate: currentFilter.endDate
        };
        return this.postApi("/SFN050502", requestData).then(function (res) {
            var data = res["data"];
            var messageCode = res["messageCode"];
            // INF001 data
            if (messageCode == "INF001") {
                var repo = _this.pageData.dataRepo;
                // 1. hits
                _this.pageData.hits = data["hits"];
                // 2. result list
                var shippingsData = data["shippings"];
                var shippingList = [];
                _this.pageData.shippingList = shippingList;
                for (var _i = 0, shippingsData_1 = shippingsData; _i < shippingsData_1.length; _i++) {
                    var shippingData = shippingsData_1[_i];
                    var shipping = new SFN0505_Shipping_model_1.ShippingModel();
                    shippingList.push(shipping);
                    // 出荷予定日
                    shipping.planDate = date_util_1.DateUtil.getDate(shippingData["shippingDate"]);
                    if (shipping.planDate != undefined) {
                        shipping.planDateStr = moment(shipping.planDate).format(SFN0505_constants_1.SFN0505Constants.DATE_DISPLAY);
                    }
                    // 案件ID
                    var dealData = shippingData["deal"];
                    shipping.dealCode = dealData["code"];
                    // 得意先名
                    var customerData = dealData["customer"];
                    shipping.customerCode = customerData["code"];
                    shipping.customerName = customerData["name"];
                    // 品名
                    var productData = shippingData["product"];
                    shipping.productCode = productData["code"];
                    shipping.productName = productData["name"];
                    shipping.productType = productData["type"];
                    shipping.productShapeId = productData["shapeId"];
                    shipping.cartonShippingType = productData["cartonShippingType"];
                    // 出荷予定数
                    shipping.planAmount = shippingData["planQuantity"];
                    // 出荷実績数
                    shipping.actualAmount = shippingData["actualQuantity"];
                    // 制限
                    shipping.restriction = dealData["restriction"];
                    shipping.restrictionStr = SFN0505_helper_1.SFN0505Helper.getRestrictionText(shipping.restriction);
                    // 状況
                    shipping.status = SFN0505_helper_1.SFN0505Helper.getShippingStatus(shipping.planAmount, shipping.actualAmount);
                    shipping.statusStr = SFN0505_helper_1.SFN0505Helper.getShippingStatusText(shipping.status);
                    // highlight
                    shipping.highlight = SFN0505_helper_1.SFN0505Helper.getShippingHighlight(shipping);
                }
            }
            else if (messageCode == "ERR001") {
                throw 1;
            }
        });
    };
    SFN0505Service = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Router])
    ], SFN0505Service);
    return SFN0505Service;
}(common_service_1.CommonService));
exports.SFN0505Service = SFN0505Service;
//# sourceMappingURL=SFN0505.service.js.map