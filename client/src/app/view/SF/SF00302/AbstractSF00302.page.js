"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var common_page_1 = require("../COMMON/common.page");
var unicode_util_1 = require("../../../util/unicode-util");
var SF00302_data_1 = require("./SF00302.data");
var message_1 = require("../../../helper/message");
/**
 * SF00302xxxx.page.ts の基底
 *
 * @param <Helper> SF00302xxHelper
 */
var AbstractSF00302Page = (function (_super) {
    __extends(AbstractSF00302Page, _super);
    function AbstractSF00302Page() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(AbstractSF00302Page.prototype, "pageData", {
        /**
         * @return 入力値
         */
        get: function () { },
        enumerable: true,
        configurable: true
    });
    /**
     * 製品の新規登録・保存
     */
    AbstractSF00302Page.prototype.saveProduct = function () {
        this.proceed(this.doSaveProduct.bind(this));
    };
    /**
     * 製品の複製
     *
     * @param type ?
     */
    AbstractSF00302Page.prototype.duplicateProduct = function (type) {
        this.proceed(this.doDuplicateProduct.bind(this, type));
    };
    /**
     * 製品登録、更新、複製共通処理
     *
     * @param proceed バリデーション成功時に処理する内容
     */
    AbstractSF00302Page.prototype.proceed = function (proceed) {
        if (this.helper.validateForm()) {
            // this.helper.checkChangeDataProduct();
            // 商品名の文字数チェック
            if (!this.validateProductName()) {
                this.pageData.productRequiredItem.isSaveProductName = true;
                $.notify({ message: message_1.default.get(message_1.MSG.SF00301.ERR017) }, { type: 'danger' });
                this.pageData.yCheck = true;
                return;
            }
            // 実際の処理実行
            proceed();
            this.pageData.xCheck = false;
            this.pageData.yCheck = false;
        }
        else {
            // バリデーションエラーにつき、エラーメッセージを表示して元の画面に戻る。
            $.notify({ message: message_1.default.get(message_1.MSG.SF00301.ERR015) }, { type: 'danger' });
            this.pageData.yCheck = true;
        }
    };
    /**
     * 製品名の検査
     *
     * <p>文字数制限のみチェックします。(必須項目チェックは行いません。)
     *
     * @return true: OK, false: エラーあり
     */
    AbstractSF00302Page.prototype.validateProductName = function () {
        // 製品名: CP932 で 40bytes 以下
        var productName = this.pageData.product.productName;
        var hasError = unicode_util_1.default.countBytesOnSJIS(productName) > SF00302_data_1.MAX_PRODUCT_CP932_BYTES;
        return !hasError;
    };
    return AbstractSF00302Page;
}(common_page_1.CommonPage));
exports.AbstractSF00302Page = AbstractSF00302Page;
//# sourceMappingURL=AbstractSF00302.page.js.map