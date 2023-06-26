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
var Header_provider_1 = require("../SF00100/Header.provider");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var DealProduct_model_1 = require("../../../model/core/DealProduct.model");
var common_page_1 = require("../COMMON/common.page");
var SF008_PAGE_TITLE = "面付シミュレーション";
var SF00800Page = (function (_super) {
    __extends(SF00800Page, _super);
    function SF00800Page(router, route, headerProvider, location) {
        _super.call(this, router, route, headerProvider);
        this.location = location;
        this.productId = 0;
        this.dealProduct = new DealProduct_model_1.DealProduct();
        this.isView = true;
    }
    SF00800Page.prototype.pageTile = function () {
        return SF008_PAGE_TITLE;
    };
    SF00800Page.prototype.ngOnInit = function () {
        // check param productCode
        // if productCode undefined -> productCode  = 0
        var data = this.route.parent.snapshot.data['sf00302Data'];
        if (data) {
            this.dealProduct = data.dealProduct;
            this.productCode = this.dealProduct.product.productCode;
            this.dealCode = this.route.params["value"].dealCode;
            this.productId = this.dealProduct.product.id;
            this.isView = false;
        }
        SF008Api.init(this.productId);
    };
    SF00800Page.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
        // destroy SF008
        SF008Api.destroy();
    };
    Object.defineProperty(SF00800Page.prototype, "checkProduct", {
        get: function () {
            return this.isView;
        },
        enumerable: true,
        configurable: true
    });
    SF00800Page.prototype.goBack = function () {
        var _this = this;
        if (this.productCode) {
            this.router.navigateByUrl('/blank').then(function () {
                _this.router.navigate(['/home/deal/', _this.dealCode ? _this.dealCode : 0, "product", _this.productCode], { replaceUrl: true });
            });
        }
        else {
            this.location.back();
        }
    };
    SF00800Page.prototype.setDataProduct = function () {
        var _this = this;
        if (this.productCode) {
            this.router.navigateByUrl('/blank').then(function () {
                _this.router.navigate(['/home/deal/', _this.dealCode ? _this.dealCode : 0, "product", _this.productCode], { replaceUrl: true });
            });
        }
    };
    SF00800Page = __decorate([
        core_1.Component({
            templateUrl: "SF00800.page.html"
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, Header_provider_1.HeaderProvider, common_1.Location])
    ], SF00800Page);
    return SF00800Page;
}(common_page_1.CommonPage));
exports.SF00800Page = SF00800Page;
//# sourceMappingURL=SF00800.page.js.map