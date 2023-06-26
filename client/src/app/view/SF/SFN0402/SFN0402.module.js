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
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var CommonDirective_module_1 = require("../../../directive/CommonDirective.module");
var common_1 = require("@angular/common");
var SFN0402_page_1 = require("./SFN0402.page");
var SFCommonComponent_module_1 = require("../COMMON/SFCommonComponent.module");
var SFN040201_BasicInfo_component_1 = require("./component/SFN040201.BasicInfo.component");
var SFN040202_SalesPerformance_component_1 = require("./component/SFN040202.SalesPerformance.component");
var SFN040203_RevenuePanel_component_1 = require("./component/SFN040203.RevenuePanel.component");
var SFN040204_StockPanel_component_1 = require("./component/SFN040204.StockPanel.component");
var SFN040205_ProductPanel_component_1 = require("./component/SFN040205.ProductPanel.component");
var SFN040206_MailModal_component_1 = require("./component/SFN040206.MailModal.component");
var SFN040281_ShippingDestination_page_1 = require("./SFN040281.ShippingDestination.page");
var SFN040207_ShippingDestinationList_component_1 = require("./component/SFN040207.ShippingDestinationList.component");
var SFN0402_GetShippingDestinationDetail_resolver_1 = require('./SFN0402.GetShippingDestinationDetail.resolver');
var SFN0402_GetShippingDestinationList_resolver_1 = require("./SFN0402.GetShippingDestinationList.resolver");
var SFN0402_service_1 = require('./SFN0402.service');
var SpecifyTimeModal_module_1 = require('../../../component/specify-time-modal/SpecifyTimeModal.module');
// route
var routes = [
    {
        path: '',
        component: SFN0402_page_1.SFN0402Page
    },
    {
        path: 'shipping-destination/:shippingDestinationId',
        component: SFN040281_ShippingDestination_page_1.SFN040281ShippingDestinationPage,
        resolve: {
            shippingDestinationList: SFN0402_GetShippingDestinationList_resolver_1.SFN0402GetShippingDestinationListResolver,
            shippingDestination: SFN0402_GetShippingDestinationDetail_resolver_1.SFN0402GetShippingDestinationDetailResolver
        }
    }
];
var routing = router_1.RouterModule.forChild(routes);
// module
var SFN0402Module = (function () {
    function SFN0402Module() {
    }
    SFN0402Module = __decorate([
        core_1.NgModule({
            imports: [
                http_1.HttpModule,
                forms_1.FormsModule,
                common_1.CommonModule,
                CommonDirective_module_1.CommonDirectiveModule,
                SFCommonComponent_module_1.SFCommonComponentModule,
                SpecifyTimeModal_module_1.SpecifyTimeModalModule,
                routing
            ],
            declarations: [
                // components
                SFN0402_page_1.SFN0402Page,
                SFN040281_ShippingDestination_page_1.SFN040281ShippingDestinationPage,
                SFN040201_BasicInfo_component_1.SFN040201Component,
                SFN040202_SalesPerformance_component_1.SFN040202Component,
                SFN040203_RevenuePanel_component_1.SFN040203Component,
                SFN040204_StockPanel_component_1.SFN040204Component,
                SFN040205_ProductPanel_component_1.SFN040205Component,
                SFN040206_MailModal_component_1.SFN040206Component,
                SFN040207_ShippingDestinationList_component_1.SFN040207ShippingDestinationListComponent
            ],
            exports: [SFN0402_page_1.SFN0402Page],
            providers: [
                // Resolvers
                SFN0402_GetShippingDestinationList_resolver_1.SFN0402GetShippingDestinationListResolver,
                SFN0402_GetShippingDestinationDetail_resolver_1.SFN0402GetShippingDestinationDetailResolver,
                // Services
                SFN0402_service_1.SFN0402Service
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], SFN0402Module);
    return SFN0402Module;
}());
exports.SFN0402Module = SFN0402Module;
//# sourceMappingURL=SFN0402.module.js.map