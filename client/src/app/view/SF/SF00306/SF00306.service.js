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
var message_1 = require("../../../helper/message");
var Mail_model_1 = require("../../../model/common/Mail.model");
var Department_model_1 = require("../../../model/core/Department.model");
var common_service_1 = require("../../../service/common.service");
var CheckSheet_model_1 = require("../COMMON/checksheet/model/CheckSheet.model");
var DealModel_1 = require("../COMMON/dealinfo/model/DealModel");
var MstLamination_model_1 = require("../COMMON/model/MstLamination.model");
var Inventory_model_1 = require("../COMMON/productinfo/model/Inventory.model");
var ProductInfo_model_1 = require("../COMMON/productinfo/model/ProductInfo.model");
var Transaction_model_1 = require("../COMMON/productinfo/model/Transaction.model");
var ProductBox_model_1 = require("./model/ProductBox.model");
var SF00306_data_1 = require("./SF00306.data");
var SF00306_helper_1 = require("./SF00306.helper");
var SF00306Service = (function (_super) {
    __extends(SF00306Service, _super);
    function SF00306Service(http, router) {
        _super.call(this, http, router);
    }
    Object.defineProperty(SF00306Service.prototype, "pageData", {
        get: function () {
            return this._pageData;
        },
        enumerable: true,
        configurable: true
    });
    //1. get init data
    SF00306Service.prototype.initData = function (dealCode) {
        var _this = this;
        this._pageData = new SF00306_data_1.SF00306Data();
        return this.getApi("SF0030601/" + dealCode).then(function (res) {
            var data = res.data;
            //1. deal info
            var dealInfo = data['deal'];
            _this._pageData.dealInfo = new DealModel_1.DealInfoModel();
            if (dealInfo) {
                _this._pageData.dealInfo.dealId = dealInfo["id"];
                _this._pageData.dealInfo.dealName = dealInfo["dealName"];
                _this._pageData.dealInfo.dealCode = dealInfo["dealCode"];
                _this._pageData.dealInfo.dealType = dealInfo["dealType"];
                _this._pageData.dealInfo.estimateTotal = dealInfo["estTotalDeal"];
                _this._pageData.dealInfo.dealStatus = dealInfo["dealStatus"];
                _this._pageData.dealInfo.deliveryDate = !!dealInfo["deliveryDate"] ? new Date(dealInfo["deliveryDate"]) : undefined;
                _this._pageData.dealInfo.templateFlag = dealInfo["templateFlag"];
                _this._pageData.dealInfo.closedFlag = dealInfo["closedFlag"];
                _this._pageData.dealInfo.customerName = dealInfo["customerName"];
                _this._pageData.dealInfo.customerCode = dealInfo["customerCode"];
                _this._pageData.dealInfo.saleName = dealInfo["salerName"];
                _this._pageData.dealInfo.jobInprocess = dealInfo["jobInprocess"];
            }
            //2. checkSheets
            var checkSheets = data['checkSheets'];
            _this._pageData.checkSheets = [];
            if (checkSheets) {
                for (var _i = 0, checkSheets_1 = checkSheets; _i < checkSheets_1.length; _i++) {
                    var checkSheet = checkSheets_1[_i];
                    var checkSheetTmp = new CheckSheet_model_1.CheckSheetModel();
                    checkSheetTmp.id = checkSheet["id"];
                    checkSheetTmp.questionCode = checkSheet["questionCode"];
                    checkSheetTmp.textArea1 = checkSheet["textArea1"];
                    checkSheetTmp.textArea2 = checkSheet["textArea2"];
                    checkSheetTmp.radioButton = checkSheet["radioButton"];
                    checkSheetTmp.selectBox1 = checkSheet["selectBox1"];
                    checkSheetTmp.selectBox2 = checkSheet["selectBox2"];
                    checkSheetTmp.selectBox3 = checkSheet["selectBox3"];
                    checkSheetTmp.dealId = checkSheet["dealId"];
                    checkSheetTmp.checkBox1 = checkSheet["checkBox1"];
                    checkSheetTmp.checkBox2 = checkSheet["checkBox2"];
                    checkSheetTmp.checkBox3 = checkSheet["checkBox3"];
                    _this._pageData.checkSheets[checkSheetTmp.questionCode] = checkSheetTmp;
                }
            }
            //3. product box
            var productBoxes = data['productBoxes'];
            _this._pageData.productBoxs = [];
            if (productBoxes) {
                for (var _a = 0, productBoxes_1 = productBoxes; _a < productBoxes_1.length; _a++) {
                    var productB = productBoxes_1[_a];
                    var productBox = new ProductBox_model_1.ProductBoxModel();
                    //1.product info
                    var pd = new ProductInfo_model_1.ProductInfoModel();
                    var product = productB['product'];
                    pd.setData(product);
                    productBox.product = pd;
                    //2.transactions
                    var transactions = productB['transactions'];
                    productBox.transactions = [];
                    for (var _b = 0, transactions_1 = transactions; _b < transactions_1.length; _b++) {
                        var transaction = transactions_1[_b];
                        var transactionTmp = new Transaction_model_1.TransactionModel();
                        transactionTmp.productId = transaction["productId"];
                        transactionTmp.updatedDate = transaction["updatedDate"] == null ? null : new Date(transaction["updatedDate"]);
                        transactionTmp.dealName = transaction["dealName"];
                        transactionTmp.quantity = transaction["quantity"];
                        transactionTmp.submittedPrice = transaction["submittedPrice"];
                        transactionTmp.total = transaction["total"];
                        productBox.transactions.push(transactionTmp);
                    }
                    //3. inventory
                    var inventory = productB['inventory'];
                    var invenModel = new Inventory_model_1.InventoryModel();
                    invenModel.productName = inventory['productName'];
                    invenModel.quantity = inventory['quantity'];
                    invenModel.unitPrice = inventory['unitPrice'];
                    invenModel.days = inventory['days'];
                    productBox.inventory = invenModel;
                    // parse data
                    _this._pageData.productBoxs.push(productBox);
                }
                if (_this._pageData.productBoxs.length == 1
                    && _this._pageData.productBoxs[0].product.requestDesignFlag != 1) {
                    _this._pageData.productBoxs[0].checked = true;
                }
            }
            //4. templateMail
            var templateMail = data['templateMail'];
            _this.pageData.mailModel = new Mail_model_1.MailModel();
            if (templateMail) {
                _this.pageData.mailModel.subject = templateMail["subject"] || "";
                _this.pageData.mailModel.content = templateMail["content"] || "";
                _this.pageData.mailModel.addressTo = (templateMail["to"] || []).map(function (item) { return item; });
                _this.pageData.mailModel.addressCc = (templateMail["cc"] || []).map(function (item) { return item; });
            }
            //5. editing mail
            _this.pageData.mailModelScreen = SF00306_helper_1.SF00306Helper.cloneMailModel(_this.pageData.mailModel);
            //6. get department
            var departments = data['departments'];
            _this.pageData.departments = [];
            _this.pageData.userDepartments = [];
            if (!!departments) {
                departments.forEach(function (item) {
                    var department = new Department_model_1.Department();
                    department.setDepartment(item);
                    _this.pageData.departments.push(department);
                });
            }
            //7. set data screen
            _this.pageData.listDepartmentScreen = SF00306_helper_1.SF00306Helper.cloneDepartmentModel(_this.pageData.departments);
            _this.pageData.listPicScreen = _this.pageData.listDepartmentScreen[0].users;
            _this.pageData.listPicSearch = [];
            // 8. get list mst lamination
            var laminations = data["laminations"];
            if (!!laminations) {
                _this._pageData.mstLaminations = [];
                for (var i = 0; i < laminations.length; i++) {
                    var mstLamination = new MstLamination_model_1.MstLamination();
                    mstLamination.setData(laminations[i]);
                    _this._pageData.mstLaminations.push(mstLamination);
                }
            }
        }).catch(function (err) {
            throw err;
        });
    };
    //2. send mail
    SF00306Service.prototype.sendMail = function () {
        var _this = this;
        this.pageData.messageMail = "";
        var req = {
            to: this.pageData.mailModelScreen.addressTo,
            cc: this.pageData.mailModelScreen.addressCc,
            subject: this.pageData.mailModelScreen.subject,
            content: this.pageData.mailModelScreen.content,
            dealId: this.pageData.dealInfo.dealId,
            dealStatus: this.pageData.dealInfo.dealStatus,
            products: this.pageData.selectedProducts,
        };
        return this.postApi('SF0030602', req).then(function (res) {
            //1. success request, 0 product
            // message: Request design fail(0/n products)
            // Send in form mail success
            // redirect -> SF00301
            _this.pageData.messageMail = message_1.default.get(message_1.MSG.SF00306.INF001);
            return res;
        }).catch(function (err) {
            _this.pageData.messageMail = message_1.default.get(message_1.MSG.SF00306.ERR010);
            throw err;
        });
    };
    SF00306Service.prototype.updateProductLot = function (product) {
        var req = { id: product.id, requestLot: product.requestLot };
        return this.postApi("/SF0030603", req).then(function (res) {
        }).catch(function (err) {
            throw err;
        });
    };
    SF00306Service.prototype.SF0030604 = function (productCode) {
        var req = {
            productCode: productCode,
            dealCode: this.pageData.dealInfo.dealCode
        };
        return this.postApi("/SF0030604", req)
            .then(function (res) {
            return { fileName: res.data.fileName, filePath: res.data.filePath };
        })
            .catch(function (err) {
            throw err;
        });
    };
    SF00306Service = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Router])
    ], SF00306Service);
    return SF00306Service;
}(common_service_1.CommonService));
exports.SF00306Service = SF00306Service;
//# sourceMappingURL=SF00306.service.js.map