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
var router_1 = require("@angular/router");
var SF00302_service_1 = require("../../../SF00302.service");
var SF0030204Component = (function () {
    function SF0030204Component(sv00302Service, router) {
        this.sv00302Service = sv00302Service;
        this.router = router;
    }
    Object.defineProperty(SF0030204Component.prototype, "isRequestDesign", {
        get: function () {
            return this.pageData.isRequestDesign;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030204Component.prototype, "isView", {
        get: function () {
            if (this.isRequestDesign) {
                return false;
            }
            else {
                return this.pageData.isView;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030204Component.prototype, "isCreateNewProduct", {
        get: function () {
            return this.pageData.isCreateNewProduct;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030204Component.prototype, "mstShapes", {
        get: function () {
            return this.pageData.mstData.mstShapes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030204Component.prototype, "isCheckCreate", {
        get: function () {
            return this.pageData.product.productCode == undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030204Component.prototype, "pageData", {
        get: function () {
            return this.helper.getSF00302Data();
        },
        enumerable: true,
        configurable: true
    });
    SF0030204Component.prototype.navigateSF008 = function () {
        var _this = this;
        this.sv00302Service.sv003013UpdateProductImposition(this.pageData.product, this.pageData.paperModelNews).then(function (data) {
            _this.router.navigate(["home/deal", _this.pageData.dealCode, "product", _this.pageData.product.productCode, "calc-imposition"]);
        });
    };
    Object.defineProperty(SF0030204Component.prototype, "stateProductSpec", {
        /**
         * Get state if Product Spec Accordion is filled with data or not
         * */
        get: function () {
            if ((this.pageData.product.sizeW != undefined
                && this.pageData.product.sizeH != undefined
                && this.pageData.product.sizeD != undefined
                && this.pageData.product.blankPaperSizeW != undefined
                && this.pageData.product.blankPaperSizeH != undefined) || this.pageData.product.shapeId == this.pageData.DECORATIVE_ID
                || this.pageData.product.shapeId == this.pageData.ONE_STAGE) {
                if (this.pageData.product.productType != 1) {
                    return true;
                }
                else {
                    if (this.pageData.product.paperNameId != undefined) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
            }
            else {
                return false;
            }
        },
        enumerable: true,
        configurable: true
    });
    SF0030204Component.prototype.isHighlighted = function (input) {
        return this.pageData.highlightedTracker.isHighlightedProperty(input);
    };
    Object.defineProperty(SF0030204Component.prototype, "sizeW", {
        get: function () {
            return this.pageData.product.sizeW;
        },
        set: function (value) {
            this.pageData.highlightedTracker.touch('size');
            this.pageData.product.sizeW = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030204Component.prototype, "sizeD", {
        get: function () {
            return this.pageData.product.sizeD;
        },
        set: function (value) {
            this.pageData.highlightedTracker.touch('size');
            this.pageData.product.sizeD = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030204Component.prototype, "sizeH", {
        get: function () {
            return this.pageData.product.sizeH;
        },
        set: function (value) {
            this.pageData.highlightedTracker.touch('size');
            this.pageData.product.sizeH = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030204Component.prototype, "blankPaperSizeW", {
        get: function () {
            return this.pageData.product.blankPaperSizeW;
        },
        set: function (value) {
            this.pageData.highlightedTracker.touch('blankPaperSize');
            this.pageData.product.blankPaperSizeW = value;
            this.helper.calcStampingBasicCost();
            this.helper.calcStampingThroughWage();
            this.helper.calcPasteBasicCost();
            this.helper.calcPasteThroughWage();
            this.helper.calcWindowTotalCost();
            this.helper.calcShippingCost();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030204Component.prototype, "blankPaperSizeH", {
        get: function () {
            return this.pageData.product.blankPaperSizeH;
        },
        set: function (value) {
            this.pageData.highlightedTracker.touch('blankPaperSize');
            this.pageData.product.blankPaperSizeH = value;
            this.helper.calcStampingBasicCost();
            this.helper.calcStampingThroughWage();
            this.helper.calcWindowTotalCost();
            this.helper.calcShippingCost();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030204Component.prototype, "shapeId", {
        get: function () {
            if (this.pageData.product.shapeId == undefined) {
                return 0;
            }
            return this.pageData.product.shapeId;
        },
        set: function (value) {
            this.pageData.highlightedTracker.touch('shapeId');
            this.setShapeIdConcealed(value);
        },
        enumerable: true,
        configurable: true
    });
    SF0030204Component.prototype.setShapeIdConcealed = function (value) {
        this.pageData.product.shapeId = value;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SF0030204Component.prototype, "helper", void 0);
    SF0030204Component = __decorate([
        core_1.Component({
            templateUrl: "SF0030204.component.html",
            selector: 'sf0030204'
        }), 
        __metadata('design:paramtypes', [SF00302_service_1.SF00302Service, router_1.Router])
    ], SF0030204Component);
    return SF0030204Component;
}());
exports.SF0030204Component = SF0030204Component;
//# sourceMappingURL=SF0030204.component.js.map