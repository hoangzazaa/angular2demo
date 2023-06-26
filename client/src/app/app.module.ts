import {CommonModule, LocationStrategy, PathLocationStrategy} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {BrowserModule} from "@angular/platform-browser";
import {DataTableModule} from "angular2-datatable";
import {TextMaskModule} from "angular2-text-mask";
import {TooltipModule} from "ngx-tooltip";
import {AppComponent} from "./app.component";
import {providers, routing} from "./app.routes";
import {TransactionStockComponent} from "./component/transaction-stock/transaction-stock.component";
import {CommonDirectiveModule} from "./directive/CommonDirective.module";
import {FormValidateDirective} from "./directive/form-validate.directive";
import {FormDirective} from "./directive/form.directive";
import {SlickDirective} from "./directive/slick.directive";
import {DealStatus} from "./helper/deal-status";
import {DealType} from "./helper/deal-type";
import {ProductType} from "./helper/product-type";
import {RequestType} from "./helper/request-type";
import {ErrorPagesModule} from "./module/error-pages.module";
import {SF00101Module} from "./module/SF00101.module";
import {FileUtil} from "./util/file-util";
import {CC00000Page} from "./view/CC/CC00000/CC00000.page";
import {CC00100Page} from "./view/CC/CC00100/CC00100.page";
import {CC00100Resolver} from "./view/CC/CC00100/CC00100.resolver";
import {CC00100Service} from "./view/CC/CC00100/CC00100.service";
import {CC00201Page} from "./view/CC/CC00201/CC00201.page";
import {CC00202Page} from "./view/CC/CC00202/CC00202.page";
import {CC00300Page} from "./view/CC/CC00300/CC00300.page";
import {CheckSheetPage} from "./view/SF/COMMON/checksheet/CheckSheet.page";
import {Tab1Component} from "./view/SF/COMMON/checksheet/component/Tab1.component";
import {Tab2Component} from "./view/SF/COMMON/checksheet/component/Tab2.component";
import {Tab3Component} from "./view/SF/COMMON/checksheet/component/Tab3.component";
import {Tab4Component} from "./view/SF/COMMON/checksheet/component/Tab4.component";
import {ProductInfo} from "./view/SF/COMMON/productinfo/ProductInfo.page";
import {SF00100Page} from "./view/SF/SF00100/SF00100.page";
import {SF09000Page} from "./view/SF/SF00100/SF09000.page";
import {SF09100Page} from "./view/SF/SF00100/SF09100.page";
import {SF00200Page} from "./view/SF/SF00200/SF00200.page";
import {SF00201Page} from "./view/SF/SF00201/SF00201.page";
import {SF0020201DealInfoComponent} from "./view/SF/SF00202/component/SF0020201.DealInfo.component";
import {SF0020202FilterComponent} from "./view/SF/SF00202/component/SF0020202.Filter.component";
import {SF00202Page} from "./view/SF/SF00202/SF00202.page";
import {SF00203Component} from "./view/SF/SF00203/component/SF00203.component";
import {SF00203Page} from "./view/SF/SF00203/SF00203.page";
import {SF0020401PanelSearch} from "./view/SF/SF00204/component/SF0020401PanelSearch.page";
import {SF00204Page} from "./view/SF/SF00204/SF00204.page";
import {SF0030101Component} from "./view/SF/SF00301/component/SF0030101.DealOverview.component";
import {SF0030103Component} from "./view/SF/SF00301/component/SF0030103.ProductInfo.component";
import {SF0030104Component} from "./view/SF/SF00301/component/SF0030104.QuotationInfo.component";
import {SF0030105Component} from "./view/SF/SF00301/component/SF0030105.DealFile.component";
import {SF0030106Component} from "./view/SF/SF00301/component/SF0030106.FileModal.component";
import {SF0030107Component} from "./view/SF/SF00301/component/SF0030107.Comment.component";
import {SF0030108Component} from "./view/SF/SF00301/component/SF0030108.ProductFileInfo.component";
import {SF0030110Component} from "./view/SF/SF00301/component/SF0030110.RepeatDeal.component";
import {SF00301Page} from "./view/SF/SF00301/SF00301.page";
import {SF0030201Component} from "./view/SF/SF00302/component/common/SF0030201.component";
import {SF0030203Component} from "./view/SF/SF00302/component/common/SF0030203.component";
import {SF0030205Component} from "./view/SF/SF00302/component/common/SF0030205.component";
import {SF0030214Component} from "./view/SF/SF00302/component/common/SF0030214.component";
import {SF0030222Component} from "./view/SF/SF00302/component/common/SF0030222.component";
import {SF003020101Page} from "./view/SF/SF00302/component/SF0030201/SF003020101/SF003020101.page";
import {SF0030202Component} from "./view/SF/SF00302/component/SF0030201/SF003020101/SF0030202.component";
import {SF0030204Component} from "./view/SF/SF00302/component/SF0030201/SF003020101/SF0030204.component";
import {SF0030206Component} from "./view/SF/SF00302/component/SF0030201/SF003020101/SF0030206.component";
import {SF0030207Component} from "./view/SF/SF00302/component/SF0030201/SF003020101/SF0030207.component";
import {SF003020102Page} from "./view/SF/SF00302/component/SF0030201/SF003020102/SF003020102.page";
import {SF0030215Component} from "./view/SF/SF00302/component/SF0030201/SF003020102/SF0030215.component";
import {SF0030216Component} from "./view/SF/SF00302/component/SF0030201/SF003020102/SF0030216.component";
import {SF0030208Component} from "./view/SF/SF00302/component/SF0030201/SF0030208.component";
import {SF0030209Component} from "./view/SF/SF00302/component/SF0030201/SF0030209.component";
import {SF0030210Component} from "./view/SF/SF00302/component/SF0030201/SF0030210.component";
import {SF0030211Component} from "./view/SF/SF00302/component/SF0030201/SF0030211.component";
import {SF0030212Component} from "./view/SF/SF00302/component/SF0030201/SF0030212.component";
import {SF0030213Component} from "./view/SF/SF00302/component/SF0030201/SF0030213.component";
import {SF003020201Page} from "./view/SF/SF00302/component/SF0030202/SF003020201/SF003020201.page";
import {SF0030217Component} from "./view/SF/SF00302/component/SF0030202/SF003020201/SF0030217.component";
import {SF0030218Component} from "./view/SF/SF00302/component/SF0030202/SF0030218.component";
import {SF0030219Component} from "./view/SF/SF00302/component/SF0030202/SF0030219.component";
import {SF0030220Component} from "./view/SF/SF00302/component/SF0030202/SF0030220.component";
import {SF0030221Component} from "./view/SF/SF00302/component/SF0030202/SF003020201/SF0030221.component";
import {SF0030223Component} from "./view/SF/SF00302/component/common/SF0030223.component";
import {SF0030301Component} from "./view/SF/SF00303/component/SF0030301.component";
import {SF0030302Component} from "./view/SF/SF00303/component/SF0030302.component";
import {SF0030303Component} from "./view/SF/SF00303/component/SF0030303.component";
import {SF00303Page} from "./view/SF/SF00303/SF00303.page";
import {SF00304Page} from "./view/SF/SF00304/SF00304.page";
import {SF00305Page} from "./view/SF/SF00305/SF00305.page";
import {SF00306MailModalComponent} from "./view/SF/SF00306/component/SF00306.MailModal.component";
import {SF0030602SearchPic} from "./view/SF/SF00306/component/SF0030602.SearchPic.component";
import {SF00306Page} from "./view/SF/SF00306/SF00306.page";
import {SF0030701QuotationInfor} from "./view/SF/SF00307/component/SF0030701.QuotationInfor.component";
import {SF0030702ShippingInfo} from "./view/SF/SF00307/component/SF0030702.ShippingInfo.component";
import {SF0030703PayInstructions} from "./view/SF/SF00307/component/SF0030703.PayInstructions.component";
import {SF00307Page} from "./view/SF/SF00307/SF00307.page";
import {SF0030801Component} from "./view/SF/SF00308/component/SF0030801.component";
import {SF0030802Component} from "./view/SF/SF00308/component/SF0030802.component";
import {SF0030803Component} from "./view/SF/SF00308/component/SF0030803.component";
import {SF0030804Component} from "./view/SF/SF00308/component/SF0030804.component";
import {SF00308Page} from "./view/SF/SF00308/SF00308.page";
import {SF00300902MailModalComponent} from "./view/SF/SF00309/component/SF0030902.MailModal.component";
import {SF0030903SearchPic} from "./view/SF/SF00309/component/SF0030903.SearchPic.component";
import {SF00309Page} from "./view/SF/SF00309/SF00309.page";
import {SF0031001RequestProduct} from "./view/SF/SF00310/component/SF0031001.Request.component";
import {SF00301002MailModalComponent} from "./view/SF/SF00310/component/SF0031002.MailModal.component";
import {SF0031003SearchPic} from "./view/SF/SF00310/component/SF0031003.SearchPic.component";
import {SF00310Page} from "./view/SF/SF00310/SF00310.page";
import {SF00401Page} from "./view/SF/SF00401/SF00401.page";
import {SF00407Page} from "./view/SF/SF00407/SF00407.page";
import {SF0050301Component} from "./view/SF/SF00503/component/SF0050301.component";
import {SF0050302Component} from "./view/SF/SF00503/component/SF0050302.component";
import {SF0050303Component} from "./view/SF/SF00503/component/SF0050303.component";
import {SF0050304Component} from "./view/SF/SF00503/component/SF0050304.component";
import {SF0050305Component} from "./view/SF/SF00503/component/SF0050305.component";
import {SF0050306Component} from "./view/SF/SF00503/component/SF0050306.component";
import {SF0050307Component} from "./view/SF/SF00503/component/SF0050307.component";
import {SF0050308Component} from "./view/SF/SF00503/component/SF0050308.component";
import {SF0050309Component} from "./view/SF/SF00503/component/SF0050309.component";
import {SF0050310Component} from "./view/SF/SF00503/component/SF0050310.component";
import {SF00503Page} from "./view/SF/SF00503/SF00503.page";
import {SF00504Page} from "./view/SF/SF00504/SF00504.page";
import {SF00505Page} from "./view/SF/SF00505/SF00505.page";
import {SF00600Page} from "./view/SF/SF00600/SF00600.page";
import {SF00800Page} from "./view/SF/SF00800/SF00800.page";
import {SF00205Page} from "./view/SF/SF00205/SF00205.page";
import {SF0020501FilterComponent} from "./view/SF/SF00205/component/SF0020501Filter.component";
import {SF0020502DealInfoComponent} from "./view/SF/SF00205/component/SF0020502DealInfo.component";
import {ProductInfoBoxModule} from "./component/product-info-box/ProductInfoBox.module";
import {SF003020103Page} from "./view/SF/SF00302/component/SF0030201/SF003020103/SF003020103.page";
import {SF003020202Page} from "./view/SF/SF00302/component/SF0030202/SF003020202/SF003020202.page";
import {SF0030224Component} from "./view/SF/SF00302/component/SF0030201/SF003020103/SF0030224.component";
import {SF0030225Component} from "./view/SF/SF00302/component/SF0030202/SF003020202/SF0030225.component";
import {SF0030226Component} from "./view/SF/SF00302/component/SF0030202/SF003020202/SF0030226.component";
import {SF0030227BarcodeComponent} from './view/SF/SF00302/component/common/SF0030227.Barcode.component';
import {SF0050311Component} from "./view/SF/SF00503/component/SF0050311.component";
import {SF0050312Component} from "./view/SF/SF00503/component/SF0050312.component";


@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        TextMaskModule,
        DataTableModule,
        ErrorPagesModule,
        CommonDirectiveModule,
        ProductInfoBoxModule,
        SF00101Module,
        TooltipModule,
        routing
    ],
    declarations: [
        /*Main Application*/
        AppComponent,
        /*Directives*/
        FormDirective,
        FormValidateDirective,
        SlickDirective,
        /*Paginator*/
        /*TransactionStockComponent*/
        TransactionStockComponent,
        /*Pipe declaration*/
        FileUtil,
        ProductType,
        DealStatus,
        DealType,
        RequestType,
        /*Layout*/
        SF00100Page,
        // SF00101Page,
        // SF0010101FilterComponent,
        // SF0010102GraphComponent,
        // SF0010103RevenueComponent,
        // SF0010104DealInfoComponent,
        SF09100Page,
        SF09000Page,
        /*Page declaration*/
        CC00000Page,
        /*CC*/
        CC00100Page,
        CC00201Page,
        CC00202Page,
        CC00300Page,
        /*SF002*/
        SF00200Page,
        SF00201Page,
        SF00202Page,
        SF0020201DealInfoComponent,
        SF0020202FilterComponent,
        SF00203Page,
        SF00203Component,
        /*SF00204*/
        SF00204Page,
        SF0020401PanelSearch,
        /*SF002-05*/
        SF00205Page,
        SF0020501FilterComponent,
        SF0020502DealInfoComponent,
        /*SF003*/
        // SF00301Page,
        SF00301Page,
        SF0030101Component,
        SF0030103Component,
        SF0030104Component,
        SF0030105Component,
        SF0030106Component,
        SF0030107Component,
        SF0030108Component,
        SF0030110Component,
        // SF00302Page,
        SF003020101Page,
        SF003020102Page,
        SF003020201Page,
        SF003020103Page,
        SF003020202Page,
        SF0030201Component,
        SF0030202Component,
        SF0030203Component,
        SF0030204Component,
        SF0030205Component,
        SF0030206Component,
        SF0030207Component,
        SF0030208Component,
        SF0030209Component,
        SF0030210Component,
        SF0030211Component,
        SF0030212Component,
        SF0030213Component,
        SF0030214Component,
        SF0030215Component,
        SF0030216Component,
        SF0030217Component,
        SF0030218Component,
        SF0030219Component,
        SF0030220Component,
        SF0030221Component,
        SF0030222Component,
        SF0030223Component,
        SF0030224Component,
        SF0030225Component,
        SF0030226Component,
        SF0030227BarcodeComponent,
        // SF00302Page,
        /*SF00303*/
        SF00303Page,
        SF0030301Component,
        SF0030302Component,
        SF0030303Component,
        /*SF00304*/
        SF00304Page,
        /*SF00305*/
        SF00305Page,
        /*SF00306*/
        SF00306Page,
        SF00306MailModalComponent,
        SF0030602SearchPic,
        /*SF00307*/
        SF00307Page,
        SF0030701QuotationInfor,
        SF0030702ShippingInfo,
        SF0030703PayInstructions,
        /*SF00308*/
        SF00308Page,
        SF0030801Component,
        SF0030802Component,
        SF0030803Component,
        SF0030804Component,
        /*SF00309*/
        SF00309Page,
        SF00300902MailModalComponent,
        SF0030903SearchPic,
        /*SF00310*/
        SF00310Page,
        SF0031001RequestProduct,
        SF00301002MailModalComponent,
        SF0031003SearchPic,
        /*SF00311*/
        /*SF00401*/
        SF00401Page,
        /*SF00407*/
        SF00407Page,
        /*SF00503*/
        SF00503Page,
        SF0050301Component,
        SF0050302Component,
        SF0050303Component,
        SF0050304Component,
        SF0050305Component,
        SF0050306Component,
        SF0050307Component,
        SF0050308Component,
        SF0050309Component,
        SF0050310Component,
        SF0050311Component,
        SF0050312Component,
        /*SF00504*/
        SF00504Page,
        /*SF00505*/
        SF00505Page,
        /*SF006*/
        SF00600Page,
        /*SF008*/
        SF00800Page,
        /*page common deal*/
        CheckSheetPage,
        Tab1Component,
        Tab2Component,
        Tab3Component,
        Tab4Component,
        ProductInfo,
    ],
    bootstrap: [AppComponent],
    providers: [
        {provide: LocationStrategy, useClass: PathLocationStrategy},
        CC00100Service,
        CC00100Resolver,
        providers
    ]
})
export class AppModule {
}
