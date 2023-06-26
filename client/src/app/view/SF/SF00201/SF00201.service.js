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
var SF00201_Template_model_1 = require("./model/SF00201_Template.model");
var SF00201_data_1 = require("./SF00201.data");
var constants_1 = require("../../../helper/constants");
var SF00201_Product_model_1 = require("./model/SF00201_Product.model");
var SF00201Service = (function (_super) {
    __extends(SF00201Service, _super);
    function SF00201Service(http, router) {
        _super.call(this, http, router);
        this._sf00201Data = new SF00201_data_1.SF00201Data();
    }
    Object.defineProperty(SF00201Service.prototype, "sf00201Data", {
        get: function () { return this._sf00201Data; },
        enumerable: true,
        configurable: true
    });
    /**
     * Service to get total item.
     * @return {Promise<void>}
     */
    SF00201Service.prototype.getTotal = function () {
        var _this = this;
        return this
            .getApi("/SF0020103")
            .then(function (res) {
            _this.sf00201Data.totalRecords = res.data.count;
        });
    };
    /**
     * Service to load template by range.
     * @param pageIndex page index to get
     * @return {Promise<void>}
     */
    SF00201Service.prototype.getData = function (pageIndex) {
        var _this = this;
        var offset = ((pageIndex || constants_1.Constants.FIRST_PAGE) - 1) * this.sf00201Data.pageSize;
        var limit = this.sf00201Data.pageSize;
        return this
            .getApi("/SF0020101/" + offset + "/" + limit)
            .then(function (res) {
            _this.sf00201Data.templates = res.data.templates.map(function (templateData) { return _this.parseTemplate(templateData); });
            _this.sf00201Data.totalRecords = res.data.totalRecords || 0;
        });
    };
    /**
     * Add template to mybox.
     *
     * @param template template id
     */
    SF00201Service.prototype.addTemplateToMyBox = function (template) {
        return this
            .getApi("/SF0020102/" + template.id)
            .then(function (res) {
            template.isInMybox = res.data.myboxId > 0;
        });
    };
    SF00201Service.prototype.parseTemplate = function (data) {
        var template = new SF00201_Template_model_1.SF00201_Template();
        template.id = data["id"];
        template.createdUser = data["createdUser"];
        template.updatedUser = data["updatedUser"];
        template.createdDate = !!data["createdDate"] ? new Date(data["createdDate"]) : undefined;
        template.updatedDate = !!data["updatedDate"] ? new Date(data["updatedDate"]) : undefined;
        template.dealCode = data["dealCode"];
        template.dealName = data["dealName"];
        template.product = !!data["product"] ? parseProduct(data["product"]) : undefined;
        template.isInMybox = data["isInMybox"];
        return template;
        function parseProduct(data) {
            var product = new SF00201_Product_model_1.SF00201_Product();
            product.id = data["id"];
            product.createdUser = data["createdUser"];
            product.updatedUser = data["updatedUser"];
            product.createdDate = !!data["createdDate"] ? new Date(data["createdDate"]) : undefined;
            product.updatedDate = !!data["updatedDate"] ? new Date(data["updatedDate"]) : undefined;
            product.productName = data["productName"];
            product.memo = data["memo"];
            product.sizeH = data["sizeH"];
            product.sizeD = data["sizeD"];
            product.sizeW = data["sizeW"];
            product.paperName = data["paperName"];
            product.paperWeight = data["paperWeight"];
            product.impositionNumber = data["impositionNumber"];
            product.colorFSelect = data["colorFSelect"];
            product.woodenCode = data["woodenCode"];
            product.surfaceF_varnishType = data["surfaceF_varnishType"];
            product.application = data["application"];
            product.paperNameId = data["paperNameId"];
            product.originalName = data["originalName"];
            product.srcImg = data["srcImg"];
            return product;
        }
    };
    SF00201Service = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Router])
    ], SF00201Service);
    return SF00201Service;
}(common_service_1.CommonService));
exports.SF00201Service = SF00201Service;
//# sourceMappingURL=SF00201.service.js.map