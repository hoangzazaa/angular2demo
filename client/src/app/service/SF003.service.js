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
var core_1 = require("@angular/core");
var common_service_1 = require("./common.service");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var SF003Service = (function (_super) {
    __extends(SF003Service, _super);
    function SF003Service(http, router) {
        _super.call(this, http, router);
    }
    /**
     * Get deal info by deal code
     * @return deal item
     * */
    SF003Service.prototype.getDealByDealCode = function (dealCode) {
        return this.getApi("/SF0030001/" + dealCode)
            .then(function (res) {
            return res.data;
        }, function (err) {
            throw err;
        });
    };
    SF003Service = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Router])
    ], SF003Service);
    return SF003Service;
}(common_service_1.CommonService));
exports.SF003Service = SF003Service;
//# sourceMappingURL=SF003.service.js.map