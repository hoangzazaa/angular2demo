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
var data_util_1 = require("../../../../util/data-util");
var mst_data_type_1 = require("../../../../helper/mst-data-type");
var DealModel_1 = require("../../COMMON/dealinfo/model/DealModel");
var SF0030703PayInstructions = (function () {
    function SF0030703PayInstructions() {
    }
    Object.defineProperty(SF0030703PayInstructions.prototype, "shippingCompanyOptions", {
        get: function () {
            return data_util_1.default.toSelectBoxDataSource(mst_data_type_1.SHIPPING_COMPANY);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030703PayInstructions.prototype, "limitQuantityOptions", {
        get: function () {
            return data_util_1.default.toSelectBoxDataSource(mst_data_type_1.LIMIT_QUANTITY);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030703PayInstructions.prototype, "specifyTimeOptions", {
        get: function () {
            return [
                { id: 10, name: mst_data_type_1.SPECIFY_TIME[10] },
                { id: 1, name: mst_data_type_1.SPECIFY_TIME[1] },
                { id: 4, name: mst_data_type_1.SPECIFY_TIME[4] },
                { id: 6, name: mst_data_type_1.SPECIFY_TIME[6] },
                { id: 7, name: mst_data_type_1.SPECIFY_TIME[7] },
                { id: 8, name: mst_data_type_1.SPECIFY_TIME[8] },
                { id: 9, name: mst_data_type_1.SPECIFY_TIME[9] },
                { id: 2, name: mst_data_type_1.SPECIFY_TIME[2] },
                { id: 11, name: mst_data_type_1.SPECIFY_TIME[11] },
                { id: 12, name: mst_data_type_1.SPECIFY_TIME[12] },
                { id: 13, name: mst_data_type_1.SPECIFY_TIME[13] },
                { id: 14, name: mst_data_type_1.SPECIFY_TIME[14] },
            ];
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], SF0030703PayInstructions.prototype, "shippingInstructions", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', DealModel_1.DealInfoModel)
    ], SF0030703PayInstructions.prototype, "dealInfo", void 0);
    SF0030703PayInstructions = __decorate([
        core_1.Component({
            selector: "pay-instructions",
            templateUrl: "SF0030703.PayInstructions.component.html"
        }), 
        __metadata('design:paramtypes', [])
    ], SF0030703PayInstructions);
    return SF0030703PayInstructions;
}());
exports.SF0030703PayInstructions = SF0030703PayInstructions;
//# sourceMappingURL=SF0030703.PayInstructions.component.js.map