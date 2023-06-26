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
var RevenueListTable_model_1 = require("../../COMMON/revenue-list-table/RevenueListTable.model");
var GenericProvider_1 = require("../../../../component/GenericProvider");
var RevenueListTable_component_1 = require("../../COMMON/revenue-list-table/RevenueListTable.component");
var SFN040102_PartnerPanel_component_1 = require("./SFN040102.PartnerPanel.component");
var SFN040104Component = (function (_super) {
    __extends(SFN040104Component, _super);
    function SFN040104Component(page, component, provider) {
        _super.call(this);
        this.page = page;
        this.component = component;
        provider.provider = this;
        if (this.component.data2 == undefined) {
            this.component.data2 = this.data;
        }
        else {
            this.data = this.component.data2;
        }
        this.data.isSupplier = this.component.isSupplier;
    }
    SFN040104Component.prototype.ngOnInit = function () {
        this.data.originDataList = this.component.partner.revenues;
    };
    //region Bindings
    //endregion
    //region Actions
    SFN040104Component.prototype.navigateToDeal = function (record) {
        var dealCode = record.product.dealCode;
        this.page.navigateToDeal(dealCode);
    };
    SFN040104Component.prototype.navigateToProduct = function (record) {
        var product = record.product;
        this.page.navigateToProduct(product);
    };
    SFN040104Component.prototype.onTabSelected = function () {
        this.revenueListTable.refreshTable();
    };
    __decorate([
        core_1.ViewChild(RevenueListTable_component_1.RevenueListTableComponent), 
        __metadata('design:type', RevenueListTable_component_1.RevenueListTableComponent)
    ], SFN040104Component.prototype, "revenueListTable", void 0);
    SFN040104Component = __decorate([
        core_1.Component({
            selector: "[sfn040104]",
            templateUrl: "SFN040104.Revenue.component.html",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            providers: [{ provide: RevenueListTable_model_1.RevenueListTableModel.PROVIDER, useFactory: function () { return new GenericProvider_1.GenericProvider(); } }]
        }),
        __param(1, core_1.Inject(core_1.forwardRef(function () { return SFN040102_PartnerPanel_component_1.SFN040102Component; }))),
        __param(2, core_1.Inject(RevenueListTable_model_1.RevenueListTableModel.PROVIDER)), 
        __metadata('design:paramtypes', [SFN0401_page_1.SFN0401Page, SFN040102_PartnerPanel_component_1.SFN040102Component, GenericProvider_1.GenericProvider])
    ], SFN040104Component);
    return SFN040104Component;
}(RevenueListTable_model_1.RevenueListTableModel));
exports.SFN040104Component = SFN040104Component;
//# sourceMappingURL=SFN040104.Revenue.component.js.map