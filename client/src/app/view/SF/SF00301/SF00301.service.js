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
var constants_1 = require("../../../helper/constants");
var message_1 = require("../../../helper/message");
var mst_data_type_1 = require("../../../helper/mst-data-type");
var common_service_1 = require("../../../service/common.service");
var validator_util_1 = require("../../../util/validator-util");
var MstLamination_model_1 = require("../COMMON/model/MstLamination.model");
var SF00301_Comment_model_1 = require("./model/SF00301_Comment.model");
var SF00301_Customer_model_1 = require("./model/SF00301_Customer.model");
var SF00301_Deal_model_1 = require("./model/SF00301_Deal.model");
var SF00301_DealFile_model_1 = require("./model/SF00301_DealFile.model");
var SF00301_Department_model_1 = require("./model/SF00301_Department.model");
var SF00301_OrderItems_model_1 = require("./model/SF00301_OrderItems.model");
var SF00301_Product_model_1 = require("./model/SF00301_Product.model");
var SF00301_ProductFile_model_1 = require("./model/SF00301_ProductFile.model");
var SF00301_Quotation_model_1 = require("./model/SF00301_Quotation.model");
var SF00301_User_model_1 = require("./model/SF00301_User.model");
var SF0030103_req_1 = require("./request/SF0030103.req");
var SF0030104_req_1 = require("./request/SF0030104.req");
var SF0030105_req_1 = require("./request/SF0030105.req");
var SF0030117_req_1 = require("./request/SF0030117.req");
var SF0030101_res_1 = require("./response/SF0030101.res");
var SF00301_data_1 = require("./SF00301.data");
var SF00301Service = (function (_super) {
    __extends(SF00301Service, _super);
    function SF00301Service(http, router) {
        _super.call(this, http, router);
        this._pageData = new SF00301_data_1.SF00301Data();
        this._nextNegativeId = -1;
        /*List item base model*/
        this.concernItemDataSource = [];
    }
    Object.defineProperty(SF00301Service.prototype, "pageData", {
        get: function () {
            return this._pageData;
        },
        enumerable: true,
        configurable: true
    });
    SF00301Service.prototype.initData = function (mode, dealCode) {
        var self = this;
        App.loader('show');
        if (mode === SF00301Service.MODE_CREATE) {
            return this.getApi("/SF0030101")
                .then(function (res) {
                var pageData = new SF00301_data_1.SF00301Data();
                pageData.screenMode = mode;
                pageData.user = self.parseUser(res.data["user"]);
                pageData.deal = new SF00301_Deal_model_1.SF00301_Deal();
                pageData.deal.isSaved = false;
                pageData.deal.dealType = mst_data_type_1.DEAL_TYPE_VALUES.EXISTING_VERSION;
                pageData.deal.templateFlag = mst_data_type_1.TEMPLATE_DEAL.FALSE;
                pageData.deal.dealStatus = mst_data_type_1.DEAL_STATUS_VALUES.NEW_EDITION;
                pageData.departments = self.parseDepartments(res.data["departments"]);
                pageData.customers = [];
                pageData.deal.saler = self.parseUser(res.data["user"]);
                pageData.defaultDeliveryDate = pageData.deal.deliveryDate;
                pageData.relatedDeals = [];
                self._pageData = pageData;
                self.concernItemDataSource = [];
            });
        }
        else {
            return this.getApi("/SF0030101/" + dealCode)
                .then(function (res) {
                if (!res.data || validator_util_1.default.isEmpty(res.data.deal.dealCode)) {
                    throw message_1.MSG.SF00301.ERR002;
                }
                var pageData = new SF00301_data_1.SF00301Data();
                pageData.screenMode = mode;
                var data;
                // check view open or copy
                if (mode === SF00301Service.MODE_OPEN) {
                    data = self.fetchModel(res.data);
                    pageData.user = data.user;
                    pageData.deal = data.deal;
                    pageData.deal.isSaved = true;
                }
                else if (mode === SF00301Service.MODE_COPY) {
                    data = self.fetchModel(res.data, true);
                    pageData.user = data.user;
                    pageData.deal = data.deal;
                    pageData.deal.isSaved = false;
                    pageData.deal.dealType = mst_data_type_1.DEAL_TYPE_VALUES.EXISTING_VERSION;
                    pageData.deal.templateFlag = mst_data_type_1.TEMPLATE_DEAL.FALSE;
                    pageData.deal.closedFlag = 0;
                    pageData.deal.dealStatus = mst_data_type_1.DEAL_STATUS_VALUES.NEW_EDITION;
                    pageData.deal.saler = pageData.user;
                }
                // get data info
                pageData.user = data.user;
                pageData.deal = data.deal;
                pageData.defaultDeliveryDate = pageData.deal.deliveryDate;
                pageData.comments = data.comments || [];
                pageData.departments = data.departments || [];
                pageData.customers = [];
                pageData.checkSheets = data.checkSheets || [];
                pageData.orderItems = data.orderItems || [];
                pageData.mstLaminations = data.mstLaminations || [];
                pageData.relatedDeals = data.relatedDeals || [];
                self.concernItemDataSource = data.baseModels || [];
                pageData.totalComments = res.data["numberOfComment"];
                self._pageData = pageData;
            });
        }
    };
    /**
     * create or dupplicate deal
     */
    SF00301Service.prototype.createDeal = function () {
        var source = this.pageData.deal;
        var req = {
            deal: {
                dealName: source.dealName,
                dealType: source.dealType,
                deliveryDate: source.deliveryDate,
                estTotalDeal: source.estTotalDeal,
                customerName: !source.customer || (!!source.customer && source.customer.id >= 0) ? null : source.customer.customerName
            },
            customer: !source.customer || (!!source.customer && source.customer.id < 0) ? null : { id: source.customer.id },
            saler: source.saler ? { id: source.saler.id } : null,
            copyFrom: this.pageData.deal.dealCode
        };
        return this.postApi('SF0030116', req).then(function (res) { return res.data.dealCode; });
    };
    /**
     * update existed deal
     */
    SF00301Service.prototype.updateDeal = function () {
        var _this = this;
        var source = this.pageData.deal;
        var req = {
            deal: {
                id: source.id,
                dealCode: source.dealCode,
                dealType: source.dealType,
                dealName: source.dealName,
                salesId: source.saler ? source.saler.id : null,
                deliveryDate: source.deliveryDate,
                estTotalDeal: source.estTotalDeal,
                customerName: !source.customer || (!!source.customer && source.customer.id >= 0) ? null : source.customer.customerName
            },
            customer: !source.customer || (!!source.customer && source.customer.id < 0) ? null : { id: source.customer.id },
            saler: source.saler ? { id: source.saler.id } : null
        };
        return this.postApi('SF0030102', req).then(function (res) {
            _this.pageData.deal.setData(res.data.deal);
            var customer;
            if (!!res.data.customer) {
                customer = new SF00301_Customer_model_1.SF00301_Customer();
                customer.setCustomer(res.data.customer);
            }
            else if (!!res.data.deal.customerName) {
                customer = new SF00301_Customer_model_1.SF00301_Customer();
                customer.id = _this.nextNegativeId();
                customer.customerName = res.data.deal.customerName;
            }
            _this.pageData.deal.customer = customer;
            var saler;
            if (!!res.data.saler) {
                saler = new SF00301_User_model_1.SF00301_User();
                saler.setUser(res.data.saler);
            }
            _this.pageData.deal.saler = saler;
            // update state customer for available customer select from list customer selected after saved into db
            _this.pageData.deal.hasRegisteredCustomer = res.data.hasRegisteredCustomer;
            _this.pageData.defaultDeliveryDate = _this.pageData.deal.deliveryDate;
        });
    };
    SF00301Service.prototype.closedDeal = function () {
        var self = this;
        var req = { dealId: self.pageData.deal.id };
        return self.postApi("SF0030120", req).then(function () {
            self.pageData.deal.closedFlag = 1;
        });
    };
    SF00301Service.prototype.deleteDeal = function () {
        var req = { dealCode: this.pageData.deal.dealCode };
        return this.postApi("SF0030112", req);
    };
    SF00301Service.prototype.loadMore = function (count) {
        if (count === void 0) { count = 5; }
        var eles = this.pageData.concernsItems.length;
        var lastItem = eles > 0 ? this.pageData.concernsItems[eles - 1] : null;
        var tracker = !!lastItem ? this.findIndex(this.concernItemDataSource, lastItem) + 1 : 0;
        for (var counter = 0; tracker < this.concernItemDataSource.length && counter < count; tracker++) {
            if (this.matchCurrentFilter(this.concernItemDataSource[tracker])) {
                this.pageData.concernsItems.push(this.concernItemDataSource[tracker]);
                counter++;
            }
        }
    };
    SF00301Service.prototype.matchCurrentFilter = function (item) {
        return this.isMathWith(item, this.pageData.filter);
    };
    /**
     * post save deal file call api SF0030103
     * @param dealFile
     * @param fileCode
     */
    SF00301Service.prototype.createDealFile = function (dealFile, fileCode) {
        var self = this;
        // TODO: remove this side effect
        dealFile.dealId = self.pageData.deal.id;
        dealFile.highlightFlag = constants_1.Constants.ONE;
        var req = new SF0030103_req_1.SF0030103Req(dealFile, fileCode);
        return self.postApi("/SF0030103", req)
            .then(function (res) {
            var dealFile = new SF00301_DealFile_model_1.SF00301_DealFile();
            dealFile.setDealFile(res.data.dealFile);
            dealFile.category = SF00301_data_1.SF00301Data.CATEGORY.DEAL_FILE;
            self.concernItemDataSource.unshift(dealFile);
            if (self.matchCurrentFilter(dealFile)) {
                self.pageData.concernsItems.unshift(dealFile);
            }
        });
    };
    /**
     * post update deal file call api SF0030104
     * @param dealFile
     * @param fileCode
     */
    SF00301Service.prototype.updateDealFile = function (dealFile, fileCode) {
        var self = this;
        var req = new SF0030104_req_1.SF0030104Req(dealFile, fileCode);
        return this.postApi("/SF0030104", req)
            .then(function (res) {
            var dealFile = new SF00301_DealFile_model_1.SF00301_DealFile();
            dealFile.setDealFile(res.data.dealFile);
            dealFile.category = SF00301_data_1.SF00301Data.CATEGORY.DEAL_FILE;
            self.removeItem(self.concernItemDataSource, dealFile);
            self.concernItemDataSource.unshift(dealFile);
            self.removeItem(self.pageData.concernsItems, dealFile);
            if (self.matchCurrentFilter(dealFile)) {
                self.pageData.concernsItems.unshift(dealFile);
            }
        });
    };
    /**
     * post update deal file call api SF0030104
     * @param dealFile
     * @param fileCode
     */
    SF00301Service.prototype.updateProductFile = function (productFile, fileCode) {
        var self = this;
        var req = new SF0030105_req_1.SF0030105Req(productFile, fileCode);
        // call api update product file SF00302
        return this.postApi("/SF0030207", req)
            .then(function (res) {
            var productFile = new SF00301_ProductFile_model_1.SF00301_ProductFile();
            productFile.setProductFile(res.data.productFile);
            productFile.category = SF00301_data_1.SF00301Data.CATEGORY.PRODUCT_FILE;
            // update product img
            var product = self.concernItemDataSource.find(function (item) {
                return self.isProduct(item)
                    && item.id === productFile.productId;
            });
            // set img product
            if (!!product) {
                product.srcImg = productFile.srcImg;
            }
            self.removeItem(self.concernItemDataSource, productFile);
            self.concernItemDataSource.unshift(productFile);
            self.removeItem(self.pageData.concernsItems, productFile);
            if (self.matchCurrentFilter(productFile)) {
                self.pageData.concernsItems.unshift(productFile);
            }
        });
    };
    /**
     * remove deal file by id call api SF0030105
     * @param dealFile
     */
    SF00301Service.prototype.removeDealFile = function (dealFile) {
        var self = this;
        var req = {
            dealFileId: dealFile.id
        };
        return this.postApi("/SF0030105", req)
            .then(function () {
            // search productFile and remove item it
            var dealFileRemove = self.concernItemDataSource.find(function (item) {
                return self.isDealFile(item)
                    && item.id === dealFile.id;
            });
            self.removeItem(self.concernItemDataSource, dealFileRemove);
            self.removeItem(self.pageData.concernsItems, dealFileRemove);
            self.loadMore(1);
        });
    };
    SF00301Service.prototype.findIndex = function (source, target) {
        if (!source || !target || !target.category)
            return -1;
        return source.findIndex(function (c) { return target.category === c.category && target.id === c.id; });
    };
    SF00301Service.prototype.removeItem = function (source, target) {
        var itemIndex = this.findIndex(source, target);
        if (itemIndex === -1)
            return false;
        source.splice(itemIndex, 1);
        return true;
    };
    /**
     * remove quotation by id call api SF0030106
     * @param quotation
     */
    SF00301Service.prototype.removeQuotation = function (quotation) {
        var self = this;
        var req = { quotationId: quotation.id };
        return this.postApi("/SF0030106", req).then(function (res) {
            self.removeItem(self.concernItemDataSource, quotation);
            self.removeItem(self.pageData.concernsItems, quotation);
            self.loadMore(1);
        });
    };
    /**
     * remove deal product by id call api SF0030107
     * @param product
     */
    SF00301Service.prototype.detachProduct = function (product) {
        var _this = this;
        var self = this;
        var req = {
            dealCode: this.pageData.deal.dealCode,
            productCode: product.productCode
        };
        return this.postApi("/SF0030107", req).then(function () {
            //#2223
            // update deal status
            _this.updateDealStatus(_this.pageData.deal.id, _this.pageData.deal.dealStatus);
            // remove productFile
            var productId = product.id;
            self.concernItemDataSource
                .filter(function (item) { return self.isProductFile(item) && item.productId === productId; })
                .forEach(function (item) {
                self.removeItem(self.concernItemDataSource, item);
                self.removeItem(self.pageData.concernsItems, item);
                self.loadMore(1);
            });
            self.removeItem(self.concernItemDataSource, product);
            self.removeItem(self.pageData.concernsItems, product);
            self.removeItem(self.pageData.deal.products, product);
            self.loadMore(1);
        }).catch(function (err) {
            throw err;
        });
    };
    /**
     * remove product file by id call api SF0030107
     * @param productFile
     */
    SF00301Service.prototype.removeProductFile = function (productFile) {
        var self = this;
        var req = {
            productId: productFile.productId,
            productFileId: productFile.id
        };
        return this.postApi("/SF0030108", req)
            .then(function (res) {
            var product = self.concernItemDataSource.find(function (item) {
                return self.isProduct(item)
                    && item.id === productFile.productId;
            });
            if (!!product) {
                product.srcImg = res.data["srcImg"];
            }
            // search productFile and remove item it
            var productFileRemove = self.concernItemDataSource.find(function (item) {
                return self.isProductFile(item)
                    && item.id === productFile.id;
            });
            self.removeItem(self.concernItemDataSource, productFileRemove);
            self.removeItem(self.pageData.concernsItems, productFileRemove);
            self.loadMore(1);
        });
    };
    /**
     * persist givent comment and add it to showing list
     */
    SF00301Service.prototype.addComment = function (comment) {
        var _this = this;
        var self = this;
        var req = {
            comment: {
                value: comment.value,
                title: comment.title,
                dealId: this.pageData.deal.id
            }
        };
        return this.postApi("/SF0030109", req).then(function (res) {
            var comment = new SF00301_Comment_model_1.SF00301_Comment();
            comment.setComment(res.data.comment);
            self.pageData.comments.unshift(comment);
            _this.pageData.totalComments = res.data["numberOfComment"];
            //Fix #1796 -- always get 10 latest item (also after load all items)
            self.pageData.comments = self.pageData.comments.slice(0, 10);
        });
    };
    /**
     * show more comment by deal id, index call api SF0030110
     */
    SF00301Service.prototype.showMoreComment = function () {
        var _this = this;
        var self = this;
        var req = {
            dealId: this.pageData.deal.id,
            startPosition: (this.pageData.comments || []).length
        };
        return this.postApi("/SF0030110", req).then(function (res) {
            if (!res.data)
                return;
            _this.pageData.totalComments = res.data.total;
            (res.data.comments || []).forEach(function (item) {
                var comment = new SF00301_Comment_model_1.SF00301_Comment();
                comment.setComment(item);
                self.pageData.comments.push(comment);
            });
        });
    };
    /**
     * call api for toggle boorkmark for given deal
     */
    SF00301Service.prototype.toggleBookmark = function (deal) {
        if (!deal.isSaved)
            return;
        if (deal.isInMybox) {
            // unbookmark deal
            return this.postApi("/SF0030003", { dealId: deal.id }).then(function () {
                return false;
            });
        }
        else {
            // bookmark deal
            return this.postApi("/SF0030002", { dealId: deal.id }).then(function (res) {
                return res.data.myboxId > 0;
            });
        }
    };
    /**
     * call api for toggle boorkmark for given deal
     */
    SF00301Service.prototype.toggleLock = function (deal) {
        if (!deal.isSaved)
            return;
        // unBookmark deal
        return this.postApi("/SF0030122", { dealId: deal.id }).then(function (res) {
            var data = res.data;
            return data["dealLock"];
        });
    };
    SF00301Service.prototype.updateHighlightFlag = function (itemId, status, itemType, dealId) {
        //#2223
        var req = new SF0030117_req_1.SF0030117Req();
        req.dealId = dealId;
        req.itemId = itemId;
        req.status = status;
        req.itemType = itemType;
        return this.postApi("/SF0030117", req).then(function (res) {
            return res.data;
        });
    };
    SF00301Service.prototype.getCustomers = function (departmentId) {
        var req = {
            departmentId: departmentId
        };
        return this.postApi("/SF0030118", req).then(function (res) {
            return (res.data["customers"] || []).map(function (item) {
                var customer = new SF00301_Customer_model_1.SF00301_Customer();
                customer.setCustomer(item);
                return customer;
            });
        });
    };
    SF00301Service.prototype.nextNegativeId = function () {
        return this._nextNegativeId--;
    };
    /**
     * Method to parse response data to fetch into the page's data model.
     * @param data the current response data.
     * @param lint: if `true` will not return deal's comment and CODE of concern items
     * @return {SF00301Data}
     */
    SF00301Service.prototype.fetchModel = function (data, lint) {
        if (lint === void 0) { lint = false; }
        var model = new SF0030101_res_1.SF0030101Res();
        model.user = this.parseUser(data["user"]);
        // get list department
        model.departments = this.parseDepartments(data["departments"]);
        // get data deal
        model.deal = this.parseDeal(data["deal"]);
        if (!!data["customer"]) {
            model.deal.customer = new SF00301_Customer_model_1.SF00301_Customer();
            model.deal.customer.setCustomer(data["customer"]);
        }
        else if (!!data["deal"] && !!data["deal"].customerName) {
            model.deal.customer = new SF00301_Customer_model_1.SF00301_Customer();
            model.deal.customer.id = this.nextNegativeId();
            model.deal.customer.customerName = data["deal"].customerName;
        }
        // get list checkSheets
        model.checkSheets = [];
        if (!!data["checksheets"]) {
            for (var i = 0; i < data["checksheets"].length; i++) {
                var answer = data["checksheets"][i];
                model.checkSheets[answer.questionCode] = answer;
            }
        }
        // get comments
        if (!lint)
            model.comments = this.parseComments(data["comments"]);
        if (!!data["deal"] && !!data["deal"]["salesId"]) {
            model.deal.saler = this.parseUser(data["saler"]);
        }
        // get list mst lamination
        if (data["laminationJsons"]) {
            for (var _i = 0, _a = data["laminationJsons"]; _i < _a.length; _i++) {
                var lamination = _a[_i];
                var mstLamination = new MstLamination_model_1.MstLamination();
                mstLamination.setData(lamination);
                model.mstLaminations.push(mstLamination);
            }
        }
        // get list items
        model.baseModels = [];
        // list deal product
        for (var i = 0; i < (data["products"] || []).length; i++) {
            var product = new SF00301_Product_model_1.SF00301_Product();
            product.setData(data["products"][i]);
            product.dealProductId = data["products"][i]["dealProductId"];
            product.highlightFlag = data["products"][i]["highlightFlag"];
            product.category = SF00301_data_1.SF00301Data.CATEGORY.PRODUCT;
            model.deal.products.push(product);
            model.baseModels.push(product);
        }
        // list deal file
        for (var i = 0; i < (data["dealFiles"] || []).length; i++) {
            var dealFile = new SF00301_DealFile_model_1.SF00301_DealFile();
            dealFile.setDealFile(data["dealFiles"][i]);
            dealFile.category = SF00301_data_1.SF00301Data.CATEGORY.DEAL_FILE;
            model.baseModels.push(dealFile);
        }
        // list quotation
        for (var i = 0; i < (data["quotations"] || []).length; i++) {
            var quotation = new SF00301_Quotation_model_1.SF00301_Quotation();
            quotation.setQuotation(data["quotations"][i]);
            if (lint) {
                quotation.quotationCode = null;
            }
            quotation.category = SF00301_data_1.SF00301Data.CATEGORY.QUOTATION;
            model.baseModels.push(quotation);
        }
        // order item
        for (var i = 0; i < (data["orderItems"] || []).length; i++) {
            var orderItem = new SF00301_OrderItems_model_1.SF00301_OrderItem();
            orderItem.setOrderItem(data["orderItems"][i]);
            model.orderItems.push(orderItem);
        }
        // list product file
        for (var i = 0; i < (data["productFiles"] || []).length; i++) {
            var productFile = new SF00301_ProductFile_model_1.SF00301_ProductFile();
            productFile.setProductFile(data["productFiles"][i]);
            productFile.category = SF00301_data_1.SF00301Data.CATEGORY.PRODUCT_FILE;
            model.baseModels.push(productFile);
        }
        // sort date time
        model.baseModels.sort(function (item1, item2) {
            if (item1.updatedDate > item2.updatedDate) {
                return -1;
            }
            else if (item1.updatedDate == item2.updatedDate) {
                return 0;
            }
            else {
                return 1;
            }
        });
        // 関連案件 (元案件, リピート案件)
        model.relatedDeals = (data['relatedDeals'] || []).map(this.parseDeal.bind(this));
        return model;
    };
    SF00301Service.prototype.parseUser = function (data) {
        if (!data)
            return null;
        var user = new SF00301_User_model_1.SF00301_User();
        user.setUser(data);
        return user;
    };
    SF00301Service.prototype.parseCustomer = function (data) {
        if (!data)
            return null;
        var customer = new SF00301_Customer_model_1.SF00301_Customer();
        customer.setCustomer(data);
        return customer;
    };
    SF00301Service.prototype.parseDeal = function (data) {
        if (!data)
            return null;
        var deal = new SF00301_Deal_model_1.SF00301_Deal();
        deal.setDeal(data);
        return deal;
    };
    SF00301Service.prototype.findUserInDepartments = function (departments, userId) {
        var ret = null;
        departments.find(function (dep) {
            return dep.users.find(function (usr) {
                if (usr.id === userId) {
                    ret = usr;
                    return true;
                }
                return false;
            }) != null;
        });
        return ret;
    };
    SF00301Service.prototype.parseComments = function (data) {
        return (data || []).map(function (item) {
            var comment = new SF00301_Comment_model_1.SF00301_Comment();
            comment.setComment(item);
            return comment;
        });
    };
    SF00301Service.prototype.parseDepartments = function (data) {
        return (data || []).map(function (item) {
            var department = new SF00301_Department_model_1.SF00301_Department();
            department.setDepartment(item);
            return department;
        });
    };
    SF00301Service.prototype.parseCustomers = function (data) {
        return (data || []).map(function (item) {
            var customers = new SF00301_Customer_model_1.SF00301_Customer();
            customers.setCustomer(item);
            return customers;
        });
    };
    SF00301Service.prototype.isDealFile = function (item) {
        return item.category === SF00301_data_1.SF00301Data.CATEGORY.DEAL_FILE;
    };
    SF00301Service.prototype.isProduct = function (item) {
        return item.category === SF00301_data_1.SF00301Data.CATEGORY.PRODUCT;
    };
    SF00301Service.prototype.isProductFile = function (item) {
        return item.category === SF00301_data_1.SF00301Data.CATEGORY.PRODUCT_FILE;
    };
    SF00301Service.prototype.isFile = function (item) {
        return this.isDealFile(item) || this.isProductFile(item);
    };
    SF00301Service.prototype.isQuotation = function (item) {
        return item.category === SF00301_data_1.SF00301Data.CATEGORY.QUOTATION;
    };
    SF00301Service.prototype.isMathWith = function (item, filter) {
        return filter === SF00301_data_1.SF00301Data.CATEGORY.ANY
            || (filter === SF00301_data_1.SF00301Data.CATEGORY.ANY_FILE
                && this.isFile(item))
            || filter === item.category;
    };
    SF00301Service.prototype.updateDealStatus = function (dealId, dealStatus) {
        var _this = this;
        var req = {
            dealId: dealId,
            dealStatus: dealStatus
        };
        return this.postApi("/SF0030119", req).then(function (res) {
            // update deal status
            _this.pageData.deal.dealStatus = res.data["dealStatus"];
        });
    };
    SF00301Service.prototype.downloadFile = function (itemModal) {
        var req = {
            fileId: itemModal.fileId,
            originalName: itemModal.originalName,
            itemId: itemModal.parentId,
            category: (SF00301_data_1.SF00301Data.CATEGORY.PRODUCT_FILE == itemModal.category ? constants_1.Constants.ITEM_PRODUCT : null)
        };
        return this.postApi("/SF0030121", req)
            .then(function (res) {
            return { fileName: res.data.fileName, filePath: res.data.filePath };
        })
            .catch(function (err) {
            throw err;
        });
    };
    // メール添付ファイル用に無理やり作成
    SF00301Service.prototype.downloadCommentFile = function (fileId, originalName, itemId) {
        var req = {
            fileId: fileId,
            originalName: originalName,
            itemId: itemId,
            category: 'COMMENT_FILE'
        };
        return this.postApi("/SF0030121", req)
            .then(function (res) {
            return { fileName: res.data.fileName, filePath: res.data.filePath };
        })
            .catch(function (err) {
            throw err;
        });
    };
    SF00301Service.prototype.canShowMoreDealItem = function (index) {
        if (index === void 0) { index = 0; }
        return index < this.concernItemDataSource.length;
    };
    SF00301Service.MODE_OPEN = Symbol("SF00301Service.MODE_OPEN");
    SF00301Service.MODE_CREATE = Symbol("SF00301Service.MODE_CREATE");
    SF00301Service.MODE_COPY = Symbol("SF00301Service.MODE_COPY");
    SF00301Service = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Router])
    ], SF00301Service);
    return SF00301Service;
}(common_service_1.CommonService));
exports.SF00301Service = SF00301Service;
//# sourceMappingURL=SF00301.service.js.map