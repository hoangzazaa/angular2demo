"use strict";
/**
 * Loading Address model for SFN0307
 */
var LoadingAddressModel = (function () {
    function LoadingAddressModel() {
    }
    Object.defineProperty(LoadingAddressModel.prototype, "pib_id", {
        get: function () {
            return this.id;
        },
        set: function (value) {
            this.id = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoadingAddressModel.prototype, "pib_code", {
        get: function () {
            return this.code;
        },
        set: function (value) {
            this.code = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoadingAddressModel.prototype, "pib_name", {
        get: function () {
            return this.name;
        },
        set: function (value) {
            this.name = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoadingAddressModel.prototype, "pib_abbr", {
        get: function () {
            return this.abbr;
        },
        set: function (value) {
            this.abbr = value;
        },
        enumerable: true,
        configurable: true
    });
    return LoadingAddressModel;
}());
exports.LoadingAddressModel = LoadingAddressModel;
//# sourceMappingURL=LoadingAddress.model.js.map