"use strict";
var InventoryModel = (function () {
    function InventoryModel() {
    }
    Object.defineProperty(InventoryModel.prototype, "slt_classify", {
        get: function () {
            return this.typeStr;
        },
        set: function (value) {
            this.typeStr = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InventoryModel.prototype, "slt_dealCode", {
        get: function () {
            return this.product.dealCode;
        },
        set: function (value) {
            this.product.dealCode = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InventoryModel.prototype, "slt_productName", {
        get: function () {
            return this.product.name;
        },
        set: function (value) {
            this.product.name = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InventoryModel.prototype, "slt_productDescription", {
        get: function () {
            return this.product.description;
        },
        set: function (value) {
            this.product.description = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InventoryModel.prototype, "slt_quantity", {
        get: function () {
            return this.product.quantity;
        },
        set: function (value) {
            this.product.quantity = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InventoryModel.prototype, "slt_unitPrice", {
        get: function () {
            return this.product.unitPrice;
        },
        set: function (value) {
            this.product.unitPrice = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InventoryModel.prototype, "slt_total", {
        get: function () {
            return this.product.total;
        },
        set: function (value) {
            this.product.total = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InventoryModel.prototype, "slt_productionDate", {
        get: function () {
            return this.manufactureDate;
        },
        set: function (value) {
            this.manufactureDate = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InventoryModel.prototype, "slt_productionDateStr", {
        get: function () {
            return this.manufactureDateStr;
        },
        set: function (value) {
            this.manufactureDateStr = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InventoryModel.prototype, "slt_storageDays", {
        get: function () {
            return this.storageDays;
        },
        set: function (value) {
            this.storageDays = value;
        },
        enumerable: true,
        configurable: true
    });
    return InventoryModel;
}());
exports.InventoryModel = InventoryModel;
//# sourceMappingURL=SFN0402_Inventory.model.js.map