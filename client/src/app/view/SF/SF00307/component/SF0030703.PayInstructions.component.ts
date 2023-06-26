import {Component, Input} from "@angular/core";
import {ShippingInstructionModel} from "../model/ShippingInstruction.model";
import DataUtil from "../../../../util/data-util";
import {LIMIT_QUANTITY, SHIPPING_COMPANY, SPECIFY_TIME} from "../../../../helper/mst-data-type";
import {DealInfoModel} from "../../COMMON/dealinfo/model/DealModel";

declare let $: JQueryStatic;
type SelectBoxItem = {id: number, name: string};

@Component({
    selector: "pay-instructions",
    templateUrl: "SF0030703.PayInstructions.component.html"
})

export class SF0030703PayInstructions {

    @Input() shippingInstructions: ShippingInstructionModel[];
    @Input() dealInfo: DealInfoModel;

    get shippingCompanyOptions(): SelectBoxItem[] {
        return DataUtil.toSelectBoxDataSource(SHIPPING_COMPANY);
    }

    get limitQuantityOptions(): SelectBoxItem[] {
        return DataUtil.toSelectBoxDataSource(LIMIT_QUANTITY);
    }

    get specifyTimeOptions(): SelectBoxItem[] {
        return [
            {id: 10, name: SPECIFY_TIME[10]},
            {id: 1, name: SPECIFY_TIME[1]},
            {id: 4, name: SPECIFY_TIME[4]},
            {id: 6, name: SPECIFY_TIME[6]},
            {id: 7, name: SPECIFY_TIME[7]},
            {id: 8, name: SPECIFY_TIME[8]},
            {id: 9, name: SPECIFY_TIME[9]},
            {id: 2, name: SPECIFY_TIME[2]},
            {id: 11, name: SPECIFY_TIME[11]},
            {id: 12, name: SPECIFY_TIME[12]},
            {id: 13, name: SPECIFY_TIME[13]},
            {id: 14, name: SPECIFY_TIME[14]},
        ];
    }
}
