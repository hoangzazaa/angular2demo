import {DetailModel} from "./model/SF00501_Detail.model";
import {SummaryModel} from "./model/SF00501_Summary.model";
import {SF00501Constants} from "./SF00501.constants";
import {DetailWrapperModel} from "./model/SF00501_DetailWrapper.model";
import {SF00501DataRepo} from "./SF00501.datarepo";
import {GraphDataModel} from "./model/SF00501_GraphData.model";
import {AgentModel} from "./model/SF00501_Agent.model";
import {SF00501Data} from "./SF00501.data";
import MathUtil from "../../../util/math-util";
/**
 * Helper class for SF00502
 * @author haipt
 */
export class SF00501Helper {

    // sf0050102
    static calculateSummaryData(pageData: SF00501Data): SummaryModel {
        // calculate summary data
        let summary = new SummaryModel();

        // support check for in-progress
        let isIP = (pageData.currentFilter.sumaryType == SF00501Constants.OPTION_SUMMARY_INPROCESS);
        let isMonthView = (pageData.currentFilter.dateUnit == SF00501Constants.OPTION_DATE_UNIT_MONTH);
        // convert month to semi financial month (+1 js +3 business)
        let month = pageData.currentTime.getMonth() + 4;
        let day = pageData.currentTime.getDate();

        // sum details
        let details = pageData.details;
        for (let detail of details) {
            if (detail.amountType == SF00501Constants.TYPE_AMOUNT_OLD) {
                // calculate total
                let oldTotalAmount = 0;
                for (var date in detail.amounts) {
                    oldTotalAmount += (+detail.amounts[date] | 0);
                }
                // old revenue
                if (detail.productType == SF00501Constants.TYPE_PRODUCT_1) {
                    // product type 1
                    summary.oldAmount1 += oldTotalAmount;
                } else if (detail.productType == SF00501Constants.TYPE_PRODUCT_2) {
                    // product type 2
                    summary.oldAmount2 += oldTotalAmount;
                } else if (detail.productType == SF00501Constants.TYPE_PRODUCT_3) {
                    // product type 3
                    summary.oldAmount3 += oldTotalAmount;
                }
            } else if (detail.amountType == SF00501Constants.TYPE_AMOUNT_NEW) {
                let newTotalAmount = 0;
                for (var date in detail.amounts) {
                    // ignore new data if in progress mode
                    if (isIP) {
                        if (isMonthView) {
                            // compare with day
                            if (day <= +date) {
                                continue;
                            }
                        } else {
                            // convert month to semi financial month (+1 js +3 business)
                            let tmpMonth = +date + 4;
                            // compare with month
                            if (month <= tmpMonth) {
                                continue;
                            }
                        }
                    }
                    newTotalAmount += (+detail.amounts[date] | 0);
                }

                // new order
                if (detail.productType == SF00501Constants.TYPE_PRODUCT_1) {
                    // product type 1
                    summary.newAmount1 += newTotalAmount;
                } else if (detail.productType == SF00501Constants.TYPE_PRODUCT_2) {
                    // product type 2
                    summary.newAmount2 += newTotalAmount;
                } else if (detail.productType == SF00501Constants.TYPE_PRODUCT_3) {
                    // product type 3
                    summary.newAmount3 += newTotalAmount;
                }
            }
        }

        // calculate total and rate
        summary.calculateSummary();

        return summary;
    }

    // sf0050104
    static analyzeDataByAgent(pageData: SF00501Data): DetailWrapperModel[] {
        // create wrapper data
        let displayDatas: DetailWrapperModel[] = [];

        // create detail products
        let deptWrappers = SF00501Helper.createDetailAgent(pageData.details, pageData.dateList, pageData.dataAgents, pageData.dataRepo);
        displayDatas = displayDatas.concat(deptWrappers);

        // create wrapper for total
        let totalWrapper = SF00501Helper.createTotalWrapper(pageData.details, pageData.dateList, true);
        displayDatas.push(totalWrapper);

        if (pageData.currentFilter.dateUnit != SF00501Constants.OPTION_DATE_UNIT_MONTH) {
            // create wrapper for revenue
            let totalOldWrapper = SF00501Helper.createTotalWrapper(pageData.details, pageData.dateList, false);
            displayDatas.push(totalOldWrapper);
            // create rate new/old rate
            let revenueRateWrapper = SF00501Helper.createDetailRate(totalWrapper.detail, totalOldWrapper.detail, SF00501Constants.TITLE_REVENUE_RATE);
            displayDatas.push(revenueRateWrapper);

            // create goal wrapper
            let goalWrapper = SF00501Helper.createGoalWrapper(pageData.details, pageData.dateList);
            displayDatas.push(goalWrapper);
            // create goal rate wrapper
            let goalRateWrapper = SF00501Helper.createDetailRate(totalWrapper.detail, goalWrapper.detail, SF00501Constants.TITLE_GOAL_RATE);
            displayDatas.push(goalRateWrapper);
        }

        return displayDatas;
    }

    static analyzeDataByProduct(pageData: SF00501Data): DetailWrapperModel[] {
        // create wrapper data
        let displayDatas: DetailWrapperModel[] = [];

        // create detail products
        let productWrappers = SF00501Helper.createDetailProduct(pageData.details, pageData.dateList);

        displayDatas = displayDatas.concat(productWrappers);

        // create wrapper for total
        let totalWrapper = SF00501Helper.createTotalWrapper(pageData.details, pageData.dateList, true);
        displayDatas.push(totalWrapper);

        if (pageData.currentFilter.dateUnit != SF00501Constants.OPTION_DATE_UNIT_MONTH) {
            // create wrapper for revenue
            let totalOldWrapper = SF00501Helper.createTotalWrapper(pageData.details, pageData.dateList, false);
            displayDatas.push(totalOldWrapper);
            // create rate new/old rate
            let revenueRateWrapper = SF00501Helper.createDetailRate(totalWrapper.detail, totalOldWrapper.detail, SF00501Constants.TITLE_REVENUE_RATE);
            displayDatas.push(revenueRateWrapper);

            // create goal wrapper
            let goalWrapper = SF00501Helper.createGoalWrapper(pageData.details, pageData.dateList);
            displayDatas.push(goalWrapper);
            // create goal rate wrapper
            let goalRateWrapper = SF00501Helper.createDetailRate(totalWrapper.detail, goalWrapper.detail, SF00501Constants.TITLE_GOAL_RATE);
            displayDatas.push(goalRateWrapper);
        }

        return displayDatas;
    }

    static createDetailProduct(details: DetailModel[], dateRange: number[]): DetailWrapperModel[] {
        // create wrapper datas
        let detailWrappers = [];
        for (let productType of [SF00501Constants.TYPE_PRODUCT_1, SF00501Constants.TYPE_PRODUCT_2, SF00501Constants.TYPE_PRODUCT_3]) {
            // set basic data
            let detailWrapper: DetailWrapperModel = new DetailWrapperModel();
            detailWrappers.push(detailWrapper);

            detailWrapper.type = SF00501Constants.TYPE_WRAPPER_NORMAL;
            detailWrapper.detail = new DetailModel();
            detailWrapper.oldDetail = new DetailModel();

            if (productType == SF00501Constants.TYPE_PRODUCT_1) {
                detailWrapper.detail.name = SF00501Constants.TITLE_PRODUCT_1;
            } else if (productType == SF00501Constants.TYPE_PRODUCT_2) {
                detailWrapper.detail.name = SF00501Constants.TITLE_PRODUCT_2;
            } else if (productType == SF00501Constants.TYPE_PRODUCT_3) {
                detailWrapper.detail.name = SF00501Constants.TITLE_PRODUCT_3;
            }
        }

        // calculate data
        for (let detail of details) {
            if (detail.amountType == SF00501Constants.TYPE_AMOUNT_NEW) {
                let detailWrapper: DetailWrapperModel;
                if (detail.productType == SF00501Constants.TYPE_PRODUCT_1) {
                    detailWrapper = detailWrappers[0];
                } else if (detail.productType == SF00501Constants.TYPE_PRODUCT_2) {
                    detailWrapper = detailWrappers[1];
                } else if (detail.productType == SF00501Constants.TYPE_PRODUCT_3) {
                    detailWrapper = detailWrappers[2];
                }
                if (detailWrapper == undefined) {
                    continue;
                }

                // calculate to new amount
                let amounts = detail.amounts;
                let newAmounts = detailWrapper.detail.amounts;
                //TODO 3435
                let newAmountsTmp = detailWrapper.detail.amountsTmp;
                for (let date of dateRange) {
                    let value = amounts[date];
                    if (value != undefined) {
                        if (newAmounts[date] == undefined) {
                            newAmounts[date] = 0;
                            newAmountsTmp[date] = 0;
                        }
                        newAmounts[date] += this.convertYenToThousanYen(value);
                        newAmountsTmp[date] += Number(value);
                    }
                }
            } else if (detail.amountType == SF00501Constants.TYPE_AMOUNT_OLD) {
                let detailWrapper: DetailWrapperModel;
                if (detail.productType == SF00501Constants.TYPE_PRODUCT_1) {
                    detailWrapper = detailWrappers[0];
                } else if (detail.productType == SF00501Constants.TYPE_PRODUCT_2) {
                    detailWrapper = detailWrappers[1];
                } else if (detail.productType == SF00501Constants.TYPE_PRODUCT_3) {
                    detailWrapper = detailWrappers[2];
                }
                if (detailWrapper == undefined) {
                    continue;
                }

                // calculate to old amount
                let amounts = detail.amounts;
                let oldAmounts = detailWrapper.oldDetail.amounts;
                //TODO 3435
                let oldAmountsTmp = detailWrapper.oldDetail.amountsTmp;
                for (let date of dateRange) {
                    let value = amounts[date];
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
        for (let detailWrapper of detailWrappers) {
            detailWrapper.detail.calculateTotal3427();
            detailWrapper.oldDetail.calculateTotal3427();
        }

        return detailWrappers;
    }

    static createDetailAgent(details: DetailModel[], dateRange: number[], agents: AgentModel[], repo: SF00501DataRepo): DetailWrapperModel[] {
        // create wrapper datas
        let detailWrappers = [];
        let detailWrapperMap: {[id: number]: DetailWrapperModel} = {};
        // create list wrapper agent

        // create agent list
        for (let agent of agents) {
            // create wrapper
            let detailWrapper = new DetailWrapperModel();
            detailWrapper.type = SF00501Constants.TYPE_WRAPPER_NORMAL;
            detailWrapper.detail = new DetailModel();
            detailWrapper.oldDetail = new DetailModel();
            detailWrapper.detail.id = agent.id;
            detailWrapper.detail.name = agent.name;

            // add to list and map
            detailWrappers.push(detailWrapper);
            detailWrapperMap[agent.id] = detailWrapper;
        }

        // calculate data
        for (let detail of details) {
            let detailWrapper = detailWrapperMap[detail.id];
            if (detailWrapper == undefined) {
                continue;
            }
            if (detail.amountType == SF00501Constants.TYPE_AMOUNT_NEW) {
                // calculate to new amount
                let amounts = detail.amounts;
                let newAmounts = detailWrapper.detail.amounts;
                let newAmountsTmp = detailWrapper.detail.amountsTmp;
                for (let date of dateRange) {
                    let value = amounts[date];
                    if (value != undefined) {
                        if (newAmounts[date] == undefined) {
                            newAmounts[date] = 0;
                            newAmountsTmp[date] = 0;
                        }
                        newAmounts[date] += value;
                        newAmountsTmp[date] += value;
                    }
                }
            } else if (detail.amountType == SF00501Constants.TYPE_AMOUNT_OLD) {
                // calculate to old amount
                let amounts = detail.amounts;
                let oldAmounts = detailWrapper.oldDetail.amounts;
                let oldAmountsTmp = detailWrapper.oldDetail.amountsTmp;
                for (let date of dateRange) {
                    let value = amounts[date];
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
        for (let detailWrapper of detailWrappers) {
            detailWrapper.detail.roundAmounts();
            detailWrapper.detail.calculateTotal3427();
            detailWrapper.oldDetail.roundAmounts();
            detailWrapper.oldDetail.calculateTotal3427();
        }

        return detailWrappers;
    }

    static createTotalWrapper(details: DetailModel[], dateRange: number[], isNew: boolean): DetailWrapperModel {
        // create wrapper
        let totalWrapper = new DetailWrapperModel();
        totalWrapper.detail = new DetailModel();
        if (isNew) {
            totalWrapper.type = SF00501Constants.TYPE_WRAPPER_TOTAL;
            totalWrapper.detail.name = SF00501Constants.TITLE_TOTAL;
        } else {
            totalWrapper.type = SF00501Constants.TYPE_WRAPPER_OLD_TOTAL;
            totalWrapper.detail.name = SF00501Constants.TITLE_REVENUEL;
        }

        // calculate data
        let totalAmounts = totalWrapper.detail.amounts;
        let totalAmountsTmp = totalWrapper.detail.amountsTmp;
        for (let detail of details) {
            // filter
            if (isNew && detail.amountType != SF00501Constants.TYPE_AMOUNT_NEW) {
                continue;
            } else if (!isNew && detail.amountType != SF00501Constants.TYPE_AMOUNT_OLD) {
                continue;
            }

            let amounts = detail.amounts;
            for (let date of dateRange) {
                let value = amounts[date];
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
        for (let date of dateRange) {
            totalAmounts[date] = this.convertYenToThousanYen(totalAmounts[date]);
        }

        totalWrapper.detail.calculateTotal3427();

        return totalWrapper;
    }

    static createDetailRate(detail1: DetailModel, detail2: DetailModel, name: string): DetailWrapperModel {
        // create wrapper data for rate
        let detailRate: DetailWrapperModel = new DetailWrapperModel();
        // set basic data
        detailRate.type = SF00501Constants.TYPE_WRAPPER_RATE;
        detailRate.detail = new DetailModel();
        detailRate.detail.name = name;

        // calculate rate data
        let amounts = detailRate.detail.amounts;
        let amounts1 = detail1.amountsTmp;
        let amounts2 = detail2.amountsTmp;
        for (let date in amounts1) {
            let value1 = amounts1[date];
            let value2 = amounts2[date];

            let rate;
            if (value1 != 0 && value2 != 0) {
                if(name == SF00501Constants.TITLE_GOAL_RATE){
                    rate = 100 * this.convertYenToThousanYen(value1) / value2;
                }else{
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
    }

    //
    static createGoalWrapper(details: DetailModel[], dateRange: number[]): DetailWrapperModel {
        // create wrapper
        let goalWrapper = new DetailWrapperModel();
        goalWrapper.detail = new DetailModel();
        goalWrapper.type = SF00501Constants.TYPE_WRAPPER_GOAL;
        goalWrapper.detail.name = SF00501Constants.TITLE_GOAL;

        // calculate data
        let goalAmounts = goalWrapper.detail.amounts;
        let goalAmountsTmp = goalWrapper.detail.amountsTmp;
        for (let detail of details) {
            // filter
            if (detail.amountType != SF00501Constants.TYPE_AMOUNT_GOAL) {
                continue;
            }

            let amounts = detail.amounts;
            for (let date of dateRange) {
                let value = amounts[date];
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
    }

    static analyzeGraph(pageData: SF00501Data): GraphDataModel {
        let graphData = new GraphDataModel();

        let displayWrappers = pageData.displayDetails;
        let orderDetail: DetailModel;
        let goalDetail: DetailModel;
        for (let displayWrapper of displayWrappers) {
            if (displayWrapper.type == SF00501Constants.TYPE_WRAPPER_TOTAL) {
                orderDetail = displayWrapper.detail;
            } else if (displayWrapper.type == SF00501Constants.TYPE_WRAPPER_GOAL) {
                goalDetail = displayWrapper.detail;
            }
        }
        // set order data
        if (orderDetail != undefined) {
            graphData.orderData = orderDetail.amounts;
        }
        // set goal data
        if (goalDetail != undefined && pageData.currentFilter.dateUnit != SF00501Constants.OPTION_DATE_UNIT_MONTH) {
            graphData.goalData = goalDetail.amounts;
        }
        // set plan date
        if (pageData.currentFilter.sumaryType == SF00501Constants.OPTION_SUMMARY_INPROCESS) {
            let cY = pageData.currentTime.getFullYear();
            let cM = pageData.currentTime.getMonth() + 1;
            if (cM < 4) {
                cY--;
            }

            let fY = pageData.currentFilter.date.startYear;
            let fM = pageData.currentFilter.date.startMonth;
            if (fM < 4) {
                fY--;
            }
            if (pageData.currentFilter.dateUnit == SF00501Constants.OPTION_DATE_UNIT_MONTH) {
                if ((cY < fY) || (cY == fY && cM <= fM)) {
                    graphData.planDate = 0;
                }
            } else {
                if (cY < fY) {
                    graphData.planDate = 0;
                } else if (cY == fY) {
                    for (let i = 0; i < pageData.dateList.length; i++) {
                        if (pageData.dateList[i] == cM) {
                            graphData.planDate = i;
                            break;
                        }
                    }
                }
            }
        }

        // set goal, order for month
        if (pageData.currentFilter.dateUnit == SF00501Constants.OPTION_DATE_UNIT_MONTH) {
            // calculate order amount
            if (orderDetail != undefined) {
                let monthOrder = 0;
                let orderAmount = orderDetail.amounts;
                for (let date in orderAmount) {
                    let amount = orderAmount[date];
                    monthOrder += amount;
                }
                graphData.orderValue = monthOrder;
            }

            // calculate goal amount
            let monthGoalDetail: DetailModel;
            for (let detail of pageData.details) {
                if (detail.amountType == SF00501Constants.TYPE_AMOUNT_GOAL) {
                    monthGoalDetail = detail;
                    break;
                }
            }
            if (monthGoalDetail != undefined) {
                let monthGoal: number = 0;
                let goalAmount = monthGoalDetail.amounts;
                for (let date in goalAmount) {
                    let amount = goalAmount[date];
                    monthGoal += amount;
                }
                graphData.goalValue = monthGoal;
            }
        }

        return graphData;
    }

    static convertYenToThousanYen(value: number){
        return MathUtil.round(value/1000, 0);
    }
}