import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {CommonDirectiveModule} from "../../directive/CommonDirective.module";
import {FormsModule} from "@angular/forms";
import {SpecifyTimeModalComponent} from "./SpecifyTimeModal.component";

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        CommonDirectiveModule
    ],
    declarations: [
        SpecifyTimeModalComponent
    ],
    exports: [
        SpecifyTimeModalComponent
    ]
})
export class SpecifyTimeModalModule {
}