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
 * TOP &gt; 営業目標登録 ... 各タブのヘッダ (年度セレクターとサマリー(支店全体での集計結果))
 */
var SF0050301Component = (function () {
    function SF0050301Component(sf00503Data) {
        this.sf00503Data = sf00503Data;
        this.changeYear = new core_1.EventEmitter();
    }
    Object.defineProperty(SF0050301Component.prototype, "checkTab", {
        get: function () {
            return this.sf00503Data.tabCurrent === this.sf00503Data.TAB_02_INDEX ||
                this.sf00503Data.tabCurrent === this.sf00503Data.TAB_03_INDEX;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050301Component.prototype, "year", {
        get: function () {
            return this.sf00503Data.year;
        },
        set: function (value) {
            this.changeYear.emit(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050301Component.prototype, "years", {
        // get list year
        get: function () {
            return this.sf00503Data.years;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050301Component.prototype, "departmentName", {
        get: function () {
            return this.sf00503Data.department.department;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050301Component.prototype, "type1OldAfter", {
        //type1OldAfter
        get: function () {
            return this.sf00503Data.type1OldAfter + this.sf00503Data.type1Other;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050301Component.prototype, "type1OldBefore", {
        //type1OldBefore
        get: function () {
            return this.sf00503Data.type1OldBefore;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050301Component.prototype, "type2OldAfter", {
        //type2OldAfter
        get: function () {
            return this.sf00503Data.type2OldAfter + this.sf00503Data.type2Other;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050301Component.prototype, "type2OldBefore", {
        //type2OldBefore
        get: function () {
            return this.sf00503Data.type2OldBefore;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050301Component.prototype, "type3OldAfter", {
        //type3OldAfter
        get: function () {
            return this.sf00503Data.type3OldAfter + +this.sf00503Data.type3Other;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050301Component.prototype, "type3OldBefore", {
        //type3OldBefore
        get: function () {
            return this.sf00503Data.type3OldBefore;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050301Component.prototype, "totalOldAfter", {
        //totalOldAfter
        get: function () {
            return this.sf00503Data.totalOldAfter + this.sf00503Data.totalOther;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050301Component.prototype, "totalOldBefore", {
        //totalOldBefore
        get: function () {
            return this.sf00503Data.totalOldBefore;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050301Component.prototype, "interestRateOld", {
        //interestRateOld
        get: function () {
            return this.sf00503Data.interestRateOld;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050301Component.prototype, "interestRate", {
        get: function () {
            return this.sf00503Data.interestRate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050301Component.prototype, "type1New", {
        //type1New
        get: function () {
            return this.sf00503Data.type1New;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050301Component.prototype, "type2New", {
        get: function () {
            return this.sf00503Data.type2New;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050301Component.prototype, "type3New", {
        get: function () {
            return this.sf00503Data.type3New;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050301Component.prototype, "totalNew", {
        get: function () {
            return this.sf00503Data.totalNew;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050301Component.prototype, "type1", {
        // sum
        get: function () {
            return this.sf00503Data.type1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050301Component.prototype, "type2", {
        get: function () {
            return this.sf00503Data.type2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050301Component.prototype, "type3", {
        get: function () {
            return this.sf00503Data.type3;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050301Component.prototype, "sumTotal", {
        get: function () {
            return this.sf00503Data.sumTotal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050301Component.prototype, "typeTT1", {
        // sum
        get: function () {
            return this.sf00503Data.typeTT1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050301Component.prototype, "typeTT2", {
        get: function () {
            return this.sf00503Data.typeTT2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050301Component.prototype, "typeTT3", {
        get: function () {
            return this.sf00503Data.typeTT3;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050301Component.prototype, "typeTT4", {
        get: function () {
            return this.sf00503Data.typeTT4;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050301Component.prototype, "type1Diff", {
        get: function () {
            return Math.abs(this.type1Customer - this.type1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050301Component.prototype, "type1GronwUp", {
        get: function () {
            return this.type1Customer > this.type1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050301Component.prototype, "type1GronwDown", {
        get: function () {
            return this.type1Customer < this.type1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050301Component.prototype, "type1GronwSame", {
        get: function () {
            return this.type1Customer == this.type1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050301Component.prototype, "type2Diff", {
        get: function () {
            return Math.abs(this.type2Customer - this.type2);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050301Component.prototype, "type2GronwUp", {
        get: function () {
            return this.type2Customer > this.type2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050301Component.prototype, "type2GronwDown", {
        get: function () {
            return this.type2Customer < this.type2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050301Component.prototype, "type2GronwSame", {
        get: function () {
            return this.type2Customer == this.type2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050301Component.prototype, "type3Diff", {
        get: function () {
            return Math.abs(this.type3Customer - this.type3);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050301Component.prototype, "type3GronwUp", {
        get: function () {
            return this.type3Customer > this.type3;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050301Component.prototype, "type3GronwDown", {
        get: function () {
            return this.type3Customer < this.type3;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050301Component.prototype, "type3GronwSame", {
        get: function () {
            return this.type3Customer == this.type3;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050301Component.prototype, "totalDiff", {
        get: function () {
            return Math.abs(this.totalCustomer - this.sumTotal);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050301Component.prototype, "totalGrownUp", {
        get: function () {
            return this.totalCustomer > this.sumTotal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050301Component.prototype, "totalGrownDown", {
        get: function () {
            return this.totalCustomer < this.sumTotal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050301Component.prototype, "totalGrownSame", {
        get: function () {
            return this.totalCustomer == this.sumTotal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050301Component.prototype, "type1Customer", {
        get: function () {
            return this.sf00503Data.type1Customer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050301Component.prototype, "type2Customer", {
        get: function () {
            return this.sf00503Data.type2Customer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050301Component.prototype, "type3Customer", {
        get: function () {
            return this.sf00503Data.type3Customer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050301Component.prototype, "totalCustomer", {
        get: function () {
            return this.sf00503Data.totalCustomer;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SF0050301Component.prototype, "changeYear", void 0);
    SF0050301Component = __decorate([
        core_1.Component({
            selector: "sf0050301",
            templateUrl: "SF0050301.component.html"
        }), 
        __metadata('design:paramtypes', [SF00503_data_1.SF00503Data])
    ], SF0050301Component);
    return SF0050301Component;
}());
exports.SF0050301Component = SF0050301Component;
//# sourceMappingURL=SF0050301.component.js.map