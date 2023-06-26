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
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var CommonDirective_module_1 = require("../../directive/CommonDirective.module");
var ProductInfoBox_component_1 = require("./ProductInfoBox.component");
var BasicInfo_component_1 = require("./component/BasicInfo.component");
var forms_1 = require("@angular/forms");
var Shipping_component_1 = require("./component/Shipping.component");
var LoadingAddress_component_1 = require("./component/LoadingAddress.component");
var SpecifyTimeModal_module_1 = require("../specify-time-modal/SpecifyTimeModal.module");
var ShippingDestinationModal_module_1 = require("../shipping-destination-modal/ShippingDestinationModal.module");
var Manufacture_component_1 = require("./component/Manufacture.component");
var ProductInfoBoxModule = (function () {
    function ProductInfoBoxModule() {
    }
    ProductInfoBoxModule = __decorate([
        core_1.NgModule({
            imports: [
                forms_1.FormsModule,
                common_1.CommonModule,
                CommonDirective_module_1.CommonDirectiveModule,
                SpecifyTimeModal_module_1.SpecifyTimeModalModule,
                ShippingDestinationModal_module_1.ShippingDestinationModalModule
            ],
            declarations: [
                ProductInfoBox_component_1.ProductInfoBoxComponent,
                BasicInfo_component_1.BasicInfoComponent,
                Shipping_component_1.ShippingComponent,
                LoadingAddress_component_1.LoadingAddressComponent,
                Manufacture_component_1.ManufactureComponent
            ],
            exports: [
                ProductInfoBox_component_1.ProductInfoBoxComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], ProductInfoBoxModule);
    return ProductInfoBoxModule;
}());
exports.ProductInfoBoxModule = ProductInfoBoxModule;
//# sourceMappingURL=ProductInfoBox.module.js.map