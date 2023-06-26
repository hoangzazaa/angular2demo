"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var constants_1 = require("../../../../helper/constants");
var mst_data_type_1 = require('../../../../helper/mst-data-type');
var BaseModel_model_1 = require("../../../../model/core/BaseModel.model");
var SF00301_Deal = (function (_super) {
    __extends(SF00301_Deal, _super);
    function SF00301_Deal() {
        _super.apply(this, arguments);
        this.products = [];
        this.quotations = [];
        this.productFiles = [];
        this.comments = [];
        this.orderItems = [];
        /*state of customer during customer changing*/
        this.hasRegisteredCustomer = true;
        this.isSaveCustomer = false;
        this.isSaveDealName = false;
        this.isSaveEstimate = false;
        this.isSaveDeliveryDate = false;
        /** リピート案件フラグ true: リピート案件, false: 元案件 */
        this.isRepeatDeal = false;
    }
    Object.defineProperty(SF00301_Deal.prototype, "isTemplate", {
        get: function () {
            return this.templateFlag === mst_data_type_1.TEMPLATE_DEAL.TRUE;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00301_Deal.prototype, "isClosed", {
        get: function () {
            return !!this.closedFlag;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00301_Deal.prototype, "isRepeatedDeal", {
        get: function () {
            //http://fridaynight.vnext.vn/issues/2944
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00301_Deal.prototype, "isImmutableDeal", {
        get: function () {
            //return this.isTemplate || this.isConfirmedOrder;
            return this.isTemplate || this.isClosed || this.isRepeatedDeal || this.isConfirmedOrder;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00301_Deal.prototype, "isNewEditionDeal", {
        get: function () {
            return this.dealStatus === mst_data_type_1.DEAL_STATUS_VALUES.NEW_EDITION;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00301_Deal.prototype, "isRequestedDesign", {
        get: function () {
            return this.dealStatus >= mst_data_type_1.DEAL_STATUS_VALUES.DESIGN_REQUESTED;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00301_Deal.prototype, "canRequestDesign", {
        get: function () {
            return this.isSaved
                && !this.isTemplate
                && !!(this.products || []).find(function (p) { return p.requestDesignFlag !== constants_1.Constants.ONE && p.highlightFlag === constants_1.Constants.ONE; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00301_Deal.prototype, "isCompletedDesign", {
        get: function () {
            return this.dealStatus >= mst_data_type_1.DEAL_STATUS_VALUES.DESIGN_CONFIRMED;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00301_Deal.prototype, "isConfirmedOrder", {
        get: function () {
            return this.dealStatus >= mst_data_type_1.DEAL_STATUS_VALUES.ORDER_CONFIRMED;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00301_Deal.prototype, "isAcceptedShipping", {
        get: function () {
            return this.dealStatus >= mst_data_type_1.DEAL_STATUS_VALUES.SHIPMENT_CONFIRMED;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00301_Deal.prototype, "isShipped", {
        get: function () {
            return this.dealStatus >= mst_data_type_1.DEAL_STATUS_VALUES.SHIPPED;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00301_Deal.prototype, "canDelete", {
        get: function () {
            var DEAL_CLOSED = 1;
            return this.dealStatus == mst_data_type_1.DEAL_STATUS_VALUES.NEW_EDITION || this.closedFlag == DEAL_CLOSED;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00301_Deal.prototype, "isJobInprocess", {
        // deal call job inprogress
        get: function () {
            return this.jobInprocess == 1;
        },
        enumerable: true,
        configurable: true
    });
    SF00301_Deal.prototype.setDeal = function (data) {
        if (!data)
            return;
        //set basic info & binding value to properties
        this.setData(data);
        this.dealName = data["dealName"];
        this.dealCode = data["dealCode"];
        this.dealType = data["dealType"];
        this.estTotalDeal = data["estTotalDeal"];
        this.dealStatus = data["dealStatus"];
        this.deliveryDate = !!data["deliveryDate"] ? new Date(data["deliveryDate"]) : undefined;
        this.templateFlag = data["templateFlag"];
        this.closedFlag = data["closedFlag"];
        this.customerName = data["customerName"];
        this.isInMybox = data["isInMybox"];
        this.jobInprocess = data["jobInprocess"];
        this.isInLock = data["dealLockFlag"];
        this.isRepeatDeal = !!data["repeatFlag"];
        this.orderDate = !!data["orderDate"] ? new Date(data["orderDate"]) : undefined;
    };
    Object.defineProperty(SF00301_Deal.prototype, "dealStatusDisplayName", {
        /**
         * 案件ステータスの表示形式
         */
        get: function () {
            return this.isClosed ? "終了" : (mst_data_type_1.DEAL_STATUS[this.dealStatus] || '');
        },
        enumerable: true,
        configurable: true
    });
    return SF00301_Deal;
}(BaseModel_model_1.BaseModel));
exports.SF00301_Deal = SF00301_Deal;
//# sourceMappingURL=SF00301_Deal.model.js.map