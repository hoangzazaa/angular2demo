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
var CommonDirective_module_1 = require("../../directive/CommonDirective.module");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var ShippingDestinationModal_component_1 = require("./ShippingDestinationModal.component");
var SpecifyTimeModal_module_1 = require("../specify-time-modal/SpecifyTimeModal.module");
var ShippingDestinationModalModule = (function () {
    function ShippingDestinationModalModule() {
    }
    ShippingDestinationModalModule = __decorate([
        core_1.NgModule({
            imports: [
                forms_1.FormsModule,
                common_1.CommonModule,
                CommonDirective_module_1.CommonDirectiveModule,
                SpecifyTimeModal_module_1.SpecifyTimeModalModule
            ],
            declarations: [
                ShippingDestinationModal_component_1.ShippingDestinationModalComponent
            ],
            exports: [
                ShippingDestinationModal_component_1.ShippingDestinationModalComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], ShippingDestinationModalModule);
    return ShippingDestinationModalModule;
}());
exports.ShippingDestinationModalModule = ShippingDestinationModalModule;
//# sourceMappingURL=ShippingDestinationModal.module.js.map