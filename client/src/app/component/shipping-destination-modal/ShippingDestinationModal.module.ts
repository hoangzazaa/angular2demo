import {CommonModule} from "@angular/common";
import {CommonDirectiveModule} from "../../directive/CommonDirective.module";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {ShippingDestinationModalComponent} from "./ShippingDestinationModal.component";
import {SpecifyTimeModalModule} from "../specify-time-modal/SpecifyTimeModal.module";

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        CommonDirectiveModule,
        SpecifyTimeModalModule
    ],
    declarations: [
        ShippingDestinationModalComponent
    ],
    exports: [
        ShippingDestinationModalComponent
    ]
})
export class ShippingDestinationModalModule {
}