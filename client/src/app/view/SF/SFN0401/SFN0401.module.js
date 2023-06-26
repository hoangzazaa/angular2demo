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
var SFN0401_page_1 = require("./SFN0401.page");
var SFN040101_FilterPanel_component_1 = require("./component/SFN040101.FilterPanel.component");
var SFN040102_PartnerPanel_component_1 = require("./component/SFN040102.PartnerPanel.component");
var SFN040103_BasicInfo_component_1 = require("./component/SFN040103.BasicInfo.component");
var SFN040104_Revenue_component_1 = require("./component/SFN040104.Revenue.component");
var SFN040105_Stock_component_1 = require("./component/SFN040105.Stock.component");
var SFN040106_Product_component_1 = require("./component/SFN040106.Product.component");
var SFCommonComponent_module_1 = require("../COMMON/SFCommonComponent.module");
// route
var routes = [
    {
        path: '',
        component: SFN0401_page_1.SFN0401Page
    }
];
var routing = router_1.RouterModule.forChild(routes);
// module
var SFN0401Module = (function () {
    function SFN0401Module() {
    }
    SFN0401Module = __decorate([
        core_1.NgModule({
            imports: [
                http_1.HttpModule,
                forms_1.FormsModule,
                common_1.CommonModule,
                CommonDirective_module_1.CommonDirectiveModule,
                SFCommonComponent_module_1.SFCommonComponentModule,
                routing
            ],
            declarations: [
                // components
                SFN0401_page_1.SFN0401Page,
                SFN040101_FilterPanel_component_1.SFN040101Component,
                SFN040102_PartnerPanel_component_1.SFN040102Component,
                SFN040103_BasicInfo_component_1.SFN040103Component,
                SFN040104_Revenue_component_1.SFN040104Component,
                SFN040105_Stock_component_1.SFN040105Component,
                SFN040106_Product_component_1.SFN040106Component
            ],
            exports: [SFN0401_page_1.SFN0401Page]
        }), 
        __metadata('design:paramtypes', [])
    ], SFN0401Module);
    return SFN0401Module;
}());
exports.SFN0401Module = SFN0401Module;
//# sourceMappingURL=SFN0401.module.js.map