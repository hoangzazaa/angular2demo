export interface RLTRevenue {

    // 選択
    rlt_selected: boolean;
    // 売上日
    rlt_salesDate: Date;
    rlt_salesDateStr: string;
    // 案件ID
    rlt_dealCode: string;
    // 製品番号
    rlt_itemCode: string;
    // 品名
    rlt_productName: string;
    // 内容
    rlt_productDescription: string;
    // 数量
    rlt_quantity: number;
    // 単価
    rlt_unitPrice: number;
    // 合計
    rlt_total: number;
    // 備考
    rlt_note?: string;
}