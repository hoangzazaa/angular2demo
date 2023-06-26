export class StockModel {

    // id
    id: number;
    // 選択
    selected: boolean;
    // 種別
    type: number;
    typeStr: string;
    // 得意先名
    customerCode: string;
    customerName: string;
    // 案件ID
    dealCode: string;
    // 品名
    productName: string;
    productCode: string;
    productType: number;
    productShapeId: number;
    cartonShippingType: number;
    // 数量
    quantity: number;
    // 単価
    unitPrice: number;
    // 合計
    total: number;
    // 製造日
    manufactureDate: Date;
    manufactureDateStr: string;
    // 保管日数
    storageDays: number;
    // 備考
    note: string;
}