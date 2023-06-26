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
var router_1 = require("@angular/router");
var core_1 = require("@angular/core");
var SF003_service_1 = require("../service/SF003.service");
var message_1 = require("../helper/message");
var screen_url_1 = require("../helper/screen-url");
var DealResolver = (function () {
    function DealResolver(sf003Service, router) {
        this.sf003Service = sf003Service;
        this.router = router;
    }
    DealResolver.prototype.resolve = function (route, state) {
        var _this = this;
        var dealCode = route.params['dealCode'];
        if (dealCode == 0)
            return null;
        return this.sf003Service.getDealByDealCode(dealCode)
            .then(function (data) {
            return data.deal;
        }, function (err) {
            swal("Data Error", message_1.default.get(message_1.MSG.SF00301.ERR002), "error");
            return _this.router.navigate(["/home/deal"], screen_url_1.ScreenUrl.SF00201);
        });
    };
    DealResolver = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [SF003_service_1.SF003Service, router_1.Router])
    ], DealResolver);
    return DealResolver;
}());
exports.DealResolver = DealResolver;
//# sourceMappingURL=deal.resolver.js.map