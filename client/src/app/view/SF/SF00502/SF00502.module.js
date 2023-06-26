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
var SF00502_page_1 = require("./SF00502.page");
var SF0050201_PicSelect_component_1 = require("./component/SF0050201.PicSelect.component");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var SF0050202_MainPanel_component_1 = require("./component/SF0050202.MainPanel.component");
var SF0050203_CustomerTable_component_1 = require("./component/SF0050203.CustomerTable.component");
var SF0050204_TableRow_component_1 = require("./component/SF0050204.TableRow.component");
var forms_1 = require("@angular/forms");
var CommonDirective_module_1 = require("../../../directive/CommonDirective.module");
var common_1 = require("@angular/common");
// route
var routes = [
    {
        path: '',
        component: SF00502_page_1.SF00502Page
    }
];
var routing = router_1.RouterModule.forChild(routes);
// module
var SF00502Module = (function () {
    function SF00502Module() {
    }
    SF00502Module = __decorate([
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
                SF00502_page_1.SF00502Page,
                SF0050201_PicSelect_component_1.SF0050201Component,
                SF0050202_MainPanel_component_1.SF0050202Component,
                SF0050203_CustomerTable_component_1.SF0050203Component,
                SF0050204_TableRow_component_1.SF0050204Component
            ],
            exports: [SF00502_page_1.SF00502Page]
        }), 
        __metadata('design:paramtypes', [])
    ], SF00502Module);
    return SF00502Module;
}());
exports.SF00502Module = SF00502Module;
//# sourceMappingURL=SF00502.module.js.map