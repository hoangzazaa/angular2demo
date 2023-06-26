export interface PIBProduct {

    // check
    pib_check?: boolean;
    // Image
    readonly pib_image: string;
    // 製品ID/ Product ID
    readonly pib_code: string;
    // 製品種類/ Product type
    readonly pib_type_name: string;
    readonly pib_type: number;
    // 製品名/ Product name
    readonly pib_name: string;
    // 品目C/Hạng mục C
    readonly pib_itemCode: string;
    // サイズ/ Size
    readonly pib_size: string;
    // 材料/ Vật liệu
    readonly pib_material: string;
    // メモ/ Memo
    readonly pib_memo: string;
    // 得意先製品番号/ Mã product của customer
    readonly pib_customerProductCode: string;
    // 製造依頼先/ Nơi request production
    readonly pib_manufacture: string;
    // ロット/ Lot
    pib_lot: number;
    // 提出単価/ Offer unit price
    pib_unitPrice: number;
    // 提出金額/ Số tiền offer
    readonly pib_total: number;
    // update date
    readonly pib_updateDate: Date;
    // 相手管理No
    pib_customerManagedId: string;

    /** 木型有効期限情報 NONE: 木型なし, NO: 有効期限情報なし, EXPIRED: 有効期限切れ, OK: 有効期限内 */
    readonly pib_woodenExpireType: 'NONE'|'NO'|'EXPIRED'|'OK';
    /** 木型有効期限の表示文字列 */
    readonly pib_woodenExpireDate: string;
}
