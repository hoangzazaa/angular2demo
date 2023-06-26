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
var CommonDirective_module_1 = require("../directive/CommonDirective.module");
var SF0010101_FilterTab1_component_1 = require("../view/SF/SF00101/component/SF0010101.FilterTab1.component");
var SF0010101_FilterTab2_component_1 = require("../view/SF/SF00101/component/SF0010101.FilterTab2.component");
var SF0010102_Graph_component_1 = require("../view/SF/SF00101/component/SF0010102.Graph.component");
var SF0010103_Revenue_component_1 = require("../view/SF/SF00101/component/SF0010103.Revenue.component");
var SF0010104_DealInfo_component_1 = require("../view/SF/SF00101/component/SF0010104.DealInfo.component");
var SF00101_page_1 = require("../view/SF/SF00101/SF00101.page");
/**
 * Pages declaration for SF001.
 * @author manhnv
 */
var SF00101Module = (function () {
    function SF00101Module() {
    }
    SF00101Module = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                CommonDirective_module_1.CommonDirectiveModule
            ],
            declarations: [
                SF00101_page_1.SF00101Page,
                SF0010101_FilterTab1_component_1.SF0010101FilterTab1Component,
                SF0010101_FilterTab2_component_1.SF0010101FilterTab2Component,
                SF0010102_Graph_component_1.SF0010102GraphComponent,
                SF0010103_Revenue_component_1.SF0010103RevenueComponent,
                SF0010104_DealInfo_component_1.SF0010104DealInfoComponent
            ],
            providers: [],
            exports: [
                SF00101_page_1.SF00101Page,
                SF0010101_FilterTab1_component_1.SF0010101FilterTab1Component,
                SF0010101_FilterTab2_component_1.SF0010101FilterTab2Component,
                SF0010102_Graph_component_1.SF0010102GraphComponent,
                SF0010103_Revenue_component_1.SF0010103RevenueComponent,
                SF0010104_DealInfo_component_1.SF0010104DealInfoComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], SF00101Module);
    return SF00101Module;
}());
exports.SF00101Module = SF00101Module;
//# sourceMappingURL=SF00101.module.js.map