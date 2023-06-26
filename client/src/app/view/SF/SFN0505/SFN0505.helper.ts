import {QUANTITY_RESTRICTION} from "../../../helper/mst-data-type";
import {SFN0505Constants} from "./SFN0505.constants";
import {ShippingModel} from "./model/SFN0505_Shipping.model";
/**
 * Helper class for SFN0505
 * @author haipt
 */
export class SFN0505Helper {

    static getRestrictionText(restriction: number): string {
        let name = QUANTITY_RESTRICTION[restriction];
        if (name == undefined) {
            name = "";
        }
        return name;
    }

    static getShippingStatus(plan: number, actual: number): number {
        if (actual == undefined || actual == 0) {
            // 出荷待ち
            return 1;
        } else if (actual == plan) {
            // 出荷済
            return 2;
        } else if (actual > plan) {
            // 出荷済（超過）
            return 3;
        } else {
            // 出荷済（不足）
            return 4;
        }
    }

    static getShippingStatusText(status: number): string {
        switch (status) {
            case 1:
                return SFN0505Constants.STATUS_1;
            case 2:
                return SFN0505Constants.STATUS_2;
            case 3:
                return SFN0505Constants.STATUS_3;
            case 4:
                return SFN0505Constants.STATUS_4;
            default:
                return "";
        }
    }

    static getShippingHighlight(shipping: ShippingModel): number {
        // issues/2838 Date: 04/08/2017
        // id = [2,3,4,7,8]
        let arrId = [2,3,4,7,8];
        let index = arrId.findIndex(item =>{return shipping.restriction == item;});
        if (index > -1 && shipping.actualAmount > 0 && shipping.actualAmount != shipping.planAmount) {
            // 数量制限は「✕／✕」で「出荷予定数と出荷実績数が異なる」行については、行を赤くしてください。
            return 1;
        }
        return 0;
    }
}