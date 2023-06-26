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
var DealInfo_data_1 = require("./DealInfo.data");
var DealModel_1 = require("./model/DealModel");
var mst_data_type_1 = require("../../../../helper/mst-data-type");
var data_util_1 = require("../../../../util/data-util");
var constants_1 = require("../../../../helper/constants");
var DealInfoPage = (function () {
    function DealInfoPage() {
        this.pageData = new DealInfo_data_1.DealInfoData();
        this.pageData.dealInfo = new DealModel_1.DealInfoModel();
    }
    Object.defineProperty(DealInfoPage.prototype, "dealInfo", {
        get: function () {
            return this.pageData.dealInfo;
        },
        set: function (value) {
            if (value) {
                this.pageData.dealInfo = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DealInfoPage.prototype, "dealType", {
        get: function () {
            return data_util_1.default.getData(mst_data_type_1.DEAL_TYPE, constants_1.Constants.BLANK, this.dealInfo.dealType);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DealInfoPage.prototype, "dealStatus", {
        get: function () {
            var _this = this;
            var distances = data_util_1.default.toSelectBoxDataSource(mst_data_type_1.DEAL_STATUS);
            var data = distances.find(function (item) {
                return item.id == _this.dealInfo.dealStatus;
            });
            return this.valueItem(data);
        },
        enumerable: true,
        configurable: true
    });
    DealInfoPage.prototype.valueItem = function (data) {
        if (data)
            return data.name;
        return '';
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', DealModel_1.DealInfoModel), 
        __metadata('design:paramtypes', [DealModel_1.DealInfoModel])
    ], DealInfoPage.prototype, "dealInfo", null);
    DealInfoPage = __decorate([
        core_1.Component({
            selector: "deal-info",
            templateUrl: "DealInfo.page.html",
            styleUrls: ["DealInfo.page.css"]
        }), 
        __metadata('design:paramtypes', [])
    ], DealInfoPage);
    return DealInfoPage;
}());
exports.DealInfoPage = DealInfoPage;
//# sourceMappingURL=DealInfo.page.js.map