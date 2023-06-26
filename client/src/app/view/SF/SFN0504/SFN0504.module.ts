import {NgModule} from "@angular/core";
import {HttpModule} from "@angular/http";
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CommonDirectiveModule} from "../../../directive/CommonDirective.module";
import {CommonModule} from "@angular/common";
import {SFN0504Page} from "./SFN0504.page";
import {SFN050401Component} from "./component/SFN050401.FilterPanel.component";
import {SFN050402Component} from "./component/SFN050402.StockList.component";

// route
const routes: Routes = [
    {
        path: '',
        component: SFN0504Page
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
        SFN0504Page,
        SFN050401Component,
        SFN050402Component
    ],
    exports: [SFN0504Page]
})
export class SFN0504Module {
}