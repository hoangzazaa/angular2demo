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
var transaction_stock_model_1 = require("./transaction-stock.model");
var TransactionStockComponent = (function () {
    function TransactionStockComponent() {
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', transaction_stock_model_1.TransactionStockModel)
    ], TransactionStockComponent.prototype, "item", void 0);
    TransactionStockComponent = __decorate([
        core_1.Component({
            selector: 'transaction-stock',
            templateUrl: './transaction-stock.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], TransactionStockComponent);
    return TransactionStockComponent;
}());
exports.TransactionStockComponent = TransactionStockComponent;
//# sourceMappingURL=transaction-stock.component.js.map