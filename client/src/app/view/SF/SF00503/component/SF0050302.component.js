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
var format_util_1 = require("../../../../util/format-util");
var constants_1 = require("../../../../helper/constants");
var math_util_1 = require("../../../../util/math-util");
var SF00503_helper_1 = require("../SF00503.helper");
/**
 * TOP &gt; 営業目標登録 ... 部門目標タブの既存得意先セクション
 */
var SF0050302Component = (function () {
    function SF0050302Component(sf00503Data) {
        this.sf00503Data = sf00503Data;
        this.onDataChanged = new core_1.EventEmitter();
    }
    SF0050302Component.prototype.ngOnInit = function () {
        this.updateDataChange(0);
    };
    SF0050302Component.prototype.updateDataChange = function (value) {
        this.sf00503Data.calculatorDepartmentAfter();
    };
    SF0050302Component.prototype.emitDataChangedEvent = function () {
        this.onDataChanged.emit();
    };
    Object.defineProperty(SF0050302Component.prototype, "rows", {
        // get row
        get: function () {
            return this.sf00503Data.rows;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050302Component.prototype, "columns", {
        // get column
        get: function () {
            return this.sf00503Data.columns;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050302Component.prototype, "type1OldAfter", {
        get: function () {
            return this.sf00503Data.type1OldAfter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050302Component.prototype, "type2OldAfter", {
        get: function () {
            return this.sf00503Data.type2OldAfter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050302Component.prototype, "type3OldAfter", {
        get: function () {
            return this.sf00503Data.type3OldAfter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050302Component.prototype, "type1OldBefore", {
        //type1OldBefore
        get: function () {
            return this.sf00503Data.type1OldBefore;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050302Component.prototype, "type2OldBefore", {
        //type2OldBefore
        get: function () {
            return this.sf00503Data.type2OldBefore;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050302Component.prototype, "type3OldBefore", {
        //type3OldBefore
        get: function () {
            return this.sf00503Data.type3OldBefore;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050302Component.prototype, "totalOldAfter", {
        //totalOldAfter
        get: function () {
            return this.sf00503Data.totalOldAfter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050302Component.prototype, "totalOldBefore", {
        //totalOldBefore
        get: function () {
            return this.sf00503Data.totalOldBefore;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050302Component.prototype, "interestRateOld", {
        //interestRateOld
        get: function () {
            return this.sf00503Data.interestRateOld;
        },
        enumerable: true,
        configurable: true
    });
    SF0050302Component.prototype.calculatorData = function () {
        for (var i = 0; i < this.sf00503Data.columns.length; i++) {
            this.sf00503Data.goldOldCus[i] = format_util_1.FormatUtil.isNaN(this.sf00503Data.goldOld[0][i])
                + format_util_1.FormatUtil.isNaN(this.sf00503Data.goldOld[1][i]) + format_util_1.FormatUtil.isNaN(this.sf00503Data.goldOld[2][i]);
            this.sf00503Data.goldOldBeforeCus[i] = format_util_1.FormatUtil.isNaN(this.sf00503Data.goldOldBefore[0][i])
                + format_util_1.FormatUtil.isNaN(this.sf00503Data.goldOldBefore[1][i]) + format_util_1.FormatUtil.isNaN(this.sf00503Data.goldOldBefore[2][i]);
            if (this.sf00503Data.goldOldBeforeCus[i] && this.sf00503Data.goldOldBeforeCus[i] > 0) {
                var interest = format_util_1.FormatUtil.isNaN(this.sf00503Data.goldOldBeforeCus[i]);
                if (interest == 0) {
                    this.sf00503Data.interestRateCus[i] = constants_1.Constants.HYPHEN;
                }
                else {
                    this.sf00503Data.interestRateCus[i] = math_util_1.default.round(this.sf00503Data.goldOldCus[i] * 100000 / interest, 1);
                }
            }
        }
    };
    SF0050302Component.prototype.checkInput = function (evt) {
        if (evt.which < 48 || evt.which > 57) {
            evt.preventDefault();
            return;
        }
    };
    SF0050302Component.prototype.convertYenToThousanYen = function (value) {
        return SF00503_helper_1.SF00503Helper.convertYenToThousanYen(value);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SF0050302Component.prototype, "onDataChanged", void 0);
    SF0050302Component = __decorate([
        core_1.Component({
            selector: "sf0050302",
            templateUrl: "SF0050302.component.html"
        }), 
        __metadata('design:paramtypes', [SF00503_data_1.SF00503Data])
    ], SF0050302Component);
    return SF0050302Component;
}());
exports.SF0050302Component = SF0050302Component;
//# sourceMappingURL=SF0050302.component.js.map