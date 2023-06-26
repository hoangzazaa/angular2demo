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
var common_service_1 = require("../../../service/common.service");
var MstLamination_model_1 = require("../COMMON/model/MstLamination.model");
var SF00205_Deal_model_1 = require("./model/SF00205_Deal.model");
var SF00205_Department_model_1 = require("./model/SF00205_Department.model");
var SF00205_Product_model_1 = require("./model/SF00205_Product.model");
var SF00205_User_model_1 = require("./model/SF00205_User.model");
var SF00205_data_1 = require("./SF00205.data");
var SF00205Service = (function (_super) {
    __extends(SF00205Service, _super);
    function SF00205Service(http, router) {
        _super.call(this, http, router);
    }
    SF00205Service.prototype.init = function () {
        var _this = this;
        App.loader('show');
        return this.getApi("/SF0020501").then(function (res) {
            _this.pageData = new SF00205_data_1.SF00205Data();
            var data = res.data;
            //1.get department
            var departments = data["departments"];
            if (!!departments) {
                var dept = new SF00205_Department_model_1.SF00205Department();
                dept.id = 0;
                dept.department = "全社";
                _this.pageData.departments.push(dept);
                departments.forEach(function (department) {
                    var tmp = _this.parseDepartment(department);
                    _this.pageData.departments.push(tmp);
                });
            }
            //2. parse deal info
            var result = data["searchResult"];
            _this.pageData.totalRecords = result["totalRecords"];
            var deals = result["deals"];
            if (!!deals) {
                deals.forEach(function (deal) {
                    _this.pageData.deals.push(_this.parseDeal(deal));
                });
            }
            App.loader('hide');
        }).catch(function (err) {
            App.loader('hide');
            throw err;
        });
    };
    SF00205Service.prototype.getDeals = function (request) {
        var _this = this;
        this.pageData.requestModel = request;
        App.loader('show');
        return this.postApi("/SF0020502", request).then(function (res) {
            _this.pageData.totalRecords = res.data["totalRecords"];
            _this.pageData.deals = [];
            var deals = res.data["deals"];
            if (!!deals) {
                deals.forEach(function (deal) {
                    _this.pageData.deals.push(_this.parseDeal(deal));
                });
            }
            App.loader('hide');
        }).catch(function (err) {
            App.loader('hide');
            throw err;
        });
    };
    SF00205Service.prototype.bookmarkDeal = function (deal) {
        var req = { dealId: deal.id };
        return this.postApi("/SF0020503", req).then(function (res) {
            deal.isInMybox = res.data.myboxId > 0;
        });
    };
    SF00205Service.prototype.parseDepartment = function (data) {
        var department = new SF00205_Department_model_1.SF00205Department();
        department.id = data["id"];
        department.department = data["department"];
        department.type = data["type"];
        if (!!data["users"]) {
            // add user deault <option value="0">指定なし</option>
            var userTmp = new SF00205_User_model_1.SF00205User();
            userTmp.id = 0;
            userTmp.username = "指定なし";
            department.users.push(userTmp);
            for (var i = 0; i < data["users"].length; i++) {
                var tmp = this.parseUser(data["users"][i]);
                department.users.push(tmp);
            }
        }
        return department;
    };
    SF00205Service.prototype.parseUser = function (data) {
        var user = new SF00205_User_model_1.SF00205User();
        user.id = data["id"];
        user.username = data["username"];
        user.departmentId = data["departmentId"];
        return user;
    };
    SF00205Service.prototype.parseDeal = function (data) {
        var _this = this;
        var deal = new SF00205_Deal_model_1.SF00205Deal();
        deal.setData(data);
        deal.dealCode = data["dealCode"];
        deal.saleName = data["saleName"];
        deal.customerName = data["customerName"];
        deal.dealName = data["dealName"];
        deal.dealStatus = data["dealStatus"];
        deal.dealType = data["dealType"];
        deal.estTotalDeal = data["estTotalDeal"];
        deal.deliveryDate = !!data["deliveryDate"] ? new Date(data["deliveryDate"]) : undefined;
        deal.isInMybox = data["isInMybox"];
        deal.selectedProductId = data["selectedProductId"];
        /*permission to view for editing*/
        deal.isEdit = data["isEdit"];
        //parse product
        var products = data["products"];
        if (!!products) {
            products.forEach(function (product) {
                deal.products.push(_this.parseProduct(product));
            });
        }
        // mst lamination
        var laminations = data["laminations"];
        this.getMstLamination(deal, laminations);
        //parse activities
        var activity = data["activity"];
        if (!!activity) {
            deal.activity = this.parseActivity(activity);
        }
        return deal;
    };
    SF00205Service.prototype.parseProduct = function (data) {
        var product = new SF00205_Product_model_1.SF00205Product();
        product.setData(data);
        product.srcImg = data["srcImg"];
        return product;
    };
    SF00205Service.prototype.parseMstLamination = function (data) {
        var mstLamination = new MstLamination_model_1.MstLamination();
        mstLamination.setData(data);
        return mstLamination;
    };
    SF00205Service.prototype.getMstLamination = function (deal, laminations) {
        if (!!laminations && Array.isArray(laminations)) {
            deal.laminations = [];
            for (var i = 0; i < laminations.length; i++) {
                var lamination = this.parseMstLamination(laminations[i]);
                deal.laminations.push(lamination);
            }
        }
    };
    SF00205Service.prototype.parseActivity = function (item) {
        var comment = new activity_model_1.Activity();
        comment.setComment(item);
        return comment;
    };
    SF00205Service = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Router])
    ], SF00205Service);
    return SF00205Service;
}(common_service_1.CommonService));
exports.SF00205Service = SF00205Service;
//# sourceMappingURL=SF00205.service.js.map