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
var common_1 = require("@angular/common");
var error_404_page_1 = require("../view/ERROR/404/error-404.page");
var error_500_page_1 = require("../view/ERROR/500/error-500.page");
var error_403_page_1 = require("../view/ERROR/403/error-403.page");
var error_401_page_1 = require("../view/ERROR/401/error-401.page");
var error_400_page_1 = require("../view/ERROR/400/error-400.page");
/**
 * Common Error Pages declaration.
 * @author manhnv
 */
var ErrorPagesModule = (function () {
    function ErrorPagesModule() {
    }
    ErrorPagesModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            declarations: [
                error_400_page_1.Error400Page,
                error_401_page_1.Error401Page,
                error_403_page_1.Error403Page,
                error_404_page_1.Error404Page,
                error_500_page_1.Error500Page
            ],
            providers: [],
            exports: [
                error_400_page_1.Error400Page,
                error_401_page_1.Error401Page,
                error_403_page_1.Error403Page,
                error_404_page_1.Error404Page,
                error_500_page_1.Error500Page
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], ErrorPagesModule);
    return ErrorPagesModule;
}());
exports.ErrorPagesModule = ErrorPagesModule;
//# sourceMappingURL=error-pages.module.js.map