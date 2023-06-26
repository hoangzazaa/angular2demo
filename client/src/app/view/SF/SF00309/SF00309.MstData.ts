// export const PACKAGING_CLASSIFICATION = {
//     2: "一次包装以外",
//     1: "一次包装"
// }
//
// export const PACKAGING_CLASSIFICATION_VALUE = {
//     PRIMARY_PACKAGING    : 1,
//     NON_PRIMARY_PACKAGING: 2
// }
//
// export const PACKAGING_INCLUSION = {
//     0: "指定なし",
//     1: "洋菓子",
//     2: "和菓子",
//     3: "その他"
// }
//
// export const PACKAGING_INCLUSION_VALUE = {
//     NOT_SPECIFIC   : 0,
//     PASTRY         : 1,
//     JAPANESE_PASTRY: 2,
//     OTHER          : 3
// }
//
// export const END_USER = {
//     0: "指定なし",
//     1: "地場単独ユーザ",
//     2: "大手のOEM商品"
// };
//
// export const END_USER_VALUE = {
//     NOT_SPECIFIC: 0,
//     LOCAL       : 1,
//     OEM         : 2
// }
//
// export const MATERIAL = {
//     0: "指定なし",
//     1: "ハンソル指定",
//     2: "国内紙指定",
//     3: "どちらでも可",
//     4: "その他"
// }
//
// export const PRESERVATION_METHOD = {
//     0: "指定なし",
//     1: "常温",
//     2: "冷蔵",
//     3: "冷凍"
// }
//
// export const DISTRIBUTION_RANGE = {
//     0: "指定なし",
//     1: "自社店舗",
//     2: "地域流通",
//     3: "全国流通および販売"
// }
//
// export const SALES_ESTIMATE = {
//     0: "指定なし",
//     1: "〜3,000",
//     2: "〜10,000",
//     3: "〜10万",
//     4: "10万以上"
// }
//
// export const CONTACT_STATE = {
//     0: "指定なし",
//     1: "直接のせる、いれる",
//     2: "間接的に触れる"
// }
//
// export const FILLING_METHOD = {
//     0: "指定なし",
//     1: "手作業",
//     2: "機械充填"
// }
//
// export const DESIRED = {
//     0: "希望",
//     1: "指定"
// }

export const MAIL_REQUEST_TYPE = {
    3: "サンプル作成依頼",
    4: "サンプル（一次包装）作成依頼",
    5: "デザイン依頼",
    6: "版下依頼",
    7: "ダミー作成依頼"
}
export const MAIL_REQUEST_BUTTON_VALUE = {
    3: "サンプル作成を依頼する",
    4: "一次包装サンプル作成を依頼する",
    5: "デザインを依頼する",
    6: "版下を依頼する",
    7: "ダミー作成を依頼する"
}

export const PRODUCT_INFO_MAIL_TEMPLATE: string =
    "製品ID: <productCode>\n" +
    "製品種別: <productType>\n" +
    "製品名: <productName>\n" +
    "URL: <productURL>"
;