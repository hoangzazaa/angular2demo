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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require("@angular/core");
var ShippingDestinationModal_model_1 = require("./ShippingDestinationModal.model");
var SpecifyTimeModal_component_1 = require("../specify-time-modal/SpecifyTimeModal.component");
var GenericProvider_1 = require("../GenericProvider");
var common_helper_1 = require("../../helper/common-helper");
var mst_data_type_1 = require('../../helper/mst-data-type');
var SpecifyTimeModal_model_1 = require("../specify-time-modal/SpecifyTimeModal.model");
var SDMSpecifyTimeModal_model_1 = require("./component-model/SDMSpecifyTimeModal.model");
var DISTRICT_OPTIONS = common_helper_1.CommonHelper.getList(mst_data_type_1.DISTRICT_CODE_LIST, mst_data_type_1.DISTRICT_NAME);
var VEHICLE_OPTIONS = common_helper_1.CommonHelper.getList(mst_data_type_1.VEHICLE_SIZE_CODE_LIST, mst_data_type_1.VEHICLE_SIZE);
var FORM_OPTIONS = common_helper_1.CommonHelper.getList(mst_data_type_1.EXTRA_METHOD_CODE_LIST, mst_data_type_1.EXTRA_METHOD_NAME);
var ShippingDestinationModalComponent = (function () {
    function ShippingDestinationModalComponent(provider, stmProvider) {
        // get init
        this.model = provider.provider;
        this.data = this.model.data;
        // specify time modal
        stmProvider.provider = new SDMSpecifyTimeModal_model_1.SDMSpecifyTimeModalModel(this);
        // init
        this.saveEnable = true;
        this.curDestination = {};
    }
    Object.defineProperty(ShippingDestinationModalComponent.prototype, "destinationId", {
        //region Bindings
        get: function () {
            return this.curDestination.sdm_id;
        },
        set: function (value) {
            this.selectDestination(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShippingDestinationModalComponent.prototype, "destination", {
        get: function () {
            return this.curDestination;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShippingDestinationModalComponent.prototype, "destinationList", {
        get: function () {
            return this.data.destinationList;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShippingDestinationModalComponent.prototype, "districtList", {
        get: function () {
            return DISTRICT_OPTIONS;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShippingDestinationModalComponent.prototype, "vehicleList", {
        get: function () {
            return VEHICLE_OPTIONS;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShippingDestinationModalComponent.prototype, "formList", {
        get: function () {
            return FORM_OPTIONS;
        },
        enumerable: true,
        configurable: true
    });
    //endregion
    //region Actions
    ShippingDestinationModalComponent.prototype.open = function (destinationId) {
        // set value
        this.selectDestination(destinationId);
        // open modal
        $(this.modalE.nativeElement).modal('show');
    };
    ShippingDestinationModalComponent.prototype.close = function () {
        $(this.modalE.nativeElement).modal('hide');
    };
    ShippingDestinationModalComponent.prototype.pickSpecifyTime = function () {
        this.specifyTime.open(this.curDestination);
    };
    ShippingDestinationModalComponent.prototype.cancel = function () {
        this.close();
    };
    ShippingDestinationModalComponent.prototype.save = function () {
        var _this = this;
        this.saveEnable = false;
        this.model.saveDestination(this.curDestination).then(function () {
            _this.saveEnable = true;
        });
    };
    //endregion
    //region private
    ShippingDestinationModalComponent.prototype.selectDestination = function (destinationId) {
        var dest = {};
        for (var _i = 0, _a = this.data.destinationList; _i < _a.length; _i++) {
            var iDest = _a[_i];
            if (iDest.sdm_id == destinationId) {
                dest = iDest;
                break;
            }
        }
        // cache obj
        this.curDestination = {};
        // Id
        this.curDestination.sdm_id = dest.sdm_id;
        // ext
        this.curDestination.sdm_ext = dest.sdm_ext;
        // option name
        this.curDestination.sdm_name = dest.sdm_name;
        // 納入先名
        this.curDestination.sdm_deliveryName = dest.sdm_deliveryName;
        // 納入先名（略称）
        this.curDestination.sdm_abbreviation = dest.sdm_abbreviation;
        // フリガナ
        this.curDestination.sdm_furigana = dest.sdm_furigana;
        // 略称カナ
        this.curDestination.sdm_abbrFurigana = dest.sdm_abbrFurigana;
        // 郵便番号
        this.curDestination.sdm_postalCode = dest.sdm_postalCode;
        // 地区コード
        this.curDestination.sdm_districtCode = dest.sdm_districtCode;
        // 住所１
        this.curDestination.sdm_address1 = dest.sdm_address1;
        // 住所２
        this.curDestination.sdm_address2 = dest.sdm_address2;
        // TEL
        this.curDestination.sdm_tel = dest.sdm_tel;
        // FAX
        this.curDestination.sdm_fax = dest.sdm_fax;
        // 時間指定
        this.curDestination.sdm_specifyTime = dest.sdm_specifyTime;
        this.curDestination.stm_pattern = dest.stm_pattern;
        this.curDestination.stm_hour = dest.stm_hour;
        this.curDestination.stm_minute = dest.stm_minute;
        this.curDestination.stm_period = dest.stm_period;
        // 担当部署
        this.curDestination.sdm_deptName = dest.sdm_deptName;
        // 得意先担当者
        this.curDestination.sdm_salerName = dest.sdm_salerName;
        // 納入可能車両サイズ
        this.curDestination.sdm_availableVehicleSize = dest.sdm_availableVehicleSize;
        // 付帯作業
        this.curDestination.sdm_extraWork = dest.sdm_extraWork;
        // 専用伝票有無
        this.curDestination.sdm_extraMethod = dest.sdm_extraMethod;
        // 備考
        this.curDestination.sdm_memo = dest.sdm_memo;
    };
    __decorate([
        core_1.ViewChild("modal"), 
        __metadata('design:type', core_1.ElementRef)
    ], ShippingDestinationModalComponent.prototype, "modalE", void 0);
    __decorate([
        core_1.ViewChild(SpecifyTimeModal_component_1.SpecifyTimeModalComponent), 
        __metadata('design:type', SpecifyTimeModal_component_1.SpecifyTimeModalComponent)
    ], ShippingDestinationModalComponent.prototype, "specifyTime", void 0);
    ShippingDestinationModalComponent = __decorate([
        core_1.Component({
            selector: "shipping-destination-modal",
            templateUrl: "ShippingDestinationModal.component.html",
            styleUrls: ["ShippingDestinationModal.component.css"],
            encapsulation: core_1.ViewEncapsulation.None,
            providers: [
                { provide: SpecifyTimeModal_model_1.SpecifyTimeModalModel.PROVIDER, useFactory: function () { return new GenericProvider_1.GenericProvider(); } }
            ]
        }),
        __param(0, core_1.Inject(ShippingDestinationModal_model_1.ShippingDestinationModalModel.PROVIDER)),
        __param(1, core_1.Inject(SpecifyTimeModal_model_1.SpecifyTimeModalModel.PROVIDER)), 
        __metadata('design:paramtypes', [GenericProvider_1.GenericProvider, GenericProvider_1.GenericProvider])
    ], ShippingDestinationModalComponent);
    return ShippingDestinationModalComponent;
}());
exports.ShippingDestinationModalComponent = ShippingDestinationModalComponent;
//# sourceMappingURL=ShippingDestinationModal.component.js.map