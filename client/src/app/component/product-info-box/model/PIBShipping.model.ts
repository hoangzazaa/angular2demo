import {STMTime} from "../../specify-time-modal/model/STMTime.model";
export interface PIBShipping extends STMTime {

    pib_no: number;
    pib_shippingDate: Date;
    pib_deliveryDate: Date;
    pib_loadingAddressId: number;
    pib_loadingAddressName: string;
    pib_loadingAddressCode: string;
    pib_quantity: number;
    pib_specifyTime: string;
    pib_shippingCompany: number;
    pib_destinationId: number;
}
