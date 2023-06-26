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
var SF0030210Component = (function () {
    function SF0030210Component() {
        //3007
        this.stampingOption = data_util_1.default.toSelectBoxDataSource(master_option_1.STAMPING_ID);
    }
    Object.defineProperty(SF0030210Component.prototype, "isRequestDesign", {
        get: function () {
            return this.helper.getSF00302Data().isRequestDesign;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030210Component.prototype, "isView", {
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
    Object.defineProperty(SF0030210Component.prototype, "isCreateNewProduct", {
        get: function () {
            return this.helper.getSF00302Data().isCreateNewProduct;
        },
        enumerable: true,
        configurable: true
    });
    SF0030210Component.prototype.isHighlighted = function (input) {
        return this.helper.getSF00302Data().highlightedTracker.isHighlightedProperty(input);
    };
    Object.defineProperty(SF0030210Component.prototype, "stateProductStamping", {
        /**
         * Get state if Product Stamping Accordion is filled with data or not
         * */
        get: function () {
            if ((this.helper.getSF00302Data().product.stampingId != undefined && this.helper.getSF00302Data().product.stampingSizeW1 != undefined && this.helper.getSF00302Data().product.stampingSizeH1 != undefined)
                || this.helper.getSF00302Data().product.stampingId == 0) {
                return true;
            }
            else {
                return false;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030210Component.prototype, "stampingId", {
        // stampingId
        get: function () {
            if (this.helper.getSF00302Data().product.stampingId == undefined) {
                this.helper.getSF00302Data().product.stampingId = 0;
            }
            return this.helper.getSF00302Data().product.stampingId;
        },
        set: function (value) {
            this.helper.getSF00302Data().highlightedTracker.touch('stampingId');
            this.setStampingIdConcealed(value);
        },
        enumerable: true,
        configurable: true
    });
    SF0030210Component.prototype.setStampingIdConcealed = function (value) {
        this.helper.getSF00302Data().product.stampingId = value;
        if (value == 0) {
            this.helper.getSF00302Data().productOutput.stampingBasicCost = 0;
            this.helper.getSF00302Data().productOutput.stampingThroughWage = 0;
            this.helper.getSF00302Data().productOutput.stampingThroughWage = 0;
        }
        this.helper.calcStampingPointsNumber();
        this.helper.calcStampingBasicCost();
        this.helper.calcStampingThroughWage();
    };
    Object.defineProperty(SF0030210Component.prototype, "stampingSizeW1", {
        // stampingSizeW1
        get: function () {
            return this.helper.getSF00302Data().product.stampingSizeW1;
        },
        set: function (value) {
            this.helper.getSF00302Data().highlightedTracker.touch('stampingSize1');
            if (validator_util_1.default.isNotEmpty(value)) {
                this.helper.getSF00302Data().product.stampingSizeW1 = +value;
            }
            this.helper.calcStampingPointsNumber();
            this.helper.calcStampingThroughWage();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030210Component.prototype, "stampingSizeH1", {
        // stampingSizeH1
        get: function () {
            return this.helper.getSF00302Data().product.stampingSizeH1;
        },
        set: function (value) {
            this.helper.getSF00302Data().highlightedTracker.touch('stampingSize1');
            if (validator_util_1.default.isNotEmpty(value)) {
                this.helper.getSF00302Data().product.stampingSizeH1 = +value;
            }
            this.helper.calcStampingPointsNumber();
            this.helper.calcStampingThroughWage();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030210Component.prototype, "stampingSizeW2", {
        // stampingSizeW2
        get: function () {
            return this.helper.getSF00302Data().product.stampingSizeW2;
        },
        set: function (value) {
            this.helper.getSF00302Data().highlightedTracker.touch('stampingSize2');
            if (validator_util_1.default.isNotEmpty(value)) {
                this.helper.getSF00302Data().product.stampingSizeW2 = +value;
            }
            this.helper.calcStampingPointsNumber();
            this.helper.calcStampingThroughWage();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030210Component.prototype, "stampingSizeH2", {
        // stampingSizeH2
        get: function () {
            return this.helper.getSF00302Data().product.stampingSizeH2;
        },
        set: function (value) {
            this.helper.getSF00302Data().highlightedTracker.touch('stampingSize2');
            if (validator_util_1.default.isNotEmpty(value)) {
                this.helper.getSF00302Data().product.stampingSizeH2 = +value;
            }
            this.helper.calcStampingPointsNumber();
            this.helper.calcStampingThroughWage();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030210Component.prototype, "stampingSizeW3", {
        // stampingSizeW3
        get: function () {
            return this.helper.getSF00302Data().product.stampingSizeW3;
        },
        set: function (value) {
            this.helper.getSF00302Data().highlightedTracker.touch('stampingSize3');
            if (validator_util_1.default.isNotEmpty(value)) {
                this.helper.getSF00302Data().product.stampingSizeW3 = +value;
            }
            this.helper.calcStampingPointsNumber();
            this.helper.calcStampingThroughWage();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030210Component.prototype, "stampingSizeH3", {
        // stampingSizeH3
        get: function () {
            return this.helper.getSF00302Data().product.stampingSizeH3;
        },
        set: function (value) {
            this.helper.getSF00302Data().highlightedTracker.touch('stampingSize3');
            if (validator_util_1.default.isNotEmpty(value)) {
                this.helper.getSF00302Data().product.stampingSizeH3 = +value;
            }
            this.helper.calcStampingPointsNumber();
            this.helper.calcStampingThroughWage();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030210Component.prototype, "stampingSizeW4", {
        // stampingSizeW4
        get: function () {
            return this.helper.getSF00302Data().product.stampingSizeW4;
        },
        set: function (value) {
            this.helper.getSF00302Data().highlightedTracker.touch('stampingSize4');
            if (validator_util_1.default.isNotEmpty(value)) {
                this.helper.getSF00302Data().product.stampingSizeW4 = +value;
            }
            this.helper.calcStampingPointsNumber();
            this.helper.calcStampingThroughWage();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030210Component.prototype, "stampingSizeH4", {
        // stampingSizeH4
        get: function () {
            return this.helper.getSF00302Data().product.stampingSizeH4;
        },
        set: function (value) {
            this.helper.getSF00302Data().highlightedTracker.touch('stampingSize4');
            if (validator_util_1.default.isNotEmpty(value)) {
                this.helper.getSF00302Data().product.stampingSizeH4 = +value;
            }
            this.helper.calcStampingPointsNumber();
            this.helper.calcStampingThroughWage();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030210Component.prototype, "foilColor1", {
        // foilColor1
        get: function () {
            return this.helper.getSF00302Data().product.foilColor1;
        },
        set: function (value) {
            this.helper.getSF00302Data().product.foilColor1 = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030210Component.prototype, "foilColor2", {
        // foilColor2
        get: function () {
            return this.helper.getSF00302Data().product.foilColor2;
        },
        set: function (value) {
            this.helper.getSF00302Data().product.foilColor2 = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030210Component.prototype, "foilColor3", {
        // foilColor3
        get: function () {
            return this.helper.getSF00302Data().product.foilColor3;
        },
        set: function (value) {
            this.helper.getSF00302Data().product.foilColor3 = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030210Component.prototype, "stampingNumber", {
        get: function () {
            return this.helper.getSF00302Data().product.stampingNumber;
        },
        set: function (value) {
            this.helper.getSF00302Data().product.stampingNumber = value;
            this.helper.getSF00302Data().highlightedTracker.touch('stampingNumber');
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SF0030210Component.prototype, "helper", void 0);
    SF0030210Component = __decorate([
        core_1.Component({
            templateUrl: "SF0030210.component.html",
            selector: 'sf0030210'
        }), 
        __metadata('design:paramtypes', [])
    ], SF0030210Component);
    return SF0030210Component;
}());
exports.SF0030210Component = SF0030210Component;
//# sourceMappingURL=SF0030210.component.js.map