
import {CommonPage} from "../COMMON/common.page";
import UnicodeUtil from "../../../util/unicode-util";
import { SF00302Data, MAX_PRODUCT_CP932_BYTES } from "./SF00302.data";
import { ActivatedRoute, Router } from "@angular/router";
import { HeaderProvider } from "../SF00100/Header.provider";
import { SF00302Helper } from "./SF00302.helper";
import Messages, { MSG } from "../../../helper/message";

/**
 * SF00302xxxx.page.ts の基底
 * 
 * @param <Helper> SF00302xxHelper
 */
export abstract class AbstractSF00302Page<Helper extends SF00302Helper> extends CommonPage {

    /**
     * @return 入力値
     */
    abstract get pageData(): SF00302Data;

    /**
     * ヘルパー
     */
    protected helper: Helper;

    /**
     * 製品の新規登録・保存
     */
    public saveProduct(): void {
        this.proceed(this.doSaveProduct.bind(this));
    }

    /**
     * 製品の複製
     * 
     * @param type ?
     */
    public duplicateProduct(type: number): void {
        this.proceed(this.doDuplicateProduct.bind(this, type));
    }

    /**
     * 製品登録、更新、複製共通処理
     * 
     * @param proceed バリデーション成功時に処理する内容
     */
    private proceed(proceed: () => void): void {
        if (this.helper.validateForm()) {
            // this.helper.checkChangeDataProduct();

            // 商品名の文字数チェック
            if (!this.validateProductName()) {
                this.pageData.productRequiredItem.isSaveProductName = true;
                $.notify({message: Messages.get(MSG.SF00301.ERR017)}, {type: 'danger'});
                this.pageData.yCheck = true;
                return;
            }

            // 実際の処理実行
            proceed();

            this.pageData.xCheck = false;
            this.pageData.yCheck = false;
        } else {
            // バリデーションエラーにつき、エラーメッセージを表示して元の画面に戻る。
            $.notify({message: Messages.get(MSG.SF00301.ERR015)}, {type: 'danger'});
            this.pageData.yCheck = true;
        }
    }


    /**
     * 製品の新規登録・保存処理
     * 
     * バリデーション完了後に呼び出されます
     */
    protected abstract doSaveProduct(): void;

    /**
     * 製品の複製処理
     * 
     * バリデーション完了後に呼び出されます
     * 
     * @param type ?
     */
    protected abstract doDuplicateProduct(type: number): void;


    /**
     * 製品名の検査
     * 
     * <p>文字数制限のみチェックします。(必須項目チェックは行いません。)
     * 
     * @return true: OK, false: エラーあり
     */
    public validateProductName(): boolean {
        // 製品名: CP932 で 40bytes 以下
        let productName = this.pageData.product.productName;
        let hasError = UnicodeUtil.countBytesOnSJIS(productName) > MAX_PRODUCT_CP932_BYTES;
        return !hasError;
    }
}
