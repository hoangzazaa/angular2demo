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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require("@angular/core");
var ProductInfoBox_model_1 = require("./ProductInfoBox.model");
var GenericProvider_1 = require("../GenericProvider");
var ProductInfoBox_helper_1 = require("./ProductInfoBox.helper");
var LoadingAddress_component_1 = require("./component/LoadingAddress.component");
var SpecifyTimeModal_component_1 = require("../specify-time-modal/SpecifyTimeModal.component");
var ShippingDestinationModal_component_1 = require("../shipping-destination-modal/ShippingDestinationModal.component");
var ShippingDestinationModal_model_1 = require("../shipping-destination-modal/ShippingDestinationModal.model");
var SpecifyTimeModal_model_1 = require("../specify-time-modal/SpecifyTimeModal.model");
var PIBShippingDestinationModal_model_1 = require("./component-model/PIBShippingDestinationModal.model");
var PIBSpecifyTimeModal_model_1 = require("./component-model/PIBSpecifyTimeModal.model");
var ProductInfoBoxComponent = (function () {
    function ProductInfoBoxComponent(provider, sdmProvider, stmProvider) {
        // init
        this.model = provider.provider;
        this.data = this.model.data;
        // provider
        sdmProvider.provider = new PIBShippingDestinationModal_model_1.PIBShippingDestinationModalModel(this);
        stmProvider.provider = new PIBSpecifyTimeModal_model_1.PIBSpecifyTimeModalModel(this);
    }
    Object.defineProperty(ProductInfoBoxComponent.prototype, "enableCheck", {
        //region Bindings
        get: function () {
            return this.data.enableCheck;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProductInfoBoxComponent.prototype, "displayCheck", {
        get: function () {
            return this.data.displayCheck;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProductInfoBoxComponent.prototype, "checked", {
        get: function () {
            return this.data.product.pib_check;
        },
        set: function (value) {
            this.data.product.pib_check = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProductInfoBoxComponent.prototype, "productName", {
        get: function () {
            return this.data.product.pib_name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProductInfoBoxComponent.prototype, "productCode", {
        get: function () {
            return this.data.product.pib_code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProductInfoBoxComponent.prototype, "updateDate", {
        get: function () {
            return this.data.product.pib_updateDate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProductInfoBoxComponent.prototype, "selectedTab", {
        get: function () {
            return this.data.selectedTab;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProductInfoBoxComponent.prototype, "exportDisplayed", {
        get: function () {
            return this.data.exportDisplayed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProductInfoBoxComponent.prototype, "exportEnabled", {
        get: function () {
            return this.data.exportEnabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProductInfoBoxComponent.prototype, "isCommercial", {
        get: function () {
            return ProductInfoBox_helper_1.ProductInfoBoxHelper.isCommercialProduct(this.data.product);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProductInfoBoxComponent.prototype, "shippings", {
        get: function () {
            return this.data.shippings;
        },
        enumerable: true,
        configurable: true
    });
    //endregion
    //region Actions
    ProductInfoBoxComponent.prototype.toggleBox = function () {
        $(this.boxBody.nativeElement).collapse('toggle');
    };
    ProductInfoBoxComponent.prototype.viewDetail = function () {
        this.model.viewDetail();
    };
    ProductInfoBoxComponent.prototype.exportPdf = function () {
        this.model.exportPdf();
    };
    ProductInfoBoxComponent.prototype.selectLoadingAddress = function (index) {
        this.data.tmpShipping = this.data.shippings[index];
        this.loadingAddress.open();
    };
    ProductInfoBoxComponent.prototype.pickSpecifyTime = function (index) {
        this.data.tmpShipping = this.data.shippings[index];
        this.specifyTime.open(this.data.tmpShipping);
    };
    ProductInfoBoxComponent.prototype.viewDestination = function (index) {
        this.data.tmpShipping = this.data.shippings[index];
        this.shippingDestinationModal.open(this.data.tmpShipping.pib_destinationId);
    };
    ProductInfoBoxComponent.prototype.removeShipping = function (index) {
        this.model.removeShipping(index);
    };
    ProductInfoBoxComponent.prototype.addShipping = function (index) {
        this.model.addShipping(index);
    };
    ProductInfoBoxComponent.prototype.closeShippingDestination = function () {
        this.shippingDestinationModal.close();
    };
    __decorate([
        core_1.ViewChild("boxBody"), 
        __metadata('design:type', core_1.ElementRef)
    ], ProductInfoBoxComponent.prototype, "boxBody", void 0);
    __decorate([
        core_1.ViewChild(SpecifyTimeModal_component_1.SpecifyTimeModalComponent), 
        __metadata('design:type', SpecifyTimeModal_component_1.SpecifyTimeModalComponent)
    ], ProductInfoBoxComponent.prototype, "specifyTime", void 0);
    __decorate([
        core_1.ViewChild(LoadingAddress_component_1.LoadingAddressComponent), 
        __metadata('design:type', LoadingAddress_component_1.LoadingAddressComponent)
    ], ProductInfoBoxComponent.prototype, "loadingAddress", void 0);
    __decorate([
        core_1.ViewChild(ShippingDestinationModal_component_1.ShippingDestinationModalComponent), 
        __metadata('design:type', ShippingDestinationModal_component_1.ShippingDestinationModalComponent)
    ], ProductInfoBoxComponent.prototype, "shippingDestinationModal", void 0);
    ProductInfoBoxComponent = __decorate([
        core_1.Component({
            selector: "[product-info-box]",
            templateUrl: "ProductInfoBox.component.html",
            styleUrls: ["ProductInfoBox.component.css"],
            encapsulation: core_1.ViewEncapsulation.None,
            providers: [
                { provide: ShippingDestinationModal_model_1.ShippingDestinationModalModel.PROVIDER, useFactory: function () { return new GenericProvider_1.GenericProvider(); } },
                { provide: SpecifyTimeModal_model_1.SpecifyTimeModalModel.PROVIDER, useFactory: function () { return new GenericProvider_1.GenericProvider(); } }
            ]
        }),
        __param(0, core_1.Inject(ProductInfoBox_model_1.ProductInfoBoxModel.PROVIDER)),
        __param(1, core_1.Inject(ShippingDestinationModal_model_1.ShippingDestinationModalModel.PROVIDER)),
        __param(2, core_1.Inject(SpecifyTimeModal_model_1.SpecifyTimeModalModel.PROVIDER)), 
        __metadata('design:paramtypes', [GenericProvider_1.GenericProvider, GenericProvider_1.GenericProvider, GenericProvider_1.GenericProvider])
    ], ProductInfoBoxComponent);
    return ProductInfoBoxComponent;
}());
exports.ProductInfoBoxComponent = ProductInfoBoxComponent;
//# sourceMappingURL=ProductInfoBox.component.js.map