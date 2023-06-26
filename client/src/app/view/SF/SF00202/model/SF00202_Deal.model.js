"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseModel_model_1 = require("../../../../model/core/BaseModel.model");
var SF00202_Deal = (function (_super) {
    __extends(SF00202_Deal, _super);
    function SF00202_Deal() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(SF00202_Deal.prototype, "hasAtLeastOneProduct", {
        get: function () {
            return !!this.products && this.products.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00202_Deal.prototype, "isClosed", {
        get: function () {
            return !!this.closedFlag;
        },
        enumerable: true,
        configurable: true
    });
    return SF00202_Deal;
}(BaseModel_model_1.BaseModel));
exports.SF00202_Deal = SF00202_Deal;
//# sourceMappingURL=SF00202_Deal.model.js.map