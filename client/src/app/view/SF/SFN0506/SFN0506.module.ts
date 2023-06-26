import {NgModule} from "@angular/core";
import {HttpModule} from "@angular/http";
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CommonDirectiveModule} from "../../../directive/CommonDirective.module";
import {CommonModule} from "@angular/common";
import {SFN0506Page} from "./SFN0506.page";
import {SFN050601Component} from "./component/SFN050601.FilterPanel.component";
import {SFN050602Component} from "./component/SFN050602.PaymentList.component";

// route
const routes: Routes = [
    {
        path: '',
        component: SFN0506Page
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
        SFN0506Page,
        SFN050601Component,
        SFN050602Component
    ],
    exports: [SFN0506Page]
})
export class SFN0506Module {
}