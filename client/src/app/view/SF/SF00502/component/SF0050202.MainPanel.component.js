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
var core_1 = require('@angular/core');
var SF00502_constants_1 = require("../SF00502.constants");
var SF00502_page_1 = require("../SF00502.page");
var SF00502_helper_1 = require("../SF00502.helper");
var date_util_1 = require('../../../../util/date-util');
var SF0050202Component = (function () {
    function SF0050202Component(page, changeRef) {
        this.page = page;
        this.changeRef = changeRef;
        /** 表示開始月 */
        this.startMonth = null;
        /** 表示終了月 */
        this.endMonth = null;
        /** 表示終了日の選択リスト */
        this.endMonthOptions = [];
        /**
         * 月変更イベント
         */
        this.changeMonth = new core_1.EventEmitter();
        this.enableSave = true;
    }
    Object.defineProperty(SF0050202Component.prototype, "selectedMonthTerm", {
        /**
         * 表示月
         */
        set: function (monthTerm) {
            this.setMonthTerm(monthTerm);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050202Component.prototype, "monthOptions", {
        //region Screen bindings
        get: function () {
            return this.page.pageData.availableMonths;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050202Component.prototype, "startMonthOptions", {
        /**
         * @return 表示開始月の選択肢
         */
        get: function () {
            return this.page.pageData.availableMonths;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050202Component.prototype, "screenMode", {
        get: function () {
            if (this.page.pageData.screenMode == SF00502_constants_1.SF00502Constants.SCREEN_MODE_PREDICTION) {
                return "見通し";
            }
            else {
                return "実績";
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050202Component.prototype, "canSave", {
        get: function () {
            return this.page.pageData.canEdit;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050202Component.prototype, "isHasSummary", {
        get: function () {
            return (this.page.pageData.sumarry != undefined);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050202Component.prototype, "summaryNewAmount1", {
        get: function () {
            return this.page.pageData.sumarry.newRevenue.amount1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050202Component.prototype, "summaryNewAmount2", {
        get: function () {
            return this.page.pageData.sumarry.newRevenue.amount2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050202Component.prototype, "summaryNewAmount3", {
        get: function () {
            return this.page.pageData.sumarry.newRevenue.amount3;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050202Component.prototype, "summaryNewTotal", {
        get: function () {
            return this.page.pageData.sumarry.newRevenue.total;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050202Component.prototype, "summaryOldAmount1", {
        get: function () {
            return this.page.pageData.sumarry.oldRevenue.amount1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050202Component.prototype, "summaryOldAmount2", {
        get: function () {
            return this.page.pageData.sumarry.oldRevenue.amount2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050202Component.prototype, "summaryOldAmount3", {
        get: function () {
            return this.page.pageData.sumarry.oldRevenue.amount3;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050202Component.prototype, "summaryOldTotal", {
        get: function () {
            return this.page.pageData.sumarry.oldRevenue.total;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050202Component.prototype, "summaryDiffRate", {
        get: function () {
            return this.page.pageData.sumarry.diffRate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050202Component.prototype, "isNanDiffRate", {
        get: function () {
            return isNaN(this.page.pageData.sumarry.diffRate) || !isFinite(this.page.pageData.sumarry.diffRate);
        },
        enumerable: true,
        configurable: true
    });
    //endregion
    //region Screen actions
    /**
     * 月セレクタ変更イベント
     */
    SF0050202Component.prototype.doChangeMonth = function () {
        var _this = this;
        this.page.confirmIgnoreChange().then(function (isConfirmed) {
            if (isConfirmed) {
                var date = _this.startMonth;
                var term = void 0;
                if (date != _this.currentMonthTerm.date) {
                    // 開始月が変更された場合は期間を維持する
                    term = _this.currentMonthTerm.term;
                }
                else {
                    // endMonth が変更されたので入力値より期間を求める
                    term = date_util_1.diffMonth(date, _this.endMonth) + 1;
                }
                // 変更イベントを送信する
                _this.changeMonth.emit({ date: date, term: term });
            }
            else {
                // 元の値に変更する
                _this.setMonthTerm(_this.currentMonthTerm);
            }
        });
    };
    SF0050202Component.prototype.doCancel = function () {
        this.page.resetScreenData();
    };
    SF0050202Component.prototype.doSave = function () {
        var _this = this;
        // disable save
        this.enableSave = false;
        // do save
        this.page.saveScreenData().then(function () {
            // enable save
            _this.enableSave = true;
        });
    };
    //endregion
    //convertYenToThousanYen
    SF0050202Component.prototype.convertYenToThousanYen = function (value) {
        return SF00502_helper_1.SF00502Helper.convertYenToThousanYen(value);
    };
    /**
     * 表示月を変更する
     *
     * @param monthTerm 表示月
     */
    SF0050202Component.prototype.setMonthTerm = function (monthTerm) {
        this.currentMonthTerm = monthTerm;
        if (!monthTerm) {
            return;
        }
        // startMonth を設定
        this.startMonth = monthTerm.date;
        // startMonth を元に endMonth の選択肢を生成
        this.updateEndMonthOptions();
        // endMonth を設定
        var endMonthOptions = this.endMonthOptions;
        if (!endMonthOptions.length) {
            // まだ表示終了月の選択オプションが初期化されていないので null を返しておく
            this.endMonth = null;
        }
        else if (monthTerm.term - 1 < endMonthOptions.length) {
            // 選択値
            this.endMonth = endMonthOptions[monthTerm.term - 1];
        }
        else {
            // 期間が実績表示可能期間を超えるため、表示可能な最大期間を返す
            this.endMonth = endMonthOptions[endMonthOptions.length - 1];
            monthTerm.term = endMonthOptions.length;
        }
    };
    /**
     * 表示終了月の選択オプションを更新する
     */
    SF0050202Component.prototype.updateEndMonthOptions = function () {
        var date = date_util_1.nthMonth(this.startMonth, 0);
        var maxDate = this.page.pageData.maxAchievmentDate;
        var options = [];
        // 12 ヶ月もしくは今月まで options を追加する
        if (maxDate) {
            do {
                options.push(date);
                date = date_util_1.nthMonth(date, 1);
            } while (options.length < 12 && date.getTime() < maxDate.getTime());
        }
        this.endMonthOptions = options;
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SF0050202Component.prototype, "changeMonth", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], SF0050202Component.prototype, "selectedMonthTerm", null);
    SF0050202Component = __decorate([
        core_1.Component({
            selector: "[sf0050202]",
            templateUrl: "SF0050202.MainPanel.component.html"
        }), 
        __metadata('design:paramtypes', [SF00502_page_1.SF00502Page, core_1.ChangeDetectorRef])
    ], SF0050202Component);
    return SF0050202Component;
}());
exports.SF0050202Component = SF0050202Component;
//# sourceMappingURL=SF0050202.MainPanel.component.js.map