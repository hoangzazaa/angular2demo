import {SpecifyTimeModalModel} from "../../specify-time-modal/SpecifyTimeModal.model";
import {SpecifyTimeModalHelper} from "../../specify-time-modal/SpecifyTimeModal.helper";
import {ShippingComponent} from "../component/Shipping.component";
import {ProductInfoBoxComponent} from "../ProductInfoBox.component";
export class PIBSpecifyTimeModalModel extends SpecifyTimeModalModel {

    public static readonly PROVIDER = "SpecifyTimeModal";

    constructor(private component: ProductInfoBoxComponent) {
        super();
    }

    timeSelected() {
        let cd = this.component.data.tmpShipping;
        cd.pib_specifyTime = SpecifyTimeModalHelper.getSpecifyTimeName(cd.stm_pattern, cd.stm_hour, cd.stm_minute);
    }
}
