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
var data_util_1 = require("../../../../../util/data-util");
var master_option_1 = require("../../helper/master-option");
var SF0030213Component = (function () {
    function SF0030213Component() {
        //3007
        this.inspectionOption = data_util_1.default.toSelectBoxDataSource(master_option_1.INSPECTION_ID);
        this.packingOption = data_util_1.default.toSelectBoxDataSource(master_option_1.PACKING_ID);
        this.shippingCostOption = data_util_1.default.toSelectBoxDataSource(master_option_1.SHIPPING_COST_ID);
    }
    Object.defineProperty(SF0030213Component.prototype, "isRequestDesign", {
        get: function () {
            return this.helper.getSF00302Data().isRequestDesign;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030213Component.prototype, "isView", {
        get: function () {
            if (this.isRequestDesign) {
                return false;
            }
            else {
                return this.helper.getSF00302Data().isView;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030213Component.prototype, "isCreateNewProduct", {
        get: function () {
            return this.helper.getSF00302Data().isCreateNewProduct;
        },
        enumerable: true,
        configurable: true
    });
    SF0030213Component.prototype.isHighlighted = function (input) {
        return this.helper.getSF00302Data().highlightedTracker.isHighlightedProperty(input);
    };
    Object.defineProperty(SF0030213Component.prototype, "stateProductOther", {
        /**
         * Get state if Product Stamping Accordion is filled with data or not
         * */
        get: function () {
            if (this.helper.getSF00302Data().product.shippingCostId != undefined
                && this.helper.getSF00302Data().product.inspectionId != undefined
                && this.helper.getSF00302Data().product.packingId != undefined) {
                return true;
            }
            else {
                return false;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030213Component.prototype, "inspectionId", {
        // inspectionId
        get: function () {
            if (this.helper.getSF00302Data().product.inspectionId == undefined || this.helper.getSF00302Data().product.inspectionId == 1) {
                this.helper.getSF00302Data().product.inspectionId = 1;
            }
            return this.helper.getSF00302Data().product.inspectionId;
        },
        set: function (value) {
            this.helper.getSF00302Data().highlightedTracker.touch('inspectionId');
            this.setInspectionConcealed(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030213Component.prototype, "packingId", {
        // packingId
        get: function () {
            if (this.helper.getSF00302Data().product.packingId == undefined) {
                this.helper.getSF00302Data().product.packingId = 0;
            }
            return this.helper.getSF00302Data().product.packingId;
        },
        set: function (value) {
            this.helper.getSF00302Data().highlightedTracker.touch('packingId');
            this.setPackingConcealed(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030213Component.prototype, "checkBorderRequiredAdditionalWork", {
        get: function () {
            return { style: "solid 2px #5c90d2", radius: "50%" };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030213Component.prototype, "requiredAdditionalWork", {
        get: function () {
            if (this.helper.getSF00302Data().product.requiredAdditionalWork == undefined) {
                this.helper.getSF00302Data().product.requiredAdditionalWork = 0;
            }
            return this.helper.getSF00302Data().product.requiredAdditionalWork;
        },
        set: function (value) {
            this.helper.getSF00302Data().highlightedTracker.touch('requiredAdditionalWork');
            this.helper.getSF00302Data().product.requiredAdditionalWork = value;
            this.helper.calcAdditionFare();
        },
        enumerable: true,
        configurable: true
    });
    SF0030213Component.prototype.setRequiredAdditionalWork = function (value) {
        this.requiredAdditionalWork = value;
    };
    Object.defineProperty(SF0030213Component.prototype, "shippingCostId", {
        // fareId
        get: function () {
            if (this.helper.getSF00302Data().product.shippingCostId == undefined) {
                this.helper.getSF00302Data().product.shippingCostId = 0;
            }
            return this.helper.getSF00302Data().product.shippingCostId;
        },
        set: function (value) {
            this.helper.getSF00302Data().highlightedTracker.touch('shippingCostId');
            this.setShippingConcealed(value);
        },
        enumerable: true,
        configurable: true
    });
    SF0030213Component.prototype.setPackingConcealed = function (value) {
        this.helper.getSF00302Data().product.packingId = value;
        this.helper.calcPacking();
    };
    SF0030213Component.prototype.setShippingConcealed = function (value) {
        this.helper.getSF00302Data().product.shippingCostId = value;
        this.helper.calcShippingCost();
    };
    SF0030213Component.prototype.setInspectionConcealed = function (value) {
        this.helper.getSF00302Data().product.inspectionId = value;
        this.helper.calcInspection();
        this.helper.calcPacking();
    };
    Object.defineProperty(SF0030213Component.prototype, "checkOverWeight", {
        get: function () {
            return this.helper.getSF00302Data().checkOverWeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030213Component.prototype, "packingInputNumber", {
        // packingInputNumber
        get: function () {
            return this.helper.getSF00302Data().product.packingInputNumber;
        },
        set: function (value) {
            this.helper.getSF00302Data().product.packingInputNumber = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030213Component.prototype, "passageNo", {
        // passageNo
        get: function () {
            return this.helper.getSF00302Data().product.passageNo;
        },
        set: function (value) {
            this.helper.getSF00302Data().product.passageNo = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030213Component.prototype, "packingNote", {
        // packingNote
        get: function () {
            return this.helper.getSF00302Data().product.packingNote;
        },
        set: function (value) {
            this.helper.getSF00302Data().product.packingNote = value;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SF0030213Component.prototype, "helper", void 0);
    SF0030213Component = __decorate([
        core_1.Component({
            templateUrl: "SF0030213.component.html",
            selector: 'sf0030213'
        }), 
        __metadata('design:paramtypes', [])
    ], SF0030213Component);
    return SF0030213Component;
}());
exports.SF0030213Component = SF0030213Component;
//# sourceMappingURL=SF0030213.component.js.map