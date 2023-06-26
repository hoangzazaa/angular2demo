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
var router_1 = require("@angular/router");
var message_1 = require("../../../helper/message");
var SF00201_service_1 = require("./SF00201.service");
var SF00201_Product_model_1 = require("./model/SF00201_Product.model");
var constants_1 = require("../../../helper/constants");
var validator_util_1 = require("../../../util/validator-util");
var data_util_1 = require("../../../util/data-util");
var mst_data_type_1 = require("../../../helper/mst-data-type");
var format_util_1 = require("../../../util/format-util");
var Header_provider_1 = require("../SF00100/Header.provider");
var common_page_1 = require("../COMMON/common.page");
var SF00201_PAGE_TITLE = "新規案件追加";
var SF00201Page = (function (_super) {
    __extends(SF00201Page, _super);
    function SF00201Page(router, route, headerProvider, sf00201Service) {
        _super.call(this, router, route, headerProvider);
        this.sf00201Service = sf00201Service;
    }
    SF00201Page.prototype.pageTile = function () {
        return SF00201_PAGE_TITLE;
    };
    SF00201Page.prototype.ngOnInit = function () {
        this.sf00201Service.getData(constants_1.Constants.FIRST_PAGE).then(function () {
        });
    };
    SF00201Page.prototype.productInfo = function (template) {
        var product = new SF00201_Product_model_1.SF00201_Product();
        if (template && template.product) {
            product = template.product;
        }
        return product;
    };
    Object.defineProperty(SF00201Page.prototype, "sf00201Data", {
        get: function () {
            return this.sf00201Service.sf00201Data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00201Page.prototype, "totalRecords", {
        get: function () {
            return this.sf00201Data.totalRecords;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00201Page.prototype, "templates", {
        get: function () {
            return this.sf00201Data.templates;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00201Page.prototype, "pageSize", {
        get: function () {
            return this.sf00201Data.pageSize;
        },
        enumerable: true,
        configurable: true
    });
    //template.product.srcImg
    SF00201Page.prototype.srcImg = function (template) {
        if (!!template.product)
            return template.product.srcImg;
        return null;
    };
    /**
     * Method use to navigate to screen SF003-01 by copy & add deals.
     * url: /home/deals/create?from=[dealCode]
     * @param dealCode the deals code
     * @returns {Promise<boolean>}
     */
    SF00201Page.prototype.copyAndAddDeal = function (template) {
        this.router.navigate(['home/deal/create'], { queryParams: { from: template.dealCode } }).then(function () {
        });
    };
    /**
     * Method use to navigate to screen SF003-01 at view mode, user cannot edit.
     * @param template the template
     * @returns {Promise<boolean>}
     */
    SF00201Page.prototype.viewTemplate = function (template) {
        this.router.navigate([("home/deal/" + template.dealCode)]).then(function () {
        });
    };
    /*Check current templates-product includes product*/
    SF00201Page.prototype.hasProduct = function (template) {
        return true;
    };
    /*Format dimension display as 'size x depth x height'*/
    SF00201Page.prototype.getDimension = function (product) {
        if (!!product)
            return format_util_1.FormatUtil.formatDimension(constants_1.Constants.X_SEPARATOR, product.sizeW, product.sizeD, product.sizeH);
        return constants_1.Constants.BLANK;
    };
    /*Format imposition-number display as 'imposition-number 丁'*/
    SF00201Page.prototype.getImpositionNumber = function (imposition) {
        if (validator_util_1.default.isNotEmpty(imposition))
            return imposition + constants_1.Constants.IMPOSITION_SIGN;
        return constants_1.Constants.BLANK;
    };
    /*Get the name of print method based on the key*/
    SF00201Page.prototype.getPrintMethod = function (printMethod) {
        return data_util_1.default.getData(mst_data_type_1.PRINT_METHOD, constants_1.Constants.BLANK, printMethod);
    };
    /*Get the name of surface-treatment based on the key*/
    SF00201Page.prototype.getSurfaceTreatment = function (surfaceTreatmentId) {
        return data_util_1.default.getData(mst_data_type_1.SURFACE_TREATMENT, constants_1.Constants.BLANK, surfaceTreatmentId);
    };
    /*Format name of paper display as 'paper name + paper-weight'*/
    SF00201Page.prototype.getPaperName = function (product) {
        return format_util_1.FormatUtil.formatPaperName_V1(product);
    };
    /**
     * Add template to mybox.
     * @param template current template
     */
    SF00201Page.prototype.addTemplateToMybox = function (template) {
        this.sf00201Service
            .addTemplateToMyBox(template)
            .then(function () {
            $.notify({ message: message_1.default.get(message_1.MSG.SF00201.INF001) }, { type: 'success' });
        });
    };
    /**
     * Load template belong to currentPage.
     * @param pageIndex
     */
    SF00201Page.prototype.onPageChange = function (pageIndex) {
        var _this = this;
        this.sf00201Service
            .getData(pageIndex)
            .then(function () { return _this.$scrollTop("#templatesList"); });
    };
    SF00201Page = __decorate([
        core_1.Component({
            selector: "sf002-01-div",
            templateUrl: "./SF00201.page.html",
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, Header_provider_1.HeaderProvider, SF00201_service_1.SF00201Service])
    ], SF00201Page);
    return SF00201Page;
}(common_page_1.CommonPage));
exports.SF00201Page = SF00201Page;
//# sourceMappingURL=SF00201.page.js.map