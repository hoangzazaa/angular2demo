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
var common_service_1 = require("../../../service/common.service");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var SF00310_data_1 = require("./SF00310.data");
var core_1 = require("@angular/core");
var DealModel_1 = require("../COMMON/dealinfo/model/DealModel");
var ProductBox_model_1 = require("../COMMON/productinfo/model/ProductBox.model");
var ProductInfo_model_1 = require("../COMMON/productinfo/model/ProductInfo.model");
var Transaction_model_1 = require("../COMMON/productinfo/model/Transaction.model");
var Inventory_model_1 = require("../COMMON/productinfo/model/Inventory.model");
var request_model_1 = require("./model/request.model");
var SF00310_helper_1 = require("./SF00310.helper");
var Mail_model_1 = require("../../../model/common/Mail.model");
var constants_1 = require("../../../helper/constants");
var SF00310_MstData_1 = require("./SF00310.MstData");
var data_util_1 = require("../../../util/data-util");
var DepartmentModel_1 = require("../COMMON/model/DepartmentModel");
var MstLamination_model_1 = require("../COMMON/model/MstLamination.model");
var SF00310Service = (function (_super) {
    __extends(SF00310Service, _super);
    function SF00310Service(http, router) {
        _super.call(this, http, router);
    }
    /*implement method call api get/post to service*/
    /*init data view page*/
    SF00310Service.prototype.initData = function (dealCode) {
        var _this = this;
        return this.getApi("SF0031001/" + dealCode).then(function (res) {
            _this.pageData = new SF00310_data_1.SF00310Data();
            _this.pageData.dealInfo = new DealModel_1.DealInfoModel();
            _this.pageData.productBoxs = [];
            _this.pageData.mailRequest = new Mail_model_1.MailModel();
            _this.pageData.requestModel = new request_model_1.RequestModel();
            var data = res.data;
            //1. deal info
            var dealInfo = data['deal'];
            if (dealInfo) {
                _this.pageData.dealInfo.dealId = dealInfo["id"];
                _this.pageData.dealInfo.dealName = dealInfo["dealName"];
                _this.pageData.dealInfo.dealCode = dealInfo["dealCode"];
                _this.pageData.dealInfo.dealType = dealInfo["dealType"];
                _this.pageData.dealInfo.estimateTotal = dealInfo["estTotalDeal"];
                _this.pageData.dealInfo.dealStatus = dealInfo["dealStatus"];
                _this.pageData.dealInfo.deliveryDate = !!dealInfo["deliveryDate"] ? new Date(dealInfo["deliveryDate"]) : undefined;
                _this.pageData.dealInfo.templateFlag = dealInfo["templateFlag"];
                _this.pageData.dealInfo.closedFlag = dealInfo["closedFlag"];
                _this.pageData.dealInfo.customerName = dealInfo["customerName"];
                _this.pageData.dealInfo.customerCode = dealInfo["customerCode"];
                _this.pageData.dealInfo.saleName = dealInfo["salerName"];
            }
            //2. product box
            var productBoxes = data['productBoxes'];
            if (productBoxes) {
                for (var _i = 0, productBoxes_1 = productBoxes; _i < productBoxes_1.length; _i++) {
                    var productB = productBoxes_1[_i];
                    var productBox = new ProductBox_model_1.ProductBoxModel();
                    //2.1product info
                    var pd = new ProductInfo_model_1.ProductInfoModel();
                    var product = productB['product'];
                    pd.setData(product);
                    productBox.product = pd;
                    //2.2 transactions
                    var transactions = productB['transactions'];
                    productBox.transactions = [];
                    for (var _a = 0, transactions_1 = transactions; _a < transactions_1.length; _a++) {
                        var transaction = transactions_1[_a];
                        var transactionTmp = new Transaction_model_1.TransactionModel();
                        transactionTmp.productId = transaction["productId"];
                        transactionTmp.updatedDate = transaction["updatedDate"] == null ? null : new Date(transaction["updatedDate"]);
                        transactionTmp.dealName = transaction["dealName"];
                        transactionTmp.quantity = transaction["quantity"];
                        transactionTmp.submittedPrice = transaction["submittedPrice"];
                        transactionTmp.total = transaction["total"];
                        productBox.transactions.push(transactionTmp);
                    }
                    //2.3 inventory
                    var inventory = productB['inventory'];
                    var invenModel = new Inventory_model_1.InventoryModel();
                    invenModel.productName = inventory['productName'];
                    invenModel.quantity = inventory['quantity'];
                    invenModel.unitPrice = inventory['unitPrice'];
                    invenModel.days = inventory['days'];
                    productBox.inventory = invenModel;
                    // parse data
                    _this.pageData.productBoxs.push(productBox);
                }
                if (_this.pageData.productBoxs.length == 1) {
                    _this.pageData.productBoxs[0].checked = true;
                }
                //3. create model request
                _this.pageData.requestModel = new request_model_1.RequestModel();
                //4. templateMail
                var templateMail = data['mailTemplate'];
                if (templateMail) {
                    _this.pageData.mailRequest.subject = templateMail["subject"] || "";
                    _this.pageData.mailRequest.content = templateMail["content"] || "";
                    _this.pageData.mailRequest.addressTo = (templateMail["to"] || []).map(function (item) { return item; });
                    _this.pageData.mailRequest.addressCc = (templateMail["cc"] || []).map(function (item) { return item; });
                }
                //5. back up mail request
                _this.pageData.mailRequestBackup = SF00310_helper_1.SF00310Helper.cloneMailModel(_this.pageData.mailRequest);
                //6. get department
                var departments = data['departments'];
                _this.pageData.departments = [];
                _this.pageData.userDepartments = [];
                if (!!departments) {
                    departments.forEach(function (item) {
                        var department = new DepartmentModel_1.DepartmentModel();
                        department.setDepartment(item);
                        _this.pageData.departments.push(department);
                    });
                }
                //7. set data screen
                _this.pageData.listDepartmentScreen = SF00310_helper_1.SF00310Helper.cloneDepartmentModel(_this.pageData.departments);
                _this.pageData.listPicScreen = _this.pageData.listDepartmentScreen[0].users;
                _this.pageData.listPicSearch = [];
                //4 read mst lamination
                _this.pageData.mstLaminations = [];
                if (data["laminationJsons"]) {
                    for (var i = 0; i < data["laminationJsons"].length; i++) {
                        var mstLamination = new MstLamination_model_1.MstLamination();
                        mstLamination.setData(data["laminationJsons"][i]);
                        _this.pageData.mstLaminations.push(mstLamination);
                    }
                }
            }
        }, function (err) {
            throw err;
        });
    };
    /*send mail request*/
    SF00310Service.prototype.sendMailRequest = function () {
        var mailModel = this.pageData.mailRequest;
        var dealInfo = this.pageData.dealInfo;
        var req = {
            mail: {
                to: mailModel.addressTo,
                cc: mailModel.addressCc,
                subject: mailModel.subject,
                content: mailModel.content,
            },
            deal: {
                id: dealInfo.dealId,
                dealName: dealInfo.dealName,
                dealCode: dealInfo.dealCode,
                dealType: dealInfo.dealType,
                estTotalDeal: dealInfo.estimateTotal,
                dealStatus: dealInfo.dealStatus,
                deliveryDate: dealInfo.deliveryDate,
                templateFlag: dealInfo.templateFlag,
                customerName: dealInfo.customerName,
                customerCode: dealInfo.customerCode,
                salerName: dealInfo.saleName,
            },
            products: this.parseProductModels(this.pageData.selectedProducts, this.pageData.mstLaminations),
            requestModel: this.parseRequestModel(this.pageData.requestModel)
        };
        this.pageData.countRecord = this.parseProductModels(this.pageData.selectedProducts, this.pageData.mstLaminations).length;
        // call api
        return this.postApi("/SF0031002", req).then(function () {
            //do something
        }, function (err) {
            throw err;
        });
    };
    SF00310Service.prototype.parseRequestModel = function (model) {
        return {
            rank: data_util_1.default.getData(SF00310_MstData_1.RANK, constants_1.Constants.BLANK, model.rank),
            target: model.target,
            rse: model.rse,
            department: model.department,
            designConcept: model.designConcept,
            methodStereoscopicDummy: model.methodStereoscopicDummy,
            flatOutput: model.flatOutput,
            desiredDeliveryDate: model.desiredDeliveryDate,
            submissionDeadline: model.submissionDeadline,
            memo: model.memo,
        };
    };
    SF00310Service.prototype.parseProductModels = function (products, mstLaminations) {
        return (products || []).map(function (item) {
            return {
                id: item.id,
                productCode: item.productCode,
                productName: item.productName,
                material: item.material(mstLaminations),
                productType: item.productType,
                sizeD: item.sizeD,
                sizeH: item.sizeH,
                sizeW: item.sizeW
            };
        });
    };
    SF00310Service = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Router])
    ], SF00310Service);
    return SF00310Service;
}(common_service_1.CommonService));
exports.SF00310Service = SF00310Service;
//# sourceMappingURL=SF00310.service.js.map