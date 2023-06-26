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
var SFN0307_page_1 = require("./SFN0307.page");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var CommonDirective_module_1 = require("../../../directive/CommonDirective.module");
var common_1 = require("@angular/common");
var SFN030701_OrderItem_component_1 = require("./component/SFN030701.OrderItem.component");
var ProductInfoBox_module_1 = require("../../../component/product-info-box/ProductInfoBox.module");
// route
var routes = [
    {
        path: '',
        component: SFN0307_page_1.SFN0307Page
    }
];
var routing = router_1.RouterModule.forChild(routes);
// module
var SFN0307Module = (function () {
    function SFN0307Module() {
    }
    SFN0307Module = __decorate([
        core_1.NgModule({
            imports: [
                http_1.HttpModule,
                forms_1.FormsModule,
                common_1.CommonModule,
                CommonDirective_module_1.CommonDirectiveModule,
                ProductInfoBox_module_1.ProductInfoBoxModule,
                routing
            ],
            declarations: [
                // components
                SFN0307_page_1.SFN0307Page,
                SFN030701_OrderItem_component_1.SFN030701Component
            ],
            exports: [SFN0307_page_1.SFN0307Page]
        }), 
        __metadata('design:paramtypes', [])
    ], SFN0307Module);
    return SFN0307Module;
}());
exports.SFN0307Module = SFN0307Module;
//# sourceMappingURL=SFN0307.module.js.map