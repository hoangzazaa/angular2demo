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
var master_option_1 = require("../../helper/master-option");
var SF0030209Component = (function () {
    function SF0030209Component() {
    }
    Object.defineProperty(SF0030209Component.prototype, "isRequestDesign", {
        get: function () {
            return this.helper.getSF00302Data().isRequestDesign;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030209Component.prototype, "isView", {
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
    Object.defineProperty(SF0030209Component.prototype, "isCreateNewProduct", {
        get: function () {
            return this.helper.getSF00302Data().isCreateNewProduct;
        },
        enumerable: true,
        configurable: true
    });
    SF0030209Component.prototype.isHighlighted = function (input) {
        return this.helper.getSF00302Data().highlightedTracker.isHighlightedProperty(input);
    };
    Object.defineProperty(SF0030209Component.prototype, "stateSurfaceTreatment", {
        /**
         * Get state if Product Stamping Accordion is filled with data or not
         * */
        get: function () {
            if (this.helper.getSF00302Data().product.surfaceTreatmentIdF != undefined &&
                this.helper.getSF00302Data().product.surfaceTreatmentIdB != undefined) {
                return true;
            }
            else {
                return false;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030209Component.prototype, "surfaceTreatmentIdF", {
        // surfaceTreatmentIdF
        get: function () {
            if (this.helper.getSF00302Data().product.surfaceTreatmentIdF == undefined) {
                this.helper.getSF00302Data().product.surfaceTreatmentIdF = 0;
            }
            return this.helper.getSF00302Data().product.surfaceTreatmentIdF;
        },
        set: function (value) {
            this.helper.getSF00302Data().highlightedTracker.touch('surfaceTreatmentIdF');
            this.helper.getSF00302Data().product.surfaceTreatmentIdF = value;
            if (this.helper.getSF00302Data().product.printMethod == 1) {
                this.helper.calcColorPlateCost(1);
                this.helper.calcColorPrintLoss(1);
                this.helper.calcColorCostPerPacket(1);
                this.helper.calcColorBasicCost(1);
                this.helper.calcColorThroughWage(1);
                this.helper.calcColorSpecial(1);
            }
            if ((this.helper.getSF00302Data().product.printMethod == 0 || this.helper.getSF00302Data().product.printMethod == 2) && this.helper.getSF00302Data().product.surfaceTreatmentIdF < 19
                && this.helper.getSF00302Data().product.surfaceTreatmentIdF != 8
                && this.helper.getSF00302Data().product.surfaceTreatmentIdF != 17) {
                this.helper.getSF00302Data().productOutput.colorPlateCostF = 0;
                this.helper.getSF00302Data().productOutput.colorPrintThroughWageF = 0;
                this.helper.getSF00302Data().productOutput.colorPrintBasicCostF = 0;
                this.helper.getSF00302Data().productOutput.colorPrintTotalCostF = 0;
                this.helper.getSF00302Data().productOutput.colorPrintPerPacketCostF = 0;
                this.helper.getSF00302Data().productOutput.colorPrintSpecialCostF = 0;
                this.helper.getSF00302Data().productOutput.colorPrintTotalCostF = 0;
            }
            this.helper.calcSurfaceBasicCost(1);
            this.helper.calcSurfaceThroughWage(1);
            this.helper.calcSurfaceTotalCost(1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030209Component.prototype, "surfaceTreatmentIdB", {
        // surfaceTreatmentIdB
        get: function () {
            if (this.helper.getSF00302Data().product.surfaceTreatmentIdB == undefined) {
                this.helper.getSF00302Data().product.surfaceTreatmentIdB = 0;
            }
            return this.helper.getSF00302Data().product.surfaceTreatmentIdB;
        },
        set: function (value) {
            this.helper.getSF00302Data().highlightedTracker.touch('surfaceTreatmentIdB');
            this.helper.getSF00302Data().product.surfaceTreatmentIdB = value;
            if (this.helper.getSF00302Data().product.printMethod == 1) {
                this.helper.calcColorPlateCost(2);
                this.helper.calcColorPrintLoss(2);
                this.helper.calcColorCostPerPacket(2);
                this.helper.calcColorBasicCost(2);
                this.helper.calcColorThroughWage(2);
                this.helper.calcColorSpecial(2);
            }
            if ((this.helper.getSF00302Data().product.printMethod == 0 || this.helper.getSF00302Data().product.printMethod == 2) && this.helper.getSF00302Data().product.surfaceTreatmentIdB < 19
                && this.helper.getSF00302Data().product.surfaceTreatmentIdB != 8
                && this.helper.getSF00302Data().product.surfaceTreatmentIdB != 17) {
                this.helper.getSF00302Data().productOutput.colorPlateCostB = 0;
                this.helper.getSF00302Data().productOutput.colorPrintThroughWageB = 0;
                this.helper.getSF00302Data().productOutput.colorPrintBasicCostB = 0;
                this.helper.getSF00302Data().productOutput.colorPrintTotalCostB = 0;
                this.helper.getSF00302Data().productOutput.colorPrintPerPacketCostB = 0;
                this.helper.getSF00302Data().productOutput.colorPrintSpecialCostB = 0;
                this.helper.getSF00302Data().productOutput.colorPrintTotalCostB = 0;
            }
            this.helper.calcSurfaceBasicCost(2);
            this.helper.calcSurfaceThroughWage(2);
            this.helper.calcSurfaceTotalCost(2);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030209Component.prototype, "embossingID", {
        // embossingID
        get: function () {
            if (this.helper.getSF00302Data().product.embossingID) {
                return true;
            }
            else {
                return false;
            }
        },
        set: function (value) {
            this.helper.getSF00302Data().highlightedTracker.touch('embossingID');
            if (value == true) {
                this.helper.getSF00302Data().product.embossingID = 5;
            }
            else {
                this.helper.getSF00302Data().product.embossingID = Number.NaN;
            }
            this.helper.calcSurfaceBasicCost(3);
            this.helper.calcSurfaceThroughWage(3);
            this.helper.calcSurfaceTotalCost(3);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030209Component.prototype, "embossingCode", {
        get: function () {
            if (this.helper.getSF00302Data().product.embossingCode == undefined) {
                this.helper.getSF00302Data().product.embossingCode = "0";
            }
            return this.helper.getSF00302Data().product.embossingCode;
        },
        set: function (value) {
            this.helper.getSF00302Data().product.embossingCode = value;
            if (value == "0") {
                this.embossingID = false;
            }
            else {
                this.embossingID = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030209Component.prototype, "surfaceOption", {
        get: function () {
            return master_option_1.SURFACE_TREATMENT;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030209Component.prototype, "embossingOption", {
        get: function () {
            return master_option_1.EMBOSSING;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SF0030209Component.prototype, "helper", void 0);
    SF0030209Component = __decorate([
        core_1.Component({
            templateUrl: "SF0030209.component.html",
            selector: 'sf0030209'
        }), 
        __metadata('design:paramtypes', [])
    ], SF0030209Component);
    return SF0030209Component;
}());
exports.SF0030209Component = SF0030209Component;
//# sourceMappingURL=SF0030209.component.js.map