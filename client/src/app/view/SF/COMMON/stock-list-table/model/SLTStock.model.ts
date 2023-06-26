export interface SLTStock {

    // 選択
    slt_selected: boolean;
    // 種別
    slt_classify: string;
    // 案件ID
    slt_dealCode: string;
    // 品名
    slt_productName: string;
    // 内容
    slt_productDescription: string;
    // 数量
    slt_quantity: number;
    // 単価
    slt_unitPrice: number;
    // 合計
    slt_total: number;
    // 製造日
    slt_productionDate: Date;
    slt_productionDateStr: string;
    // 保管日数
    slt_storageDays: number;
    // 備考
    slt_note?: string;
}