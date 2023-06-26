import {SFN0506Constants} from "./SFN0506.constants";
import {DateUtil} from "../../../util/date-util";
/**
 * Helper class for SFN0506
 * @author haipt
 */
export class SFN0506Helper {

    static getPaymentStatus(payDate: Date, dueDate: Date, currentDate: Date): string {
        let status = "";
        if (payDate != undefined) {
            // 入金済
            let payDateStr = DateUtil.formatDate(payDate, "M/D");
            status = "入金済（" + payDateStr + "）";
        } else {
            if (DateUtil.getTime(dueDate) >= DateUtil.getTime(currentDate)) {
                // 入金待ち
                status = "入金待ち";
            } else {
                // 未入金
                let dayDiff = DateUtil.dayDiff(currentDate, dueDate);
                status = "未入金（" + dayDiff + "日経過）";
            }
        }
        return status;
    }
}