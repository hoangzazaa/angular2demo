import {SpecifyTimeModalModel} from "../../specify-time-modal/SpecifyTimeModal.model";
import {ShippingDestinationModalComponent} from "../ShippingDestinationModal.component";
import {SpecifyTimeModalHelper} from "../../specify-time-modal/SpecifyTimeModal.helper";
export class SDMSpecifyTimeModalModel extends SpecifyTimeModalModel {

    public static readonly PROVIDER = "SpecifyTimeModal";

    constructor(private component: ShippingDestinationModalComponent) {
        super();
    }

    timeSelected() {
        let cd = this.component.curDestination;
        cd.sdm_specifyTime = SpecifyTimeModalHelper.getSpecifyTimeName(cd.stm_pattern, cd.stm_hour, cd.stm_minute);
    }
}
