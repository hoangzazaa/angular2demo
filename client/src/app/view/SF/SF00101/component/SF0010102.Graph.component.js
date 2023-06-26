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
var SF00101_page_1 = require("../SF00101.page");
var format_util_1 = require("../../../../util/format-util");
var SF0010102GraphComponent = (function () {
    function SF0010102GraphComponent(page) {
        this.page = page;
    }
    Object.defineProperty(SF0010102GraphComponent.prototype, "pageData", {
        get: function () {
            return this.page.pageService.pageData;
        },
        enumerable: true,
        configurable: true
    });
    SF0010102GraphComponent.prototype.ngAfterViewInit = function () {
        // init pie chart
        $('.js-pie-chart').easyPieChart({
            barColor: $(this).data('bar-color') ? $(this).data('bar-color') : '#777777',
            trackColor: $(this).data('track-color') ? $(this).data('track-color') : '#eeeeee',
            lineWidth: $(this).data('line-width') ? $(this).data('line-width') : 3,
            size: $(this).data('size') ? $(this).data('size') : '80',
            animate: {
                duration: 1000,
                enabled: false
            },
            scaleColor: $(this).data('scale-color') ? $(this).data('scale-color') : false
        });
    };
    SF0010102GraphComponent.prototype.getPercent = function (actual, total) {
        return this.page.getPercent(actual, total);
    };
    Object.defineProperty(SF0010102GraphComponent.prototype, "receipts_goal", {
        get: function () {
            return format_util_1.FormatUtil.isNaN(this.pageData.receipts.goal);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0010102GraphComponent.prototype, "receipts_current", {
        get: function () {
            return format_util_1.FormatUtil.isNaN(this.pageData.receipts.current);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0010102GraphComponent.prototype, "receipts", {
        get: function () {
            return this.getPercent(this.pageData.receipts.current, this.pageData.receipts.goal);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0010102GraphComponent.prototype, "newReceipts_goal", {
        get: function () {
            return format_util_1.FormatUtil.isNaN(this.pageData.newReceipts.goal);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0010102GraphComponent.prototype, "newReceipts_current", {
        get: function () {
            return format_util_1.FormatUtil.isNaN(this.pageData.newReceipts.current);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0010102GraphComponent.prototype, "newReceipts", {
        get: function () {
            return this.getPercent(this.pageData.newReceipts.current, this.pageData.newReceipts.goal);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0010102GraphComponent.prototype, "recordNew_current", {
        get: function () {
            return format_util_1.FormatUtil.isNaN(this.pageData.recordNew.current);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0010102GraphComponent.prototype, "recordNew", {
        get: function () {
            return this.getPercent(this.pageData.recordNew.current, this.pageData.recordNew.goal);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0010102GraphComponent.prototype, "digitalSale_current", {
        get: function () {
            return format_util_1.FormatUtil.isNaN(this.pageData.digitalSale.current);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0010102GraphComponent.prototype, "digitalSale", {
        get: function () {
            return this.getPercent(this.pageData.digitalSale.current, this.pageData.digitalSale.goal);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0010102GraphComponent.prototype, "recordNew_goal", {
        get: function () {
            return format_util_1.FormatUtil.isNaN(this.pageData.recordNew.goal);
        },
        set: function (value) {
            this.pageData.recordNew.goal = value;
            //update data
            $('#js-pie-chart3').data('easyPieChart').update(format_util_1.FormatUtil.isNaN(this.getPercent(this.pageData.recordNew.current, value)));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0010102GraphComponent.prototype, "digitalSale_goal", {
        get: function () {
            return format_util_1.FormatUtil.isNaN(this.pageData.digitalSale.goal);
        },
        set: function (value) {
            this.pageData.digitalSale.goal = value;
            //update data
            $('#js-pie-chart4').data('easyPieChart').update(format_util_1.FormatUtil.isNaN(this.getPercent(this.pageData.digitalSale.current, value)));
        },
        enumerable: true,
        configurable: true
    });
    SF0010102GraphComponent.prototype.saveDataInput = function () {
        this.page.saveDataInput();
    };
    SF0010102GraphComponent = __decorate([
        core_1.Component({
            selector: 'sf0010102-graph',
            templateUrl: 'SF0010102.Graph.component.html'
        }), 
        __metadata('design:paramtypes', [SF00101_page_1.SF00101Page])
    ], SF0010102GraphComponent);
    return SF0010102GraphComponent;
}());
exports.SF0010102GraphComponent = SF0010102GraphComponent;
//# sourceMappingURL=SF0010102.Graph.component.js.map