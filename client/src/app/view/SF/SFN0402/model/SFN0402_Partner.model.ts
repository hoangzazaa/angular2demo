
/**
 * 取引先 JSON (得意先または仕入先)
 *
 * <p>SFN0402 (取引先照会) 専用
 * <p>対応する Java クラスは vn.vnext.sefuri.sf.json.SFN0402.model.PartnerJson
 */
export interface PartnerJson {
    /** ID (sfr_sf_customer.id or sfr_sf_supplier.id) */
    id: number;
    /** 取引先ID */
    code: string;
    /** 取引先名 */
    name: string;
    /** 略称 */
    abbr: string;
    /** 郵便番号 */
    postalCode: string;
    /** 住所１ */
    address1: string;
    /** 住所２ */
    address2: string;
    /** TEL */
    tel: string;
    /** 内線 */
    ext: string;
    /** FAX */
    fax: string
    /** HP経由 */
    hpInfo: number;
    /** 登録日 */
    createdDate: string;
    /** 取引開始年度 */
    startYear: number;
    /** 得意先担当者名 */
    contactName: string;
    /** 請求方法区分 */
    billingMethod: string;
    /** 備考１ */
    note1: string;
    /** 備考２ */
    note2: string;
    /** 得意先の場合は 備考(営業カルテ), 仕入先の場合は営業(カルテ) */
    memo: string;
    /** 備考(出荷部門用カルテ)  得意先の場合のみ */
    remarksForShipping?: string;

    sales: any;     // TODO UserJson
}

export class PartnerModel {

    /** ID (sfr_sf_customer.id or sfr_sf_supplier.id) */
    id: number;
    /** 取引先ID */
    code: string;
    /** 取引先名 */
    name: string;
    /** 略称 */
    abbr: string;
    /** 郵便番号 */
    postalCode: string;
    /** 住所１ */
    address1: string;
    /** 住所２ */
    address2: string;
    /** TEL */
    tel: string;
    /** FAX */
    fax: string;
    /** HP経由 */
    hpInfo: string;
    /** 登録日 */
    createdDate: Date;
    /** 取引開始年度 */
    startYear: number;
    /** 担当部署 */
    picDept: string;
    /** 得意先担当者名 */
    contactName: string;
    /** sales */
    sales: string;
    /** 請求方法区分 */
    billingMethod: string;
    /** 備考１ */
    note1: string;
    /** 備考２ */
    note2: string;
    /** 営業カルテ */
    memo: string;
    /** 備考(出荷部門用カルテ)  得意先の場合のみ */
    remarksForShipping: string;

}
