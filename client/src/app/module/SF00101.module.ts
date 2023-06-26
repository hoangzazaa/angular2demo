import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {CommonDirectiveModule} from "../directive/CommonDirective.module";
import {SF0010101FilterTab1Component} from "../view/SF/SF00101/component/SF0010101.FilterTab1.component";
import {SF0010101FilterTab2Component} from "../view/SF/SF00101/component/SF0010101.FilterTab2.component";
import {SF0010102GraphComponent} from "../view/SF/SF00101/component/SF0010102.Graph.component";
import {SF0010103RevenueComponent} from "../view/SF/SF00101/component/SF0010103.Revenue.component";
import {SF0010104DealInfoComponent} from "../view/SF/SF00101/component/SF0010104.DealInfo.component";
import {SF00101Page} from "../view/SF/SF00101/SF00101.page";

/**
 * Pages declaration for SF001.
 * @author manhnv
 */
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        CommonDirectiveModule
    ],
    declarations: [ // components and directives...
        SF00101Page,
        SF0010101FilterTab1Component,
        SF0010101FilterTab2Component,
        SF0010102GraphComponent,
        SF0010103RevenueComponent,
        SF0010104DealInfoComponent
    ],
    providers: [], // provides if need as services...
    exports: [
        SF00101Page,
        SF0010101FilterTab1Component,
        SF0010101FilterTab2Component,
        SF0010102GraphComponent,
        SF0010103RevenueComponent,
        SF0010104DealInfoComponent
    ]
})
export class SF00101Module {
}