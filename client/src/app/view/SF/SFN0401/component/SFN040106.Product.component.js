"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require("@angular/core");
var SFN0401_page_1 = require("../SFN0401.page");
var ProductListTable_model_1 = require("../../COMMON/product-list-table/ProductListTable.model");
var GenericProvider_1 = require("../../../../component/GenericProvider");
var ProductListTable_component_1 = require("../../COMMON/product-list-table/ProductListTable.component");
var SFN040102_PartnerPanel_component_1 = require("./SFN040102.PartnerPanel.component");
var SFN040106Component = (function (_super) {
    __extends(SFN040106Component, _super);
    function SFN040106Component(page, component, provider) {
        _super.call(this);
        this.page = page;
        this.component = component;
        provider.provider = this;
        if (this.component.data4 == undefined) {
            this.component.data4 = this.data;
        }
        else {
            this.data = this.component.data4;
        }
    }
    SFN040106Component.prototype.ngOnInit = function () {
        this.data.originDataList = this.component.partner.products;
    };
    //region Bindings
    //endregion
    //region Actions
    SFN040106Component.prototype.navigateToProduct = function (record) {
        this.page.navigateToProduct(record);
    };
    SFN040106Component.prototype.onTabSelected = function () {
        this.stockListTable.refreshTable();
    };
    __decorate([
        core_1.ViewChild(ProductListTable_component_1.ProductListTableComponent), 
        __metadata('design:type', ProductListTable_component_1.ProductListTableComponent)
    ], SFN040106Component.prototype, "stockListTable", void 0);
    SFN040106Component = __decorate([
        core_1.Component({
            selector: "[sfn040106]",
            templateUrl: "SFN040106.Product.component.html",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            providers: [{ provide: ProductListTable_model_1.ProductListTableModel.PROVIDER, useFactory: function () { return new GenericProvider_1.GenericProvider(); } }]
        }),
        __param(1, core_1.Inject(core_1.forwardRef(function () { return SFN040102_PartnerPanel_component_1.SFN040102Component; }))),
        __param(2, core_1.Inject(ProductListTable_model_1.ProductListTableModel.PROVIDER)), 
        __metadata('design:paramtypes', [SFN0401_page_1.SFN0401Page, SFN040102_PartnerPanel_component_1.SFN040102Component, GenericProvider_1.GenericProvider])
    ], SFN040106Component);
    return SFN040106Component;
}(ProductListTable_model_1.ProductListTableModel));
exports.SFN040106Component = SFN040106Component;
//# sourceMappingURL=SFN040106.Product.component.js.map