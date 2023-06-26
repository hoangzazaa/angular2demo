import {NgModule} from "@angular/core";
import {HttpModule} from "@angular/http";
import {Routes, RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CommonDirectiveModule} from "../../../directive/CommonDirective.module";
import {CommonModule} from "@angular/common";
import {SF00501Page} from "./SF00501.page";
import {SF0050101Component} from "./component/SF0050101.FilterPanel.component";
import {SF0050102Component} from "./component/SF0050102.MainPanel.component";
import {SF0050103Component} from "./component/SF0050103.Graph.component";
import {SF0050104Component} from "./component/SF0050104.DetailTable.component";
import {SF0050105Component} from "./component/SF0050105.DetailTableRow.component";
import {SF0050107Component} from "./component/SF0050107.Deal.component";
import {SF0050106Component} from "./component/SF0050106.DealList.component";
import {EllipsisPipe} from "../../../helper/ellipsis.pipe";

// route
const routes: Routes = [
    {
        path: '',
        component: SF00501Page
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
        SF00501Page,
        SF0050101Component,
        SF0050102Component,
        SF0050103Component,
        SF0050104Component,
        SF0050105Component,
        SF0050106Component,
        SF0050107Component
    ],
    exports: [SF00501Page]
})
export class SF00501Module {
}