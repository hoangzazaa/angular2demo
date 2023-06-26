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
var SFN0401_Partner_model_1 = require("./model/SFN0401_Partner.model");
var SFN0401_constants_1 = require("./SFN0401.constants");
var date_util_1 = require("../../../util/date-util");
var SFN0401_helper_1 = require("./SFN0401.helper");
var SFN0401_Revenue_model_1 = require("./model/SFN0401_Revenue.model");
var SFN0401_Inventory_model_1 = require("./model/SFN0401_Inventory.model");
var SFN0401_Product_model_1 = require("./model/SFN0401_Product.model");
var format_util_1 = require("../../../util/format-util");
var StockListTable_helper_1 = require("../COMMON/stock-list-table/StockListTable.helper");
var ProductListTable_helper_1 = require("../COMMON/product-list-table/ProductListTable.helper");
var SFN0401Service = (function (_super) {
    __extends(SFN0401Service, _super);
    function SFN0401Service(http, router) {
        _super.call(this, http, router);
    }
    /**
     * send SF0050201 get request
     * @returns {Promise<TResult>}
     */
    SFN0401Service.prototype.sfn040101 = function () {
        var _this = this;
        var currentFilter = this.pageData.currentFilter;
        var requestData = {
            keywords: currentFilter.keywords,
            code: currentFilter.code,
            name: currentFilter.name,
            contactName: currentFilter.contactName,
            salesName: currentFilter.salesName,
            page: currentFilter.page
        };
        return this.postApi("/SFN040101", requestData).then(function (res) {
            var data = res["data"];
            var messageCode = res["messageCode"];
            // INF001 data
            if (messageCode == "INF001") {
                // no result
                _this.pageData.hits = 0;
                _this.pageData.partnerList = [];
            }
            else if (messageCode == "INF002") {
                // result found
                _this.pageData.hits = data["hits"];
                var customersData = data["customers"];
                var customerList = [];
                _this.pageData.partnerList = customerList;
                for (var _i = 0, customersData_1 = customersData; _i < customersData_1.length; _i++) {
                    var customerData = customersData_1[_i];
                    var customer = new SFN0401_Partner_model_1.PartnerModel();
                    customerList.push(customer);
                    // filter type
                    customer.type = SFN0401_constants_1.SFN0401Constants.PTYPE_CUSTOMER;
                    // 取引先ID
                    customer.code = customerData["code"];
                    // 取引先名
                    customer.name = customerData["name"];
                    // 更新日
                    customer.updateDate = date_util_1.DateUtil.getDate(customerData["updateDate"]);
                    // 略称
                    customer.abbr = customerData["abbr"];
                    // 郵便番号
                    customer.postalCode = customerData["postalCode"];
                    // 住所１
                    customer.address1 = customerData["address1"];
                    // 住所２
                    customer.address2 = customerData["address2"];
                    // TEL
                    var tel = customerData["tel"];
                    var ext = customerData["ext"];
                    customer.tel = SFN0401_helper_1.SFN0401Helper.getTelStr(tel, ext);
                    // FAX
                    customer.fax = customerData["fax"];
                    // HP経由
                    customer.hpInfo = SFN0401_helper_1.SFN0401Helper.getHPInfoStr(customerData["hpInfo"]);
                    // 登録日
                    customer.createdDate = date_util_1.DateUtil.getDate(customerData["createdDate"]);
                    // 取引開始年度
                    customer.startYear = customerData["startYear"];
                    // 担当部署(#2852)
                    customer.picDept = "";
                    // 得意先担当者名
                    customer.contactName = customerData["contactName"];
                    // 請求方法区分
                    customer.billingMethod = SFN0401_helper_1.SFN0401Helper.getBillingMethodStr(customerData["billingMethod"]);
                    // 備考１
                    customer.note1 = customerData["note1"];
                    // 備考２
                    customer.note2 = customerData["note2"];
                    // 営業カルテ
                    customer.memo = customerData["memo"];
                    // sales
                    var salesData = customerData["sales"];
                    var username = salesData["name"];
                    var departmentName = salesData["departmentName"];
                    customer.sales = format_util_1.FormatUtil.formatSalesName(departmentName, username);
                    // revenue
                    var revenues = [];
                    customer.revenues = revenues;
                    var revenuesData = customerData["revenues"];
                    for (var _a = 0, revenuesData_1 = revenuesData; _a < revenuesData_1.length; _a++) {
                        var revenueData = revenuesData_1[_a];
                        var revenue = new SFN0401_Revenue_model_1.RevenueModel();
                        revenues.push(revenue);
                        // 売上日
                        revenue.salesDate = date_util_1.DateUtil.getDate(revenueData["salesDate"]);
                        revenue.salesDateStr = date_util_1.DateUtil.formatDate(revenue.salesDate, SFN0401_constants_1.SFN0401Constants.DATE_DISPLAY);
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
                    // inventory
                    var inventories = [];
                    customer.inventories = inventories;
                    var inventoriesData = customerData["inventories"];
                    for (var _b = 0, inventoriesData_1 = inventoriesData; _b < inventoriesData_1.length; _b++) {
                        var inventoryData = inventoriesData_1[_b];
                        var inventory = new SFN0401_Inventory_model_1.InventoryModel();
                        inventories.push(inventory);
                        // 種別
                        inventory.type = inventoryData["type"];
                        inventory.typeStr = StockListTable_helper_1.StockListTableHelper.getInventoryTypeStr(inventory.type);
                        // 製造日
                        inventory.manufactureDate = date_util_1.DateUtil.getDate(inventoryData["manufactureDate"]);
                        inventory.manufactureDateStr = date_util_1.DateUtil.formatDate(inventory.manufactureDate, SFN0401_constants_1.SFN0401Constants.DATE_DISPLAY);
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
                    // product
                    var products = [];
                    customer.products = products;
                    var ordersData = customerData["orders"];
                    for (var _c = 0, ordersData_1 = ordersData; _c < ordersData_1.length; _c++) {
                        var orderData = ordersData_1[_c];
                        var productData = orderData["product"];
                        var product = _this.getProductData(productData);
                        products.push(product);
                        // 数量
                        product.quantity = orderData["quantity"];
                        // 単価
                        product.unitPrice = orderData["unitPrice"];
                        // 合計
                        product.total = orderData["total"];
                    }
                }
            }
        });
    };
    /**
     * send SF0050202 post request
     */
    SFN0401Service.prototype.sfn040102 = function () {
        var _this = this;
        var currentFilter = this.pageData.currentFilter;
        var requestData = {
            keywords: currentFilter.keywords,
            code: currentFilter.code,
            name: currentFilter.name,
            contactName: currentFilter.contactName,
            salesName: currentFilter.salesName,
            page: currentFilter.page
        };
        return this.postApi("/SFN040102", requestData).then(function (res) {
            var data = res["data"];
            var messageCode = res["messageCode"];
            // INF001 data
            if (messageCode == "INF001") {
                // no result
                _this.pageData.hits = 0;
                _this.pageData.partnerList = [];
            }
            else if (messageCode == "INF002") {
                // result found
                _this.pageData.hits = data["hits"];
                var suppliersData = data["suppliers"];
                var supplierList = [];
                _this.pageData.partnerList = supplierList;
                for (var _i = 0, suppliersData_1 = suppliersData; _i < suppliersData_1.length; _i++) {
                    var supplierData = suppliersData_1[_i];
                    var supplier = new SFN0401_Partner_model_1.PartnerModel();
                    supplierList.push(supplier);
                    // filter type
                    supplier.type = SFN0401_constants_1.SFN0401Constants.PTYPE_SUPPLIER;
                    // 取引先ID
                    supplier.code = supplierData["code"];
                    // 取引先名
                    supplier.name = supplierData["name"];
                    // 更新日
                    supplier.updateDate = date_util_1.DateUtil.getDate(supplierData["updateDate"]);
                    // 略称
                    supplier.abbr = supplierData["abbr"];
                    // 郵便番号
                    supplier.postalCode = supplierData["postalCode"];
                    // 住所１
                    supplier.address1 = supplierData["address1"];
                    // 住所２
                    supplier.address2 = supplierData["address2"];
                    // TEL
                    supplier.tel = supplierData["tel"];
                    // FAX
                    supplier.fax = supplierData["fax"];
                    // HP経由
                    supplier.hpInfo = SFN0401_constants_1.SFN0401Constants.PARTNER_NULL;
                    // 登録日
                    supplier.createdDate = date_util_1.DateUtil.getDate(supplierData["createdDate"]);
                    // 担当部署(#2852)
                    supplier.picDept = "";
                    // 得意先担当者名
                    supplier.contactName = supplierData["contactName"];
                    // 請求方法区分
                    supplier.billingMethod = SFN0401_constants_1.SFN0401Constants.PARTNER_NULL;
                    // 備考１
                    supplier.note1 = supplierData["note1"];
                    // 備考２
                    supplier.note2 = supplierData["note2"];
                    // 営業カルテ
                    supplier.memo = supplierData["memo"];
                    // sales
                    supplier.sales = "";
                    // revenue
                    var revenues = [];
                    supplier.revenues = revenues;
                    var revenuesData = supplierData["revenues"];
                    for (var _a = 0, revenuesData_2 = revenuesData; _a < revenuesData_2.length; _a++) {
                        var revenueData = revenuesData_2[_a];
                        var revenue = new SFN0401_Revenue_model_1.RevenueModel();
                        revenues.push(revenue);
                        // 売上日
                        revenue.salesDate = date_util_1.DateUtil.getDate(revenueData["salesDate"]);
                        revenue.salesDateStr = date_util_1.DateUtil.formatDate(revenue.salesDate, SFN0401_constants_1.SFN0401Constants.DATE_DISPLAY);
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
            }
        });
    };
    SFN0401Service.prototype.getProductData = function (productData) {
        var product = new SFN0401_Product_model_1.ProductModel();
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
        product.description = SFN0401_helper_1.SFN0401Helper.getProductDescription(productData);
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
    SFN0401Service = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Router])
    ], SFN0401Service);
    return SFN0401Service;
}(common_service_1.CommonService));
exports.SFN0401Service = SFN0401Service;
//# sourceMappingURL=SFN0401.service.js.map