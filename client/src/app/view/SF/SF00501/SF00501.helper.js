"use strict";
var SF00501_Detail_model_1 = require("./model/SF00501_Detail.model");
var SF00501_Summary_model_1 = require("./model/SF00501_Summary.model");
var SF00501_constants_1 = require("./SF00501.constants");
var SF00501_DetailWrapper_model_1 = require("./model/SF00501_DetailWrapper.model");
var SF00501_GraphData_model_1 = require("./model/SF00501_GraphData.model");
var math_util_1 = require("../../../util/math-util");
/**
 * Helper class for SF00502
 * @author haipt
 */
var SF00501Helper = (function () {
    function SF00501Helper() {
    }
    // sf0050102
    SF00501Helper.calculateSummaryData = function (pageData) {
        // calculate summary data
        var summary = new SF00501_Summary_model_1.SummaryModel();
        // support check for in-progress
        var isIP = (pageData.currentFilter.sumaryType == SF00501_constants_1.SF00501Constants.OPTION_SUMMARY_INPROCESS);
        var isMonthView = (pageData.currentFilter.dateUnit == SF00501_constants_1.SF00501Constants.OPTION_DATE_UNIT_MONTH);
        // convert month to semi financial month (+1 js +3 business)
        var month = pageData.currentTime.getMonth() + 4;
        var day = pageData.currentTime.getDate();
        // sum details
        var details = pageData.details;
        for (var _i = 0, details_1 = details; _i < details_1.length; _i++) {
            var detail = details_1[_i];
            if (detail.amountType == SF00501_constants_1.SF00501Constants.TYPE_AMOUNT_OLD) {
                // calculate total
                var oldTotalAmount = 0;
                for (var date in detail.amounts) {
                    oldTotalAmount += (+detail.amounts[date] | 0);
                }
                // old revenue
                if (detail.productType == SF00501_constants_1.SF00501Constants.TYPE_PRODUCT_1) {
                    // product type 1
                    summary.oldAmount1 += oldTotalAmount;
                }
                else if (detail.productType == SF00501_constants_1.SF00501Constants.TYPE_PRODUCT_2) {
                    // product type 2
                    summary.oldAmount2 += oldTotalAmount;
                }
                else if (detail.productType == SF00501_constants_1.SF00501Constants.TYPE_PRODUCT_3) {
                    // product type 3
                    summary.oldAmount3 += oldTotalAmount;
                }
            }
            else if (detail.amountType == SF00501_constants_1.SF00501Constants.TYPE_AMOUNT_NEW) {
                var newTotalAmount = 0;
                for (var date in detail.amounts) {
                    // ignore new data if in progress mode
                    if (isIP) {
                        if (isMonthView) {
                            // compare with day
                            if (day <= +date) {
                                continue;
                            }
                        }
                        else {
                            // convert month to semi financial month (+1 js +3 business)
                            var tmpMonth = +date + 4;
                            // compare with month
                            if (month <= tmpMonth) {
                                continue;
                            }
                        }
                    }
                    newTotalAmount += (+detail.amounts[date] | 0);
                }
                // new order
                if (detail.productType == SF00501_constants_1.SF00501Constants.TYPE_PRODUCT_1) {
                    // product type 1
                    summary.newAmount1 += newTotalAmount;
                }
                else if (detail.productType == SF00501_constants_1.SF00501Constants.TYPE_PRODUCT_2) {
                    // product type 2
                    summary.newAmount2 += newTotalAmount;
                }
                else if (detail.productType == SF00501_constants_1.SF00501Constants.TYPE_PRODUCT_3) {
                    // product type 3
                    summary.newAmount3 += newTotalAmount;
                }
            }
        }
        // calculate total and rate
        summary.calculateSummary();
        return summary;
    };
    // sf0050104
    SF00501Helper.analyzeDataByAgent = function (pageData) {
        // create wrapper data
        var displayDatas = [];
        // create detail products
        var deptWrappers = SF00501Helper.createDetailAgent(pageData.details, pageData.dateList, pageData.dataAgents, pageData.dataRepo);
        displayDatas = displayDatas.concat(deptWrappers);
        // create wrapper for total
        var totalWrapper = SF00501Helper.createTotalWrapper(pageData.details, pageData.dateList, true);
        displayDatas.push(totalWrapper);
        if (pageData.currentFilter.dateUnit != SF00501_constants_1.SF00501Constants.OPTION_DATE_UNIT_MONTH) {
            // create wrapper for revenue
            var totalOldWrapper = SF00501Helper.createTotalWrapper(pageData.details, pageData.dateList, false);
            displayDatas.push(totalOldWrapper);
            // create rate new/old rate
            var revenueRateWrapper = SF00501Helper.createDetailRate(totalWrapper.detail, totalOldWrapper.detail, SF00501_constants_1.SF00501Constants.TITLE_REVENUE_RATE);
            displayDatas.push(revenueRateWrapper);
            // create goal wrapper
            var goalWrapper = SF00501Helper.createGoalWrapper(pageData.details, pageData.dateList);
            displayDatas.push(goalWrapper);
            // create goal rate wrapper
            var goalRateWrapper = SF00501Helper.createDetailRate(totalWrapper.detail, goalWrapper.detail, SF00501_constants_1.SF00501Constants.TITLE_GOAL_RATE);
            displayDatas.push(goalRateWrapper);
        }
        return displayDatas;
    };
    SF00501Helper.analyzeDataByProduct = function (pageData) {
        // create wrapper data
        var displayDatas = [];
        // create detail products
        var productWrappers = SF00501Helper.createDetailProduct(pageData.details, pageData.dateList);
        displayDatas = displayDatas.concat(productWrappers);
        // create wrapper for total
        var totalWrapper = SF00501Helper.createTotalWrapper(pageData.details, pageData.dateList, true);
        displayDatas.push(totalWrapper);
        if (pageData.currentFilter.dateUnit != SF00501_constants_1.SF00501Constants.OPTION_DATE_UNIT_MONTH) {
            // create wrapper for revenue
            var totalOldWrapper = SF00501Helper.createTotalWrapper(pageData.details, pageData.dateList, false);
            displayDatas.push(totalOldWrapper);
            // create rate new/old rate
            var revenueRateWrapper = SF00501Helper.createDetailRate(totalWrapper.detail, totalOldWrapper.detail, SF00501_constants_1.SF00501Constants.TITLE_REVENUE_RATE);
            displayDatas.push(revenueRateWrapper);
            // create goal wrapper
            var goalWrapper = SF00501Helper.createGoalWrapper(pageData.details, pageData.dateList);
            displayDatas.push(goalWrapper);
            // create goal rate wrapper
            var goalRateWrapper = SF00501Helper.createDetailRate(totalWrapper.detail, goalWrapper.detail, SF00501_constants_1.SF00501Constants.TITLE_GOAL_RATE);
            displayDatas.push(goalRateWrapper);
        }
        return displayDatas;
    };
    SF00501Helper.createDetailProduct = function (details, dateRange) {
        // create wrapper datas
        var detailWrappers = [];
        for (var _i = 0, _a = [SF00501_constants_1.SF00501Constants.TYPE_PRODUCT_1, SF00501_constants_1.SF00501Constants.TYPE_PRODUCT_2, SF00501_constants_1.SF00501Constants.TYPE_PRODUCT_3]; _i < _a.length; _i++) {
            var productType = _a[_i];
            // set basic data
            var detailWrapper = new SF00501_DetailWrapper_model_1.DetailWrapperModel();
            detailWrappers.push(detailWrapper);
            detailWrapper.type = SF00501_constants_1.SF00501Constants.TYPE_WRAPPER_NORMAL;
            detailWrapper.detail = new SF00501_Detail_model_1.DetailModel();
            detailWrapper.oldDetail = new SF00501_Detail_model_1.DetailModel();
            if (productType == SF00501_constants_1.SF00501Constants.TYPE_PRODUCT_1) {
                detailWrapper.detail.name = SF00501_constants_1.SF00501Constants.TITLE_PRODUCT_1;
            }
            else if (productType == SF00501_constants_1.SF00501Constants.TYPE_PRODUCT_2) {
                detailWrapper.detail.name = SF00501_constants_1.SF00501Constants.TITLE_PRODUCT_2;
            }
            else if (productType == SF00501_constants_1.SF00501Constants.TYPE_PRODUCT_3) {
                detailWrapper.detail.name = SF00501_constants_1.SF00501Constants.TITLE_PRODUCT_3;
            }
        }
        // calculate data
        for (var _b = 0, details_2 = details; _b < details_2.length; _b++) {
            var detail = details_2[_b];
            if (detail.amountType == SF00501_constants_1.SF00501Constants.TYPE_AMOUNT_NEW) {
                var detailWrapper = void 0;
                if (detail.productType == SF00501_constants_1.SF00501Constants.TYPE_PRODUCT_1) {
                    detailWrapper = detailWrappers[0];
                }
                else if (detail.productType == SF00501_constants_1.SF00501Constants.TYPE_PRODUCT_2) {
                    detailWrapper = detailWrappers[1];
                }
                else if (detail.productType == SF00501_constants_1.SF00501Constants.TYPE_PRODUCT_3) {
                    detailWrapper = detailWrappers[2];
                }
                if (detailWrapper == undefined) {
                    continue;
                }
                // calculate to new amount
                var amounts = detail.amounts;
                var newAmounts = detailWrapper.detail.amounts;
                //TODO 3435
                var newAmountsTmp = detailWrapper.detail.amountsTmp;
                for (var _c = 0, dateRange_1 = dateRange; _c < dateRange_1.length; _c++) {
                    var date = dateRange_1[_c];
                    var value = amounts[date];
                    if (value != undefined) {
                        if (newAmounts[date] == undefined) {
                            newAmounts[date] = 0;
                            newAmountsTmp[date] = 0;
                        }
                        newAmounts[date] += this.convertYenToThousanYen(value);
                        newAmountsTmp[date] += Number(value);
                    }
                }
            }
            else if (detail.amountType == SF00501_constants_1.SF00501Constants.TYPE_AMOUNT_OLD) {
                var detailWrapper = void 0;
                if (detail.productType == SF00501_constants_1.SF00501Constants.TYPE_PRODUCT_1) {
                    detailWrapper = detailWrappers[0];
                }
                else if (detail.productType == SF00501_constants_1.SF00501Constants.TYPE_PRODUCT_2) {
                    detailWrapper = detailWrappers[1];
                }
                else if (detail.productType == SF00501_constants_1.SF00501Constants.TYPE_PRODUCT_3) {
                    detailWrapper = detailWrappers[2];
                }
                if (detailWrapper == undefined) {
                    continue;
                }
                // calculate to old amount
                var amounts = detail.amounts;
                var oldAmounts = detailWrapper.oldDetail.amounts;
                //TODO 3435
                var oldAmountsTmp = detailWrapper.oldDetail.amountsTmp;
                for (var _d = 0, dateRange_2 = dateRange; _d < dateRange_2.length; _d++) {
                    var date = dateRange_2[_d];
                    var value = amounts[date];
                    if (value != undefined) {
                        if (oldAmounts[date] == undefined) {
                            oldAmounts[date] = 0;
                            oldAmountsTmp[date] = 0;
                        }
                        oldAmounts[date] += this.convertYenToThousanYen(value);
                        oldAmountsTmp[date] += Number(value);
                    }
                }
            }
        }
        // calculate total
        for (var _e = 0, detailWrappers_1 = detailWrappers; _e < detailWrappers_1.length; _e++) {
            var detailWrapper = detailWrappers_1[_e];
            detailWrapper.detail.calculateTotal3427();
            detailWrapper.oldDetail.calculateTotal3427();
        }
        return detailWrappers;
    };
    SF00501Helper.createDetailAgent = function (details, dateRange, agents, repo) {
        // create wrapper datas
        var detailWrappers = [];
        var detailWrapperMap = {};
        // create list wrapper agent
        // create agent list
        for (var _i = 0, agents_1 = agents; _i < agents_1.length; _i++) {
            var agent = agents_1[_i];
            // create wrapper
            var detailWrapper = new SF00501_DetailWrapper_model_1.DetailWrapperModel();
            detailWrapper.type = SF00501_constants_1.SF00501Constants.TYPE_WRAPPER_NORMAL;
            detailWrapper.detail = new SF00501_Detail_model_1.DetailModel();
            detailWrapper.oldDetail = new SF00501_Detail_model_1.DetailModel();
            detailWrapper.detail.id = agent.id;
            detailWrapper.detail.name = agent.name;
            // add to list and map
            detailWrappers.push(detailWrapper);
            detailWrapperMap[agent.id] = detailWrapper;
        }
        // calculate data
        for (var _a = 0, details_3 = details; _a < details_3.length; _a++) {
            var detail = details_3[_a];
            var detailWrapper = detailWrapperMap[detail.id];
            if (detailWrapper == undefined) {
                continue;
            }
            if (detail.amountType == SF00501_constants_1.SF00501Constants.TYPE_AMOUNT_NEW) {
                // calculate to new amount
                var amounts = detail.amounts;
                var newAmounts = detailWrapper.detail.amounts;
                var newAmountsTmp = detailWrapper.detail.amountsTmp;
                for (var _b = 0, dateRange_3 = dateRange; _b < dateRange_3.length; _b++) {
                    var date = dateRange_3[_b];
                    var value = amounts[date];
                    if (value != undefined) {
                        if (newAmounts[date] == undefined) {
                            newAmounts[date] = 0;
                            newAmountsTmp[date] = 0;
                        }
                        newAmounts[date] += value;
                        newAmountsTmp[date] += value;
                    }
                }
            }
            else if (detail.amountType == SF00501_constants_1.SF00501Constants.TYPE_AMOUNT_OLD) {
                // calculate to old amount
                var amounts = detail.amounts;
                var oldAmounts = detailWrapper.oldDetail.amounts;
                var oldAmountsTmp = detailWrapper.oldDetail.amountsTmp;
                for (var _c = 0, dateRange_4 = dateRange; _c < dateRange_4.length; _c++) {
                    var date = dateRange_4[_c];
                    var value = amounts[date];
                    if (value != undefined) {
                        if (oldAmounts[date] == undefined) {
                            oldAmounts[date] = 0;
                            oldAmountsTmp[date] = 0;
                        }
                        oldAmounts[date] += value;
                        oldAmountsTmp[date] += value;
                    }
                }
            }
        }
        // calculate total
        for (var _d = 0, detailWrappers_2 = detailWrappers; _d < detailWrappers_2.length; _d++) {
            var detailWrapper = detailWrappers_2[_d];
            detailWrapper.detail.roundAmounts();
            detailWrapper.detail.calculateTotal3427();
            detailWrapper.oldDetail.roundAmounts();
            detailWrapper.oldDetail.calculateTotal3427();
        }
        return detailWrappers;
    };
    SF00501Helper.createTotalWrapper = function (details, dateRange, isNew) {
        // create wrapper
        var totalWrapper = new SF00501_DetailWrapper_model_1.DetailWrapperModel();
        totalWrapper.detail = new SF00501_Detail_model_1.DetailModel();
        if (isNew) {
            totalWrapper.type = SF00501_constants_1.SF00501Constants.TYPE_WRAPPER_TOTAL;
            totalWrapper.detail.name = SF00501_constants_1.SF00501Constants.TITLE_TOTAL;
        }
        else {
            totalWrapper.type = SF00501_constants_1.SF00501Constants.TYPE_WRAPPER_OLD_TOTAL;
            totalWrapper.detail.name = SF00501_constants_1.SF00501Constants.TITLE_REVENUEL;
        }
        // calculate data
        var totalAmounts = totalWrapper.detail.amounts;
        var totalAmountsTmp = totalWrapper.detail.amountsTmp;
        for (var _i = 0, details_4 = details; _i < details_4.length; _i++) {
            var detail = details_4[_i];
            // filter
            if (isNew && detail.amountType != SF00501_constants_1.SF00501Constants.TYPE_AMOUNT_NEW) {
                continue;
            }
            else if (!isNew && detail.amountType != SF00501_constants_1.SF00501Constants.TYPE_AMOUNT_OLD) {
                continue;
            }
            var amounts = detail.amounts;
            for (var _a = 0, dateRange_5 = dateRange; _a < dateRange_5.length; _a++) {
                var date = dateRange_5[_a];
                var value = amounts[date];
                if (value != undefined) {
                    if (totalAmounts[date] == undefined) {
                        totalAmounts[date] = 0;
                        totalAmountsTmp[date] = 0;
                    }
                    totalAmounts[date] += Number(value);
                    totalAmountsTmp[date] += Number(value);
                }
            }
        }
        //
        for (var _b = 0, dateRange_6 = dateRange; _b < dateRange_6.length; _b++) {
            var date = dateRange_6[_b];
            totalAmounts[date] = this.convertYenToThousanYen(totalAmounts[date]);
        }
        totalWrapper.detail.calculateTotal3427();
        return totalWrapper;
    };
    SF00501Helper.createDetailRate = function (detail1, detail2, name) {
        // create wrapper data for rate
        var detailRate = new SF00501_DetailWrapper_model_1.DetailWrapperModel();
        // set basic data
        detailRate.type = SF00501_constants_1.SF00501Constants.TYPE_WRAPPER_RATE;
        detailRate.detail = new SF00501_Detail_model_1.DetailModel();
        detailRate.detail.name = name;
        // calculate rate data
        var amounts = detailRate.detail.amounts;
        var amounts1 = detail1.amountsTmp;
        var amounts2 = detail2.amountsTmp;
        for (var date in amounts1) {
            var value1 = amounts1[date];
            var value2 = amounts2[date];
            var rate = void 0;
            if (value1 != 0 && value2 != 0) {
                if (name == SF00501_constants_1.SF00501Constants.TITLE_GOAL_RATE) {
                    rate = 100 * this.convertYenToThousanYen(value1) / value2;
                }
                else {
                    rate = 100 * value1 / value2;
                }
            }
            amounts[date] = rate;
        }
        // calculate total rate
        if (detail1.totalAmount != 0 && detail2.totalAmount != 0) {
            detailRate.detail.totalAmount = 100 * detail1.totalAmount / detail2.totalAmount;
        }
        return detailRate;
    };
    //
    SF00501Helper.createGoalWrapper = function (details, dateRange) {
        // create wrapper
        var goalWrapper = new SF00501_DetailWrapper_model_1.DetailWrapperModel();
        goalWrapper.detail = new SF00501_Detail_model_1.DetailModel();
        goalWrapper.type = SF00501_constants_1.SF00501Constants.TYPE_WRAPPER_GOAL;
        goalWrapper.detail.name = SF00501_constants_1.SF00501Constants.TITLE_GOAL;
        // calculate data
        var goalAmounts = goalWrapper.detail.amounts;
        var goalAmountsTmp = goalWrapper.detail.amountsTmp;
        for (var _i = 0, details_5 = details; _i < details_5.length; _i++) {
            var detail = details_5[_i];
            // filter
            if (detail.amountType != SF00501_constants_1.SF00501Constants.TYPE_AMOUNT_GOAL) {
                continue;
            }
            var amounts = detail.amounts;
            for (var _a = 0, dateRange_7 = dateRange; _a < dateRange_7.length; _a++) {
                var date = dateRange_7[_a];
                var value = amounts[date];
                if (value != undefined) {
                    if (goalAmounts[date] == undefined) {
                        goalAmounts[date] = 0;
                        goalAmountsTmp[date] = 0;
                    }
                    goalAmounts[date] += value;
                    goalAmountsTmp[date] += value;
                }
            }
        }
        goalWrapper.detail.calculateTotal();
        return goalWrapper;
    };
    SF00501Helper.analyzeGraph = function (pageData) {
        var graphData = new SF00501_GraphData_model_1.GraphDataModel();
        var displayWrappers = pageData.displayDetails;
        var orderDetail;
        var goalDetail;
        for (var _i = 0, displayWrappers_1 = displayWrappers; _i < displayWrappers_1.length; _i++) {
            var displayWrapper = displayWrappers_1[_i];
            if (displayWrapper.type == SF00501_constants_1.SF00501Constants.TYPE_WRAPPER_TOTAL) {
                orderDetail = displayWrapper.detail;
            }
            else if (displayWrapper.type == SF00501_constants_1.SF00501Constants.TYPE_WRAPPER_GOAL) {
                goalDetail = displayWrapper.detail;
            }
        }
        // set order data
        if (orderDetail != undefined) {
            graphData.orderData = orderDetail.amounts;
        }
        // set goal data
        if (goalDetail != undefined && pageData.currentFilter.dateUnit != SF00501_constants_1.SF00501Constants.OPTION_DATE_UNIT_MONTH) {
            graphData.goalData = goalDetail.amounts;
        }
        // set plan date
        if (pageData.currentFilter.sumaryType == SF00501_constants_1.SF00501Constants.OPTION_SUMMARY_INPROCESS) {
            var cY = pageData.currentTime.getFullYear();
            var cM = pageData.currentTime.getMonth() + 1;
            if (cM < 4) {
                cY--;
            }
            var fY = pageData.currentFilter.date.startYear;
            var fM = pageData.currentFilter.date.startMonth;
            if (fM < 4) {
                fY--;
            }
            if (pageData.currentFilter.dateUnit == SF00501_constants_1.SF00501Constants.OPTION_DATE_UNIT_MONTH) {
                if ((cY < fY) || (cY == fY && cM <= fM)) {
                    graphData.planDate = 0;
                }
            }
            else {
                if (cY < fY) {
                    graphData.planDate = 0;
                }
                else if (cY == fY) {
                    for (var i = 0; i < pageData.dateList.length; i++) {
                        if (pageData.dateList[i] == cM) {
                            graphData.planDate = i;
                            break;
                        }
                    }
                }
            }
        }
        // set goal, order for month
        if (pageData.currentFilter.dateUnit == SF00501_constants_1.SF00501Constants.OPTION_DATE_UNIT_MONTH) {
            // calculate order amount
            if (orderDetail != undefined) {
                var monthOrder = 0;
                var orderAmount = orderDetail.amounts;
                for (var date in orderAmount) {
                    var amount = orderAmount[date];
                    monthOrder += amount;
                }
                graphData.orderValue = monthOrder;
            }
            // calculate goal amount
            var monthGoalDetail = void 0;
            for (var _a = 0, _b = pageData.details; _a < _b.length; _a++) {
                var detail = _b[_a];
                if (detail.amountType == SF00501_constants_1.SF00501Constants.TYPE_AMOUNT_GOAL) {
                    monthGoalDetail = detail;
                    break;
                }
            }
            if (monthGoalDetail != undefined) {
                var monthGoal = 0;
                var goalAmount = monthGoalDetail.amounts;
                for (var date in goalAmount) {
                    var amount = goalAmount[date];
                    monthGoal += amount;
                }
                graphData.goalValue = monthGoal;
            }
        }
        return graphData;
    };
    SF00501Helper.convertYenToThousanYen = function (value) {
        return math_util_1.default.round(value / 1000, 0);
    };
    return SF00501Helper;
}());
exports.SF00501Helper = SF00501Helper;
//# sourceMappingURL=SF00501.helper.js.map