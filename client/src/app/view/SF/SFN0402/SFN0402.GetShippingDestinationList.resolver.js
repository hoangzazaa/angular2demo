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
var router_1 = require("@angular/router");
var common_resolver_1 = require("../../../resolver/common-resolver");
var SFN0402_service_1 = require("./SFN0402.service");
/**
 * 届け先一覧の解決
 *
 * 使用する API は GET /SFN040213/:customerCode
 *
 * 届け先一覧には id と deliveryName しか入っていません。
 */
var SFN0402GetShippingDestinationListResolver = (function (_super) {
    __extends(SFN0402GetShippingDestinationListResolver, _super);
    /**
     * コンストラクタ
     *
     * @param router ルーター
     * @param service 得意先・取引先関連機能に関するサービス
     */
    function SFN0402GetShippingDestinationListResolver(router, service) {
        _super.call(this, router);
        this.service = service;
    }
    /**
     * 得意先一覧を解決
     *
     * @param route 現在のルート
     * @param state 状態
     * @returns 届け先一覧を返すプロミス
     */
    SFN0402GetShippingDestinationListResolver.prototype.resolve = function (route, state) {
        var customerCode = route.params['customerCode'];
        return this.service.sfn040213GetShippingDestinationList(customerCode);
    };
    SFN0402GetShippingDestinationListResolver = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router, SFN0402_service_1.SFN0402Service])
    ], SFN0402GetShippingDestinationListResolver);
    return SFN0402GetShippingDestinationListResolver;
}(common_resolver_1.CommonResolver));
exports.SFN0402GetShippingDestinationListResolver = SFN0402GetShippingDestinationListResolver;
//# sourceMappingURL=SFN0402.GetShippingDestinationList.resolver.js.map