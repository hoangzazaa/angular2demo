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
var validator_util_1 = require("../../../../../util/validator-util");
var data_util_1 = require("../../../../../util/data-util");
var master_option_1 = require("../../helper/master-option");
var math_util_1 = require("../../../../../util/math-util");
/**
 * 打抜・貼り工程セクション
 * @author DungTQ
 */
var SF0030212Component = (function () {
    function SF0030212Component() {
        //3007
        this.pasteIdOption = data_util_1.default.toSelectBoxDataSource(master_option_1.PASTE_ID);
        this.pasteNotAOption = data_util_1.default.toSelectBoxDataSource(master_option_1.PASTE_ID_NOT_A);
    }
    Object.defineProperty(SF0030212Component.prototype, "isRequestDesign", {
        get: function () {
            return this.helper.getSF00302Data().isRequestDesign;
        },
        enumerable: true,
        configurable: true
    });
    SF0030212Component.prototype.isNumeric = function ($event) {
        return validator_util_1.default.isNumeric($event);
    };
    Object.defineProperty(SF0030212Component.prototype, "isView", {
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
    Object.defineProperty(SF0030212Component.prototype, "isCreateNewProduct", {
        get: function () {
            return this.helper.getSF00302Data().isCreateNewProduct;
        },
        enumerable: true,
        configurable: true
    });
    SF0030212Component.prototype.isHighlighted = function (input) {
        return this.helper.getSF00302Data().highlightedTracker.isHighlightedProperty(input);
    };
    Object.defineProperty(SF0030212Component.prototype, "stateProductDieCutting", {
        /**
         * Get state if Product Stamping Accordion is filled with data or not
         * */
        get: function () {
            if (this.helper.getSF00302Data().product.dieCuttingThroughNumber != undefined
                && this.helper.getSF00302Data().product.pasteId != undefined
                && this.helper.getSF00302Data().product.dieCuttingThroughNumber.toString() != "") {
                return true;
            }
            else {
                return false;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030212Component.prototype, "dieCuttingThroughNumber", {
        // dieCuttingThroughNumber
        get: function () {
            this.helper.getSF00302Data().product.dieCuttingThroughNumber = math_util_1.default.checkNaN(this.helper.getSF00302Data().product.dieCuttingThroughNumber);
            return this.helper.getSF00302Data().product.dieCuttingThroughNumber;
        },
        set: function (value) {
            this.helper.getSF00302Data().highlightedTracker.touch('dieCuttingThroughNumber');
            if (this.helper.getSF00302Data().product.dieCuttingThroughNumber !== value) {
                this.helper.getSF00302Data().product.specialDieCuttingNumberFlag = 1;
            }
            this.helper.getSF00302Data().product.dieCuttingThroughNumber = value;
            this.helper.calcDieCuttingWeight();
            this.helper.calcDieCuttingLoss();
            this.helper.calcDieCuttingBasicCost();
            this.helper.calcDieCuttingThroughWage();
            this.helper.calcDieCuttingTotalCost();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030212Component.prototype, "pasteId", {
        // pasteId
        get: function () {
            if (this.helper.getSF00302Data().product.pasteId == undefined) {
                this.helper.getSF00302Data().product.pasteId = 0;
            }
            return this.helper.getSF00302Data().product.pasteId;
        },
        set: function (value) {
            this.helper.getSF00302Data().highlightedTracker.touch('pasteId');
            if (value == 0) {
                value = null;
            }
            this.setPasteSpecialFormFlagConcealed(value == 7);
            this.helper.getSF00302Data().product.pasteId = value;
            this.helper.calcPasteLoss();
            this.helper.calcPasteBasicCost();
            this.helper.calcPasteThroughWage();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030212Component.prototype, "pasteSpecialFormFlag", {
        get: function () {
            if (this.helper.getSF00302Data().product.pasteSpecialFormFlag > 0) {
                return true;
            }
            else {
                return false;
            }
        },
        set: function (value) {
            if (value != this.pasteSpecialFormFlag) {
                this.helper.getSF00302Data().highlightedTracker.touch('pasteSpecialFormFlag');
            }
            this.setPasteSpecialFormFlagConcealed(value);
            this.helper.calcPasteBasicCost();
            this.helper.calcPasteThroughWage();
        },
        enumerable: true,
        configurable: true
    });
    SF0030212Component.prototype.setPasteSpecialFormFlagConcealed = function (value) {
        if (value) {
            this.helper.getSF00302Data().product.pasteSpecialFormFlag = 1;
        }
        else {
            this.helper.getSF00302Data().product.pasteSpecialFormFlag = 0;
        }
    };
    Object.defineProperty(SF0030212Component.prototype, "pasteOption", {
        get: function () {
            if (this.helper.getSF00302Data().product.productType == 0) {
                return this.pasteIdOption;
            }
            else {
                return this.pasteNotAOption;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030212Component.prototype, "dieCuttingFlag", {
        get: function () {
            if (this.helper.getSF00302Data().product.dieCuttingFlag == undefined) {
                this.helper.getSF00302Data().product.dieCuttingFlag = 0;
            }
            return this.helper.getSF00302Data().product.dieCuttingFlag;
        },
        set: function (value) {
            if (value != this.dieCuttingFlag) {
                this.helper.getSF00302Data().highlightedTracker.touch('dieCuttingFlag');
            }
            this.helper.getSF00302Data().product.dieCuttingFlag = value;
            if (this.helper.getSF00302Data().product.productType == 0 && this.helper.getSF00302Data().product.shapeId == 98) {
                this.helper.calcPaperTotalCost();
                this.helper.calcLaminationTotalCost();
                this.helper.calcColorBasicCost(1);
                this.helper.calcColorPrintLoss(1);
                this.helper.calcColorBasicCost(2);
                this.helper.calcColorPrintLoss(2);
                this.helper.calcPasteBasicCost();
                this.helper.calcPasteThroughWage();
                this.helper.calcPacking();
            }
            else if (this.helper.getSF00302Data().product.productType == 1 && this.helper.sf00302Data.product.cartonShippingType == 1) {
                this.helper.calcPasteTotalCost();
                this.helper.calcCartonLotGap();
            }
            this.helper.calcDieCuttingWeight();
            this.helper.calcDieCuttingLoss();
            this.helper.calcDieCuttingBasicCost();
            this.helper.calcDieCuttingThroughWage();
            this.helper.calcDieCuttingTotalCost();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030212Component.prototype, "dieCuttingFlagOption", {
        get: function () {
            return master_option_1.DIE_CUTTING_FLAG;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SF0030212Component.prototype, "helper", void 0);
    SF0030212Component = __decorate([
        core_1.Component({
            templateUrl: "SF0030212.component.html",
            selector: 'sf0030212'
        }), 
        __metadata('design:paramtypes', [])
    ], SF0030212Component);
    return SF0030212Component;
}());
exports.SF0030212Component = SF0030212Component;
//# sourceMappingURL=SF0030212.component.js.map