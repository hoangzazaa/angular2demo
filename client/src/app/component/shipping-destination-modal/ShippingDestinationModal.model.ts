import {ShippingDestinationModalData} from "./ShippingDestinationModal.data";
import {SDMDestination} from "./model/SDMDestination.model";

export abstract class ShippingDestinationModalModel {

    public static readonly PROVIDER = "ShippingDestinationModal";

    readonly data: ShippingDestinationModalData;

    constructor() {
        this.data = new ShippingDestinationModalData();
    }

    saveDestination(destination: SDMDestination): Promise<void> {
        return Promise.resolve();
    }
}
