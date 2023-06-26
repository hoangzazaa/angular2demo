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
var SF00301_Deal_model_1 = require('../model/SF00301_Deal.model');
/**
 * TOP &gt; 案件概況 のリピート案件一覧セクション
 */
var SF0030110Component = (function () {
    function SF0030110Component() {
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', SF00301_Deal_model_1.SF00301_Deal)
    ], SF0030110Component.prototype, "deal", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], SF0030110Component.prototype, "repeatDeals", void 0);
    SF0030110Component = __decorate([
        core_1.Component({
            selector: "sf0030110-repeatDeal",
            templateUrl: "SF0030110.RepeatDeal.component.html"
        }), 
        __metadata('design:paramtypes', [])
    ], SF0030110Component);
    return SF0030110Component;
}());
exports.SF0030110Component = SF0030110Component;
//# sourceMappingURL=SF0030110.RepeatDeal.component.js.map