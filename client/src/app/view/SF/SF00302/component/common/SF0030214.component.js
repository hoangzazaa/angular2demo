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
var mst_data_type_1 = require("../../../../../helper/mst-data-type");
var SF0030214Component = (function () {
    function SF0030214Component() {
        this.unitTypes = data_util_1.default.toSelectBoxDataSource(mst_data_type_1.OTHER_UNIT);
    }
    Object.defineProperty(SF0030214Component.prototype, "isRequestDesign", {
        get: function () {
            return this.helper.getSF00302Data().isRequestDesign;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030214Component.prototype, "isView", {
        get: function () {
            if (this.isRequestDesign) {
                return false;
            }
            else {
                return this.helper.sf00302Data.isView;
            }
        },
        enumerable: true,
        configurable: true
    });
    SF0030214Component.prototype.isHighlighted = function (input) {
        return this.helper.sf00302Data.highlightedTracker.isHighlightedProperty(input);
    };
    Object.defineProperty(SF0030214Component.prototype, "isCreateNewProduct", {
        get: function () {
            return this.helper.getSF00302Data().isCreateNewProduct;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030214Component.prototype, "stateProductOther", {
        /**
         * Get state if Product Stamping Accordion is filled with data or not
         * */
        get: function () {
            if (this.helper.sf00302Data.product.otherWage1 != undefined
                && this.helper.sf00302Data.product.otherWage1 != 0
                && this.helper.sf00302Data.product.otherUnitType1 != undefined &&
                this.helper.sf00302Data.product.otherWage2 != undefined
                && this.helper.sf00302Data.product.otherWage2 != 0
                && this.helper.sf00302Data.product.otherUnitType2 != undefined &&
                this.helper.sf00302Data.product.otherWage3 != undefined
                && this.helper.sf00302Data.product.otherWage3 != 0
                && this.helper.sf00302Data.product.otherUnitType3 != undefined) {
                return true;
            }
            else {
                return false;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030214Component.prototype, "otherExpense1", {
        get: function () {
            return this.helper.sf00302Data.product.otherExpense1;
        },
        set: function (value) {
            this.helper.sf00302Data.highlightedTracker.touch('expense1');
            this.helper.sf00302Data.product.otherExpense1 = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030214Component.prototype, "otherExpense2", {
        get: function () {
            return this.helper.sf00302Data.product.otherExpense2;
        },
        set: function (value) {
            this.helper.sf00302Data.highlightedTracker.touch('expense2');
            this.helper.sf00302Data.product.otherExpense2 = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030214Component.prototype, "otherExpense3", {
        get: function () {
            return this.helper.sf00302Data.product.otherExpense3;
        },
        set: function (value) {
            this.helper.sf00302Data.highlightedTracker.touch('expense3');
            this.helper.sf00302Data.product.otherExpense3 = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030214Component.prototype, "otherWage1", {
        get: function () {
            return this.helper.sf00302Data.product.otherWage1;
        },
        set: function (value) {
            this.helper.sf00302Data.highlightedTracker.touch('expense1');
            this.helper.sf00302Data.product.otherWage1 = value;
            if (this.helper.sf00302Data.product.shapeId != this.helper.sf00302Data.DECORATIVE_ID) {
                this.helper.calcOtherFee();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030214Component.prototype, "otherWage2", {
        get: function () {
            return this.helper.sf00302Data.product.otherWage2;
        },
        set: function (value) {
            this.helper.sf00302Data.highlightedTracker.touch('expense2');
            this.helper.sf00302Data.product.otherWage2 = value;
            if (this.helper.sf00302Data.product.shapeId != this.helper.sf00302Data.DECORATIVE_ID) {
                this.helper.calcOtherFee();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030214Component.prototype, "otherWage3", {
        get: function () {
            return this.helper.sf00302Data.product.otherWage3;
        },
        set: function (value) {
            this.helper.sf00302Data.highlightedTracker.touch('expense3');
            this.helper.sf00302Data.product.otherWage3 = value;
            if (this.helper.sf00302Data.product.shapeId != this.helper.sf00302Data.DECORATIVE_ID) {
                this.helper.calcOtherFee();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030214Component.prototype, "otherUnitType1", {
        get: function () {
            if (this.helper.sf00302Data.product.otherUnitType1 == undefined) {
                this.helper.sf00302Data.product.otherUnitType1 = 1;
            }
            return this.helper.sf00302Data.product.otherUnitType1;
        },
        set: function (value) {
            this.helper.sf00302Data.highlightedTracker.touch('unitType1');
            this.helper.sf00302Data.product.otherUnitType1 = value;
            if (this.helper.sf00302Data.product.shapeId != this.helper.sf00302Data.DECORATIVE_ID) {
                this.helper.calcOtherFee();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030214Component.prototype, "otherUnitType2", {
        get: function () {
            if (this.helper.sf00302Data.product.otherUnitType2 == undefined) {
                this.helper.sf00302Data.product.otherUnitType2 = 1;
            }
            return this.helper.sf00302Data.product.otherUnitType2;
        },
        set: function (value) {
            this.helper.sf00302Data.highlightedTracker.touch('unitType2');
            this.helper.sf00302Data.product.otherUnitType2 = value;
            if (this.helper.sf00302Data.product.shapeId != this.helper.sf00302Data.DECORATIVE_ID) {
                this.helper.calcOtherFee();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030214Component.prototype, "otherUnitType3", {
        get: function () {
            if (this.helper.sf00302Data.product.otherUnitType3 == undefined) {
                this.helper.sf00302Data.product.otherUnitType3 = 1;
            }
            return this.helper.sf00302Data.product.otherUnitType3;
        },
        set: function (value) {
            this.helper.sf00302Data.highlightedTracker.touch('unitType3');
            this.helper.sf00302Data.product.otherUnitType3 = value;
            if (this.helper.sf00302Data.product.shapeId != this.helper.sf00302Data.DECORATIVE_ID) {
                this.helper.calcOtherFee();
            }
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SF0030214Component.prototype, "helper", void 0);
    SF0030214Component = __decorate([
        core_1.Component({
            templateUrl: "SF0030214.component.html",
            selector: 'sf0030214'
        }), 
        __metadata('design:paramtypes', [])
    ], SF0030214Component);
    return SF0030214Component;
}());
exports.SF0030214Component = SF0030214Component;
//# sourceMappingURL=SF0030214.component.js.map