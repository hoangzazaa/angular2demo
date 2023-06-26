import {NgModule} from "@angular/core";
import {HttpModule} from "@angular/http";
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CommonDirectiveModule} from "../../../directive/CommonDirective.module";
import {CommonModule} from "@angular/common";
import {SFN0505Page} from "./SFN0505.page";
import {SFN050501Component} from "./component/SFN050501.FilterPanel.component";
import {SFN050502Component} from "./component/SFN050502.ShippingList.component";

// route
const routes: Routes = [
    {
        path: '',
        component: SFN0505Page
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
        routing
    ],
    declarations: [
        // components
        SFN0505Page,
        SFN050501Component,
        SFN050502Component
    ],
    exports: [SFN0505Page]
})
export class SFN0505Module {
}