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
var ShippingDestination_model_1 = require("../model/ShippingDestination.model");
var mst_data_type_1 = require("../../../../helper/mst-data-type");
var constants_1 = require("../../../../helper/constants");
var data_util_1 = require("../../../../util/data-util");
var DealModel_1 = require("../../COMMON/dealinfo/model/DealModel");
var SF0030702ShippingInfo = (function () {
    function SF0030702ShippingInfo() {
        this.requestSelectShippingDestination = new core_1.EventEmitter();
        this.timePermistionChanged = new core_1.EventEmitter();
    }
    SF0030702ShippingInfo.prototype.timePermissions = function () {
        return data_util_1.default.toSelectBoxDataSource(mst_data_type_1.SPECIFY_TIME);
    };
    SF0030702ShippingInfo.prototype.formIds = function () {
        return data_util_1.default.toSelectBoxDataSource(mst_data_type_1.FORM_NAME);
    };
    Object.defineProperty(SF0030702ShippingInfo.prototype, "telMask", {
        get: function () {
            return [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030702ShippingInfo.prototype, "districOptions", {
        get: function () {
            return Object.keys(mst_data_type_1.DISTRICT_NAME)
                .map(function (key) {
                var id = parseInt(key);
                var val = ("000" + key).slice(-3) + "：" + mst_data_type_1.DISTRICT_NAME[key];
                return { id: id, name: val };
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030702ShippingInfo.prototype, "vehicleOptions", {
        get: function () {
            return data_util_1.default.toSelectBoxDataSource(mst_data_type_1.VEHICLE_SIZE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030702ShippingInfo.prototype, "formnameOptions", {
        get: function () {
            return data_util_1.default.toSelectBoxDataSource(mst_data_type_1.FORM_NAME);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030702ShippingInfo.prototype, "specifyTimeOptions", {
        get: function () {
            return [
                { id: 10, name: mst_data_type_1.SPECIFY_TIME[10] },
                { id: 1, name: mst_data_type_1.SPECIFY_TIME[1] },
                { id: 4, name: mst_data_type_1.SPECIFY_TIME[4] },
                { id: 6, name: mst_data_type_1.SPECIFY_TIME[6] },
                { id: 7, name: mst_data_type_1.SPECIFY_TIME[7] },
                { id: 8, name: mst_data_type_1.SPECIFY_TIME[8] },
                { id: 9, name: mst_data_type_1.SPECIFY_TIME[9] },
                { id: 2, name: mst_data_type_1.SPECIFY_TIME[2] },
                { id: 11, name: mst_data_type_1.SPECIFY_TIME[11] },
                { id: 12, name: mst_data_type_1.SPECIFY_TIME[12] },
                { id: 13, name: mst_data_type_1.SPECIFY_TIME[13] },
                { id: 14, name: mst_data_type_1.SPECIFY_TIME[14] },
            ];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030702ShippingInfo.prototype, "selectName", {
        get: function () {
            return this._selectShipment;
        },
        set: function (target) {
            this._selectShipment = target;
            this.requestSelectShippingDestination.emit(target);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030702ShippingInfo.prototype, "saveToDennoFlag", {
        get: function () {
            return !!this.shippingData.saveToDennoFlag;
        },
        set: function (val) {
            this.shippingData.saveToDennoFlag = val ? 1 : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030702ShippingInfo.prototype, "defaultFlag", {
        get: function () {
            return !!this.shippingData.defaultFlag;
        },
        set: function (val) {
            this.shippingData.defaultFlag = val ? 1 : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030702ShippingInfo.prototype, "district", {
        get: function () {
            if (!this.shippingData.districtCode)
                return 0;
            else
                return parseInt(this.shippingData.districtCode);
        },
        set: function (val) {
            if (val == 0)
                this.shippingData.districtCode = "";
            else {
                this.shippingData.districtCode = this.districOptions.find(function (item) { return item.id == val; }).id + "";
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030702ShippingInfo.prototype, "districName", {
        get: function () {
            return data_util_1.default.getData(mst_data_type_1.DISTRICT_NAME, constants_1.Constants.BLANK, parseInt(this.shippingData.districtCode));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030702ShippingInfo.prototype, "vehicle", {
        get: function () {
            return data_util_1.default.getData(mst_data_type_1.VEHICLE_SIZE, constants_1.Constants.BLANK, this.shippingData.availableVehicleSize);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030702ShippingInfo.prototype, "timePermission", {
        get: function () {
            return this.shippingData.timePermission;
        },
        set: function (val) {
            this.shippingData.timePermission = val;
            this.timePermistionChanged.emit(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030702ShippingInfo.prototype, "timePermissionText", {
        get: function () {
            return data_util_1.default.getData(mst_data_type_1.SPECIFY_TIME, constants_1.Constants.BLANK, this.shippingData.timePermission);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030702ShippingInfo.prototype, "formName", {
        get: function () {
            return data_util_1.default.getData(mst_data_type_1.FORM_NAME, constants_1.Constants.BLANK, this.shippingData.formNameId);
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(), 
        __metadata('design:type', ShippingDestination_model_1.ShippingDestinationModel)
    ], SF0030702ShippingInfo.prototype, "shippingData", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', ShippingDestination_model_1.ShippingDestinationModel)
    ], SF0030702ShippingInfo.prototype, "_selectShipment", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], SF0030702ShippingInfo.prototype, "mstShippings", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', DealModel_1.DealInfoModel)
    ], SF0030702ShippingInfo.prototype, "dealInfo", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SF0030702ShippingInfo.prototype, "requestSelectShippingDestination", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SF0030702ShippingInfo.prototype, "timePermistionChanged", void 0);
    SF0030702ShippingInfo = __decorate([
        core_1.Component({
            selector: 'shipping-component',
            templateUrl: 'SF0030702.ShippingInfo.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], SF0030702ShippingInfo);
    return SF0030702ShippingInfo;
}());
exports.SF0030702ShippingInfo = SF0030702ShippingInfo;
//# sourceMappingURL=SF0030702.ShippingInfo.component.js.map