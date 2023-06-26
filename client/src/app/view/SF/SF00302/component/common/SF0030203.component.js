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
var SF00302_service_1 = require("../../SF00302.service");
var message_1 = require("../../../../../helper/message");
var ProductCommonFee_model_1 = require("../../../../../model/core/ProductCommonFee.model");
var SF0030203Component = (function () {
    function SF0030203Component(sv00302Service) {
        this.sv00302Service = sv00302Service;
    }
    SF0030203Component.prototype.ngAfterViewInit = function () {
        if (this.helper.getSF00302Data().productCommonFee != undefined) {
            this.helper.getSF00302Data().indexProductCommonFee = new ProductCommonFee_model_1.ProductCommonFee();
            Object.assign(this.helper.getSF00302Data().indexProductCommonFee, this.helper.getSF00302Data().productCommonFee);
        }
    };
    Object.defineProperty(SF0030203Component.prototype, "isRequestDesign", {
        get: function () {
            return this.helper.getSF00302Data().isRequestDesign;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030203Component.prototype, "isCreateNewProduct", {
        get: function () {
            return this.helper.getSF00302Data().isCreateNewProduct;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Reset update product common
     *
     * */
    SF0030203Component.prototype.resetProductCommon = function () {
        // set product common fee
        this.helper.getSF00302Data().productCommonFee.designFee = this.helper.getSF00302Data().indexProductCommonFee.designFee;
        this.helper.getSF00302Data().productCommonFee.moldFee = this.helper.getSF00302Data().indexProductCommonFee.moldFee;
        this.helper.getSF00302Data().productCommonFee.woodenFee = this.helper.getSF00302Data().indexProductCommonFee.woodenFee;
        this.helper.getSF00302Data().productCommonFee.resinFee = this.helper.getSF00302Data().indexProductCommonFee.resinFee;
        this.helper.getSF00302Data().productCommonFee.plateMakingFee = this.helper.getSF00302Data().indexProductCommonFee.plateMakingFee;
        this.helper.getSF00302Data().checkCommonSave = true;
    };
    /**
     * Save productCommonFee
     *
     * */
    SF0030203Component.prototype.saveProductCommon = function () {
        var _this = this;
        if (this.helper.getSF00302Data().product.id != undefined) {
            this.sv00302Service.sv0030210UpdateProductCommonFee(this.helper.getSF00302Data().productCommonFee).then(function (data) {
                $.notify({
                    message: message_1.default.get(message_1.MSG.SF00302.INF006)
                }, {
                    type: 'success'
                });
                _this.helper.getSF00302Data().indexProductCommonFee.designFee = _this.helper.getSF00302Data().productCommonFee.designFee;
                _this.helper.getSF00302Data().indexProductCommonFee.moldFee = _this.helper.getSF00302Data().productCommonFee.moldFee;
                _this.helper.getSF00302Data().indexProductCommonFee.woodenFee = _this.helper.getSF00302Data().productCommonFee.woodenFee;
                _this.helper.getSF00302Data().indexProductCommonFee.resinFee = _this.helper.getSF00302Data().productCommonFee.resinFee;
                _this.helper.getSF00302Data().indexProductCommonFee.plateMakingFee = _this.helper.getSF00302Data().productCommonFee.plateMakingFee;
                _this.helper.getSF00302Data().checkCommonSave = false;
            }, function (err) {
                $.notify({
                    message: message_1.default.get(message_1.MSG.SF00302.ERR003)
                }, {
                    type: 'danger'
                });
            });
        }
        else {
            $.notify({
                message: message_1.default.get(message_1.MSG.SF00302.ERR003)
            }, {
                type: 'danger'
            });
        }
    };
    Object.defineProperty(SF0030203Component.prototype, "checkCreate", {
        get: function () {
            if (this.helper.getSF00302Data().product.id == null) {
                return false;
            }
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030203Component.prototype, "isView", {
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
    Object.defineProperty(SF0030203Component.prototype, "designFee", {
        get: function () {
            return this.helper.getSF00302Data().productCommonFee.designFee;
        },
        set: function (value) {
            this.helper.getSF00302Data().productCommonFee.designFee = value;
            this.helper.getSF00302Data().checkCommonSave = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030203Component.prototype, "plateMakingFee", {
        get: function () {
            return this.helper.getSF00302Data().productCommonFee.plateMakingFee;
        },
        set: function (value) {
            this.helper.getSF00302Data().productCommonFee.plateMakingFee = value;
            this.helper.getSF00302Data().checkCommonSave = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030203Component.prototype, "woodenFee", {
        get: function () {
            return this.helper.getSF00302Data().productCommonFee.woodenFee;
        },
        set: function (value) {
            this.helper.getSF00302Data().productCommonFee.woodenFee = value;
            this.helper.getSF00302Data().checkCommonSave = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030203Component.prototype, "moldFee", {
        get: function () {
            return this.helper.getSF00302Data().productCommonFee.moldFee;
        },
        set: function (value) {
            this.helper.getSF00302Data().productCommonFee.moldFee = value;
            this.helper.getSF00302Data().checkCommonSave = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030203Component.prototype, "resinFee", {
        get: function () {
            return this.helper.getSF00302Data().productCommonFee.resinFee;
        },
        set: function (value) {
            this.helper.getSF00302Data().productCommonFee.resinFee = value;
            this.helper.getSF00302Data().checkCommonSave = true;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SF0030203Component.prototype, "helper", void 0);
    SF0030203Component = __decorate([
        core_1.Component({
            selector: "sf0030203",
            templateUrl: "SF0030203.component.html"
        }), 
        __metadata('design:paramtypes', [SF00302_service_1.SF00302Service])
    ], SF0030203Component);
    return SF0030203Component;
}());
exports.SF0030203Component = SF0030203Component;
//# sourceMappingURL=SF0030203.component.js.map