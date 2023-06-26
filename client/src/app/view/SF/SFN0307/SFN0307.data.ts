import {SFN0307DataRepo} from "./SFN0307.datarepo";
import {DealInfoModel} from "../COMMON/dealinfo/model/DealModel";
import {ShippingDestinationModel} from "./model/ShippingDestination.model";
import {LoadingAddressModel} from "./model/LoadingAddress.model";
import {OrderItemModel} from "./model/OrderItem.model";
import {CustomerModel} from "./model/Customer.model";

export class SFN0307Data {

    constructor() {
        this.dataRepo = new SFN0307DataRepo();
        this.dealInfo = new DealInfoModel();

        this.orders = [];
        this.destinations = [];
        this.loadings = [];

        this.canChangeMode = true;
        this.screenMode = 1;
    }

    //region Background data

    // params
    dealCode: string;
    shippingProduct: string;
    shippingStock: number;

    // data map
    dataRepo: SFN0307DataRepo;

    dealInfo: DealInfoModel;
    customer: CustomerModel;

    orders: OrderItemModel[];
    destinations: ShippingDestinationModel[];
    loadings: LoadingAddressModel[];

    //endregion

    //region Screen data

    canChangeMode: boolean;
    screenMode: number;

    //endregion
}