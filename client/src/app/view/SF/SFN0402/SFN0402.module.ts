import {NgModule} from "@angular/core";
import {HttpModule} from "@angular/http";
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CommonDirectiveModule} from "../../../directive/CommonDirective.module";
import {CommonModule} from "@angular/common";
import {SFN0402Page} from "./SFN0402.page";
import {SFCommonComponentModule} from "../COMMON/SFCommonComponent.module";
import {SFN040201Component} from "./component/SFN040201.BasicInfo.component";
import {SFN040202Component} from "./component/SFN040202.SalesPerformance.component";
import {SFN040203Component} from "./component/SFN040203.RevenuePanel.component";
import {SFN040204Component} from "./component/SFN040204.StockPanel.component";
import {SFN040205Component} from "./component/SFN040205.ProductPanel.component";
import {SFN040206Component} from "./component/SFN040206.MailModal.component";
import { SFN040281ShippingDestinationPage } from "./SFN040281.ShippingDestination.page";
import { SFN040207ShippingDestinationListComponent } from "./component/SFN040207.ShippingDestinationList.component";
import { SFN0402GetShippingDestinationDetailResolver } from './SFN0402.GetShippingDestinationDetail.resolver';
import { SFN0402GetShippingDestinationListResolver } from "./SFN0402.GetShippingDestinationList.resolver";
import { SFN0402Service } from './SFN0402.service';
import { SpecifyTimeModalModule } from '../../../component/specify-time-modal/SpecifyTimeModal.module';
import { SpecifyTimeModalComponent } from '../../../component/specify-time-modal/SpecifyTimeModal.component';

// route
const routes: Routes = [
    {
        path: '',
        component: SFN0402Page
    },
    {
        path: 'shipping-destination/:shippingDestinationId',
        component: SFN040281ShippingDestinationPage,
        resolve: {
            shippingDestinationList: SFN0402GetShippingDestinationListResolver,
            shippingDestination: SFN0402GetShippingDestinationDetailResolver
        }
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
        SpecifyTimeModalModule,
        routing
    ],
    declarations: [
        // components
        SFN0402Page,
        SFN040281ShippingDestinationPage,
        SFN040201Component,
        SFN040202Component,
        SFN040203Component,
        SFN040204Component,
        SFN040205Component,
        SFN040206Component,
        SFN040207ShippingDestinationListComponent
    ],
    exports: [SFN0402Page],
    providers: [
        // Resolvers
        SFN0402GetShippingDestinationListResolver,
        SFN0402GetShippingDestinationDetailResolver,
        // Services
        SFN0402Service
    ]
})
export class SFN0402Module {
}