
/**
 * エラー JSON の要素
 *
 * 対応する Java のクラス: vn.vnext.sefuri.sf.json.common.ItemErrorJson
 */
export interface ItemErrorJson {
    /** エラーコード */
    code: string;
    /** エラーメッセージ */
    message: string;
}

/**
 * エラー JSON
 *
 * 対応する Java のクラス: vn.vnext.sefuri.sf.json.common.ErrorJson
 */
export interface ErrorJson {
    /** エラーコード */
    code: string;
    /** エラー詳細 */
    items: ItemErrorJson[];
}

/**
 * 応答本文 JSON
 *
 * 対応する Java のクラス: vn.vnext.sefuri.sf.json.common.DataJson<T>
 */
export interface DataJson<T> {
    /** 応答本文 */
    data: T;
    /** メッセージコード */
    messageCode: string;
}

/**
 * 共通 JSON レスポンス
 *
 * @interface ResponseJson
 * @template T 本文の型
 */
export interface ResponseJson<T> {
    /** 応答本文 (成功時のみ) */
    res?: DataJson<T>;
    /** エラー (エラー時のみ) */
    error?: ErrorJson;
}
