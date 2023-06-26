import {SDMDestination} from "./model/SDMDestination.model";
export class ShippingDestinationModalData {

    constructor() {

        this.destinationList = [];
    }

    //region Screen data
    destinationList: SDMDestination[];
    //endregion
}