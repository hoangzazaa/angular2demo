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
var SF00501_page_1 = require("./SF00501.page");
var SF0050101_FilterPanel_component_1 = require("./component/SF0050101.FilterPanel.component");
var SF0050102_MainPanel_component_1 = require("./component/SF0050102.MainPanel.component");
var SF0050103_Graph_component_1 = require("./component/SF0050103.Graph.component");
var SF0050104_DetailTable_component_1 = require("./component/SF0050104.DetailTable.component");
var SF0050105_DetailTableRow_component_1 = require("./component/SF0050105.DetailTableRow.component");
var SF0050107_Deal_component_1 = require("./component/SF0050107.Deal.component");
var SF0050106_DealList_component_1 = require("./component/SF0050106.DealList.component");
// route
var routes = [
    {
        path: '',
        component: SF00501_page_1.SF00501Page
    }
];
var routing = router_1.RouterModule.forChild(routes);
// module
var SF00501Module = (function () {
    function SF00501Module() {
    }
    SF00501Module = __decorate([
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
                SF00501_page_1.SF00501Page,
                SF0050101_FilterPanel_component_1.SF0050101Component,
                SF0050102_MainPanel_component_1.SF0050102Component,
                SF0050103_Graph_component_1.SF0050103Component,
                SF0050104_DetailTable_component_1.SF0050104Component,
                SF0050105_DetailTableRow_component_1.SF0050105Component,
                SF0050106_DealList_component_1.SF0050106Component,
                SF0050107_Deal_component_1.SF0050107Component
            ],
            exports: [SF00501_page_1.SF00501Page]
        }), 
        __metadata('design:paramtypes', [])
    ], SF00501Module);
    return SF00501Module;
}());
exports.SF00501Module = SF00501Module;
//# sourceMappingURL=SF00501.module.js.map