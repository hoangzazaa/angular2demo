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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require("@angular/core");
var SFN0307_service_1 = require("../SFN0307.service");
var SFN0307_page_1 = require("../SFN0307.page");
var ProductInfoBox_model_1 = require("../../../../component/product-info-box/ProductInfoBox.model");
var GenericProvider_1 = require("../../../../component/GenericProvider");
var SFN0307_helper_1 = require("../SFN0307.helper");
var SFN0307_constants_1 = require("../SFN0307.constants");
var SFN030701Component = (function (_super) {
    __extends(SFN030701Component, _super);
    function SFN030701Component(service, page, provider) {
        _super.call(this);
        this.service = service;
        this.page = page;
        provider.provider = this;
        // setting
        this.data.displayCheck = true;
        this.data.exportDisplayed = true;
        this.data.isInputLot = true;
        this.data.isInputPrice = true;
        // loading address
        this.data.loadings = this.page.pageData.loadings;
        // shipping destination
        this.data.destinations = this.page.pageData.destinations;
    }
    SFN030701Component.prototype.ngOnInit = function () {
        // set data product
        this.order = this.page.pageData.orders[this.index];
        // set data
        this.data.product = this.order;
        this.data.manufacture = this.order;
        this.data.shippings = this.order.shippings;
        // disable change order when update shipping
        if (this.page.pageData.screenMode == SFN0307_constants_1.SFN0307Constants.MODE_UPDATE
            && this.order.id != undefined) {
            // disable check
            this.data.enableCheck = false;
            // disable edit lot and price
            // this.data.isInputLot = false;
            // this.data.isInputPrice = false;
            this.data.exportEnabled = true;
        }
    };
    //region Actions
    SFN030701Component.prototype.viewDetail = function () {
        this.page.viewProductInfo(this.index);
    };
    SFN030701Component.prototype.exportPdf = function () {
        this.page.exportPdf(this.index);
    };
    SFN030701Component.prototype.addShipping = function (index) {
        var shippingPlan = SFN0307_helper_1.SFN0307Helper.createNewShipping(this.order, this.page.pageData);
        this.order.shippings.splice(index + 1, 0, shippingPlan);
    };
    SFN030701Component.prototype.removeShipping = function (index) {
        this.order.shippings.splice(index, 1);
    };
    SFN030701Component.prototype.saveDestination = function (destination) {
        var _this = this;
        return this.page.saveDestination(destination).then(function () {
            // selected added destination
            var destinations = _this.page.pageData.destinations;
            var destination = destinations[destinations.length - 1];
            _this.data.tmpShipping.pib_destinationId = destination.sdm_id;
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], SFN030701Component.prototype, "index", void 0);
    SFN030701Component = __decorate([
        core_1.Component({
            selector: "[sfn030701]",
            template: "\n        <div product-info-box></div>",
            providers: [{ provide: ProductInfoBox_model_1.ProductInfoBoxModel.PROVIDER, useFactory: function () { return new GenericProvider_1.GenericProvider(); } }]
        }),
        __param(2, core_1.Inject(ProductInfoBox_model_1.ProductInfoBoxModel.PROVIDER)), 
        __metadata('design:paramtypes', [SFN0307_service_1.SFN0307Service, SFN0307_page_1.SFN0307Page, GenericProvider_1.GenericProvider])
    ], SFN030701Component);
    return SFN030701Component;
}(ProductInfoBox_model_1.ProductInfoBoxModel));
exports.SFN030701Component = SFN030701Component;
//# sourceMappingURL=SFN030701.OrderItem.component.js.map