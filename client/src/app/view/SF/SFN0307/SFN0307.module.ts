import {NgModule} from "@angular/core";
import {SFN0307Page} from "./SFN0307.page";
import {HttpModule} from "@angular/http";
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CommonDirectiveModule} from "../../../directive/CommonDirective.module";
import {CommonModule} from "@angular/common";
import {SFN030701Component} from "./component/SFN030701.OrderItem.component";
import {ProductInfoBoxModule} from "../../../component/product-info-box/ProductInfoBox.module";

// route
const routes: Routes = [
    {
        path: '',
        component: SFN0307Page
    }
];

const routing = RouterModule.forChild(routes);

// module
@NgModule({
    imports: [
        HttpModule,
        FormsModule,
        CommonModule,
        CommonDirectiveModule,
        ProductInfoBoxModule,
        routing
    ],
    declarations: [
        // components
        SFN0307Page,
        SFN030701Component
    ],
    exports: [SFN0307Page]
})
export class SFN0307Module {
}