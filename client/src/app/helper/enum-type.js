"use strict";
/**
 * Item types of quotation item.
 * @author haipt
 */
(function (QuotationItemType) {
    /* LINE item */
    QuotationItemType[QuotationItemType["LINE"] = 1] = "LINE";
    /* SET item */
    QuotationItemType[QuotationItemType["SET"] = 2] = "SET";
    /* PRODUCT item */
    QuotationItemType[QuotationItemType["PRODUCT"] = 3] = "PRODUCT";
    /* デザイン代*/
    QuotationItemType[QuotationItemType["FEE_1"] = 4] = "FEE_1";
    /* 製版代 */
    QuotationItemType[QuotationItemType["FEE_2"] = 5] = "FEE_2";
    /*木型代*/
    QuotationItemType[QuotationItemType["FEE_3"] = 6] = "FEE_3";
    /*金型代*/
    QuotationItemType[QuotationItemType["FEE_4"] = 7] = "FEE_4";
    /*樹脂版代*/
    QuotationItemType[QuotationItemType["FEE_5"] = 8] = "FEE_5";
})(exports.QuotationItemType || (exports.QuotationItemType = {}));
var QuotationItemType = exports.QuotationItemType;
(function (QuotationProductType) {
    /* 1. 枚 */
    QuotationProductType[QuotationProductType["SHEET"] = 1] = "SHEET";
    /* 2. 部 */
    QuotationProductType[QuotationProductType["DEPARTMENT"] = 2] = "DEPARTMENT";
    /* 3. セット */
    QuotationProductType[QuotationProductType["SET"] = 3] = "SET";
    /* 4. 式 */
    QuotationProductType[QuotationProductType["FORMULA"] = 4] = "FORMULA";
})(exports.QuotationProductType || (exports.QuotationProductType = {}));
var QuotationProductType = exports.QuotationProductType;
(function (StatusDealType) {
    StatusDealType[StatusDealType["DEFAULT"] = 6] = "DEFAULT";
    StatusDealType[StatusDealType["FINAL"] = 7] = "FINAL";
})(exports.StatusDealType || (exports.StatusDealType = {}));
var StatusDealType = exports.StatusDealType;
//# sourceMappingURL=enum-type.js.map