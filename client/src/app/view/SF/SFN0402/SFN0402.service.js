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
var SFN0402_Partner_model_1 = require("./model/SFN0402_Partner.model");
var date_util_1 = require("../../../util/date-util");
var SFN0402_helper_1 = require("./SFN0402.helper");
var SFN0402_Product_model_1 = require("./model/SFN0402_Product.model");
var format_util_1 = require("../../../util/format-util");
var SFN0402_Summary_model_1 = require("./model/SFN0402_Summary.model");
var SFN0402_Inventory_model_1 = require("./model/SFN0402_Inventory.model");
var SFN0402_constants_1 = require("./SFN0402.constants");
var SFN0402_Revenue_model_1 = require("./model/SFN0402_Revenue.model");
var SFN0402_Mail_model_1 = require("./model/SFN0402_Mail.model");
var StockListTable_helper_1 = require("../COMMON/stock-list-table/StockListTable.helper");
var ProductListTable_helper_1 = require("../COMMON/product-list-table/ProductListTable.helper");
var ShippingDestination_model_1 = require("../../../model/core/ShippingDestination.model");
var SFN0402Service = (function (_super) {
    __extends(SFN0402Service, _super);
    function SFN0402Service(http, router) {
        _super.call(this, http, router);
    }
    SFN0402Service.prototype.sfn040201 = function () {
        var _this = this;
        var requestData = {
            type: this.pageData.partnerType,
            code: this.pageData.partnerCode
        };
        return this.postApi("/SFN040201", requestData).then(function (res) {
            var data = res["data"];
            var messageCode = res["messageCode"];
            // INF001 data
            if (messageCode == "INF001") {
                // partner data
                var partnerData = data["partner"];
                var partner = new SFN0402_Partner_model_1.PartnerModel();
                _this.pageData.partner = partner;
                // get customer data
                if (_this.pageData.partnerType == SFN0402_constants_1.SFN0402Constants.TYPE_CUSTOMER) {
                    // ID
                    partner.id = partnerData["id"];
                    // 取引先ID
                    partner.code = partnerData["code"];
                    // 取引先名
                    partner.name = partnerData["name"];
                    // 略称
                    partner.abbr = partnerData["abbr"];
                    // 郵便番号
                    partner.postalCode = partnerData["postalCode"];
                    // 住所１
                    partner.address1 = partnerData["address1"];
                    // 住所２
                    partner.address2 = partnerData["address2"];
                    // TEL
                    var tel = partnerData["tel"];
                    var ext = partnerData["ext"];
                    partner.tel = SFN0402_helper_1.SFN0402Helper.getTelStr(tel, ext);
                    // FAX
                    partner.fax = partnerData["fax"];
                    // HP経由
                    partner.hpInfo = SFN0402_helper_1.SFN0402Helper.getHPInfoStr(partnerData["hpInfo"]);
                    // 登録日
                    partner.createdDate = date_util_1.DateUtil.getDate(partnerData["createdDate"]);
                    // 取引開始年度
                    partner.startYear = partnerData["startYear"];
                    // 担当部署(#2852)
                    partner.picDept = "";
                    // 得意先担当者名
                    partner.contactName = partnerData["contactName"];
                    // 請求方法区分
                    partner.billingMethod = SFN0402_helper_1.SFN0402Helper.getBillingMethodStr(partnerData["billingMethod"]);
                    // 備考１
                    partner.note1 = partnerData["note1"];
                    // 備考２
                    partner.note2 = partnerData["note2"];
                    // 備考(営業カルテ)
                    _this.pageData.partnerMemo = partner.memo = partnerData["memo"];
                    // 備考(出荷部門用カルテ)
                    _this.pageData.remarksForShipping = partner.remarksForShipping = partnerData["remarksForShipping"];
                    // sales
                    var salesData = partnerData["sales"];
                    var username = salesData["name"];
                    var departmentName = salesData["departmentName"];
                    partner.sales = format_util_1.FormatUtil.formatSalesName(departmentName, username);
                    // mail template
                    _this.pageData.productDisposalMail = _this.getMailTemplateData(data["productDisposalMail"]);
                    _this.pageData.woodenReturnMail = _this.getMailTemplateData(data["woodenReturnMail"]);
                    _this.pageData.woodenPendingMail = _this.getMailTemplateData(data["woodenPendingMail"]);
                }
                else if (_this.pageData.partnerType == SFN0402_constants_1.SFN0402Constants.TYPE_SUPPLIER) {
                    // 取引先ID
                    partner.code = partnerData["code"];
                    // 取引先名
                    partner.name = partnerData["name"];
                    // 略称
                    partner.abbr = partnerData["abbr"];
                    // 郵便番号
                    partner.postalCode = partnerData["postalCode"];
                    // 住所１
                    partner.address1 = partnerData["address1"];
                    // 住所２
                    partner.address2 = partnerData["address2"];
                    // TEL
                    partner.tel = partnerData["tel"];
                    // FAX
                    partner.fax = partnerData["fax"];
                    // HP経由
                    partner.hpInfo = SFN0402_constants_1.SFN0402Constants.PARTNER_NULL;
                    // 登録日
                    partner.createdDate = date_util_1.DateUtil.getDate(partnerData["createdDate"]);
                    // 担当部署(#2852)
                    partner.picDept = "";
                    // 得意先担当者名
                    partner.contactName = partnerData["contactName"];
                    // 請求方法区分
                    partner.billingMethod = SFN0402_constants_1.SFN0402Constants.PARTNER_NULL;
                    // 備考１
                    partner.note1 = partnerData["note1"];
                    // 備考２
                    partner.note2 = partnerData["note2"];
                    // 営業カルテ
                    partner.memo = partnerData["memo"];
                    _this.pageData.partnerMemo = partner.memo;
                    // sales
                    partner.sales = "";
                }
                // now
                _this.pageData.currentTime = date_util_1.DateUtil.getDate(data["now"]);
            }
            else if (messageCode == "ERR001") {
                // partner not found
                throw 1;
            }
        });
    };
    SFN0402Service.prototype.sfn040202 = function () {
        var _this = this;
        var requestData = {
            code: this.pageData.partnerCode,
            year: this.pageData.spSelectedYear
        };
        return this.postApi("/SFN040202", requestData).then(function (res) {
            var data = res["data"];
            var messageCode = res["messageCode"];
            if (messageCode == "INF001") {
                // INF001 data
                var summary = new SFN0402_Summary_model_1.SummaryModel();
                _this.pageData.summary = summary;
                // paperNew
                summary.paperNew = _this.getSummaryData(data["paperNew"]);
                // cartonNew
                summary.cartonNew = _this.getSummaryData(data["cartonNew"]);
                // commercialNew
                summary.commercialNew = _this.getSummaryData(data["commercialNew"]);
                // paperOld
                summary.paperOld = _this.getSummaryData(data["paperOld"]);
                // cartonOld
                summary.cartonOld = _this.getSummaryData(data["cartonOld"]);
                // commercialOld
                summary.commercialOld = _this.getSummaryData(data["commercialOld"]);
                // goal
                summary.goal = _this.getSummaryData(data["goal"]);
            }
        });
    };
    SFN0402Service.prototype.sfn040203 = function () {
        var _this = this;
        var requestData = {
            code: this.pageData.partnerCode,
            keyword: this.pageData.rpcKeyword,
            startDate: this.pageData.rpcStartDate,
            endDate: this.pageData.rpcEndDate
        };
        return this.postApi("/SFN040203", requestData).then(function (res) {
            var data = res["data"];
            var messageCode = res["messageCode"];
            // INF001 data
            if (messageCode == "INF001") {
                // get hits
                _this.pageData.revenueHits = data["hits"];
                // get revenue data
                var revenues = [];
                _this.pageData.revenues = revenues;
                var revenuesData = data["revenues"];
                for (var _i = 0, revenuesData_1 = revenuesData; _i < revenuesData_1.length; _i++) {
                    var revenueData = revenuesData_1[_i];
                    var revenue = new SFN0402_Revenue_model_1.RevenueModel();
                    revenues.push(revenue);
                    // check
                    revenue.rlt_selected = false;
                    // 売上日
                    revenue.salesDate = date_util_1.DateUtil.getDate(revenueData["salesDate"]);
                    revenue.salesDateStr = date_util_1.DateUtil.formatDate(revenue.salesDate, SFN0402_constants_1.SFN0402Constants.DATE_DISPLAY);
                    // 品名/内容
                    var productData = revenueData["product"];
                    var product = _this.getProductData(productData);
                    revenue.product = product;
                    // 数量
                    product.quantity = revenueData["quantity"];
                    // 単価
                    product.unitPrice = revenueData["unitPrice"];
                    // 合計
                    product.total = revenueData["total"];
                }
            }
        });
    };
    SFN0402Service.prototype.sfn040204 = function () {
        var _this = this;
        var requestData = {
            code: this.pageData.partnerCode,
            stockDays: this.pageData.spcStockDays,
            stockType: this.pageData.spcStockType
        };
        return this.postApi("/SFN040204", requestData).then(function (res) {
            var data = res["data"];
            var messageCode = res["messageCode"];
            // INF001 data
            if (messageCode == "INF001") {
                // get hits
                _this.pageData.inventoryHits = data["hits"];
                // get stock data
                var inventories = [];
                _this.pageData.inventories = inventories;
                var inventoriesData = data["inventories"];
                for (var _i = 0, inventoriesData_1 = inventoriesData; _i < inventoriesData_1.length; _i++) {
                    var inventoryData = inventoriesData_1[_i];
                    var inventory = new SFN0402_Inventory_model_1.InventoryModel();
                    inventories.push(inventory);
                    // check
                    inventory.slt_selected = false;
                    // id
                    inventory.id = inventoryData["id"];
                    // 種別
                    inventory.type = inventoryData["type"];
                    inventory.typeStr = StockListTable_helper_1.StockListTableHelper.getInventoryTypeStr(inventory.type);
                    // 製造日
                    inventory.manufactureDate = date_util_1.DateUtil.getDate(inventoryData["manufactureDate"]);
                    inventory.manufactureDateStr = date_util_1.DateUtil.formatDate(inventory.manufactureDate, SFN0402_constants_1.SFN0402Constants.DATE_DISPLAY);
                    // 保管日数
                    inventory.storageDays = inventoryData["storageDays"];
                    // 品名/内容
                    var productData = inventoryData["product"];
                    var product = _this.getProductData(productData);
                    inventory.product = product;
                    // 数量
                    product.quantity = inventoryData["quantity"];
                    // 単価
                    product.unitPrice = inventoryData["unitPrice"];
                    // 合計
                    product.total = inventoryData["total"];
                }
            }
        });
    };
    SFN0402Service.prototype.sfn040205 = function () {
        var _this = this;
        var requestData = {
            code: this.pageData.partnerCode,
            keyword: this.pageData.ppcKeyword,
            startDate: this.pageData.ppcStartDate,
            endDate: this.pageData.ppcEndDate
        };
        return this.postApi("/SFN040205", requestData).then(function (res) {
            var data = res["data"];
            var messageCode = res["messageCode"];
            // INF001 data
            if (messageCode == "INF001") {
                // get hits
                _this.pageData.productHits = data["hits"];
                // get product data
                var products = [];
                _this.pageData.products = products;
                var ordersData = data["orders"];
                for (var _i = 0, ordersData_1 = ordersData; _i < ordersData_1.length; _i++) {
                    var orderData = ordersData_1[_i];
                    var productData = orderData["product"];
                    var product = _this.getProductData(productData);
                    products.push(product);
                    // check (temporary hide)
                    product.plt_selected = undefined;
                    // 数量
                    product.quantity = orderData["quantity"];
                    // 単価
                    product.unitPrice = orderData["unitPrice"];
                    // 合計
                    product.total = orderData["total"];
                }
            }
        });
    };
    SFN0402Service.prototype.sfn040206 = function () {
        var _this = this;
        var requestData = {
            type: this.pageData.partnerType,
            code: this.pageData.partnerCode,
            memo: this.pageData.partner.memo,
            remarksForShipping: this.pageData.partner.remarksForShipping
        };
        return this.postApi("/SFN040206", requestData).then(function (res) {
            var data = res["data"];
            var messageCode = res["messageCode"];
            // INF001 data
            if (messageCode == "INF001") {
                _this.pageData.partnerMemo = _this.pageData.partner.memo;
                _this.pageData.remarksForShipping = _this.pageData.partner.remarksForShipping;
            }
        });
    };
    SFN0402Service.prototype.sfn040207 = function () {
        var mail = this.pageData.mail;
        var requestData = {
            mail: {
                to: mail.addressTo,
                cc: mail.addressCc,
                subject: mail.subject,
                content: mail.content
            }
        };
        return this.postApi("/SFN040207", requestData).then(function (res) {
            var data = res["data"];
            var messageCode = res["messageCode"];
            // INF001 data
            if (messageCode == "INF001") {
            }
            else if (messageCode == "ERR001") {
                throw 1;
            }
        });
    };
    SFN0402Service.prototype.sfn040208 = function () {
        var requestData = {
            code: this.pageData.partnerCode,
            stockDays: this.pageData.spcStockDays,
            stockType: this.pageData.spcStockType
        };
        return this.postApi("/SFN040208", requestData)
            .then(function (res) {
            return { fileName: res.data.fileName, filePath: res.data.filePath };
        })
            .catch(function (err) {
            throw err;
        });
    };
    SFN0402Service.prototype.sfn040209 = function () {
        var mail = this.pageData.mail;
        var requestData = {
            mail: {
                to: mail.addressTo,
                cc: mail.addressCc,
                subject: mail.subject,
                content: mail.content
            }
        };
        return this.postApi("/SFN040209", requestData).then(function (res) {
            var data = res["data"];
            var messageCode = res["messageCode"];
            // INF001 data
            if (messageCode == "INF001") {
            }
            else if (messageCode == "ERR001") {
                throw 1;
            }
        });
    };
    SFN0402Service.prototype.sfn040210 = function () {
        var mail = this.pageData.mail;
        var requestData = {
            mail: {
                to: mail.addressTo,
                cc: mail.addressCc,
                subject: mail.subject,
                content: mail.content
            }
        };
        return this.postApi("/SFN040210", requestData).then(function (res) {
            var data = res["data"];
            var messageCode = res["messageCode"];
            // INF001 data
            if (messageCode == "INF001") {
            }
            else if (messageCode == "ERR001") {
                throw 1;
            }
        });
    };
    SFN0402Service.prototype.sfn040211 = function () {
        var requestData = {
            code: this.pageData.partnerCode,
            startDate: this.pageData.ppcStartDate,
            endDate: this.pageData.ppcEndDate
        };
        return this.postApi("/SFN040211", requestData)
            .then(function (res) {
            return { fileName: res.data.fileName, filePath: res.data.filePath };
        })
            .catch(function (err) {
            throw err;
        });
    };
    SFN0402Service.prototype.sfn040212 = function () {
        var _this = this;
        var requestData = {
            code: this.pageData.partnerCode,
            keyword: this.pageData.rpcKeyword,
            startDate: this.pageData.rpcStartDate,
            endDate: this.pageData.rpcEndDate
        };
        return this.postApi("/SFN040212", requestData).then(function (res) {
            var data = res["data"];
            var messageCode = res["messageCode"];
            // INF001 data
            if (messageCode == "INF001") {
                // get hits
                _this.pageData.revenueHits = data["hits"];
                // get revenue data
                var revenues = [];
                _this.pageData.revenues = revenues;
                var revenuesData = data["revenues"];
                for (var _i = 0, revenuesData_2 = revenuesData; _i < revenuesData_2.length; _i++) {
                    var revenueData = revenuesData_2[_i];
                    var revenue = new SFN0402_Revenue_model_1.RevenueModel();
                    revenues.push(revenue);
                    // check
                    revenue.rlt_selected = false;
                    // 売上日
                    revenue.salesDate = date_util_1.DateUtil.getDate(revenueData["salesDate"]);
                    revenue.salesDateStr = date_util_1.DateUtil.formatDate(revenue.salesDate, SFN0402_constants_1.SFN0402Constants.DATE_DISPLAY);
                    // 品名/内容
                    var productData = revenueData["product"];
                    var product = _this.getProductData(productData);
                    revenue.product = product;
                    // 数量
                    product.quantity = revenueData["quantity"];
                    // 単価
                    product.unitPrice = revenueData["unitPrice"];
                    // 合計
                    product.total = revenueData["total"];
                }
            }
        });
    };
    SFN0402Service.prototype.getProductData = function (productData) {
        var product = new SFN0402_Product_model_1.ProductModel();
        // dealCode
        product.dealCode = productData["dealCode"];
        // itemCode
        product.itemCode = productData["itemCode"];
        // product code
        product.code = productData["code"];
        product.type = productData["type"];
        product.shapeId = productData["shapeId"];
        // 品名
        product.name = productData["name"];
        // 内容
        product.description = SFN0402_helper_1.SFN0402Helper.getProductDescription(productData);
        // 木型
        var wooden = productData["wooden"];
        if (wooden == undefined) {
            wooden = "";
        }
        product.wooden = wooden;
        // 木型有効期限
        product.woodenExp = productData["woodenExp"];
        product.woodenStatus = productData["woodenStatus"];
        product.woodenExpStr = ProductListTable_helper_1.ProductListTableHelper.getWoodenExpStr(product.woodenStatus, product.woodenExp);
        product.cartonShippingType = productData["cartonShippingType"];
        return product;
    };
    SFN0402Service.prototype.getSummaryData = function (data) {
        var summaryData = new Array(12);
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var amountData = data_1[_i];
            var month = amountData["month"];
            var value = amountData["value"];
            // mapping month
            if (month < 4) {
                // 1,2,3 -> 9,10,11
                summaryData[month + 8] = value;
            }
            else {
                // 4,..,12 -> 0,..,8
                summaryData[month - 4] = value;
            }
        }
        return summaryData;
    };
    SFN0402Service.prototype.getMailTemplateData = function (mailData) {
        var mail = new SFN0402_Mail_model_1.MailModel();
        mail.addressTo = mailData["to"];
        mail.addressCc = mailData["cc"];
        mail.subject = mailData["subject"];
        mail.content = mailData["content"];
        return mail;
    };
    /**
     * 得意先の届け先一覧を取得する
     *
     * @param customerCode 得意先コード
     * @returns 届け先一覧を返す Promise
     *   届け先一覧には id と deliveryName しか記入されていません。
     */
    SFN0402Service.prototype.sfn040213GetShippingDestinationList = function (customerCode) {
        return this.getApi("/SFN040213/" + customerCode).then(function (res) {
            var data = res.data;
            var messageCode = res["messageCode"];
            // エラーチェック
            if (messageCode != "INF001") {
                throw res;
            }
            // JSON を解析
            var result = data.destinations.map(function (destination) {
                var model = new ShippingDestination_model_1.ShippingDestination();
                model.id = destination.id;
                model.deliveryName = destination.deliveryName;
                return model;
            });
            return result;
        });
    };
    /**
     * 得意先の届け先詳細を取得する
     *
     * @param customerCode 得意先コード
     * @param shippingDestinationId 届け先 ID
     * @returns 届け先を返す Promise
     */
    SFN0402Service.prototype.sfn040214GetShippingDestinationDetail = function (customerCode, shippingDestinationId) {
        return this.getApi("/SFN040214/" + customerCode + "/" + shippingDestinationId).then(function (res) {
            var data = res.data;
            var messageCode = res["messageCode"];
            // エラーチェック
            if (messageCode != "INF001") {
                throw res;
            }
            // JSON を解析
            var shippingDestination = new ShippingDestination_model_1.ShippingDestination();
            shippingDestination.setShippingDestination(data.destination);
            return shippingDestination;
        });
    };
    /**
     * 得意先の届け先詳細を保存する
     *
     * @param customerCode 得意先コード
     * @param shippingDestinationId 届け先 ID
     * @param shippingDestination 届け先
     * @returns void を返す Promise
     */
    SFN0402Service.prototype.sfn040215SaveShippingDestinationDetail = function (customerCode, shippingDestinationId, shippingDestination) {
        // 要求電文生成
        var req = {
            destination: shippingDestination.toShippingDestinationDetailJson()
        };
        // 送信
        return this.postApi("/SFN040215/" + customerCode + "/" + shippingDestinationId, req).then(function (res) {
            var data = res.data;
            var messageCode = res["messageCode"];
            // エラーチェック
            if (messageCode != "INF001") {
                throw res;
            }
        });
    };
    /**
     * 届け先カルテ pdf のファイル名と取得パスを取得する。
     *
     * @param customerCode 得意先コード
     * @param shippingDestinationId 届け先 ID
     * @returns ファイル名と取得パスを返すプロミス
     */
    SFN0402Service.prototype.sfn040217ExportShippingDestinationKartePdf = function (customerCode, shippingDestinationId) {
        return this.exportKartePdf("/SFN040217/" + customerCode + "/" + shippingDestinationId);
    };
    /**
     * カルテ pdf のファイル名と取得パスを取得する。
     *
     * @param <RESPONSE> 応答 JSON の型
     * @param url API パス
     * @returns ファイル名と取得パスを返すプロミス
     */
    SFN0402Service.prototype.exportKartePdf = function (url) {
        return this.postApi(url, {})
            .then(function (res) {
            var data = res.data;
            var messageCode = res["messageCode"];
            // エラーチェック
            if (messageCode != "INF001") {
                throw res;
            }
            return { fileName: data.fileName, filePath: data.filePath };
        });
    };
    SFN0402Service = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Router])
    ], SFN0402Service);
    return SFN0402Service;
}(common_service_1.CommonService));
exports.SFN0402Service = SFN0402Service;
//# sourceMappingURL=SFN0402.service.js.map