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
var SF00501_page_1 = require("../SF00501.page");
var SF00501_constants_1 = require("../SF00501.constants");
var SF00501_helper_1 = require("../SF00501.helper");
var SF0050105Component = (function () {
    function SF0050105Component(page) {
        this.page = page;
        var timeNow = new Date();
        this.monthNow = timeNow.getFullYear() * 12 + (timeNow.getMonth() + 1);
    }
    SF0050105Component.prototype.ngOnInit = function () {
        this.rowData = this.page.pageData.displayDetails[this.index];
        this.dateList = this.page.pageData.dateList;
    };
    Object.defineProperty(SF0050105Component.prototype, "hasOldDetail", {
        get: function () {
            return (this.page.pageData.currentFilter.dateUnit != SF00501_constants_1.SF00501Constants.OPTION_DATE_UNIT_MONTH);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050105Component.prototype, "isNormalRow", {
        get: function () {
            return (this.rowData.type == SF00501_constants_1.SF00501Constants.TYPE_WRAPPER_NORMAL);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050105Component.prototype, "isOldTotalRow", {
        get: function () {
            return (this.rowData.type == SF00501_constants_1.SF00501Constants.TYPE_WRAPPER_OLD_TOTAL);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050105Component.prototype, "isTotalRow", {
        get: function () {
            return (this.rowData.type == SF00501_constants_1.SF00501Constants.TYPE_WRAPPER_TOTAL);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050105Component.prototype, "isGoalRow", {
        get: function () {
            return (this.rowData.type == SF00501_constants_1.SF00501Constants.TYPE_WRAPPER_GOAL);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050105Component.prototype, "isRateRow", {
        get: function () {
            return (this.rowData.type == SF00501_constants_1.SF00501Constants.TYPE_WRAPPER_RATE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050105Component.prototype, "isStaffView", {
        get: function () {
            return (this.page.pageData.selectedViewMode == SF00501_constants_1.SF00501Constants.OPTION_DETAIL_STAFF);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050105Component.prototype, "titleRow", {
        get: function () {
            return this.rowData.detail.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050105Component.prototype, "titleId", {
        get: function () {
            return this.rowData.detail.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050105Component.prototype, "hasTotalAmount", {
        get: function () {
            return (this.rowData.detail.totalAmount != undefined);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050105Component.prototype, "totalAmount", {
        get: function () {
            return this.rowData.detail.totalAmount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050105Component.prototype, "totalOldAmount", {
        get: function () {
            return this.rowData.oldDetail.totalAmount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050105Component.prototype, "totalGrowthRate", {
        get: function () {
            var old = this.rowData.oldDetail.totalAmount;
            var now = this.rowData.detail.totalAmount;
            if (!!old && !!now && old > 0 && now > 0) {
                return 100 * now / old;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    SF0050105Component.prototype.hasAmount = function (date) {
        var value = this.rowData.detail.amounts[date];
        return !isNaN(value) && isFinite(value);
    };
    SF0050105Component.prototype.getAmount = function (date) {
        return this.rowData.detail.amounts[date];
    };
    SF0050105Component.prototype.hasOldAmount = function (date) {
        var value = this.rowData.oldDetail.amounts[date];
        return !isNaN(value) && isFinite(value);
    };
    SF0050105Component.prototype.isPlan = function (date) {
        if (this.page.pageData.currentFilter.sumaryType == SF00501_constants_1.SF00501Constants.OPTION_SUMMARY_INPROCESS) {
            if (this.page.pageData.currentFilter.dateUnit != SF00501_constants_1.SF00501Constants.OPTION_DATE_UNIT_MONTH) {
                // convert month to financial month
                var tmpDate = date;
                var tmpYear = this.page.pageData.currentFilter.date.startYear;
                if (date < 4) {
                    tmpYear = this.page.pageData.currentFilter.date.endYear;
                }
                // compare month
                var monthSelected = tmpYear * 12 + tmpDate;
                return (monthSelected >= this.monthNow);
            }
            else {
                var cY = this.page.pageData.currentTime.getFullYear();
                var cM = this.page.pageData.currentTime.getMonth() + 1;
                if ((cY < this.page.pageData.currentFilter.date.startYear)
                    || (cY == this.page.pageData.currentFilter.date.startYear && cM <= this.page.pageData.currentFilter.date.startMonth)) {
                    return true;
                }
            }
        }
        return false;
    };
    SF0050105Component.prototype.getOldAmount = function (date) {
        return this.rowData.oldDetail.amounts[date];
    };
    SF0050105Component.prototype.getGrowthRate = function (date) {
        var old = this.rowData.oldDetail.amounts[date];
        var now = this.rowData.detail.amounts[date];
        if (!!old && !!now && old > 0 && now > 0) {
            return 100 * now / old;
        }
        return 0;
    };
    SF0050105Component.prototype.convertYenToThousanYen = function (value) {
        return SF00501_helper_1.SF00501Helper.convertYenToThousanYen(value);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], SF0050105Component.prototype, "index", void 0);
    SF0050105Component = __decorate([
        core_1.Component({
            selector: "[sf0050105]",
            templateUrl: "SF0050105.DetailTableRow.component.html",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [SF00501_page_1.SF00501Page])
    ], SF0050105Component);
    return SF0050105Component;
}());
exports.SF0050105Component = SF0050105Component;
//# sourceMappingURL=SF0050105.DetailTableRow.component.js.map