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
var SF0050102Component = (function () {
    function SF0050102Component(page) {
        this.page = page;
    }
    Object.defineProperty(SF0050102Component.prototype, "headLine", {
        get: function () {
            return this.page.pageData.headline;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050102Component.prototype, "showSummaryTable", {
        get: function () {
            return this.page.pageData.showSummaryTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050102Component.prototype, "summaryNewAmount1", {
        get: function () {
            return this.page.pageData.summary.newAmount1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050102Component.prototype, "summaryNewAmount2", {
        get: function () {
            return this.page.pageData.summary.newAmount2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050102Component.prototype, "summaryNewAmount3", {
        get: function () {
            return this.page.pageData.summary.newAmount3;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050102Component.prototype, "summaryNewTotal", {
        get: function () {
            return this.page.pageData.summary.newTotal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050102Component.prototype, "summaryOldAmount1", {
        get: function () {
            return this.page.pageData.summary.oldAmount1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050102Component.prototype, "summaryOldAmount2", {
        get: function () {
            return this.page.pageData.summary.oldAmount2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050102Component.prototype, "summaryOldAmount3", {
        get: function () {
            return this.page.pageData.summary.oldAmount3;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050102Component.prototype, "summaryOldTotal", {
        get: function () {
            return this.page.pageData.summary.oldTotal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050102Component.prototype, "isNanDiffRate", {
        get: function () {
            return isNaN(this.page.pageData.summary.diffRate) || !isFinite(this.page.pageData.summary.diffRate);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050102Component.prototype, "summaryDiffRate", {
        get: function () {
            return this.page.pageData.summary.diffRate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050102Component.prototype, "hasViewModes", {
        get: function () {
            return (this.page.pageData.viewModes != undefined);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050102Component.prototype, "viewModes", {
        get: function () {
            return this.page.pageData.viewModes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050102Component.prototype, "viewMode", {
        get: function () {
            return this.page.pageData.selectedViewMode;
        },
        set: function (value) {
            this.page.pageData.selectedViewMode = value;
            // check preview list deal by saleId and month
            if (value == SF00501_constants_1.SF00501Constants.OPTION_DETAIL_DEAL) {
                // get list deal
                this.page.getListDealBySaleIdAndMonth();
            }
            else {
                // reset view deals
                this.page.pageData.showDealList = false;
                // change and reset data
                this.page.analyzeData();
                this.page.reInitDataTable();
                this.page.checkSummaryTable();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050102Component.prototype, "dateList", {
        get: function () {
            return this.page.pageData.dateList;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050102Component.prototype, "displayTable", {
        get: function () {
            return this.page.pageData.displayTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0050102Component.prototype, "displayGraph", {
        get: function () {
            return this.page.pageData.displayGraph;
        },
        enumerable: true,
        configurable: true
    });
    SF0050102Component.prototype.convertYenToThousanYen = function (value) {
        return SF00501_helper_1.SF00501Helper.convertYenToThousanYen(value);
    };
    SF0050102Component = __decorate([
        core_1.Component({
            selector: "[sf0050102]",
            templateUrl: "SF0050102.MainPanel.component.html"
        }), 
        __metadata('design:paramtypes', [SF00501_page_1.SF00501Page])
    ], SF0050102Component);
    return SF0050102Component;
}());
exports.SF0050102Component = SF0050102Component;
//# sourceMappingURL=SF0050102.MainPanel.component.js.map