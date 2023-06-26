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
/**
 * Created by hoangtd on 2/13/2017.
 */
var core_1 = require("@angular/core");
var SF00503_data_1 = require("../SF00503.data");
/**
 * TOP &gt; 営業目標登録 ... 個人別目標タブの担当一覧セクション
 */
var SF0050309Component = (function () {
    function SF0050309Component(sf00503Data) {
        this.sf00503Data = sf00503Data;
    }
    Object.defineProperty(SF0050309Component.prototype, "paginatedCustomerGoalsTab3", {
        get: function () {
            return this.sf00503Data.customCustomerGoalTab3;
        },
        enumerable: true,
        configurable: true
    });
    SF0050309Component = __decorate([
        core_1.Component({
            selector: "sf0050309",
            templateUrl: "SF0050309.component.html"
        }), 
        __metadata('design:paramtypes', [SF00503_data_1.SF00503Data])
    ], SF0050309Component);
    return SF0050309Component;
}());
exports.SF0050309Component = SF0050309Component;
//# sourceMappingURL=SF0050309.component.js.map