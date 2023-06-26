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
var master_option_1 = require("../../helper/master-option");
var data_util_1 = require("../../../../../util/data-util");
var SF0030219Component = (function () {
    function SF0030219Component(sf00302Data) {
        this.sf00302Data = sf00302Data;
        // shippingCostOption = DataUtil.toSelectBoxDataSource(SHIPPING_COST_ID);
        this.bindingMethodOption = data_util_1.default.toSelectBoxDataSource(master_option_1.CARTON_BINDING_METHOD);
        this.stringColorOption = data_util_1.default.toSelectBoxDataSource(master_option_1.STRING_COLOR);
        this.packingIdOption = data_util_1.default.toSelectBoxDataSource(master_option_1.CARTON_PACKING);
    }
    Object.defineProperty(SF0030219Component.prototype, "isRequestDesign", {
        get: function () {
            return this.helper.getSF00302Data().isRequestDesign;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030219Component.prototype, "isCreateNewProduct", {
        get: function () {
            return this.helper.getSF00302Data().isCreateNewProduct;
        },
        enumerable: true,
        configurable: true
    });
    SF0030219Component.prototype.isHighlighted = function (input) {
        return this.helper.getSF00302Data().highlightedTracker.isHighlightedProperty(input);
    };
    Object.defineProperty(SF0030219Component.prototype, "checkBorderRequiredAdditionalWork", {
        get: function () {
            return { style: "solid 2px #5c90d2", radius: "50%" };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030219Component.prototype, "isView", {
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
    Object.defineProperty(SF0030219Component.prototype, "shippingCostId", {
        get: function () {
            if (this.helper.getSF00302Data().product.shippingCostId == undefined) {
                this.helper.getSF00302Data().product.shippingCostId = 30;
            }
            return this.helper.getSF00302Data().product.shippingCostId;
        },
        set: function (value) {
            this.helper.getSF00302Data().highlightedTracker.touch('shippingCostId');
            this.setShippingConcealed(value);
            this.helper.validateForm();
        },
        enumerable: true,
        configurable: true
    });
    SF0030219Component.prototype.setShippingConcealed = function (value) {
        this.helper.getSF00302Data().product.shippingCostId = value;
        this.helper.calcShipFareCarton();
    };
    Object.defineProperty(SF0030219Component.prototype, "shippingCostOption", {
        get: function () {
            var map = this.helper.getSF00302Data().mstData.mstCartonShipping;
            var keys = Object.keys(map), options = { 0: "" };
            var max_distance = 0;
            keys.map(function (k) {
                Object.keys(map[k]).map(function (distance) {
                    options[distance] = distance + "km\u307E\u3067";
                    max_distance = Math.max(max_distance, parseInt(distance));
                });
            });
            return data_util_1.default.toSelectBoxDataSource(options);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030219Component.prototype, "bindingMethod", {
        get: function () {
            return this.helper.getSF00302Data().product.bindingMethod;
        },
        // KH yêu cầu ko cần validate #2224
        /*get checkBorderShippingCostId(): {style: string, radius: string} {
            if (this.helper.getSF00302Data().zCheck) {
                return this.helper.getSF00302Data().defaultFieldBorderCss;
            } else {
                if (this.helper.getSF00302Data().yCheck) {
                    if (this.helper.getSF00302Data().productRequiredItem.isSaveCartonShippingCost) {
                        return this.helper.getSF00302Data().errFieldBorderCss;
                    } else {
                        if (this.helper.getSF00302Data().xCheck) {
                            return this.helper.getSF00302Data().defaultFieldBorderCss;
                        } else {
                            return this.helper.getSF00302Data().noneFieldBorderCss;
                        }
                    }
                } else {
                    if (this.helper.getSF00302Data().xCheck) {
                        return this.helper.getSF00302Data().defaultFieldBorderCss;
                    } else {
                        return this.helper.getSF00302Data().noneFieldBorderCss;
                    }
                }
            }
        }*/
        set: function (value) {
            this.helper.getSF00302Data().product.bindingMethod = value;
            this.helper.getSF00302Data().highlightedTracker.touch('bindingMethod');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030219Component.prototype, "bindingNumber", {
        get: function () {
            return this.helper.getSF00302Data().product.bindingNumber;
        },
        set: function (value) {
            this.helper.getSF00302Data().product.bindingNumber = value;
            this.helper.getSF00302Data().highlightedTracker.touch('bindingMethod');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030219Component.prototype, "stringColor", {
        get: function () {
            return this.helper.getSF00302Data().product.stringColor;
        },
        set: function (value) {
            this.helper.getSF00302Data().product.stringColor = value;
            this.helper.getSF00302Data().highlightedTracker.touch('stringColor');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030219Component.prototype, "stringNumber", {
        get: function () {
            return this.helper.getSF00302Data().product.stringNumber;
        },
        set: function (value) {
            this.helper.getSF00302Data().product.stringNumber = value;
            this.helper.getSF00302Data().highlightedTracker.touch('stringColor');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030219Component.prototype, "packingId", {
        get: function () {
            // packingIdが初期値である場合は「0: ""」を設定する。
            if (this.helper.getSF00302Data().product.packingId == undefined) {
                this.helper.getSF00302Data().product.packingId = 0;
                this.helper.calcPacking();
            }
            return this.helper.getSF00302Data().product.packingId;
        },
        set: function (value) {
            this.helper.getSF00302Data().product.packingId = value;
            this.helper.getSF00302Data().highlightedTracker.touch('packingId');
            this.helper.calcPacking();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030219Component.prototype, "requiredAdditionalWork", {
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
    SF0030219Component.prototype.setRequiredAdditionalWork = function (value) {
        this.requiredAdditionalWork = value;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SF0030219Component.prototype, "helper", void 0);
    SF0030219Component = __decorate([
        core_1.Component({
            selector: "sf0030219",
            templateUrl: "SF0030219.component.html"
        }), 
        __metadata('design:paramtypes', [SF00302_data_1.SF00302Data])
    ], SF0030219Component);
    return SF0030219Component;
}());
exports.SF0030219Component = SF0030219Component;
//# sourceMappingURL=SF0030219.component.js.map