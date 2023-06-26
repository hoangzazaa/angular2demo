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
var SFN0506_constants_1 = require("./SFN0506.constants");
var SFN0506_User_model_1 = require("./model/SFN0506_User.model");
var SFN0506_Department_model_1 = require("./model/SFN0506_Department.model");
var SFN0506_Payment_model_1 = require("./model/SFN0506_Payment.model");
var date_util_1 = require("../../../util/date-util");
var SFN0506_helper_1 = require("./SFN0506.helper");
var data_util_1 = require("../../../util/data-util");
var constants_1 = require("../../../helper/constants");
var SFN0506Service = (function (_super) {
    __extends(SFN0506Service, _super);
    function SFN0506Service(http, router) {
        _super.call(this, http, router);
    }
    /**
     * send SF0050201 get request
     * @returns {Promise<TResult>}
     */
    SFN0506Service.prototype.sfn050601 = function () {
        var _this = this;
        return this.getApi("/SFN050601").then(function (res) {
            var data = res["data"];
            var messageCode = res["messageCode"];
            // INF001 data
            if (messageCode == "INF001") {
                // 1. departments
                var departmentList = [];
                _this.pageData.departments = departmentList;
                // 1.1 add all company option
                departmentList.push(SFN0506_constants_1.SFN0506Constants.OPTION_ALL_COMPANY);
                _this.pageData.dataRepo.addUser(SFN0506_constants_1.SFN0506Constants.OPTION_ALL_USER, SFN0506_constants_1.SFN0506Constants.OPTION_ALL_COMPANY.id);
                // 1.2 add data from server
                var departments = data["departments"];
                for (var _i = 0, departments_1 = departments; _i < departments_1.length; _i++) {
                    var deparment = departments_1[_i];
                    var dept = new SFN0506_Department_model_1.DepartmentModel();
                    departmentList.push(dept);
                    // parse department data
                    dept.id = deparment["id"];
                    dept.name = deparment["name"];
                    // update repo: add all_staff option
                    _this.pageData.dataRepo.addUser(SFN0506_constants_1.SFN0506Constants.OPTION_ALL_USER, dept.id);
                }
                // 2. users
                var users = data["users"];
                for (var _a = 0, users_1 = users; _a < users_1.length; _a++) {
                    var user = users_1[_a];
                    var um = new SFN0506_User_model_1.UserModel();
                    // parse user data
                    um.id = user["id"];
                    um.name = user["name"];
                    um.departmentId = user["departmentId"];
                    // update repo: add user to department
                    _this.pageData.dataRepo.addUser(user, user.departmentId);
                }
                // 3. now
                var currentTime = date_util_1.DateUtil.getDate(data["now"]);
                _this.pageData.currentTime = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate());
            }
        });
    };
    /**
     * send SF0050202 post request
     */
    SFN0506Service.prototype.sfn050602 = function () {
        var _this = this;
        var currentFilter = this.pageData.currentFilter;
        var requestData = {
            departmentId: currentFilter.department.id,
            userId: currentFilter.user.id,
            startDate: currentFilter.startDate,
            endDate: currentFilter.endDate,
            dateType: currentFilter.dateType,
            method: currentFilter.method
        };
        return this.postApi("/SFN050602", requestData).then(function (res) {
            var data = res["data"];
            var messageCode = res["messageCode"];
            // INF001 data
            if (messageCode == "INF001") {
                var repo = _this.pageData.dataRepo;
                // 1. hits
                _this.pageData.hits = data["hits"];
                // 2. result list
                var paymentsData = data["payments"];
                var paymentList = [];
                _this.pageData.paymentList = paymentList;
                for (var _i = 0, paymentsData_1 = paymentsData; _i < paymentsData_1.length; _i++) {
                    var paymentData = paymentsData_1[_i];
                    var payment = new SFN0506_Payment_model_1.PaymentModel();
                    paymentList.push(payment);
                    // 請求ID
                    payment.code = data_util_1.default.getString(paymentData["code"], constants_1.Constants.BLANK);
                    // 得意先名
                    var customerData = paymentData["customer"];
                    payment.customerCode = data_util_1.default.getString(customerData["code"], constants_1.Constants.BLANK);
                    payment.customerName = data_util_1.default.getString(customerData["name"], constants_1.Constants.BLANK);
                    // 請求額
                    payment.amount = paymentData["amount"];
                    // 請求締め日
                    payment.closingDate = date_util_1.DateUtil.getDate(paymentData["closingDate"]);
                    payment.closingDateStr = date_util_1.DateUtil.formatDate(payment.closingDate, SFN0506_constants_1.SFN0506Constants.DATE_DISPLAY);
                    // 入金期日
                    payment.dueDate = date_util_1.DateUtil.getDate(paymentData["dueDate"]);
                    payment.dueDateStr = date_util_1.DateUtil.formatDate(payment.dueDate, SFN0506_constants_1.SFN0506Constants.DATE_DISPLAY);
                    // 方法
                    payment.method = data_util_1.default.getString(paymentData["method"], constants_1.Constants.BLANK);
                    // 入金確認日
                    payment.payDate = date_util_1.DateUtil.getDate(paymentData["payDate"]);
                    // 状況
                    payment.status = SFN0506_helper_1.SFN0506Helper.getPaymentStatus(payment.payDate, payment.dueDate, _this.pageData.currentTime);
                }
            }
            else if (messageCode == "ERR001") {
                throw 1;
            }
        });
    };
    SFN0506Service = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Router])
    ], SFN0506Service);
    return SFN0506Service;
}(common_service_1.CommonService));
exports.SFN0506Service = SFN0506Service;
//# sourceMappingURL=SFN0506.service.js.map