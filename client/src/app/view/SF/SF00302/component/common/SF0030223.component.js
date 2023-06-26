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
var SF00302_data_1 = require("../../SF00302.data");
var SF0030223Component = (function () {
    function SF0030223Component(sf00302Data) {
        this.sf00302Data = sf00302Data;
    }
    Object.defineProperty(SF0030223Component.prototype, "isRequestDesign", {
        get: function () {
            return this.helper.getSF00302Data().isRequestDesign;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030223Component.prototype, "isCreateNewProduct", {
        get: function () {
            return this.helper.getSF00302Data().isCreateNewProduct;
        },
        enumerable: true,
        configurable: true
    });
    SF0030223Component.prototype.isHighlighted = function (input) {
        return this.helper.getSF00302Data().highlightedTracker.isHighlightedProperty(input);
    };
    Object.defineProperty(SF0030223Component.prototype, "isView", {
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
    Object.defineProperty(SF0030223Component.prototype, "memo1", {
        get: function () {
            return this.helper.getSF00302Data().product.memo1;
        },
        set: function (value) {
            this.helper.getSF00302Data().product.memo1 = value;
            this.helper.getSF00302Data().highlightedTracker.touch('otherNote1');
            this.helper.getSF00302Data().product.specialNote1Flag = 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030223Component.prototype, "memo2", {
        get: function () {
            return this.helper.getSF00302Data().product.memo2;
        },
        set: function (value) {
            this.helper.getSF00302Data().product.memo2 = value;
            this.helper.getSF00302Data().highlightedTracker.touch('otherNote2');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030223Component.prototype, "memo3", {
        get: function () {
            return this.helper.getSF00302Data().product.memo3;
        },
        set: function (value) {
            this.helper.getSF00302Data().product.memo3 = value;
            this.helper.getSF00302Data().highlightedTracker.touch('otherNote3');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030223Component.prototype, "stateOtherNote", {
        get: function () {
            if (this.helper.getSF00302Data().product.memo3 != undefined && this.helper.getSF00302Data().product.memo3 != ""
                && this.helper.getSF00302Data().product.memo3 != undefined && this.helper.getSF00302Data().product.memo3 != ""
                && this.helper.getSF00302Data().product.memo3 != undefined && this.helper.getSF00302Data().product.memo3 != "") {
                return true;
            }
            else {
                return false;
            }
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SF0030223Component.prototype, "helper", void 0);
    SF0030223Component = __decorate([
        core_1.Component({
            selector: "sf0030223",
            templateUrl: "SF0030223.component.html"
        }), 
        __metadata('design:paramtypes', [SF00302_data_1.SF00302Data])
    ], SF0030223Component);
    return SF0030223Component;
}());
exports.SF0030223Component = SF0030223Component;
//# sourceMappingURL=SF0030223.component.js.map