import {ProductInfoBoxData} from "./ProductInfoBox.data";
import {SDMDestination} from "../shipping-destination-modal/model/SDMDestination.model";

export abstract class ProductInfoBoxModel {

    public static readonly PROVIDER = "ProductInfoBox";

    readonly data: ProductInfoBoxData;

    constructor() {
        this.data = new ProductInfoBoxData();
    }

    viewDetail() {
    }

    exportPdf() {
    }

    addShipping(index: number) {
    }

    removeShipping(index: number) {
    }

    saveDestination(destination: SDMDestination): Promise<void> {
        return Promise.resolve();
    }
}
