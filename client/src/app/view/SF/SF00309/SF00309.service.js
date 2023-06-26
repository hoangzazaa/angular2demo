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
var core_1 = require("@angular/core");
var DealModel_1 = require("../COMMON/dealinfo/model/DealModel");
var ProductBox_model_1 = require("../COMMON/productinfo/model/ProductBox.model");
var ProductInfo_model_1 = require("../COMMON/productinfo/model/ProductInfo.model");
var Transaction_model_1 = require("../COMMON/productinfo/model/Transaction.model");
var Inventory_model_1 = require("../COMMON/productinfo/model/Inventory.model");
var SF00309_data_1 = require("./SF00309.data");
var SF00309_MstData_1 = require("./SF00309.MstData");
// import {RequestModel} from "./model/request.model";
var Mail_model_1 = require("../../../model/common/Mail.model");
var SF00309_helper_1 = require("./SF00309.helper");
var DepartmentModel_1 = require("../COMMON/model/DepartmentModel");
var MstLamination_model_1 = require("../COMMON/model/MstLamination.model");
var SF00309Service = (function (_super) {
    __extends(SF00309Service, _super);
    function SF00309Service(http, router) {
        _super.call(this, http, router);
    }
    /*implement method call api get/post to service*/
    /*init data view page*/
    SF00309Service.prototype.initData = function (dealCode, requestType) {
        var _this = this;
        return this.getApi("SF0030901/" + dealCode + "/" + requestType).then(function (res) {
            _this.pageData = new SF00309_data_1.SF00309Data();
            _this.pageData.dealInfo = new DealModel_1.DealInfoModel();
            _this.pageData.productBoxs = [];
            _this.pageData.mailRequest = new Mail_model_1.MailModel();
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
            }
            //4. templateMail
            var templateMail = data['mailTemplate'];
            if (templateMail) {
                _this.pageData.mailRequest.subject = templateMail["subject"] || "";
                _this.pageData.mailRequest.content = templateMail["content"] || "";
                _this.pageData.mailRequest.addressTo = (templateMail["to"] || []).map(function (item) { return item; });
                _this.pageData.mailRequest.addressCc = (templateMail["cc"] || []).map(function (item) { return item; });
            }
            //5. editing mail
            // 5. Về item [納期]
            // Refer #2235
            // Hiển thị item giống với 納期 của SF003-01.
            // this.pageData.requestModel                         = new RequestModel();
            //6. back up mail request
            _this.pageData.mailRequestBackup = SF00309_helper_1.SF00309Helper.cloneMailModel(_this.pageData.mailRequest);
            //7. get department
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
            //8. set data screen
            _this.pageData.listDepartmentScreen = SF00309_helper_1.SF00309Helper.cloneDepartmentModel(_this.pageData.departments);
            _this.pageData.listPicScreen = _this.pageData.listDepartmentScreen[0].users;
            _this.pageData.listPicSearch = [];
            // get list mst lamination
            _this.pageData.mstLaminations = [];
            if (data["laminationJsons"]) {
                for (var i = 0; i < data["laminationJsons"].length; i++) {
                    var mstLamination = new MstLamination_model_1.MstLamination();
                    mstLamination.setData(data["laminationJsons"][i]);
                    _this.pageData.mstLaminations.push(mstLamination);
                }
            }
            // 依頼タイプ
            _this.pageData.requestType = requestType;
            // 依頼するボタンのラベル
            _this.pageData.requestButtonLabel = SF00309_MstData_1.MAIL_REQUEST_BUTTON_VALUE[requestType];
        }).catch(function (err) {
            throw err;
        });
    };
    SF00309Service.prototype.saveTemporaryFile = function (file) {
        var url = '/CM0010101';
        var headers = new http_1.Headers();
        // headers.append('Content-Type', 'multipart/form-data; charset=UTF-8');
        headers.append('X-Requested-With', 'XMLHttpRequest');
        headers.append('Accept', 'application/json');
        var formData = new FormData();
        formData.append('file', file);
        return this.http.post(url, formData, { headers: headers })
            .toPromise()
            .then(function (response) {
            if (!response.ok)
                throw response;
            var text = response.text();
            if (text === '')
                throw response;
            var res = JSON.parse(text).res;
            if (!res || !res.data || !res.data.fileName)
                throw response;
            return res.data.fileName;
        })
            .catch(function (err) {
            console.error('error', err);
            return err.json().then(Promise.reject.bind(Promise));
        });
    };
    /*send mail request*/
    SF00309Service.prototype.sendMailRequest = function () {
        /*data request*/
        var mailModel = this.pageData.mailRequest;
        var req = {
            to: mailModel.addressTo,
            cc: mailModel.addressCc,
            subject: mailModel.subject,
            content: mailModel.content,
            dealId: this.pageData.dealInfo.dealId,
            products: this.parseProductModels(this.pageData.selectedProducts, this.pageData.mstLaminations),
            requestType: this.pageData.requestType,
            attachmentFiles: mailModel.attachmentFiles
        };
        this.pageData.countRecord = this.parseProductModels(this.pageData.selectedProducts, this.pageData.mstLaminations).length;
        // call api
        return this.postApi("/SF0030902", req).then(function () {
            //do something
        }, function (err) {
            throw err;
        });
    };
    SF00309Service.prototype.parseProductModels = function (products, mstLaminations) {
        return (products || []).map(function (item) {
            var p = {};
            p.id = item.id;
            p.productCode = item.productCode;
            p.productName = item.productName;
            p.material = item.material(mstLaminations);
            p.productType = item.productType;
            p.sizeD = item.sizeD;
            p.sizeH = item.sizeH;
            p.sizeW = item.sizeW;
            return p;
        });
    };
    SF00309Service = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Router])
    ], SF00309Service);
    return SF00309Service;
}(common_service_1.CommonService));
exports.SF00309Service = SF00309Service;
//# sourceMappingURL=SF00309.service.js.map