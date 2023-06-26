import {NgModule} from "@angular/core";
import {HttpModule} from "@angular/http";
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CommonDirectiveModule} from "../../../directive/CommonDirective.module";
import {CommonModule} from "@angular/common";
import {SFN0401Page} from "./SFN0401.page";
import {SFN040101Component} from "./component/SFN040101.FilterPanel.component";
import {SFN040102Component} from "./component/SFN040102.PartnerPanel.component";
import {SFN040103Component} from "./component/SFN040103.BasicInfo.component";
import {SFN040104Component} from "./component/SFN040104.Revenue.component";
import {SFN040105Component} from "./component/SFN040105.Stock.component";
import {SFN040106Component} from "./component/SFN040106.Product.component";
import {SFCommonComponentModule} from "../COMMON/SFCommonComponent.module";

// route
const routes: Routes = [
    {
        path: '',
        component: SFN0401Page
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
        SFCommonComponentModule,
        routing
    ],
    declarations: [
        // components
        SFN0401Page,
        SFN040101Component,
        SFN040102Component,
        SFN040103Component,
        SFN040104Component,
        SFN040105Component,
        SFN040106Component
    ],
    exports: [SFN0401Page]
})
export class SFN0401Module {
}