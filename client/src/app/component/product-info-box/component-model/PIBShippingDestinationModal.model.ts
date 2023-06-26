import {ProductInfoBoxComponent} from "../ProductInfoBox.component";
import {ShippingDestinationModalModel} from "../../shipping-destination-modal/ShippingDestinationModal.model";
import {SDMDestination} from "../../shipping-destination-modal/model/SDMDestination.model";

export class PIBShippingDestinationModalModel extends ShippingDestinationModalModel {

    constructor(private component: ProductInfoBoxComponent) {
        super();

        this.data.destinationList = component.data.destinations;
    }


    saveDestination(destination: SDMDestination): Promise<void> {
        return this.component.model.saveDestination(destination).then(() => {
            this.component.closeShippingDestination();
        });
    }
}
