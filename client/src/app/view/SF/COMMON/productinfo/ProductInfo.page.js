"use strict";
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
var mst_data_type_1 = require("../../../../helper/mst-data-type");
var data_util_1 = require("../../../../util/data-util");
var ProductBox_model_1 = require("./model/ProductBox.model");
var format_util_1 = require("../../../../util/format-util");
var ProductInfo = (function () {
    function ProductInfo() {
        // output emit change data
        this.emitRedirectSF00302 = new core_1.EventEmitter();
        this.emitExportPDF = new core_1.EventEmitter();
        this.emitAddProductToDeal = new core_1.EventEmitter();
        this.requestUpdateProduct = new core_1.EventEmitter();
    }
    Object.defineProperty(ProductInfo.prototype, "product", {
        //1. product info
        get: function () {
            return this.productBox.product;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProductInfo.prototype, "transactions", {
        //2. oderItems
        get: function () {
            return this.productBox.transactions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProductInfo.prototype, "inventory", {
        //3. inventory
        get: function () {
            return this.productBox.inventory;
        },
        enumerable: true,
        configurable: true
    });
    ProductInfo.prototype.viewProductInfo = function () {
        this.emitRedirectSF00302.emit();
    };
    ProductInfo.prototype.getDimension = function (product) {
        return product.getDimension();
    };
    ProductInfo.prototype.exportPDF = function () {
        this.emitExportPDF.emit();
    };
    ProductInfo.prototype.addProductToDeal = function () {
        this.emitAddProductToDeal.emit(this.product.id);
    };
    Object.defineProperty(ProductInfo.prototype, "productType", {
        get: function () {
            return format_util_1.FormatUtil.productType(this.product.productType, this.product.shapeId, this.product.cartonShippingType);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProductInfo.prototype, "requestProduct", {
        get: function () {
            var _this = this;
            var requestProducts = data_util_1.default.toSelectBoxDataSource(mst_data_type_1.REQUEST_TYPE);
            var data = requestProducts.find(function (item) {
                return item.id == _this.product.factoryId;
            });
            return this.valueItem(data);
        },
        enumerable: true,
        configurable: true
    });
    ProductInfo.prototype.valueItem = function (data) {
        if (data)
            return data.name;
        return '';
    };
    /*Format name of paper display as 'paper name + paper-weight'*/
    ProductInfo.prototype.getPaperName = function (product) {
        return product.getPaperName(this.mstLaminations);
    };
    ProductInfo.prototype.onChangedProductLot = function () {
        this.requestUpdateProduct.emit(this.product);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], ProductInfo.prototype, "mstLaminations", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', ProductBox_model_1.ProductBoxModel)
    ], ProductInfo.prototype, "productBox", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], ProductInfo.prototype, "index", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ProductInfo.prototype, "isOrder", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], ProductInfo.prototype, "statusExport", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], ProductInfo.prototype, "notUsingProduct", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ProductInfo.prototype, "isRequestDesign", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ProductInfo.prototype, "emitRedirectSF00302", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ProductInfo.prototype, "emitExportPDF", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ProductInfo.prototype, "emitAddProductToDeal", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ProductInfo.prototype, "requestUpdateProduct", void 0);
    ProductInfo = __decorate([
        core_1.Component({
            selector: "div[product-info]",
            templateUrl: "ProductInfo.page.html",
        }), 
        __metadata('design:paramtypes', [])
    ], ProductInfo);
    return ProductInfo;
}());
exports.ProductInfo = ProductInfo;
//# sourceMappingURL=ProductInfo.page.js.map