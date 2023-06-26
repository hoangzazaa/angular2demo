import {CommonModule} from "@angular/common";
import {CommonDirectiveModule} from "../../../directive/CommonDirective.module";
import {NgModule} from "@angular/core";
import {RevenueListTableComponent} from "./revenue-list-table/RevenueListTable.component";
import {ProductListTableComponent} from "./product-list-table/ProductListTable.component";
import {StockListTableComponent} from "./stock-list-table/StockListTable.component";
import {MailModalComponent} from "./mail-modal/MailModal.component";
import {FormsModule} from "@angular/forms";

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        CommonDirectiveModule
    ],
    declarations: [
        MailModalComponent,
        RevenueListTableComponent,
        StockListTableComponent,
        ProductListTableComponent
    ],
    exports: [
        MailModalComponent,
        RevenueListTableComponent,
        StockListTableComponent,
        ProductListTableComponent
    ]
})
export class SFCommonComponentModule {
}