import {Component, ElementRef, Inject, ViewChild, ViewEncapsulation} from "@angular/core";
import {ProductInfoBoxData} from "./ProductInfoBox.data";
import {ProductInfoBoxModel} from "./ProductInfoBox.model";
import {GenericProvider} from "../GenericProvider";
import {ProductInfoBoxHelper} from "./ProductInfoBox.helper";
import {PIBShipping} from "./model/PIBShipping.model";
import {LoadingAddressComponent} from "./component/LoadingAddress.component";
import {SpecifyTimeModalComponent} from "../specify-time-modal/SpecifyTimeModal.component";
import {ShippingDestinationModalComponent} from "../shipping-destination-modal/ShippingDestinationModal.component";
import {ShippingDestinationModalModel} from "../shipping-destination-modal/ShippingDestinationModal.model";
import {SpecifyTimeModalModel} from "../specify-time-modal/SpecifyTimeModal.model";
import {PIBShippingDestinationModalModel} from "./component-model/PIBShippingDestinationModal.model";
import {PIBSpecifyTimeModalModel} from "./component-model/PIBSpecifyTimeModal.model";

@Component({
    selector: "[product-info-box]",
    templateUrl: "ProductInfoBox.component.html",
    styleUrls: ["ProductInfoBox.component.css"],
    encapsulation: ViewEncapsulation.None,
    providers: [
        {provide: ShippingDestinationModalModel.PROVIDER, useFactory: () => new GenericProvider<ShippingDestinationModalModel>()},
        {provide: SpecifyTimeModalModel.PROVIDER, useFactory: () => new GenericProvider<SpecifyTimeModalModel>()}
    ]
})
export class ProductInfoBoxComponent {

    model: ProductInfoBoxModel;
    data: ProductInfoBoxData;
    @ViewChild("boxBody") boxBody: ElementRef;
    @ViewChild(SpecifyTimeModalComponent) specifyTime: SpecifyTimeModalComponent;
    @ViewChild(LoadingAddressComponent) loadingAddress: LoadingAddressComponent;
    @ViewChild(ShippingDestinationModalComponent) shippingDestinationModal: ShippingDestinationModalComponent;

    constructor(@Inject(ProductInfoBoxModel.PROVIDER) provider: GenericProvider<ProductInfoBoxModel>,
                @Inject(ShippingDestinationModalModel.PROVIDER) sdmProvider: GenericProvider<ShippingDestinationModalModel>,
                @Inject(SpecifyTimeModalModel.PROVIDER) stmProvider: GenericProvider<SpecifyTimeModalModel>) {
        // init
        this.model = provider.provider;
        this.data = this.model.data;

        // provider
        sdmProvider.provider = new PIBShippingDestinationModalModel(this);
        stmProvider.provider = new PIBSpecifyTimeModalModel(this);
    }

    //region Bindings

    get enableCheck(): boolean {
        return this.data.enableCheck;
    }

    get displayCheck(): boolean {
        return this.data.displayCheck;
    }

    get checked(): boolean {
        return this.data.product.pib_check;
    }

    set checked(value: boolean) {
        this.data.product.pib_check = value;
    }

    get productName(): string {
        return this.data.product.pib_name;
    }

    get productCode(): string {
        return this.data.product.pib_code;
    }

    get updateDate(): Date {
        return this.data.product.pib_updateDate;
    }

    get selectedTab(): number {
        return this.data.selectedTab;
    }

    get exportDisplayed(): boolean {
        return this.data.exportDisplayed;
    }

    get exportEnabled(): boolean {
        return this.data.exportEnabled;
    }

    get isCommercial(): boolean {
        return ProductInfoBoxHelper.isCommercialProduct(this.data.product);
    }

    get shippings(): PIBShipping[] {
        return this.data.shippings;
    }

    //endregion

    //region Actions

    toggleBox() {
        $(this.boxBody.nativeElement).collapse('toggle');
    }

    viewDetail() {
        this.model.viewDetail();
    }

    exportPdf() {
        this.model.exportPdf();
    }

    selectLoadingAddress(index: number) {
        this.data.tmpShipping = this.data.shippings[index];
        this.loadingAddress.open();
    }

    pickSpecifyTime(index: number) {
        this.data.tmpShipping = this.data.shippings[index];
        this.specifyTime.open(this.data.tmpShipping);
    }

    viewDestination(index: number) {
        this.data.tmpShipping = this.data.shippings[index];
        this.shippingDestinationModal.open(this.data.tmpShipping.pib_destinationId);
    }

    removeShipping(index: number) {
        this.model.removeShipping(index);
    }

    addShipping(index: number) {
        this.model.addShipping(index);
    }

    closeShippingDestination() {
        this.shippingDestinationModal.close();
    }

    //endregion

}
