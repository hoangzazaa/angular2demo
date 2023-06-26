import {SF00308CheckSheet} from "./model/SF00308_CheckSheet.model";
import {DealInfoModel} from "../COMMON/dealinfo/model/DealModel";
import {DEAL_STATUS_VALUES, TEMPLATE_DEAL} from "../../../helper/mst-data-type";

export class SF00308Data {
    dealId: number;
    dealCode: string;
    dealName: string;
    customerId: string;
    customerName: string;
    saleName: string;
    dealType: number;
    deliveryDate: Date;
    estMoney: number;
    dealStatus: number;
    templateFlag: number;
    closedFlag: number;

    dealInfo: DealInfoModel;

    defaultQuestion1009_Date: Date;

    answersMap: SF00308CheckSheet[] = [];
    TAB_1: number = 1;
    TAB_2: number = 2;
    TAB_3: number = 3;
    TAB_4: number = 4;

    get isView(): boolean {
        // check dealTemplate or deal status order
        return this.dealStatus >= DEAL_STATUS_VALUES.ORDER_CONFIRMED
            || this.templateFlag == TEMPLATE_DEAL.TRUE
            || !!this.closedFlag;
    }

    public answerMap(key: number) {
        // get answer by questionCode = key
        let answer = this.answersMap[key];
        // check answer undefined => new CheckSheet() with questionCode = key
        if (answer == undefined) {
            answer = new SF00308CheckSheet();
            answer.questionCode = key;
            answer.dealId = this.dealId;

            this.answersMap[key] = answer;
        }

        return answer;
    }

    public setSF00308Data(data: any) {
        this.dealId = data["dealId"];
        this.dealCode = data["dealCode"];
        this.dealName = data["dealName"];
        this.customerId = data["customerId"];
        this.customerName = data["customerName"];
        this.saleName = data["saleName"];
        this.dealType = data["dealType"];
        this.dealStatus = data["dealStatus"];
        this.templateFlag = data["templateFlag"];
        this.closedFlag = data["closedFlag"];
        this.deliveryDate = data["deliveryDate"] != undefined ? new Date(data["deliveryDate"]) : undefined;
        this.estMoney = data["estMoney"];
        this.dealInfo = new DealInfoModel();
        this.dealInfo.dealId = this.dealId;
        this.dealInfo.dealCode = this.dealCode;
        this.dealInfo.dealName = this.dealName;
        this.dealInfo.customerName = this.customerName;
        this.dealInfo.customerCode = this.customerId;
        this.dealInfo.saleName = this.saleName;
        this.dealInfo.dealType = this.dealType;
        this.dealInfo.dealStatus = this.dealStatus;
        this.dealInfo.templateFlag = this.templateFlag;
        this.dealInfo.closedFlag = this.closedFlag;
        this.dealInfo.deliveryDate = this.deliveryDate;
        this.dealInfo.estimateTotal = this.estMoney;

        if (data["answers"] !== undefined) {
            for (let i = 0; i < data["answers"].length; i++) {
                let answer = data["answers"][i];
                this.answersMap[answer.questionCode] = answer;
            }
        }

        this.refreshDefault1009Date();
    }

    public refreshDefault1009Date() {
        let question1009 = this.answerMap(1009);
        if (!!question1009.textArea2) {
            this.defaultQuestion1009_Date =  new Date(question1009.textArea2);
        } else {
            this.defaultQuestion1009_Date =  null;
        }
    }

    get defaultFieldBorderCss(): {style: string, radius: string} {
        return {style: "solid 2px #5c90d2", radius: "3px"};
    }

}
