"use strict";
var SF00308_CheckSheet_model_1 = require("./model/SF00308_CheckSheet.model");
var DealModel_1 = require("../COMMON/dealinfo/model/DealModel");
var mst_data_type_1 = require("../../../helper/mst-data-type");
var SF00308Data = (function () {
    function SF00308Data() {
        this.answersMap = [];
        this.TAB_1 = 1;
        this.TAB_2 = 2;
        this.TAB_3 = 3;
        this.TAB_4 = 4;
    }
    Object.defineProperty(SF00308Data.prototype, "isView", {
        get: function () {
            // check dealTemplate or deal status order
            return this.dealStatus >= mst_data_type_1.DEAL_STATUS_VALUES.ORDER_CONFIRMED
                || this.templateFlag == mst_data_type_1.TEMPLATE_DEAL.TRUE
                || !!this.closedFlag;
        },
        enumerable: true,
        configurable: true
    });
    SF00308Data.prototype.answerMap = function (key) {
        // get answer by questionCode = key
        var answer = this.answersMap[key];
        // check answer undefined => new CheckSheet() with questionCode = key
        if (answer == undefined) {
            answer = new SF00308_CheckSheet_model_1.SF00308CheckSheet();
            answer.questionCode = key;
            answer.dealId = this.dealId;
            this.answersMap[key] = answer;
        }
        return answer;
    };
    SF00308Data.prototype.setSF00308Data = function (data) {
        this.dealId = data["dealId"];
        this.dealCode = data["dealCode"];
        this.dealName = data["dealName"];
        this.customerId = data["customerId"];
        this.customerName = data["customerName"];
        this.saleName = data["saleName"];
        this.dealType = data["dealType"];
        this.dealStatus = data["dealStatus"];
        this.templateFlag = data["templateFlag"];
        this.closedFlag = data["closedFlag"];
        this.deliveryDate = data["deliveryDate"] != undefined ? new Date(data["deliveryDate"]) : undefined;
        this.estMoney = data["estMoney"];
        this.dealInfo = new DealModel_1.DealInfoModel();
        this.dealInfo.dealId = this.dealId;
        this.dealInfo.dealCode = this.dealCode;
        this.dealInfo.dealName = this.dealName;
        this.dealInfo.customerName = this.customerName;
        this.dealInfo.customerCode = this.customerId;
        this.dealInfo.saleName = this.saleName;
        this.dealInfo.dealType = this.dealType;
        this.dealInfo.dealStatus = this.dealStatus;
        this.dealInfo.templateFlag = this.templateFlag;
        this.dealInfo.closedFlag = this.closedFlag;
        this.dealInfo.deliveryDate = this.deliveryDate;
        this.dealInfo.estimateTotal = this.estMoney;
        if (data["answers"] !== undefined) {
            for (var i = 0; i < data["answers"].length; i++) {
                var answer = data["answers"][i];
                this.answersMap[answer.questionCode] = answer;
            }
        }
        this.refreshDefault1009Date();
    };
    SF00308Data.prototype.refreshDefault1009Date = function () {
        var question1009 = this.answerMap(1009);
        if (!!question1009.textArea2) {
            this.defaultQuestion1009_Date = new Date(question1009.textArea2);
        }
        else {
            this.defaultQuestion1009_Date = null;
        }
    };
    Object.defineProperty(SF00308Data.prototype, "defaultFieldBorderCss", {
        get: function () {
            return { style: "solid 2px #5c90d2", radius: "3px" };
        },
        enumerable: true,
        configurable: true
    });
    return SF00308Data;
}());
exports.SF00308Data = SF00308Data;
//# sourceMappingURL=SF00308.data.js.map