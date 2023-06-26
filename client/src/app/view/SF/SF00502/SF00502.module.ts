import {NgModule} from "@angular/core";
import {SF00502Page} from "./SF00502.page";
import {SF0050201Component} from "./component/SF0050201.PicSelect.component";
import {HttpModule} from "@angular/http";
import {Routes, RouterModule} from "@angular/router";
import {SF0050202Component} from "./component/SF0050202.MainPanel.component";
import {SF0050203Component} from "./component/SF0050203.CustomerTable.component";
import {SF0050204Component} from "./component/SF0050204.TableRow.component";
import {FormsModule} from "@angular/forms";
import {CommonDirectiveModule} from "../../../directive/CommonDirective.module";
import {CommonModule} from "@angular/common";

// route
const routes: Routes = [
    {
        path: '',
        component: SF00502Page
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
        SF00502Page,
        SF0050201Component,
        SF0050202Component,
        SF0050203Component,
        SF0050204Component
    ],
    exports: [SF00502Page]
})
export class SF00502Module {
}