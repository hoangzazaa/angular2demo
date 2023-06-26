"use strict";
/**
 * Plan model for SFN0307
 */
var ShippingPlanModel = (function () {
    function ShippingPlanModel() {
    }
    Object.defineProperty(ShippingPlanModel.prototype, "pib_no", {
        get: function () {
            return this.no;
        },
        set: function (value) {
            this.no = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShippingPlanModel.prototype, "pib_shippingDate", {
        get: function () {
            return this.shippingDate;
        },
        set: function (value) {
            this.shippingDate = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShippingPlanModel.prototype, "pib_deliveryDate", {
        get: function () {
            return this.deliveryDate;
        },
        set: function (value) {
            this.deliveryDate = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShippingPlanModel.prototype, "pib_loadingAddressId", {
        get: function () {
            return this.loadingAddressId;
        },
        set: function (value) {
            this.loadingAddressId = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShippingPlanModel.prototype, "pib_loadingAddressName", {
        get: function () {
            return this.loadingAddressName;
        },
        set: function (value) {
            this.loadingAddressName = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShippingPlanModel.prototype, "pib_loadingAddressCode", {
        get: function () {
            return this.loadingAddressCode;
        },
        set: function (value) {
            this.loadingAddressCode = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShippingPlanModel.prototype, "pib_quantity", {
        get: function () {
            return this.quantity;
        },
        set: function (value) {
            this.quantity = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShippingPlanModel.prototype, "pib_shippingCompany", {
        get: function () {
            return this.shippingCompany;
        },
        set: function (value) {
            this.shippingCompany = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShippingPlanModel.prototype, "pib_destinationId", {
        get: function () {
            return this.destinationId;
        },
        set: function (value) {
            this.destinationId = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShippingPlanModel.prototype, "pib_specifyTime", {
        get: function () {
            return this.specifyTimeStr;
        },
        set: function (value) {
            this.specifyTimeStr = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShippingPlanModel.prototype, "stm_pattern", {
        get: function () {
            return this.specifyTime;
        },
        set: function (value) {
            this.specifyTime = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShippingPlanModel.prototype, "stm_hour", {
        get: function () {
            return this.specifyTimeHour;
        },
        set: function (value) {
            this.specifyTimeHour = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShippingPlanModel.prototype, "stm_minute", {
        get: function () {
            return this.specifyTimeMinute;
        },
        set: function (value) {
            this.specifyTimeMinute = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShippingPlanModel.prototype, "stm_period", {
        get: function () {
            return this.specifyTimePeriod;
        },
        set: function (value) {
            this.specifyTimePeriod = value;
        },
        enumerable: true,
        configurable: true
    });
    return ShippingPlanModel;
}());
exports.ShippingPlanModel = ShippingPlanModel;
//# sourceMappingURL=ShippingPlan.model.js.map