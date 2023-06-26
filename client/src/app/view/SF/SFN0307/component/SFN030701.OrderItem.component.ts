import {Component, Inject, Input, OnInit} from "@angular/core";
import {SFN0307Service} from "../SFN0307.service";
import {SFN0307Page} from "../SFN0307.page";
import {ProductInfoBoxModel} from "../../../../component/product-info-box/ProductInfoBox.model";
import {GenericProvider} from "../../../../component/GenericProvider";
import {SDMDestination} from "../../../../component/shipping-destination-modal/model/SDMDestination.model";
import {OrderItemModel} from "../model/OrderItem.model";
import {SFN0307Helper} from "../SFN0307.helper";
import {SFN0307Constants} from "../SFN0307.constants";

@Component({
    selector: "[sfn030701]",
    template: `
        <div product-info-box></div>`,
    providers: [{provide: ProductInfoBoxModel.PROVIDER, useFactory: () => new GenericProvider<ProductInfoBoxModel>()}]
})
export class SFN030701Component extends ProductInfoBoxModel implements OnInit {

    @Input() index: number;
    private order: OrderItemModel;

    constructor(private service: SFN0307Service, private page: SFN0307Page,
                @Inject(ProductInfoBoxModel.PROVIDER) provider: GenericProvider<ProductInfoBoxModel>) {
        super();

        provider.provider = this;

        // setting
        this.data.displayCheck = true;
        this.data.exportDisplayed = true;
        this.data.isInputLot = true;
        this.data.isInputPrice = true;

        // loading address
        this.data.loadings = this.page.pageData.loadings;
        // shipping destination
        this.data.destinations = this.page.pageData.destinations;
    }

    ngOnInit(): void {
        // set data product
        this.order = this.page.pageData.orders[this.index];
        // set data
        this.data.product = this.order;
        this.data.manufacture = this.order;
        this.data.shippings = this.order.shippings;
        // disable change order when update shipping
        if (this.page.pageData.screenMode == SFN0307Constants.MODE_UPDATE
            && this.order.id != undefined) {
            // disable check
            this.data.enableCheck = false;
            // disable edit lot and price
            // this.data.isInputLot = false;
            // this.data.isInputPrice = false;

            this.data.exportEnabled = true;
        }
    }

    //region Actions

    viewDetail() {
        this.page.viewProductInfo(this.index);
    }

    exportPdf() {
        this.page.exportPdf(this.index);
    }

    addShipping(index: number) {
        let shippingPlan = SFN0307Helper.createNewShipping(this.order, this.page.pageData);
        this.order.shippings.splice(index + 1, 0, shippingPlan);
    }

    removeShipping(index: number) {
        this.order.shippings.splice(index, 1);
    }

    saveDestination(destination: SDMDestination): Promise<void> {
        return this.page.saveDestination(destination).then(() => {
            // selected added destination
            let destinations = this.page.pageData.destinations;
            let destination = destinations[destinations.length - 1];
            this.data.tmpShipping.pib_destinationId = destination.sdm_id;
        });
    }

    //endregion
}