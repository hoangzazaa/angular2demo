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
 * Created by Teddy on 7/11/2017.
 */
var core_1 = require("@angular/core");
var GenericProvider = (function () {
    function GenericProvider() {
    }
    Object.defineProperty(GenericProvider.prototype, "provider", {
        get: function () {
            return this._provider;
        },
        set: function (provider) {
            this._provider = provider;
        },
        enumerable: true,
        configurable: true
    });
    GenericProvider = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], GenericProvider);
    return GenericProvider;
}());
exports.GenericProvider = GenericProvider;
//# sourceMappingURL=GenericProvider.js.map