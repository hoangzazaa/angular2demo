import {PIBProduct} from "./model/PIBProduct.model";
import {PIBShipping} from "./model/PIBShipping.model";
import {PIBLoading} from "./model/PIBLoading.model";
import {SDMDestination} from "../shipping-destination-modal/model/SDMDestination.model";
import {PIBManufacture} from "./model/PIBManufacture.model";
export class ProductInfoBoxData {

    constructor() {

        this.displayCheck = false;
        this.enableCheck = true;

        this.selectedTab = 1;

        this.exportDisplayed = false;
        this.exportEnabled = false;

        this.isInputLot = false;
        this.isInputPrice = false;

        this.product = <PIBProduct>{};
        this.manufacture = <PIBManufacture>{};
        this.shippings = [];
        this.destinations = [];
    }

    tmpShipping: PIBShipping;

    //region Screen data
    displayCheck: boolean;
    enableCheck: boolean;
    selectedTab: number;

    exportDisplayed: boolean;
    exportEnabled: boolean;

    isInputLot: boolean;
    isInputPrice: boolean;

    product: PIBProduct;
    manufacture: PIBManufacture;
    shippings: PIBShipping[];
    loadings: PIBLoading[];
    destinations: SDMDestination[];
    //endregion
}