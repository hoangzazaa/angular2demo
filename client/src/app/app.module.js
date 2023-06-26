"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var platform_browser_1 = require("@angular/platform-browser");
var angular2_datatable_1 = require("angular2-datatable");
var angular2_text_mask_1 = require("angular2-text-mask");
var ngx_tooltip_1 = require("ngx-tooltip");
var app_component_1 = require("./app.component");
var app_routes_1 = require("./app.routes");
var transaction_stock_component_1 = require("./component/transaction-stock/transaction-stock.component");
var CommonDirective_module_1 = require("./directive/CommonDirective.module");
var form_validate_directive_1 = require("./directive/form-validate.directive");
var form_directive_1 = require("./directive/form.directive");
var slick_directive_1 = require("./directive/slick.directive");
var deal_status_1 = require("./helper/deal-status");
var deal_type_1 = require("./helper/deal-type");
var product_type_1 = require("./helper/product-type");
var request_type_1 = require("./helper/request-type");
var error_pages_module_1 = require("./module/error-pages.module");
var SF00101_module_1 = require("./module/SF00101.module");
var file_util_1 = require("./util/file-util");
var CC00000_page_1 = require("./view/CC/CC00000/CC00000.page");
var CC00100_page_1 = require("./view/CC/CC00100/CC00100.page");
var CC00100_resolver_1 = require("./view/CC/CC00100/CC00100.resolver");
var CC00100_service_1 = require("./view/CC/CC00100/CC00100.service");
var CC00201_page_1 = require("./view/CC/CC00201/CC00201.page");
var CC00202_page_1 = require("./view/CC/CC00202/CC00202.page");
var CC00300_page_1 = require("./view/CC/CC00300/CC00300.page");
var CheckSheet_page_1 = require("./view/SF/COMMON/checksheet/CheckSheet.page");
var Tab1_component_1 = require("./view/SF/COMMON/checksheet/component/Tab1.component");
var Tab2_component_1 = require("./view/SF/COMMON/checksheet/component/Tab2.component");
var Tab3_component_1 = require("./view/SF/COMMON/checksheet/component/Tab3.component");
var Tab4_component_1 = require("./view/SF/COMMON/checksheet/component/Tab4.component");
var ProductInfo_page_1 = require("./view/SF/COMMON/productinfo/ProductInfo.page");
var SF00100_page_1 = require("./view/SF/SF00100/SF00100.page");
var SF09000_page_1 = require("./view/SF/SF00100/SF09000.page");
var SF09100_page_1 = require("./view/SF/SF00100/SF09100.page");
var SF00200_page_1 = require("./view/SF/SF00200/SF00200.page");
var SF00201_page_1 = require("./view/SF/SF00201/SF00201.page");
var SF0020201_DealInfo_component_1 = require("./view/SF/SF00202/component/SF0020201.DealInfo.component");
var SF0020202_Filter_component_1 = require("./view/SF/SF00202/component/SF0020202.Filter.component");
var SF00202_page_1 = require("./view/SF/SF00202/SF00202.page");
var SF00203_component_1 = require("./view/SF/SF00203/component/SF00203.component");
var SF00203_page_1 = require("./view/SF/SF00203/SF00203.page");
var SF0020401PanelSearch_page_1 = require("./view/SF/SF00204/component/SF0020401PanelSearch.page");
var SF00204_page_1 = require("./view/SF/SF00204/SF00204.page");
var SF0030101_DealOverview_component_1 = require("./view/SF/SF00301/component/SF0030101.DealOverview.component");
var SF0030103_ProductInfo_component_1 = require("./view/SF/SF00301/component/SF0030103.ProductInfo.component");
var SF0030104_QuotationInfo_component_1 = require("./view/SF/SF00301/component/SF0030104.QuotationInfo.component");
var SF0030105_DealFile_component_1 = require("./view/SF/SF00301/component/SF0030105.DealFile.component");
var SF0030106_FileModal_component_1 = require("./view/SF/SF00301/component/SF0030106.FileModal.component");
var SF0030107_Comment_component_1 = require("./view/SF/SF00301/component/SF0030107.Comment.component");
var SF0030108_ProductFileInfo_component_1 = require("./view/SF/SF00301/component/SF0030108.ProductFileInfo.component");
var SF0030110_RepeatDeal_component_1 = require("./view/SF/SF00301/component/SF0030110.RepeatDeal.component");
var SF00301_page_1 = require("./view/SF/SF00301/SF00301.page");
var SF0030201_component_1 = require("./view/SF/SF00302/component/common/SF0030201.component");
var SF0030203_component_1 = require("./view/SF/SF00302/component/common/SF0030203.component");
var SF0030205_component_1 = require("./view/SF/SF00302/component/common/SF0030205.component");
var SF0030214_component_1 = require("./view/SF/SF00302/component/common/SF0030214.component");
var SF0030222_component_1 = require("./view/SF/SF00302/component/common/SF0030222.component");
var SF003020101_page_1 = require("./view/SF/SF00302/component/SF0030201/SF003020101/SF003020101.page");
var SF0030202_component_1 = require("./view/SF/SF00302/component/SF0030201/SF003020101/SF0030202.component");
var SF0030204_component_1 = require("./view/SF/SF00302/component/SF0030201/SF003020101/SF0030204.component");
var SF0030206_component_1 = require("./view/SF/SF00302/component/SF0030201/SF003020101/SF0030206.component");
var SF0030207_component_1 = require("./view/SF/SF00302/component/SF0030201/SF003020101/SF0030207.component");
var SF003020102_page_1 = require("./view/SF/SF00302/component/SF0030201/SF003020102/SF003020102.page");
var SF0030215_component_1 = require("./view/SF/SF00302/component/SF0030201/SF003020102/SF0030215.component");
var SF0030216_component_1 = require("./view/SF/SF00302/component/SF0030201/SF003020102/SF0030216.component");
var SF0030208_component_1 = require("./view/SF/SF00302/component/SF0030201/SF0030208.component");
var SF0030209_component_1 = require("./view/SF/SF00302/component/SF0030201/SF0030209.component");
var SF0030210_component_1 = require("./view/SF/SF00302/component/SF0030201/SF0030210.component");
var SF0030211_component_1 = require("./view/SF/SF00302/component/SF0030201/SF0030211.component");
var SF0030212_component_1 = require("./view/SF/SF00302/component/SF0030201/SF0030212.component");
var SF0030213_component_1 = require("./view/SF/SF00302/component/SF0030201/SF0030213.component");
var SF003020201_page_1 = require("./view/SF/SF00302/component/SF0030202/SF003020201/SF003020201.page");
var SF0030217_component_1 = require("./view/SF/SF00302/component/SF0030202/SF003020201/SF0030217.component");
var SF0030218_component_1 = require("./view/SF/SF00302/component/SF0030202/SF0030218.component");
var SF0030219_component_1 = require("./view/SF/SF00302/component/SF0030202/SF0030219.component");
var SF0030220_component_1 = require("./view/SF/SF00302/component/SF0030202/SF0030220.component");
var SF0030221_component_1 = require("./view/SF/SF00302/component/SF0030202/SF003020201/SF0030221.component");
var SF0030223_component_1 = require("./view/SF/SF00302/component/common/SF0030223.component");
var SF0030301_component_1 = require("./view/SF/SF00303/component/SF0030301.component");
var SF0030302_component_1 = require("./view/SF/SF00303/component/SF0030302.component");
var SF0030303_component_1 = require("./view/SF/SF00303/component/SF0030303.component");
var SF00303_page_1 = require("./view/SF/SF00303/SF00303.page");
var SF00304_page_1 = require("./view/SF/SF00304/SF00304.page");
var SF00305_page_1 = require("./view/SF/SF00305/SF00305.page");
var SF00306_MailModal_component_1 = require("./view/SF/SF00306/component/SF00306.MailModal.component");
var SF0030602_SearchPic_component_1 = require("./view/SF/SF00306/component/SF0030602.SearchPic.component");
var SF00306_page_1 = require("./view/SF/SF00306/SF00306.page");
var SF0030701_QuotationInfor_component_1 = require("./view/SF/SF00307/component/SF0030701.QuotationInfor.component");
var SF0030702_ShippingInfo_component_1 = require("./view/SF/SF00307/component/SF0030702.ShippingInfo.component");
var SF0030703_PayInstructions_component_1 = require("./view/SF/SF00307/component/SF0030703.PayInstructions.component");
var SF00307_page_1 = require("./view/SF/SF00307/SF00307.page");
var SF0030801_component_1 = require("./view/SF/SF00308/component/SF0030801.component");
var SF0030802_component_1 = require("./view/SF/SF00308/component/SF0030802.component");
var SF0030803_component_1 = require("./view/SF/SF00308/component/SF0030803.component");
var SF0030804_component_1 = require("./view/SF/SF00308/component/SF0030804.component");
var SF00308_page_1 = require("./view/SF/SF00308/SF00308.page");
var SF0030902_MailModal_component_1 = require("./view/SF/SF00309/component/SF0030902.MailModal.component");
var SF0030903_SearchPic_component_1 = require("./view/SF/SF00309/component/SF0030903.SearchPic.component");
var SF00309_page_1 = require("./view/SF/SF00309/SF00309.page");
var SF0031001_Request_component_1 = require("./view/SF/SF00310/component/SF0031001.Request.component");
var SF0031002_MailModal_component_1 = require("./view/SF/SF00310/component/SF0031002.MailModal.component");
var SF0031003_SearchPic_component_1 = require("./view/SF/SF00310/component/SF0031003.SearchPic.component");
var SF00310_page_1 = require("./view/SF/SF00310/SF00310.page");
var SF00401_page_1 = require("./view/SF/SF00401/SF00401.page");
var SF00407_page_1 = require("./view/SF/SF00407/SF00407.page");
var SF0050301_component_1 = require("./view/SF/SF00503/component/SF0050301.component");
var SF0050302_component_1 = require("./view/SF/SF00503/component/SF0050302.component");
var SF0050303_component_1 = require("./view/SF/SF00503/component/SF0050303.component");
var SF0050304_component_1 = require("./view/SF/SF00503/component/SF0050304.component");
var SF0050305_component_1 = require("./view/SF/SF00503/component/SF0050305.component");
var SF0050306_component_1 = require("./view/SF/SF00503/component/SF0050306.component");
var SF0050307_component_1 = require("./view/SF/SF00503/component/SF0050307.component");
var SF0050308_component_1 = require("./view/SF/SF00503/component/SF0050308.component");
var SF0050309_component_1 = require("./view/SF/SF00503/component/SF0050309.component");
var SF0050310_component_1 = require("./view/SF/SF00503/component/SF0050310.component");
var SF00503_page_1 = require("./view/SF/SF00503/SF00503.page");
var SF00504_page_1 = require("./view/SF/SF00504/SF00504.page");
var SF00505_page_1 = require("./view/SF/SF00505/SF00505.page");
var SF00600_page_1 = require("./view/SF/SF00600/SF00600.page");
var SF00800_page_1 = require("./view/SF/SF00800/SF00800.page");
var SF00205_page_1 = require("./view/SF/SF00205/SF00205.page");
var SF0020501Filter_component_1 = require("./view/SF/SF00205/component/SF0020501Filter.component");
var SF0020502DealInfo_component_1 = require("./view/SF/SF00205/component/SF0020502DealInfo.component");
var ProductInfoBox_module_1 = require("./component/product-info-box/ProductInfoBox.module");
var SF003020103_page_1 = require("./view/SF/SF00302/component/SF0030201/SF003020103/SF003020103.page");
var SF003020202_page_1 = require("./view/SF/SF00302/component/SF0030202/SF003020202/SF003020202.page");
var SF0030224_component_1 = require("./view/SF/SF00302/component/SF0030201/SF003020103/SF0030224.component");
var SF0030225_component_1 = require("./view/SF/SF00302/component/SF0030202/SF003020202/SF0030225.component");
var SF0030226_component_1 = require("./view/SF/SF00302/component/SF0030202/SF003020202/SF0030226.component");
var SF0030227_Barcode_component_1 = require('./view/SF/SF00302/component/common/SF0030227.Barcode.component');
var SF0050311_component_1 = require("./view/SF/SF00503/component/SF0050311.component");
var SF0050312_component_1 = require("./view/SF/SF00503/component/SF0050312.component");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                http_1.HttpModule,
                angular2_text_mask_1.TextMaskModule,
                angular2_datatable_1.DataTableModule,
                error_pages_module_1.ErrorPagesModule,
                CommonDirective_module_1.CommonDirectiveModule,
                ProductInfoBox_module_1.ProductInfoBoxModule,
                SF00101_module_1.SF00101Module,
                ngx_tooltip_1.TooltipModule,
                app_routes_1.routing
            ],
            declarations: [
                /*Main Application*/
                app_component_1.AppComponent,
                /*Directives*/
                form_directive_1.FormDirective,
                form_validate_directive_1.FormValidateDirective,
                slick_directive_1.SlickDirective,
                /*Paginator*/
                /*TransactionStockComponent*/
                transaction_stock_component_1.TransactionStockComponent,
                /*Pipe declaration*/
                file_util_1.FileUtil,
                product_type_1.ProductType,
                deal_status_1.DealStatus,
                deal_type_1.DealType,
                request_type_1.RequestType,
                /*Layout*/
                SF00100_page_1.SF00100Page,
                // SF00101Page,
                // SF0010101FilterComponent,
                // SF0010102GraphComponent,
                // SF0010103RevenueComponent,
                // SF0010104DealInfoComponent,
                SF09100_page_1.SF09100Page,
                SF09000_page_1.SF09000Page,
                /*Page declaration*/
                CC00000_page_1.CC00000Page,
                /*CC*/
                CC00100_page_1.CC00100Page,
                CC00201_page_1.CC00201Page,
                CC00202_page_1.CC00202Page,
                CC00300_page_1.CC00300Page,
                /*SF002*/
                SF00200_page_1.SF00200Page,
                SF00201_page_1.SF00201Page,
                SF00202_page_1.SF00202Page,
                SF0020201_DealInfo_component_1.SF0020201DealInfoComponent,
                SF0020202_Filter_component_1.SF0020202FilterComponent,
                SF00203_page_1.SF00203Page,
                SF00203_component_1.SF00203Component,
                /*SF00204*/
                SF00204_page_1.SF00204Page,
                SF0020401PanelSearch_page_1.SF0020401PanelSearch,
                /*SF002-05*/
                SF00205_page_1.SF00205Page,
                SF0020501Filter_component_1.SF0020501FilterComponent,
                SF0020502DealInfo_component_1.SF0020502DealInfoComponent,
                /*SF003*/
                // SF00301Page,
                SF00301_page_1.SF00301Page,
                SF0030101_DealOverview_component_1.SF0030101Component,
                SF0030103_ProductInfo_component_1.SF0030103Component,
                SF0030104_QuotationInfo_component_1.SF0030104Component,
                SF0030105_DealFile_component_1.SF0030105Component,
                SF0030106_FileModal_component_1.SF0030106Component,
                SF0030107_Comment_component_1.SF0030107Component,
                SF0030108_ProductFileInfo_component_1.SF0030108Component,
                SF0030110_RepeatDeal_component_1.SF0030110Component,
                // SF00302Page,
                SF003020101_page_1.SF003020101Page,
                SF003020102_page_1.SF003020102Page,
                SF003020201_page_1.SF003020201Page,
                SF003020103_page_1.SF003020103Page,
                SF003020202_page_1.SF003020202Page,
                SF0030201_component_1.SF0030201Component,
                SF0030202_component_1.SF0030202Component,
                SF0030203_component_1.SF0030203Component,
                SF0030204_component_1.SF0030204Component,
                SF0030205_component_1.SF0030205Component,
                SF0030206_component_1.SF0030206Component,
                SF0030207_component_1.SF0030207Component,
                SF0030208_component_1.SF0030208Component,
                SF0030209_component_1.SF0030209Component,
                SF0030210_component_1.SF0030210Component,
                SF0030211_component_1.SF0030211Component,
                SF0030212_component_1.SF0030212Component,
                SF0030213_component_1.SF0030213Component,
                SF0030214_component_1.SF0030214Component,
                SF0030215_component_1.SF0030215Component,
                SF0030216_component_1.SF0030216Component,
                SF0030217_component_1.SF0030217Component,
                SF0030218_component_1.SF0030218Component,
                SF0030219_component_1.SF0030219Component,
                SF0030220_component_1.SF0030220Component,
                SF0030221_component_1.SF0030221Component,
                SF0030222_component_1.SF0030222Component,
                SF0030223_component_1.SF0030223Component,
                SF0030224_component_1.SF0030224Component,
                SF0030225_component_1.SF0030225Component,
                SF0030226_component_1.SF0030226Component,
                SF0030227_Barcode_component_1.SF0030227BarcodeComponent,
                // SF00302Page,
                /*SF00303*/
                SF00303_page_1.SF00303Page,
                SF0030301_component_1.SF0030301Component,
                SF0030302_component_1.SF0030302Component,
                SF0030303_component_1.SF0030303Component,
                /*SF00304*/
                SF00304_page_1.SF00304Page,
                /*SF00305*/
                SF00305_page_1.SF00305Page,
                /*SF00306*/
                SF00306_page_1.SF00306Page,
                SF00306_MailModal_component_1.SF00306MailModalComponent,
                SF0030602_SearchPic_component_1.SF0030602SearchPic,
                /*SF00307*/
                SF00307_page_1.SF00307Page,
                SF0030701_QuotationInfor_component_1.SF0030701QuotationInfor,
                SF0030702_ShippingInfo_component_1.SF0030702ShippingInfo,
                SF0030703_PayInstructions_component_1.SF0030703PayInstructions,
                /*SF00308*/
                SF00308_page_1.SF00308Page,
                SF0030801_component_1.SF0030801Component,
                SF0030802_component_1.SF0030802Component,
                SF0030803_component_1.SF0030803Component,
                SF0030804_component_1.SF0030804Component,
                /*SF00309*/
                SF00309_page_1.SF00309Page,
                SF0030902_MailModal_component_1.SF00300902MailModalComponent,
                SF0030903_SearchPic_component_1.SF0030903SearchPic,
                /*SF00310*/
                SF00310_page_1.SF00310Page,
                SF0031001_Request_component_1.SF0031001RequestProduct,
                SF0031002_MailModal_component_1.SF00301002MailModalComponent,
                SF0031003_SearchPic_component_1.SF0031003SearchPic,
                /*SF00311*/
                /*SF00401*/
                SF00401_page_1.SF00401Page,
                /*SF00407*/
                SF00407_page_1.SF00407Page,
                /*SF00503*/
                SF00503_page_1.SF00503Page,
                SF0050301_component_1.SF0050301Component,
                SF0050302_component_1.SF0050302Component,
                SF0050303_component_1.SF0050303Component,
                SF0050304_component_1.SF0050304Component,
                SF0050305_component_1.SF0050305Component,
                SF0050306_component_1.SF0050306Component,
                SF0050307_component_1.SF0050307Component,
                SF0050308_component_1.SF0050308Component,
                SF0050309_component_1.SF0050309Component,
                SF0050310_component_1.SF0050310Component,
                SF0050311_component_1.SF0050311Component,
                SF0050312_component_1.SF0050312Component,
                /*SF00504*/
                SF00504_page_1.SF00504Page,
                /*SF00505*/
                SF00505_page_1.SF00505Page,
                /*SF006*/
                SF00600_page_1.SF00600Page,
                /*SF008*/
                SF00800_page_1.SF00800Page,
                /*page common deal*/
                CheckSheet_page_1.CheckSheetPage,
                Tab1_component_1.Tab1Component,
                Tab2_component_1.Tab2Component,
                Tab3_component_1.Tab3Component,
                Tab4_component_1.Tab4Component,
                ProductInfo_page_1.ProductInfo,
            ],
            bootstrap: [app_component_1.AppComponent],
            providers: [
                { provide: common_1.LocationStrategy, useClass: common_1.PathLocationStrategy },
                CC00100_service_1.CC00100Service,
                CC00100_resolver_1.CC00100Resolver,
                app_routes_1.providers
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map