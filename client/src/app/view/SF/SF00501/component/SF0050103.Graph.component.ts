import {Component, AfterViewInit, ChangeDetectionStrategy} from "@angular/core";
import {SF00501Page} from "../SF00501.page";
import {SF00501Constants} from "../SF00501.constants";
import {FormatUtil} from "../../../../util/format-util";
import {DateModel} from "../model/SF00501_Date.model";

declare var Chart: any;

@Component({
    selector: "[sf0050103]",
    templateUrl: "SF0050103.Graph.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SF0050103Component implements AfterViewInit {

    // chart data
    chartLabel: string[];
    chartData: any[];
    maxValue: number;
    // chart instance
    chartInc: any;

    constructor(private page: SF00501Page) {
    }

    ngAfterViewInit(): void {
        this.drawChart();
    }

    drawChart() {
        // prepare data
        this.prepareChartData();

        // setup chart
        var ctx = document.getElementById("sf0050103-graph");

        var data = {
            labels: this.chartLabel,
            datasets: this.chartData
        };

        let monthLine: any;
        if (this.page.pageData.graphData.goalValue != undefined && this.page.pageData.graphData.goalValue > 0) {
            monthLine = {
                y: this.page.pageData.graphData.goalValue,
                goal: FormatUtil.formatNumber(this.page.pageData.graphData.goalValue),
                goalColor: SF00501Constants.COLOR_GOAL
            };
            if (this.page.pageData.graphData.orderValue > 0) {
                monthLine["revenue"] = FormatUtil.formatNumber(this.page.pageData.graphData.orderValue);
                if (this.page.pageData.currentFilter.sumaryType == SF00501Constants.OPTION_SUMMARY_INPROCESS) {
                    monthLine["revenueColor"] = SF00501Constants.COLOR_PLAN_ORDER;
                } else {
                    monthLine["revenueColor"] = SF00501Constants.COLOR_ORDER;
                }
            }
            // update max value
            if (monthLine.y + 10000 > this.maxValue) {
                this.maxValue = monthLine.y;
            }
        }

        // adjust maxValue
        let maxValue = Math.ceil(this.maxValue / 10000) * 10000 + 10000;

        this.registGoalLine();
        let self = this;
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
                        if (isNaN(item.yLabel) && self.chartData[item.datasetIndex].label == SF00501Constants.LABEL_RESOURCE) {
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
                            let value = item.yLabel;
                            if (data.datasets[item.datasetIndex].label == SF00501Constants.LABEL_RESOURCE) {
                                value = value * 2;
                            }

                            return data.datasets[item.datasetIndex].label + " " + FormatUtil.formatNumber(value);
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
    }

    registGoalLine() {
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

                    let yValue = 0;
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
    }

    prepareChartData() {
        // prepare chart labels
        this.chartLabel = [];
        for (let date of this.page.pageData.dateList) {
            this.chartLabel.push("" + date);
        }

        // tmp for max value
        let maxValue = 0;

        let graphData = this.page.pageData.graphData;
        let dateList = this.page.pageData.dateList;
        this.chartData = [];
        // prepare goal data
        if (graphData.goalData != undefined) {
            // create data
            let goalData = {
                label: SF00501Constants.LABEL_GOAL,
                backgroundColor: SF00501Constants.COLOR_GOAL,
                stack: "1",
                hoverBackgroundColor: SF00501Constants.COLOR_GOAL,
                data: []
            };
            this.chartData.push(goalData);

            // add data
            let goalDatas = graphData.goalData;
            for (let date of dateList) {
                let value = goalDatas[date];
                if (value != undefined) {
                    goalData.data.push(value);

                    // check for maxValue
                    if (value > maxValue) {
                        maxValue = value;
                    }
                } else {
                    goalData.data.push(0);
                }
            }
        }

        // prepare resource data
        let planDate = graphData.planDate;
        if (graphData.goalData != undefined) {
            let resourceData = {
                label: SF00501Constants.LABEL_RESOURCE,
                backgroundColor: SF00501Constants.COLOR_RESOURCE,
                stack: "1",
                hoverBackgroundColor: SF00501Constants.COLOR_RESOURCE,
                data: []
            };
            this.chartData.push(resourceData);

            // create data
            if (planDate != undefined) {
                // add data
                let goalDatas = graphData.goalData;
                for (let i = 0; i < dateList.length; i++) {
                    let date = dateList[i];
                    let value: number;
                    if (i >= planDate) {
                        value = goalDatas[date];
                    }
                    if (value != undefined) {
                        resourceData.data.push(value);

                        // check for maxValue (resource is 200%)
                        if (2 * value > maxValue) {
                            maxValue = 2 * value;
                        }
                    } else {
                        resourceData.data.push(null);
                    }
                }
            }
        }

        // prepare order data
        // create data
        let orderColors = [];
        let orderData = {
            label: SF00501Constants.LABEL_PERFORMANCE,
            backgroundColor: orderColors,
            hoverBackgroundColor: orderColors,
            data: []
        };
        this.chartData.push(orderData);

        // add data
        let orderDatas = graphData.orderData;
        let totalValue = 0;
        for (let i = 0; i < dateList.length; i++) {
            let date = dateList[i];
            let value = 0;
            if (orderDatas != undefined && orderDatas[date] != undefined) {
                value = orderDatas[date];
                if (this.page.pageData.currentFilter.dateUnit == SF00501Constants.OPTION_DATE_UNIT_MONTH) {
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
                orderColors.push(SF00501Constants.COLOR_PLAN_ORDER);
            } else {
                orderColors.push(SF00501Constants.COLOR_ORDER);
            }
        }

        // set maxValue
        this.maxValue = maxValue;
    }

    formatGrapthTitle(index) {
        let pageData = this.page.pageData;
        let date = pageData.dateList[index];
        let curDate = pageData.currentFilter.date;
        let title = "";
        if (pageData.currentFilter.dateUnit == SF00501Constants.OPTION_DATE_UNIT_MONTH) {
            title += curDate.startYear + "年" + curDate.startMonth + "月" + date + "日";
        } else {
            let fY = curDate.startYear;
            let fM = curDate.startMonth;
            if (fM != 1 && date < 4) {
                fY++;
            }
            title += fY + "年" + date + "月";
        }
        return title;
    }

    //region Actions
    selectDate(index: number) {
        if (this.page.pageData.currentFilter.dateUnit == SF00501Constants.OPTION_DATE_UNIT_MONTH) {
            // not apply for month view
            return;
        }
        // get selected month
        let selectedMonth = this.page.pageData.dateList[index];
        let curFilter = this.page.pageData.currentFilter;
        let curDate = curFilter.date;
        let curFYear = curDate.startYear;
        if (curDate.startYear != curDate.endYear) {
            if (selectedMonth <= 3) {
                curFYear = curFYear + 1;
            }
        }

        let dateOptions = this.page.pageData.dataRepo.getSelectDates(SF00501Constants.OPTION_DATE_UNIT_MONTH);
        let selectedDateOption: DateModel;
        for (let option of dateOptions) {
            if (option.startYear == curFYear && option.startMonth == selectedMonth) {
                selectedDateOption = option;
                break;
            }
        }
        if (selectedDateOption != undefined) {
            // re-filter by month
            let selectedFilter = this.page.pageData.selectedFilter;
            let curFilter = this.page.pageData.currentFilter;

            selectedFilter.department = curFilter.department;
            selectedFilter.staff = curFilter.staff;
            selectedFilter.customerType = curFilter.customerType;
            selectedFilter.sumaryType = curFilter.sumaryType;

            this.page.pageData.dateOptions = dateOptions;
            selectedFilter.dateUnit = SF00501Constants.OPTION_DATE_UNIT_MONTH;
            selectedFilter.date = selectedDateOption;

            this.page.doFilter();
        }
    }

    //endRegion
}