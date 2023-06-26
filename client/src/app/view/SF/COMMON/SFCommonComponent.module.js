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
var CommonDirective_module_1 = require("../../../directive/CommonDirective.module");
var core_1 = require("@angular/core");
var RevenueListTable_component_1 = require("./revenue-list-table/RevenueListTable.component");
var ProductListTable_component_1 = require("./product-list-table/ProductListTable.component");
var StockListTable_component_1 = require("./stock-list-table/StockListTable.component");
var MailModal_component_1 = require("./mail-modal/MailModal.component");
var forms_1 = require("@angular/forms");
var SFCommonComponentModule = (function () {
    function SFCommonComponentModule() {
    }
    SFCommonComponentModule = __decorate([
        core_1.NgModule({
            imports: [
                forms_1.FormsModule,
                common_1.CommonModule,
                CommonDirective_module_1.CommonDirectiveModule
            ],
            declarations: [
                MailModal_component_1.MailModalComponent,
                RevenueListTable_component_1.RevenueListTableComponent,
                StockListTable_component_1.StockListTableComponent,
                ProductListTable_component_1.ProductListTableComponent
            ],
            exports: [
                MailModal_component_1.MailModalComponent,
                RevenueListTable_component_1.RevenueListTableComponent,
                StockListTable_component_1.StockListTableComponent,
                ProductListTable_component_1.ProductListTableComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], SFCommonComponentModule);
    return SFCommonComponentModule;
}());
exports.SFCommonComponentModule = SFCommonComponentModule;
//# sourceMappingURL=SFCommonComponent.module.js.map