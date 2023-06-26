export class PaymentModel {

    // 請求ID
    code: string;
    // 得意先名
    customerCode: string;
    customerName: string;
    // 請求額
    amount: number;
    // 請求締め日
    closingDate: Date;
    closingDateStr: string;
    // 入金期日
    dueDate: Date;
    dueDateStr: string;
    // 方法
    method: string;
    // 入金確認日
    payDate: Date;
    // 状況
    status: string;
}