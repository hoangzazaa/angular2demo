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
require("rxjs/add/operator/toPromise");
var common_service_1 = require("../../../service/common.service");
var SF0050305_res_1 = require("../../../response/SF0050305.res");
var SF0050305_req_1 = require("../../../request/SF0050305.req");
var SF0050301_res_1 = require("../../../response/SF0050301.res");
var SF0050302_res_1 = require("../../../response/SF0050302.res");
var SF0050303_res_1 = require("../../../response/SF0050303.res");
var SF0050303_req_1 = require("../../../request/SF0050303.req");
var SF0050302_req_1 = require("../../../request/SF0050302.req");
var SF0050301_req_1 = require("../../../request/SF0050301.req");
var SF0050304_res_1 = require("../../../response/SF0050304.res");
var SaleData_model_1 = require("../../../model/SaleData.model");
var Department_model_1 = require("../../../model/core/Department.model");
var DepartmentGoal_model_1 = require("../../../model/core/DepartmentGoal.model");
var CustomCustomerGoal_model_1 = require("../../../model/CustomCustomerGoal.model");
/**
 * SF00303 quotation call service api
 * Created by hoangtd on 26/10/2016.
 */
var SF00503Service = (function (_super) {
    __extends(SF00503Service, _super);
    function SF00503Service(http, router) {
        _super.call(this, http, router);
    }
    /** get department call api: SF0050300/GET */
    SF00503Service.prototype.getDepartment = function () {
        return this.getApi("/SF0050300").then(function (res) {
            var data = res.data;
            var sf0050301Res = new SF0050301_res_1.SF0050301Res();
            data["departments"].forEach(function (item) {
                var department = new Department_model_1.Department();
                department.setDepartment(item);
                sf0050301Res.departments.push(department);
            });
            return sf0050301Res;
        }).catch(function (err) {
            throw err;
        });
    };
    /** init tab 1 call api: SF0050301/POST : Promise<SF0050302Res> */
    SF00503Service.prototype.getInitTab1 = function (departmentId) {
        var sf0050301 = new SF0050301_req_1.SF0050301Req();
        sf0050301.departmentId = departmentId;
        return this.postApi("/SF0050301", sf0050301).then(function (res) {
            var data = res.data;
            var sf0050302Res = new SF0050302_res_1.SF0050302Res();
            data["departmentGoal"].forEach(function (item) {
                var departmentGoal = new DepartmentGoal_model_1.DepartmentGoal();
                departmentGoal.setDepartmentGoal(item);
                sf0050302Res.departmentGoals.push(departmentGoal);
            });
            data["saleData"].forEach(function (item) {
                var saleData = new SaleData_model_1.SaleData();
                saleData.setSaleData(item);
                sf0050302Res.saleData.push(saleData);
            });
            return sf0050302Res;
        }).catch(function (err) {
            throw err;
        });
    };
    /** save call api: SF0050302/POST */
    SF00503Service.prototype.saveDepartmentGoal = function (departmentGoal) {
        var sf0050302Req = new SF0050302_req_1.SF0050302Req();
        sf0050302Req.departmentGoal = departmentGoal;
        return this.postApi("/SF0050302", sf0050302Req).then(function (res) {
            var sf0050303Res = new SF0050303_res_1.SF0050303Res();
            sf0050303Res.departmentGoal.setDepartmentGoal(res.data["departmentGoal"]);
            return sf0050303Res;
        }).catch(function (err) {
            throw err;
        });
    };
    /** save customer goal call api: SF0050303/POST */
    SF00503Service.prototype.saveCustomerGoal = function (customerGoal) {
        var sf0050303Req = new SF0050303_req_1.SF0050303Req();
        sf0050303Req.customerGoal = customerGoal;
        return this.postApi("/SF0050303", sf0050303Req).then(function (res) {
            var sf0050304Res = new SF0050304_res_1.SF0050304Res();
            sf0050304Res.customerGoal.setCustomerGoal(res.data["customerGoal"]);
            return sf0050304Res;
        }).catch(function (err) {
            throw err;
        });
    };
    /** delete customer goal id call api: SF0050304/POST */
    SF00503Service.prototype.deleteCustomerGoal = function (goalId) {
        return this.postApi("/SF0050304", {
            "goalId": goalId
        }).then(function (res) {
            return res.data;
        }).catch(function (err) {
            throw err;
        });
    };
    /** init tab 2 call api: SF0050305/POST */
    SF00503Service.prototype.getInitTab2 = function (departmentId, year) {
        var sf0050305Req = new SF0050305_req_1.SF0050305Req();
        sf0050305Req.departmentId = departmentId;
        sf0050305Req.year = year;
        return this.postApi("/SF0050305", sf0050305Req).then(function (res) {
            var data = res.data;
            var sf0050305Res = new SF0050305_res_1.SF0050305Res();
            data["customerGoals"].forEach(function (item) {
                var customerGoal = new CustomCustomerGoal_model_1.CustomCustomerGoal();
                customerGoal.setCustomCustomerGoal(item);
                // !customerGoal.customerId <= 新規得意先(新規得意先の場合は具体的な数値がない)
                // customerGoal.customerDataItems <= 具体的な数値がある場合
                if (!customerGoal.customerId || customerGoal.customerDataItems) {
                    sf0050305Res.customerGoals.push(customerGoal);
                }
            });
            return sf0050305Res;
        }).catch(function (err) {
            throw err;
        });
    };
    /** get department call api: SF0050300/GET */
    SF00503Service.prototype.getTime = function () {
        return this.postApi("/SF0050306", "Get date").then(function (res) {
            var data = res.data;
            var years = [];
            data["financeYear"].forEach(function (item) {
                years.push(item);
            });
            return years;
        }).catch(function (err) {
            throw err;
        });
    };
    SF00503Service = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Router])
    ], SF00503Service);
    return SF00503Service;
}(common_service_1.CommonService));
exports.SF00503Service = SF00503Service;
//# sourceMappingURL=SF00503.service.js.map