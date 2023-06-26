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
var core_1 = require('@angular/core');
/**
 * バーコード区分値のマスター
 */
var barcodeKubunOptions = [
    { id: '01', name: 'JAN' },
    { id: '02', name: 'ITF' },
    { id: '04', name: 'GTIN' },
    { id: '03', name: 'UPC' },
    { id: '99', name: 'その他' }
];
/**
 * フィールドが入力されているかどうか判定する
 *
 * @param field フィールド
 * @returns true: 入力あり, false: 入力なし
 */
function hasValue(field) {
    return !!field.value.length;
}
/**
 * 製品情報 バーコード入力セクション
 */
var SF0030227BarcodeComponent = (function () {
    function SF0030227BarcodeComponent() {
    }
    Object.defineProperty(SF0030227BarcodeComponent.prototype, "fields", {
        /**
         * バーコード入力フォームの入力値を返す
         */
        get: function () {
            return this._fields || this.initFields();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * _fields の初期化
     *
     * @private
     * @returns {BarcodeField[]}
     * @memberof SF0030227BarcodeComponent
     */
    SF0030227BarcodeComponent.prototype.initFields = function () {
        // 既入力値を取り出す
        var currentValues = {}; // 区分値 => 値
        var product = this.helper.getSF00302Data().product;
        if (product.specsBarcodeK1 && product.specsBarcode1) {
            currentValues[product.specsBarcodeK1] = product.specsBarcode1;
        }
        if (product.specsBarcodeK2 && product.specsBarcode2) {
            currentValues[product.specsBarcodeK2] = product.specsBarcode2;
        }
        if (product.specsBarcodeK3 && product.specsBarcode3) {
            currentValues[product.specsBarcodeK3] = product.specsBarcode3;
        }
        // 内部構造初期化
        var fields = [];
        for (var _i = 0, barcodeKubunOptions_1 = barcodeKubunOptions; _i < barcodeKubunOptions_1.length; _i++) {
            var option = barcodeKubunOptions_1[_i];
            var field = {
                id: option.id,
                name: option.name,
                value: currentValues[option.id] || "",
                disabled: false,
            };
            fields.push(field);
        }
        this._fields = fields;
        this.updateFieldsDisabled(); // BarcodeField#disabled を記入する
        return this._fields;
    };
    Object.defineProperty(SF0030227BarcodeComponent.prototype, "hasValues", {
        /**
         * バーコード入力があるか
         *
         * @return true: 入力あり, false: 入力なし
         */
        get: function () {
            for (var _i = 0, _a = this.fields; _i < _a.length; _i++) {
                var field = _a[_i];
                if (hasValue(field)) {
                    return true;
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030227BarcodeComponent.prototype, "isView", {
        get: function () {
            if (this.helper.getSF00302Data().isRequestDesign) {
                return false;
            }
            else {
                return this.helper.getSF00302Data().isView;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030227BarcodeComponent.prototype, "canModify", {
        /**
         * 入力可能かどうか
         */
        get: function () {
            var readonly = this.helper.getSF00302Data().isCreateNewProduct || this.isView;
            return !readonly;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 入力フィールド変更通知
     */
    SF0030227BarcodeComponent.prototype.onChangeField = function () {
        this.updateFieldsDisabled();
        // sf00302data を更新
        var product = this.helper.getSF00302Data().product;
        var inputFields = this.fields.filter(hasValue);
        if (inputFields.length >= 1) {
            product.specsBarcodeK1 = inputFields[0].id;
            product.specsBarcode1 = inputFields[0].value;
        }
        else {
            product.specsBarcodeK1 = product.specsBarcode1 = null;
        }
        if (inputFields.length >= 2) {
            product.specsBarcodeK2 = inputFields[1].id;
            product.specsBarcode2 = inputFields[1].value;
        }
        else {
            product.specsBarcodeK2 = product.specsBarcode2 = null;
        }
        if (inputFields.length >= 3) {
            product.specsBarcodeK3 = inputFields[2].id;
            product.specsBarcode3 = inputFields[2].value;
        }
        else {
            product.specsBarcodeK3 = product.specsBarcode3 = null;
        }
    };
    /**
     * 入力フィールドの disabled を変更する
     */
    SF0030227BarcodeComponent.prototype.updateFieldsDisabled = function () {
        // バーコードは最大 3 個, 3 個以上入力されている場合は残りを disable にする
        var inputCount = this.fields.filter(hasValue).length;
        for (var _i = 0, _a = this.fields; _i < _a.length; _i++) {
            var field = _a[_i];
            field.disabled = !hasValue(field) && inputCount >= 3;
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SF0030227BarcodeComponent.prototype, "helper", void 0);
    SF0030227BarcodeComponent = __decorate([
        core_1.Component({
            selector: "sf0030227-barcode",
            templateUrl: "SF0030227.Barcode.component.html"
        }), 
        __metadata('design:paramtypes', [])
    ], SF0030227BarcodeComponent);
    return SF0030227BarcodeComponent;
}());
exports.SF0030227BarcodeComponent = SF0030227BarcodeComponent;
//# sourceMappingURL=SF0030227.Barcode.component.js.map