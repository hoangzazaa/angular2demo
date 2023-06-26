/**
 * Item types of quotation item.
 * @author haipt
 */
export enum QuotationItemType {
    /* LINE item */
    LINE = 1,
        /* SET item */
    SET = 2,
        /* PRODUCT item */
    PRODUCT = 3,
        /* デザイン代*/
    FEE_1 = 4,
        /* 製版代 */
    FEE_2 = 5,
        /*木型代*/
    FEE_3 = 6,
        /*金型代*/
    FEE_4 = 7,
        /*樹脂版代*/
    FEE_5 = 8,
}
export enum QuotationProductType {
    /* 1. 枚 */
    SHEET = 1,
        /* 2. 部 */
    DEPARTMENT = 2,
        /* 3. セット */
    SET = 3,
        /* 4. 式 */
    FORMULA = 4
}

/**
 * Defined mybox item type.
 */
export const enum MyboxItemType {
    TEMPLATE = 1,
    DEAL = 2
}

export enum StatusDealType {
    DEFAULT = 6,
    FINAL = 7
}


