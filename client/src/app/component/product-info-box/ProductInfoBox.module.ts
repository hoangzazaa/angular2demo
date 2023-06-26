import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {CommonDirectiveModule} from "../../directive/CommonDirective.module";
import {ProductInfoBoxComponent} from "./ProductInfoBox.component";
import {BasicInfoComponent} from "./component/BasicInfo.component";
import {FormsModule} from "@angular/forms";
import {ShippingComponent} from "./component/Shipping.component";
import {LoadingAddressComponent} from "./component/LoadingAddress.component";
import {SpecifyTimeModalModule} from "../specify-time-modal/SpecifyTimeModal.module";
import {ShippingDestinationModalModule} from "../shipping-destination-modal/ShippingDestinationModal.module";
import {ManufactureComponent} from "./component/Manufacture.component";

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        CommonDirectiveModule,
        SpecifyTimeModalModule,
        ShippingDestinationModalModule
    ],
    declarations: [
        ProductInfoBoxComponent,
        BasicInfoComponent,
        ShippingComponent,
        LoadingAddressComponent,
        ManufactureComponent
    ],
    exports: [
        ProductInfoBoxComponent
    ]
})
export class ProductInfoBoxModule {
}