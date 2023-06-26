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
var SFN0402_page_1 = require("../SFN0402.page");
var date_util_1 = require("../../../../util/date-util");
var common_events_1 = require("../../../../helper/common-events");
var SFN0402_helper_1 = require("../SFN0402.helper");
var SFN040202Component = (function () {
    function SFN040202Component(page, el) {
        this.page = page;
        this.el = el;
        this.pageData = this.page.pageData;
    }
    SFN040202Component.prototype.ngOnInit = function () {
        // init years
        var cFYear = date_util_1.DateUtil.getFinancialYear(this.page.pageData.currentTime);
        this.pageData.spSelectedYear = cFYear;
        this.pageData.spYearList = [cFYear, cFYear - 1, cFYear - 2];
    };
    SFN040202Component.prototype.ngAfterViewInit = function () {
        var _this = this;
        // init table
        var container = this.hotE.nativeElement;
        this.hot = new Handsontable(container, {
            data: this.getDefaultData(),
            columnSorting: false,
            readOnly: true,
            stretchH: 'all',
            fixedColumnsLeft: 2,
            colWidths: [80, 100, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70],
            height: 410
        });
        this.exportPlugin = this.hot.getPlugin('exportFile');
        // register hot change
        $(window).on(common_events_1.CommonEvents.LAYOUT_CHANGE, function () {
            _this.hot.render();
        });
        // load data
        this.reloadData();
    };
    Object.defineProperty(SFN040202Component.prototype, "selectedYear", {
        //region Bindings
        get: function () {
            return this.pageData.spSelectedYear;
        },
        set: function (value) {
            this.pageData.spSelectedYear = value;
            this.reloadData();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SFN040202Component.prototype, "yearList", {
        get: function () {
            return this.pageData.spYearList;
        },
        enumerable: true,
        configurable: true
    });
    //endregion
    //region Actions
    SFN040202Component.prototype.reloadData = function () {
        var _this = this;
        OneUI.blocks(this.el.nativeElement, "state_loading");
        this.page.loadSalesPerformance().then(function () {
            var summaryData = _this.getData();
            _this.hot.loadData(summaryData);
            OneUI.blocks(_this.el.nativeElement, "state_normal");
        });
    };
    SFN040202Component.prototype.exportCsv = function () {
        var fileName = this.pageData.partnerCode + "_" + this.pageData.spSelectedYear;
        this.exportPlugin.downloadFile('csv', {
            filename: fileName
        });
    };
    //endregion
    //region Functions
    SFN040202Component.prototype.getData = function () {
        // get default summary
        var summary = this.getDefaultData();
        // process summary
        var summaryData = this.pageData.summary;
        // details
        var tPaperNew, tPaperOld, tCartonNew, tCartonOld, tCommercialNew, tCommercialOld, tGoal;
        for (var i = 0; i < 12; i++) {
            // new revenues
            var tNew = void 0;
            var cartonNew = summaryData.cartonNew[i];
            var paperNew = summaryData.paperNew[i];
            var commercialNew = summaryData.commercialNew[i];
            // 段ボール
            if (cartonNew != undefined) {
                summary[1][i + 2] = this.formatNewAmount(SFN0402_helper_1.SFN0402Helper.convertYenToThousanYen(cartonNew));
                tNew = cartonNew;
                tCartonNew = (tCartonNew == undefined) ? cartonNew : tCartonNew + cartonNew;
            }
            // 紙器
            if (paperNew != undefined) {
                summary[3][i + 2] = this.formatNewAmount(SFN0402_helper_1.SFN0402Helper.convertYenToThousanYen(paperNew));
                tNew = (tNew == undefined) ? paperNew : tNew + paperNew;
                tPaperNew = (tPaperNew == undefined) ? paperNew : tPaperNew + paperNew;
            }
            // 商事
            if (commercialNew != undefined) {
                summary[5][i + 2] = this.formatNewAmount(SFN0402_helper_1.SFN0402Helper.convertYenToThousanYen(commercialNew));
                tNew = (tNew == undefined) ? commercialNew : tNew + commercialNew;
                tCommercialNew = (tCommercialNew == undefined) ? commercialNew : tCommercialNew + commercialNew;
            }
            // 合計
            if (tNew != undefined) {
                summary[7][i + 2] = this.formatNewAmount(SFN0402_helper_1.SFN0402Helper.convertYenToThousanYen(tNew));
            }
            // old revenues
            var tOld = void 0;
            var cartonOld = summaryData.cartonOld[i];
            var paperOld = summaryData.paperOld[i];
            var commercialOld = summaryData.commercialOld[i];
            // 段ボール
            if (cartonOld != undefined) {
                summary[2][i + 2] = this.formatOldAmount(SFN0402_helper_1.SFN0402Helper.convertYenToThousanYen(cartonOld));
                tOld = cartonOld;
                tCartonOld = (tCartonOld == undefined) ? cartonOld : tCartonOld + cartonOld;
            }
            // 紙器
            if (paperOld != undefined) {
                summary[4][i + 2] = this.formatOldAmount(SFN0402_helper_1.SFN0402Helper.convertYenToThousanYen(paperOld));
                tOld = (tOld == undefined) ? paperOld : tOld + paperOld;
                tPaperOld = (tPaperOld == undefined) ? paperOld : tPaperOld + paperOld;
            }
            // 商事
            if (commercialOld != undefined) {
                summary[6][i + 2] = this.formatOldAmount(SFN0402_helper_1.SFN0402Helper.convertYenToThousanYen(commercialOld));
                tOld = (tOld == undefined) ? commercialOld : tOld + commercialOld;
                tCommercialOld = (tCommercialOld == undefined) ? commercialOld : tCommercialOld + commercialOld;
            }
            // 合計
            if (tOld != undefined) {
                summary[8][i + 2] = this.formatOldAmount(SFN0402_helper_1.SFN0402Helper.convertYenToThousanYen(tOld));
            }
            // 前年比
            if (tNew > 0 && tOld > 0) {
                summary[9][i + 2] = this.formatPercentage(tNew / tOld);
            }
            // 目標
            var goal = summaryData.goal[i];
            if (goal != undefined) {
                summary[10][i + 2] = this.formatNewAmount(goal);
                tGoal = (tGoal == undefined) ? goal : tGoal + goal;
            }
            // 目標比
            if (tNew > 0 && goal > 0) {
                summary[11][i + 2] = this.formatPercentage(SFN0402_helper_1.SFN0402Helper.convertYenToThousanYen(tNew) / goal);
            }
        }
        // total New
        var tTotalNew;
        // 段ボール
        if (tCartonNew != undefined) {
            summary[1][1] = this.formatNewAmount(SFN0402_helper_1.SFN0402Helper.convertYenToThousanYen(tCartonNew));
            tTotalNew = tCartonNew;
        }
        // 紙器
        if (tPaperNew != undefined) {
            summary[3][1] = this.formatNewAmount(SFN0402_helper_1.SFN0402Helper.convertYenToThousanYen(tPaperNew));
            tTotalNew = (tTotalNew == undefined) ? tPaperNew : tTotalNew + tPaperNew;
        }
        // 商事
        if (tCommercialNew != undefined) {
            summary[5][1] = this.formatNewAmount(SFN0402_helper_1.SFN0402Helper.convertYenToThousanYen(tCommercialNew));
            tTotalNew = (tTotalNew == undefined) ? tCommercialNew : tTotalNew + tCommercialNew;
        }
        // 合計
        if (tTotalNew != undefined) {
            summary[7][1] = this.formatNewAmount(SFN0402_helper_1.SFN0402Helper.convertYenToThousanYen(tTotalNew));
        }
        // total Old
        var tTotalOld;
        // 段ボール
        if (tCartonOld != undefined) {
            summary[2][1] = this.formatOldAmount(SFN0402_helper_1.SFN0402Helper.convertYenToThousanYen(tCartonOld));
            tTotalOld = tCartonOld;
        }
        // 紙器
        if (tPaperOld != undefined) {
            summary[4][1] = this.formatOldAmount(SFN0402_helper_1.SFN0402Helper.convertYenToThousanYen(tPaperOld));
            tTotalOld = (tTotalOld == undefined) ? tPaperOld : tTotalOld + tPaperOld;
        }
        // 商事
        if (tCommercialOld != undefined) {
            summary[6][1] = this.formatOldAmount(SFN0402_helper_1.SFN0402Helper.convertYenToThousanYen(tCommercialOld));
            tTotalOld = (tTotalOld == undefined) ? tCommercialOld : tTotalOld + tCommercialOld;
        }
        // 合計
        if (tTotalOld != undefined) {
            summary[8][1] = this.formatOldAmount(SFN0402_helper_1.SFN0402Helper.convertYenToThousanYen(tTotalOld));
        }
        // 前年比
        if (tTotalNew > 0 && tTotalOld > 0) {
            summary[9][1] = this.formatPercentage(tTotalNew / tTotalOld);
        }
        // 目標
        if (tGoal != undefined) {
            summary[10][1] = this.formatNewAmount(tGoal);
        }
        // 目標比
        if (tTotalNew > 0 && tGoal > 0) {
            summary[11][1] = this.formatPercentage(SFN0402_helper_1.SFN0402Helper.convertYenToThousanYen(tTotalNew) / tGoal);
        }
        return summary;
    };
    SFN040202Component.prototype.getDefaultData = function () {
        var table = [];
        table.push(["分類", "通年", "4", "5", "6", "7", "8", "9", "10", "11", "12", "1", "2", "3"]);
        table.push(["段ボール", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"]);
        table.push(["", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"]);
        table.push(["紙器", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"]);
        table.push(["", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"]);
        table.push(["商事", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"]);
        table.push(["", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"]);
        table.push(["合計", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"]);
        table.push(["", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"]);
        table.push(["前年比", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"]);
        table.push(["目標", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"]);
        table.push(["目標比", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"]);
        return table;
    };
    SFN040202Component.prototype.formatNewAmount = function (value) {
        return numbro(value).format("0,0");
    };
    SFN040202Component.prototype.formatOldAmount = function (value) {
        return "(" + numbro(value).format("0,0") + ")";
    };
    SFN040202Component.prototype.formatPercentage = function (value) {
        return numbro(value).format("0,0.0%");
    };
    __decorate([
        core_1.ViewChild("hot"), 
        __metadata('design:type', core_1.ElementRef)
    ], SFN040202Component.prototype, "hotE", void 0);
    SFN040202Component = __decorate([
        core_1.Component({
            selector: "[sfn040202]",
            templateUrl: "SFN040202.SalesPerformance.component.html"
        }), 
        __metadata('design:paramtypes', [SFN0402_page_1.SFN0402Page, core_1.ElementRef])
    ], SFN040202Component);
    return SFN040202Component;
}());
exports.SFN040202Component = SFN040202Component;
//# sourceMappingURL=SFN040202.SalesPerformance.component.js.map