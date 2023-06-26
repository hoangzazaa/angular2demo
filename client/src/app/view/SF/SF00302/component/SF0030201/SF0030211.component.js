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
var SF0030211Component = (function () {
    function SF0030211Component() {
    }
    SF0030211Component.prototype.isNumeric = function ($event) {
        return validator_util_1.default.isNumeric($event);
    };
    Object.defineProperty(SF0030211Component.prototype, "isView", {
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
    Object.defineProperty(SF0030211Component.prototype, "isRequestDesign", {
        get: function () {
            return this.helper.getSF00302Data().isRequestDesign;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030211Component.prototype, "isCreateNewProduct", {
        get: function () {
            return this.helper.getSF00302Data().isCreateNewProduct;
        },
        enumerable: true,
        configurable: true
    });
    SF0030211Component.prototype.isHighlighted = function (input) {
        return this.helper.getSF00302Data().highlightedTracker.isHighlightedProperty(input);
    };
    Object.defineProperty(SF0030211Component.prototype, "stateProductWindow", {
        /**
         * Get state if Product Window Accordion is filled with data or not
         * */
        get: function () {
            if (this.helper.getSF00302Data().product.windowSizeW != undefined && this.helper.getSF00302Data().product.windowSizeH != undefined
                && this.helper.getSF00302Data().product.windowSizeW != 0 && this.helper.getSF00302Data().product.windowSizeH != 0) {
                return true;
            }
            else {
                return false;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030211Component.prototype, "windowSizeW", {
        // windowSizeW
        get: function () {
            return this.helper.getSF00302Data().product.windowSizeW;
        },
        set: function (value) {
            this.helper.getSF00302Data().highlightedTracker.touch('windowSize');
            this.helper.getSF00302Data().product.windowSizeW = value;
            this.helper.calcWindowMaterialFee();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030211Component.prototype, "windowSizeH", {
        // windowSizeH
        get: function () {
            return this.helper.getSF00302Data().product.windowSizeH;
        },
        set: function (value) {
            this.helper.getSF00302Data().highlightedTracker.touch('windowSize');
            this.helper.getSF00302Data().product.windowSizeH = value;
            this.helper.calcWindowMaterialFee();
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SF0030211Component.prototype, "helper", void 0);
    SF0030211Component = __decorate([
        core_1.Component({
            templateUrl: "SF0030211.component.html",
            selector: 'sf0030211'
        }), 
        __metadata('design:paramtypes', [])
    ], SF0030211Component);
    return SF0030211Component;
}());
exports.SF0030211Component = SF0030211Component;
//# sourceMappingURL=SF0030211.component.js.map