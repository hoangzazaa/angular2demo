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
var format_util_1 = require("../../../../util/format-util");
var SF0050103Component = (function () {
    function SF0050103Component(page) {
        this.page = page;
    }
    SF0050103Component.prototype.ngAfterViewInit = function () {
        this.drawChart();
    };
    SF0050103Component.prototype.drawChart = function () {
        // prepare data
        this.prepareChartData();
        // setup chart
        var ctx = document.getElementById("sf0050103-graph");
        var data = {
            labels: this.chartLabel,
            datasets: this.chartData
        };
        var monthLine;
        if (this.page.pageData.graphData.goalValue != undefined && this.page.pageData.graphData.goalValue > 0) {
            monthLine = {
                y: this.page.pageData.graphData.goalValue,
                goal: format_util_1.FormatUtil.formatNumber(this.page.pageData.graphData.goalValue),
                goalColor: SF00501_constants_1.SF00501Constants.COLOR_GOAL
            };
            if (this.page.pageData.graphData.orderValue > 0) {
                monthLine["revenue"] = format_util_1.FormatUtil.formatNumber(this.page.pageData.graphData.orderValue);
                if (this.page.pageData.currentFilter.sumaryType == SF00501_constants_1.SF00501Constants.OPTION_SUMMARY_INPROCESS) {
                    monthLine["revenueColor"] = SF00501_constants_1.SF00501Constants.COLOR_PLAN_ORDER;
                }
                else {
                    monthLine["revenueColor"] = SF00501_constants_1.SF00501Constants.COLOR_ORDER;
                }
            }
            // update max value
            if (monthLine.y + 10000 > this.maxValue) {
                this.maxValue = monthLine.y;
            }
        }
        // adjust maxValue
        var maxValue = Math.ceil(this.maxValue / 10000) * 10000 + 10000;
        this.registGoalLine();
        var self = this;
        this.chartInc = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                legend: {
                    display: false
                },
                tooltips: {
                    mode: "label",
                    filter: function (item) {
                        if (isNaN(item.yLabel) && self.chartData[item.datasetIndex].label == SF00501_constants_1.SF00501Constants.LABEL_RESOURCE) {
                            return false;
                        }
                        return true;
                    },
                    itemSort: function () {
                        return 1;
                    },
                    callbacks: {
                        title: function (items, data) {
                            return self.formatGrapthTitle(items[0].index);
                        },
                        label: function (item, data) {
                            var value = item.yLabel;
                            if (data.datasets[item.datasetIndex].label == SF00501_constants_1.SF00501Constants.LABEL_RESOURCE) {
                                value = value * 2;
                            }
                            return data.datasets[item.datasetIndex].label + " " + format_util_1.FormatUtil.formatNumber(value);
                        }
                    }
                },
                scales: {
                    xAxes: [{
                            categoryPercentage: 0.4,
                            barPercentage: 1,
                            gridLines: {
                                display: false
                            }
                        }],
                    yAxes: [{
                            gridLines: {
                                display: false
                            },
                            ticks: {
                                display: false,
                                max: maxValue,
                                beginAtZero: true
                            }
                        }]
                },
                layout: {
                    padding: {
                        top: 30
                    }
                },
                monthLine: monthLine,
                onClick: function (evt) {
                    var activePoints = self.chartInc.getElementAtEvent(evt);
                    if (activePoints.length > 0) {
                        self.selectDate(activePoints[0]._index);
                    }
                }
            }
        });
    };
    SF0050103Component.prototype.registGoalLine = function () {
        var monthLinePlugin = {
            beforeUpdate: function (chartInstance) {
                var ctxW = chartInstance.chart.width;
                var paddingTop = 30;
                if (ctxW < 768) {
                    paddingTop = 18;
                }
                if (ctxW < 400) {
                    paddingTop = 10;
                }
                chartInstance.options.layout.padding.top = paddingTop;
            }, afterDatasetsDraw: function (chartInstance) {
                var xScale = chartInstance.scales["x-axis-0"];
                var yScale = chartInstance.scales["y-axis-0"];
                var canvas = chartInstance.chart;
                var ctx = canvas.ctx;
                var index;
                var line;
                var style;
                // responsive base on width
                var ctxW = canvas.width;
                var textSize = 20;
                var xPadding = 20;
                var yPadding = 5;
                var lineWidth = 3;
                var lineMargin = 5;
                if (ctxW < 768) {
                    textSize = 14;
                    xPadding = 10;
                    yPadding = 2;
                    lineWidth = 2;
                    lineMargin = 2;
                }
                if (ctxW < 400) {
                    textSize = 8;
                    xPadding = 5;
                    yPadding = 1;
                    lineWidth = 1;
                    lineMargin = 1;
                }
                if (chartInstance.options.monthLine) {
                    line = chartInstance.options.monthLine;
                    var yValue = 0;
                    if (line.y) {
                        yValue = yScale.getPixelForValue(line.y);
                    }
                    if (yValue) {
                        ctx.fillStyle = "rgb(151, 235, 171)";
                        ctx.fillRect(xScale.left, yValue, canvas.width - xScale.left, lineWidth);
                    }
                    var tmpRight = canvas.width - 10;
                    if (line.goal) {
                        var text = line.goal;
                        // draw background
                        var fontArgs = ctx.font.split(' ');
                        var newSize = textSize + 'px';
                        ctx.font = newSize + ' ' + fontArgs[fontArgs.length - 1];
                        var textMtx = ctx.measureText(text);
                        var rectW = 2 * xPadding + textMtx.width;
                        var rectH = yPadding + textSize;
                        ctx.fillStyle = line.goalColor;
                        ctx.fillRect(tmpRight - rectW, yValue - lineMargin - rectH, rectW, rectH);
                        // write text
                        ctx.fillStyle = "#FFF";
                        ctx.textAlign = "right";
                        ctx.textBaseline = "bottom";
                        ctx.fillText(text, tmpRight - xPadding, yValue - yPadding);
                        tmpRight = tmpRight - rectW - 5;
                    }
                    if (line.revenue) {
                        var text = line.revenue;
                        // draw background
                        var fontArgs = ctx.font.split(' ');
                        var newSize = textSize + 'px';
                        ctx.font = newSize + ' ' + fontArgs[fontArgs.length - 1];
                        var textMtx = ctx.measureText(text);
                        var rectW = 2 * xPadding + textMtx.width;
                        var rectH = yPadding + textSize;
                        ctx.fillStyle = line.revenueColor;
                        ctx.fillRect(tmpRight - rectW, yValue + lineMargin + lineWidth, rectW, rectH);
                        // write text
                        ctx.fillStyle = "#FFF";
                        ctx.textAlign = "right";
                        ctx.textBaseline = "top";
                        ctx.fillText(text, tmpRight - xPadding, yValue + lineMargin + yPadding);
                    }
                }
            }
        };
        Chart.pluginService.register(monthLinePlugin);
    };
    SF0050103Component.prototype.prepareChartData = function () {
        // prepare chart labels
        this.chartLabel = [];
        for (var _i = 0, _a = this.page.pageData.dateList; _i < _a.length; _i++) {
            var date = _a[_i];
            this.chartLabel.push("" + date);
        }
        // tmp for max value
        var maxValue = 0;
        var graphData = this.page.pageData.graphData;
        var dateList = this.page.pageData.dateList;
        this.chartData = [];
        // prepare goal data
        if (graphData.goalData != undefined) {
            // create data
            var goalData = {
                label: SF00501_constants_1.SF00501Constants.LABEL_GOAL,
                backgroundColor: SF00501_constants_1.SF00501Constants.COLOR_GOAL,
                stack: "1",
                hoverBackgroundColor: SF00501_constants_1.SF00501Constants.COLOR_GOAL,
                data: []
            };
            this.chartData.push(goalData);
            // add data
            var goalDatas = graphData.goalData;
            for (var _b = 0, dateList_1 = dateList; _b < dateList_1.length; _b++) {
                var date = dateList_1[_b];
                var value = goalDatas[date];
                if (value != undefined) {
                    goalData.data.push(value);
                    // check for maxValue
                    if (value > maxValue) {
                        maxValue = value;
                    }
                }
                else {
                    goalData.data.push(0);
                }
            }
        }
        // prepare resource data
        var planDate = graphData.planDate;
        if (graphData.goalData != undefined) {
            var resourceData = {
                label: SF00501_constants_1.SF00501Constants.LABEL_RESOURCE,
                backgroundColor: SF00501_constants_1.SF00501Constants.COLOR_RESOURCE,
                stack: "1",
                hoverBackgroundColor: SF00501_constants_1.SF00501Constants.COLOR_RESOURCE,
                data: []
            };
            this.chartData.push(resourceData);
            // create data
            if (planDate != undefined) {
                // add data
                var goalDatas = graphData.goalData;
                for (var i = 0; i < dateList.length; i++) {
                    var date = dateList[i];
                    var value = void 0;
                    if (i >= planDate) {
                        value = goalDatas[date];
                    }
                    if (value != undefined) {
                        resourceData.data.push(value);
                        // check for maxValue (resource is 200%)
                        if (2 * value > maxValue) {
                            maxValue = 2 * value;
                        }
                    }
                    else {
                        resourceData.data.push(null);
                    }
                }
            }
        }
        // prepare order data
        // create data
        var orderColors = [];
        var orderData = {
            label: SF00501_constants_1.SF00501Constants.LABEL_PERFORMANCE,
            backgroundColor: orderColors,
            hoverBackgroundColor: orderColors,
            data: []
        };
        this.chartData.push(orderData);
        // add data
        var orderDatas = graphData.orderData;
        var totalValue = 0;
        for (var i = 0; i < dateList.length; i++) {
            var date = dateList[i];
            var value = 0;
            if (orderDatas != undefined && orderDatas[date] != undefined) {
                value = orderDatas[date];
                if (this.page.pageData.currentFilter.dateUnit == SF00501_constants_1.SF00501Constants.OPTION_DATE_UNIT_MONTH) {
                    totalValue += value;
                    value = totalValue;
                }
            }
            // value
            if (value != undefined) {
                orderData.data.push(value);
                // check for maxValue
                if (value > maxValue) {
                    maxValue = value;
                }
            }
            // color
            if (planDate != undefined && i >= planDate) {
                orderColors.push(SF00501_constants_1.SF00501Constants.COLOR_PLAN_ORDER);
            }
            else {
                orderColors.push(SF00501_constants_1.SF00501Constants.COLOR_ORDER);
            }
        }
        // set maxValue
        this.maxValue = maxValue;
    };
    SF0050103Component.prototype.formatGrapthTitle = function (index) {
        var pageData = this.page.pageData;
        var date = pageData.dateList[index];
        var curDate = pageData.currentFilter.date;
        var title = "";
        if (pageData.currentFilter.dateUnit == SF00501_constants_1.SF00501Constants.OPTION_DATE_UNIT_MONTH) {
            title += curDate.startYear + "年" + curDate.startMonth + "月" + date + "日";
        }
        else {
            var fY = curDate.startYear;
            var fM = curDate.startMonth;
            if (fM != 1 && date < 4) {
                fY++;
            }
            title += fY + "年" + date + "月";
        }
        return title;
    };
    //region Actions
    SF0050103Component.prototype.selectDate = function (index) {
        if (this.page.pageData.currentFilter.dateUnit == SF00501_constants_1.SF00501Constants.OPTION_DATE_UNIT_MONTH) {
            // not apply for month view
            return;
        }
        // get selected month
        var selectedMonth = this.page.pageData.dateList[index];
        var curFilter = this.page.pageData.currentFilter;
        var curDate = curFilter.date;
        var curFYear = curDate.startYear;
        if (curDate.startYear != curDate.endYear) {
            if (selectedMonth <= 3) {
                curFYear = curFYear + 1;
            }
        }
        var dateOptions = this.page.pageData.dataRepo.getSelectDates(SF00501_constants_1.SF00501Constants.OPTION_DATE_UNIT_MONTH);
        var selectedDateOption;
        for (var _i = 0, dateOptions_1 = dateOptions; _i < dateOptions_1.length; _i++) {
            var option = dateOptions_1[_i];
            if (option.startYear == curFYear && option.startMonth == selectedMonth) {
                selectedDateOption = option;
                break;
            }
        }
        if (selectedDateOption != undefined) {
            // re-filter by month
            var selectedFilter = this.page.pageData.selectedFilter;
            var curFilter_1 = this.page.pageData.currentFilter;
            selectedFilter.department = curFilter_1.department;
            selectedFilter.staff = curFilter_1.staff;
            selectedFilter.customerType = curFilter_1.customerType;
            selectedFilter.sumaryType = curFilter_1.sumaryType;
            this.page.pageData.dateOptions = dateOptions;
            selectedFilter.dateUnit = SF00501_constants_1.SF00501Constants.OPTION_DATE_UNIT_MONTH;
            selectedFilter.date = selectedDateOption;
            this.page.doFilter();
        }
    };
    SF0050103Component = __decorate([
        core_1.Component({
            selector: "[sf0050103]",
            templateUrl: "SF0050103.Graph.component.html",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [SF00501_page_1.SF00501Page])
    ], SF0050103Component);
    return SF0050103Component;
}());
exports.SF0050103Component = SF0050103Component;
//# sourceMappingURL=SF0050103.Graph.component.js.map