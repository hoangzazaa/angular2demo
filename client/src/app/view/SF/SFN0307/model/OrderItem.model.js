"use strict";
var date_util_1 = require("../../../../util/date-util");
/**
 * Order Item model for SFN0307
 */
var OrderItemModel = (function () {
    function OrderItemModel() {
    }
    Object.defineProperty(OrderItemModel.prototype, "pib_check", {
        get: function () {
            return this.checked;
        },
        set: function (value) {
            this.checked = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderItemModel.prototype, "pib_image", {
        get: function () {
            return this.product.image;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderItemModel.prototype, "pib_code", {
        get: function () {
            return this.product.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderItemModel.prototype, "pib_type_name", {
        get: function () {
            return this.product.type_name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderItemModel.prototype, "pib_type", {
        get: function () {
            return this.product.type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderItemModel.prototype, "pib_name", {
        get: function () {
            return this.product.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderItemModel.prototype, "pib_itemCode", {
        get: function () {
            return this.product.itemCode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderItemModel.prototype, "pib_size", {
        get: function () {
            return this.product.size;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderItemModel.prototype, "pib_material", {
        get: function () {
            return this.product.material;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderItemModel.prototype, "pib_memo", {
        get: function () {
            return this.product.memo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderItemModel.prototype, "pib_customerProductCode", {
        get: function () {
            return this.product.customerProductCode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderItemModel.prototype, "pib_manufacture", {
        get: function () {
            return this.product.manufacture;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderItemModel.prototype, "pib_lot", {
        get: function () {
            return this.quantity;
        },
        set: function (value) {
            this.quantity = value;
            this.product.total = Math.round(this.unitPrice * this.quantity);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderItemModel.prototype, "pib_orderCode", {
        get: function () {
            return this.orderCode;
        },
        set: function (value) {
            this.orderCode = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderItemModel.prototype, "pib_orderCode2", {
        get: function () {
            return this.orderCode2;
        },
        set: function (value) {
            this.orderCode2 = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderItemModel.prototype, "pib_unitPrice", {
        get: function () {
            return this.unitPrice;
        },
        set: function (value) {
            this.unitPrice = value;
            this.product.total = Math.round(this.unitPrice * this.quantity);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderItemModel.prototype, "pib_total", {
        get: function () {
            if (isNaN(this.product.total)) {
                return 0;
            }
            else {
                return this.product.total;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderItemModel.prototype, "pib_updateDate", {
        get: function () {
            return this.product.updateDate;
        },
        set: function (value) {
            this.product.updateDate = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderItemModel.prototype, "pib_productionSpecs", {
        get: function () {
            return this.productionSpecs;
        },
        set: function (value) {
            this.productionSpecs = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderItemModel.prototype, "pib_printVersion", {
        get: function () {
            return this.printVersion;
        },
        set: function (value) {
            this.printVersion = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderItemModel.prototype, "pib_wooden", {
        get: function () {
            return this.wooden;
        },
        set: function (value) {
            this.wooden = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderItemModel.prototype, "pib_mold", {
        get: function () {
            return this.mold;
        },
        set: function (value) {
            this.mold = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderItemModel.prototype, "pib_passageOrder", {
        get: function () {
            return this.passageOrder;
        },
        set: function (value) {
            this.passageOrder = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderItemModel.prototype, "pib_sampleLift", {
        get: function () {
            return this.sampleLift;
        },
        set: function (value) {
            this.sampleLift = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderItemModel.prototype, "pib_sampleSales", {
        get: function () {
            return this.sampleSales;
        },
        set: function (value) {
            this.sampleSales = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderItemModel.prototype, "pib_sampleCustomer", {
        get: function () {
            return this.sampleCustomer;
        },
        set: function (value) {
            this.sampleCustomer = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderItemModel.prototype, "pib_sampleItem", {
        get: function () {
            return this.sampleItem;
        },
        set: function (value) {
            this.sampleItem = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderItemModel.prototype, "pib_sampleProduct", {
        get: function () {
            return this.sampleProduct;
        },
        set: function (value) {
            this.sampleProduct = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderItemModel.prototype, "pib_specialNote", {
        get: function () {
            return this.specialNote;
        },
        set: function (value) {
            this.specialNote = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderItemModel.prototype, "pib_customerManagedId", {
        get: function () {
            return this.customerManagedId;
        },
        set: function (value) {
            this.customerManagedId = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderItemModel.prototype, "pib_woodenExpireType", {
        /** 木型有効期限情報 NONE: 木型なし, NO: 有効期限情報なし, EXPIRED: 有効期限切れ, OK: 有効期限内 */
        get: function () {
            var product = this.product;
            if (!product.hasWooden) {
                return 'NONE'; // 木型なし
            }
            else if (!product.woodenExpiredDate) {
                return 'NO'; // 有効期限情報なし
            }
            // 有効期限チェック
            var target = date_util_1.DateUtil.getDate(product.woodenExpiredDate.toString());
            return target.getTime() < new Date().getTime() ? 'EXPIRED' : 'OK';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderItemModel.prototype, "pib_woodenExpireDate", {
        /** 木型有効期限の表示文字列 */
        get: function () {
            var product = this.product;
            if (product.woodenExpiredDate) {
                return date_util_1.DateUtil.formatDate(product.woodenExpiredDate, 'YYYY年M月D日');
            }
            else {
                return '';
            }
        },
        enumerable: true,
        configurable: true
    });
    return OrderItemModel;
}());
exports.OrderItemModel = OrderItemModel;
//# sourceMappingURL=OrderItem.model.js.map