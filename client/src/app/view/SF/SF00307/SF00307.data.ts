import {DealInfoModel} from "../COMMON/dealinfo/model/DealModel";
import {ShippingDestinationModel} from "./model/ShippingDestination.model";
import {ProductBoxModel} from "./model/ProductBox.model";
import {QuotationModel} from "./model/Quotation.model";
import {ShippingInstructionModel} from "./model/ShippingInstruction.model";

export class SF00307Data {
    //1. deal info
    dealInfo: DealInfoModel;
    //2. productBoxs
    productBoxs: ProductBoxModel[];
    //3. shipping
    shippingModel: ShippingDestinationModel;
    //4. quotations
    quotations: QuotationModel[];
    //5. shipping instructions
    shippingInstructions: ShippingInstructionModel[];
    //5. shippingHistory
    shippingHistory: ShippingDestinationModel[];

    _selectShipment: ShippingDestinationModel;

    fallbackDeal: string;

    get hasAtLeastOneProductChecked(): boolean {
        return (this.productBoxs || []).find(item => item.checked) != null;
    }

}
