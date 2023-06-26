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
var core_1 = require('@angular/core');
var SFN0402_Partner_model_1 = require('../model/SFN0402_Partner.model');
var SFN040207ShippingDestinationListComponent = (function () {
    function SFN040207ShippingDestinationListComponent() {
        /** 届け先編集画面への遷移要求 */
        this.showShippingDestination = new core_1.EventEmitter();
    }
    /**
     * 届け先編集画面への遷移
     *
     * @param shippingDestinationId 選択ボックスの選択値
     */
    SFN040207ShippingDestinationListComponent.prototype.moveTo = function (shippingDestinationId) {
        if (shippingDestinationId && String(shippingDestinationId).length) {
            this.showShippingDestination.emit(shippingDestinationId);
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', SFN0402_Partner_model_1.PartnerModel)
    ], SFN040207ShippingDestinationListComponent.prototype, "customer", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], SFN040207ShippingDestinationListComponent.prototype, "shippingDestinationList", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SFN040207ShippingDestinationListComponent.prototype, "showShippingDestination", void 0);
    SFN040207ShippingDestinationListComponent = __decorate([
        core_1.Component({
            selector: "[sfn040207-shippingDestinationList]",
            templateUrl: "SFN040207.ShippingDestinationList.component.html"
        }), 
        __metadata('design:paramtypes', [])
    ], SFN040207ShippingDestinationListComponent);
    return SFN040207ShippingDestinationListComponent;
}());
exports.SFN040207ShippingDestinationListComponent = SFN040207ShippingDestinationListComponent;
//# sourceMappingURL=SFN040207.ShippingDestinationList.component.js.map