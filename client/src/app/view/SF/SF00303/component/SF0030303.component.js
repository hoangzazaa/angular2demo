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
var Item_1 = require("../../../../model/common/Item");
var ProductCommonFee_model_1 = require("../../../../model/core/ProductCommonFee.model");
var DealProduct_model_1 = require("../../../../model/core/DealProduct.model");
var SF0030303Component = (function () {
    function SF0030303Component() {
        this.item = new Item_1.Item();
        this.addProductCommon = new core_1.EventEmitter();
    }
    /**
     * Method use to add product common fee.
     * @param valueName
     * @param valueNumber
     */
    SF0030303Component.prototype.addProductCommonRow = function (valueName, valueNumber, itemType) {
        /*set value name*/
        this.item.valueName = valueName;
        /*set value number*/
        this.item.valueNumber = valueNumber;
        /*set deal product*/
        this.item.dealProduct = this.dealProduct;
        /*set item type*/
        this.item.itemType = itemType;
        // change emit call page ts
        this.addProductCommon.emit(this.item);
    };
    Object.defineProperty(SF0030303Component.prototype, "designFee", {
        get: function () {
            if (this.productCommonFee.designFee == undefined)
                return 0;
            return this.productCommonFee.designFee;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030303Component.prototype, "plateMakingFee", {
        get: function () {
            if (this.productCommonFee.plateMakingFee == undefined)
                return 0;
            return this.productCommonFee.plateMakingFee;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030303Component.prototype, "woodenFee", {
        get: function () {
            if (this.productCommonFee.woodenFee == undefined)
                return 0;
            return this.productCommonFee.woodenFee;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030303Component.prototype, "moldFee", {
        get: function () {
            if (this.productCommonFee.moldFee == undefined)
                return 0;
            return this.productCommonFee.moldFee;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030303Component.prototype, "resinFee", {
        get: function () {
            if (this.productCommonFee.resinFee == undefined)
                return 0;
            return this.productCommonFee.resinFee;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(), 
        __metadata('design:type', ProductCommonFee_model_1.ProductCommonFee)
    ], SF0030303Component.prototype, "productCommonFee", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], SF0030303Component.prototype, "productCode", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', DealProduct_model_1.DealProduct)
    ], SF0030303Component.prototype, "dealProduct", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SF0030303Component.prototype, "addProductCommon", void 0);
    SF0030303Component = __decorate([
        core_1.Component({
            selector: 'sf0030303',
            templateUrl: './SF0030303.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], SF0030303Component);
    return SF0030303Component;
}());
exports.SF0030303Component = SF0030303Component;
//# sourceMappingURL=SF0030303.component.js.map