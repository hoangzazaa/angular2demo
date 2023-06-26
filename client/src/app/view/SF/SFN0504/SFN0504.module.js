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
var SFN0504_page_1 = require("./SFN0504.page");
var SFN050401_FilterPanel_component_1 = require("./component/SFN050401.FilterPanel.component");
var SFN050402_StockList_component_1 = require("./component/SFN050402.StockList.component");
// route
var routes = [
    {
        path: '',
        component: SFN0504_page_1.SFN0504Page
    }
];
var routing = router_1.RouterModule.forChild(routes);
// module
var SFN0504Module = (function () {
    function SFN0504Module() {
    }
    SFN0504Module = __decorate([
        core_1.NgModule({
            imports: [
                http_1.HttpModule,
                forms_1.FormsModule,
                common_1.CommonModule,
                CommonDirective_module_1.CommonDirectiveModule,
                routing
            ],
            declarations: [
                // components
                SFN0504_page_1.SFN0504Page,
                SFN050401_FilterPanel_component_1.SFN050401Component,
                SFN050402_StockList_component_1.SFN050402Component
            ],
            exports: [SFN0504_page_1.SFN0504Page]
        }), 
        __metadata('design:paramtypes', [])
    ], SFN0504Module);
    return SFN0504Module;
}());
exports.SFN0504Module = SFN0504Module;
//# sourceMappingURL=SFN0504.module.js.map