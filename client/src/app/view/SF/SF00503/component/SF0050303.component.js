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
var SF00503_helper_1 = require("../SF00503.helper");
/**
 * TOP &gt; 営業目標登録 ... 個人別目標タブの新規得意先セクション
 */
var SF0050303Component = (function () {
    function SF0050303Component(sf00503Data) {
        this.sf00503Data = sf00503Data;
        this.onDataChanged = new core_1.EventEmitter();
    }
    SF0050303Component.prototype.ngOnInit = function () {
        this.updateDataChange(0);
    };
    SF0050303Component.prototype.updateDataChange = function (value) {
        this.sf00503Data.calculatorDepartmentAfter();
        this.calculatorData();
    };
    SF0050303Component.prototype.calculatorData = function () {
        for (var i = 0; i < this.sf00503Data.columns.length; i++) {
            this.sf00503Data.goldNewCus[i] = format_util_1.FormatUtil.isNaN(this.sf00503Data.goldNew[0][i])
                + format_util_1.FormatUtil.isNaN(this.sf00503Data.goldNew[1][i]) + format_util_1.FormatUtil.isNaN(this.sf00503Data.goldNew[2][i]);
        }
    };
    SF0050303Component.prototype.emitDataChangedEvent = function () {
        this.onDataChanged.emit();
    };
    Object.defineProperty(SF0050303Component.prototype, "activityPolicy", {
        get: function () {
            return this.sf00503Data.departmentGoal.activityPolicy;
        },
        set: function (value) {
            this.sf00503Data.departmentGoal.activityPolicy = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050303Component.prototype, "rows", {
        // get row
        get: function () {
            return this.sf00503Data.rows;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050303Component.prototype, "columns", {
        // get column
        get: function () {
            return this.sf00503Data.columns;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050303Component.prototype, "type1New", {
        //type1New
        get: function () {
            return this.sf00503Data.type1New;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050303Component.prototype, "type2New", {
        //type2New
        get: function () {
            return this.sf00503Data.type2New;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050303Component.prototype, "type3New", {
        //type3New
        get: function () {
            return this.sf00503Data.type3New;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050303Component.prototype, "totalNew", {
        get: function () {
            return this.sf00503Data.totalNew;
        },
        enumerable: true,
        configurable: true
    });
    SF0050303Component.prototype.checkInput = function (evt) {
        if (evt.which < 48 || evt.which > 57) {
            evt.preventDefault();
            return;
        }
    };
    SF0050303Component.prototype.convertYenToThousanYen = function (value) {
        return SF00503_helper_1.SF00503Helper.convertYenToThousanYen(value);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SF0050303Component.prototype, "onDataChanged", void 0);
    SF0050303Component = __decorate([
        core_1.Component({
            selector: "sf0050303",
            templateUrl: "SF0050303.component.html"
        }), 
        __metadata('design:paramtypes', [SF00503_data_1.SF00503Data])
    ], SF0050303Component);
    return SF0050303Component;
}());
exports.SF0050303Component = SF0050303Component;
//# sourceMappingURL=SF0050303.component.js.map