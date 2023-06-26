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
var ProductInfoBox_component_1 = require("../ProductInfoBox.component");
var common_helper_1 = require("../../../helper/common-helper");
var mst_data_type_1 = require("../../../helper/mst-data-type");
var constants_1 = require("../../../helper/constants");
var message_1 = require("../../../helper/message");
var SHIPPING_COMPANY_OPTIONS = common_helper_1.CommonHelper.getList([0, 1, 2, 3, 4, 5, 6, 7, 8], mst_data_type_1.SHIPPING_COMPANY);
var ShippingComponent = (function () {
    function ShippingComponent(component) {
        this.component = component;
        this.loadingsCodeMap = {};
    }
    ShippingComponent.prototype.ngOnInit = function () {
        this.shippingPlan = this.component.data.shippings[this.index];
        this.shippingPlan.pib_no = this.index;
        // 無理やりcodeを引っ張る
        var len = this.component.data.loadings.length;
        for (var i = 0; i < len; i++) {
            this.loadingsCodeMap[this.component.data.loadings[i].pib_code] = i;
            if (this.component.data.loadings[i].pib_id == this.shipping.pib_loadingAddressId) {
                this.shipping.pib_loadingAddressCode = this.component.data.loadings[i].pib_code;
            }
        }
    };
    Object.defineProperty(ShippingComponent.prototype, "shipping", {
        //region Bindings
        get: function () {
            return this.shippingPlan;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShippingComponent.prototype, "shippingCompanyOptions", {
        get: function () {
            return SHIPPING_COMPANY_OPTIONS;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShippingComponent.prototype, "destinationList", {
        get: function () {
            return this.component.data.destinations;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShippingComponent.prototype, "canDelete", {
        get: function () {
            return (this.index > 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShippingComponent.prototype, "multiShip", {
        get: function () {
            return (this.index > 0);
        },
        enumerable: true,
        configurable: true
    });
    ShippingComponent.prototype.isInput = function (value) {
        return (this.component.checked && (value == undefined));
    };
    //endregion
    //region Actions
    ShippingComponent.prototype.removeShipping = function () {
        var _this = this;
        var self = this;
        swal({
            title: constants_1.Constants.BLANK,
            text: message_1.MSG.COMPONENT.PRODUCT_INFO_BOX.WRN001,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d26a5c",
            confirmButtonText: "OK",
            closeOnConfirm: true
        }, function () {
            _this.component.removeShipping(_this.index);
        });
    };
    ShippingComponent.prototype.addShipping = function () {
        this.component.addShipping(this.index);
    };
    ShippingComponent.prototype.pickSpecifyTime = function () {
        this.component.pickSpecifyTime(this.index);
    };
    ShippingComponent.prototype.viewDetailDestination = function () {
        this.component.viewDestination(this.index);
    };
    ShippingComponent.prototype.selectLoadingAddress = function () {
        this.component.selectLoadingAddress(this.index);
    };
    Object.defineProperty(ShippingComponent.prototype, "loadingAddressName", {
        get: function () {
            return this.shipping.pib_loadingAddressName;
        },
        set: function (value) {
            this.shipping.pib_loadingAddressName = value;
            this.shipping.pib_loadingAddressId = undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShippingComponent.prototype, "loadingAddressCode", {
        get: function () {
            return this.shipping.pib_loadingAddressCode;
        },
        set: function (value) {
            this.shipping.pib_loadingAddressCode = value;
            if (this.loadingsCodeMap[value]) {
                var i = this.loadingsCodeMap[value];
                var o = this.component.data.loadings[i];
                this.shipping.pib_loadingAddressName = o.pib_name;
                this.shipping.pib_loadingAddressId = o.pib_id;
            }
            else {
                this.loadingAddressName = undefined;
                this.shipping.pib_loadingAddressId = undefined;
            }
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], ShippingComponent.prototype, "index", void 0);
    ShippingComponent = __decorate([
        core_1.Component({
            selector: "[shipping]",
            templateUrl: "Shipping.component.html"
        }), 
        __metadata('design:paramtypes', [ProductInfoBox_component_1.ProductInfoBoxComponent])
    ], ShippingComponent);
    return ShippingComponent;
}());
exports.ShippingComponent = ShippingComponent;
//# sourceMappingURL=Shipping.component.js.map