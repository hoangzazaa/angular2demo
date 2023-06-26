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
var constants_1 = require("./constants");
var validator_util_1 = require("../util/validator-util");
/**
 * Format data display apply for (Quotation Memo | Product Name | File Name | Field).
 * If length less than 20 characters and display all.
 * Else if length greater than 20 characters then display as '...' from at 20 characters.
 *
 * @author manhnv
 */
var EllipsisPipe = (function () {
    function EllipsisPipe() {
    }
    /**
     * Function use to transform data.
     *
     * @param value the data will be transformed
     * @return new formatted text
     */
    EllipsisPipe.prototype.transform = function (value, offset) {
        if (validator_util_1.default.isEmpty(value))
            return null;
        if (!Number.isInteger(offset))
            offset = 20;
        if (value.length > offset)
            return value.substring(0, offset - 1) + constants_1.Constants.THREE_DOT;
        return value;
    };
    EllipsisPipe = __decorate([
        core_1.Pipe({
            name: 'ellipsis'
        }), 
        __metadata('design:paramtypes', [])
    ], EllipsisPipe);
    return EllipsisPipe;
}());
exports.EllipsisPipe = EllipsisPipe;
//# sourceMappingURL=ellipsis.pipe.js.map