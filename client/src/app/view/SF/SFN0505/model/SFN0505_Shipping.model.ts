export class ShippingModel {

    // 出荷予定日
    planDate: Date;
    planDateStr: string;
    // 得意先名
    customerCode: string;
    customerName: string;
    cartonShippingType: number;
    // 案件ID
    dealCode: string;
    // 品名
    productCode: string;
    productName: string;
    productType: number;
    productShapeId: number;
    // 出荷予定数
    planAmount: number;
    // 出荷実績数
    actualAmount: number;
    // 制限
    restrictionStr: string;
    restriction: number;
    // 状況
    statusStr: string;
    status: number;
    highlight: number;
    // 備考
    note: string;
}