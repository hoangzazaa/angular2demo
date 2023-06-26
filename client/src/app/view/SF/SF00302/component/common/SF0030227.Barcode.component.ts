import { Component, Input, OnInit } from '@angular/core';
import {SF00302Data} from "../../SF00302.data";
import {SF0030223Helper} from "./SF0030223.helper";
import {SF00302Helper} from "../../SF00302.helper";

declare var $: JQueryStatic;
declare var App: any;


/**
 * バーコード区分の区分値と表示名
 */
interface BarcodeKubun {
    /** 区分値 */
    readonly id: string;
    /** 表示名 */
    readonly name: string;
}

/**
 * バーコード区分値のマスター
 */
const barcodeKubunOptions: BarcodeKubun[] = [
    { id: '01', name: 'JAN' },
    { id: '02', name: 'ITF' },
    { id: '04', name: 'GTIN' },
    { id: '03', name: 'UPC' },
    { id: '99', name: 'その他' }
];


/**
 * バーコード入力フィールド
 *
 * <p>1バーコードにつき 1オブジェクト
 */
interface BarcodeField extends BarcodeKubun {
    /** 入力値 */
    value: string;
    /** 無効かどうか (true: 無効=入力不可, false: 入力可) */
    disabled: boolean;
}


/**
 * フィールドが入力されているかどうか判定する
 *
 * @param field フィールド
 * @returns true: 入力あり, false: 入力なし
 */
function hasValue(field: BarcodeField): boolean {
    return !!field.value.length;
}

/**
 * 製品情報 バーコード入力セクション
 */
@Component({
    selector: "sf0030227-barcode",
    templateUrl: "SF0030227.Barcode.component.html"
})
export class SF0030227BarcodeComponent {

    /** 製品情報入力フォームのヘルパー */
    @Input() helper: SF00302Helper;

    /** 内部状態: バーコード入力フォーム */
    _fields: BarcodeField[];


    /**
     * バーコード入力フォームの入力値を返す
     */
    get fields(): BarcodeField[] {
        return this._fields || this.initFields();
    }

    /**
     * _fields の初期化
     *
     * @private
     * @returns {BarcodeField[]}
     * @memberof SF0030227BarcodeComponent
     */
    private initFields(): BarcodeField[] {
        // 既入力値を取り出す
        let currentValues: {[key: string]: string} = {};  // 区分値 => 値
        let product = this.helper.getSF00302Data().product;
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
        let fields: BarcodeField[] = [];
        for (let option of barcodeKubunOptions) {
            let field: BarcodeField = {
                id: option.id,                          // 区分値
                name: option.name,                      // バーコード区分表示名
                value: currentValues[option.id] || "",  // 入力値
                disabled: false,                        // 入力可能か
            };
            fields.push(field);
        }
        this._fields = fields;
        this.updateFieldsDisabled();        // BarcodeField#disabled を記入する
        return this._fields;
    }

    /**
     * バーコード入力があるか
     *
     * @return true: 入力あり, false: 入力なし
     */
    get hasValues(): boolean {
        for (let field of this.fields) {
            if (hasValue(field)) {
                return true;
            }
        }
        return false;
    }

    get isView(): boolean {
        if(this.helper.getSF00302Data().isRequestDesign) {
          return false;
        } else {
            return this.helper.getSF00302Data().isView
        }
    }

    /**
     * 入力可能かどうか
     */
    get canModify(): boolean {
        let readonly = this.helper.getSF00302Data().isCreateNewProduct || this.isView;
        return !readonly;
    }

    /**
     * 入力フィールド変更通知
     */
    onChangeField(): void {
        this.updateFieldsDisabled();

        // sf00302data を更新
        let product = this.helper.getSF00302Data().product;
        let inputFields = this.fields.filter(hasValue);

        if (inputFields.length >= 1) {
            product.specsBarcodeK1 = inputFields[0].id;
            product.specsBarcode1 = inputFields[0].value;
        } else {
            product.specsBarcodeK1 = product.specsBarcode1 = null;
        }
        if (inputFields.length >= 2) {
            product.specsBarcodeK2 = inputFields[1].id;
            product.specsBarcode2 = inputFields[1].value;
        } else {
            product.specsBarcodeK2 = product.specsBarcode2 = null;
        }
        if (inputFields.length >= 3) {
            product.specsBarcodeK3 = inputFields[2].id;
            product.specsBarcode3 = inputFields[2].value;
        } else {
            product.specsBarcodeK3 = product.specsBarcode3 = null;
        }
    }

    /**
     * 入力フィールドの disabled を変更する
     */
    private updateFieldsDisabled(): void {
        // バーコードは最大 3 個, 3 個以上入力されている場合は残りを disable にする
        let inputCount = this.fields.filter(hasValue).length;
        for (let field of this.fields) {
            field.disabled = !hasValue(field) && inputCount >= 3;
        }
    }
}
