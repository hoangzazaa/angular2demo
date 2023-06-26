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
var Deal_model_1 = require("../../../model/core/Deal.model");
var Quotation_model_1 = require("../../../model/core/Quotation.model");
var core_1 = require("@angular/core");
var constants_1 = require("../../../helper/constants");
var User_model_1 = require("../../../model/core/User.model");
var Department_model_1 = require("../../../model/core/Department.model");
var format_util_1 = require("../../../util/format-util");
var enum_type_1 = require("../../../helper/enum-type");
var data_util_1 = require("../../../util/data-util");
var mst_data_type_1 = require("../../../helper/mst-data-type");
var SF00303Data = (function () {
    function SF00303Data() {
        this.DEFAULT_LOT = 5000;
        this.lotTotal = 0;
        this.placeholder = "一括納品";
        /*check viewMode table quotation item*/
        this._viewMode = true;
        /*check view page sf00303*/
        this._view = false;
        /*check inited*/
        this._inited = true;
        /*check setTmpIndex*/
        this._setTmpIndex = 0;
        /*totalExcludedTax*/
        this._totalExcludedTax = 0;
        /*consumptionTax*/
        this._consumptionTax = 0;
        /*totalCost*/
        this._totalCost = 0;
        /*deal model*/
        this._deal = new Deal_model_1.Deal();
        /*quotation model*/
        this._quotation = new Quotation_model_1.Quotation();
        /*list quotation item*/
        this._quotationItems = [];
        /*list deal product*/
        this._dealProducts = [];
        this._checkEdit = false;
        this._saleByCustomer = new User_model_1.User();
        this._departmentByCustomer = new Department_model_1.Department();
        this._nextNegativeId = -1;
    }
    SF00303Data.prototype.mstProductUnit = function () {
        return data_util_1.default.toSelectBoxDataSource(mst_data_type_1.PRODUCT_UNIT);
    };
    SF00303Data.prototype.nextNegativeId = function () {
        return this._nextNegativeId--;
    };
    Object.defineProperty(SF00303Data.prototype, "mstLaminations", {
        get: function () {
            return this._mstLaminations;
        },
        set: function (value) {
            this._mstLaminations = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00303Data.prototype, "departmentByCustomer", {
        get: function () {
            return this._departmentByCustomer;
        },
        set: function (value) {
            this._departmentByCustomer = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00303Data.prototype, "saleByCustomer", {
        get: function () {
            return this._saleByCustomer;
        },
        set: function (value) {
            this._saleByCustomer = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00303Data.prototype, "checkEdit", {
        get: function () {
            return this._checkEdit;
        },
        set: function (value) {
            this._checkEdit = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00303Data.prototype, "message", {
        get: function () {
            return this._message;
        },
        set: function (value) {
            this._message = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00303Data.prototype, "status", {
        get: function () {
            return this._status;
        },
        set: function (value) {
            this._status = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00303Data.prototype, "viewMode", {
        get: function () {
            return this._viewMode;
        },
        set: function (value) {
            this._viewMode = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00303Data.prototype, "view", {
        get: function () {
            return this._view;
        },
        set: function (value) {
            this._view = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00303Data.prototype, "inited", {
        get: function () {
            return this._inited;
        },
        set: function (value) {
            this._inited = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00303Data.prototype, "setTmpIndex", {
        get: function () {
            return this._setTmpIndex;
        },
        set: function (value) {
            this._setTmpIndex = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00303Data.prototype, "totalExcludedTax", {
        get: function () {
            return this._totalExcludedTax;
        },
        set: function (value) {
            this._totalExcludedTax = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00303Data.prototype, "consumptionTax", {
        get: function () {
            return this.totalExcludedTax * constants_1.Constants.PERCENT;
        },
        set: function (value) {
            this._consumptionTax = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00303Data.prototype, "totalCost", {
        get: function () {
            this._totalCost = this.totalExcludedTax + this.consumptionTax;
            if (this._totalCost > 99999999) {
                this._totalCost = 99999999;
            }
            this.quotation.totalCost = format_util_1.FormatUtil.isNaN(this._totalCost);
            return this._totalCost;
        },
        set: function (value) {
            this._totalCost = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00303Data.prototype, "deal", {
        get: function () {
            return this._deal;
        },
        set: function (value) {
            this._deal = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00303Data.prototype, "quotation", {
        get: function () {
            return this._quotation;
        },
        set: function (value) {
            this._quotation = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00303Data.prototype, "quotationItems", {
        get: function () {
            return this._quotationItems;
        },
        set: function (value) {
            this._quotationItems = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00303Data.prototype, "dealProducts", {
        get: function () {
            return this._dealProducts;
        },
        set: function (value) {
            this._dealProducts = value;
        },
        enumerable: true,
        configurable: true
    });
    SF00303Data.prototype.checkLotValue = function () {
        // check lot
        var lot = 0;
        // get lot
        if (this.quotationItems) {
            this.quotationItems.forEach(function (item) {
                // check no index
                if (item.no)
                    lot += format_util_1.FormatUtil.isNaN(item.quantity);
            });
        }
        // set lot total
        this.lotTotal = lot;
    };
    /*Update display no*/
    SF00303Data.prototype.updateDisplayNo = function () {
        // update displayNo
        var displayNo = 0;
        this.quotationItems.forEach(function (item) {
            if ((item.itemType == enum_type_1.QuotationItemType.SET)
                || ((item.itemType >= enum_type_1.QuotationItemType.PRODUCT) && (item.setClosedFlag == undefined))) {
                // if item is set or normal item
                displayNo++;
                item.no = displayNo;
            }
            else {
                item.no = undefined;
            }
        });
    };
    SF00303Data.prototype.calculatorQuantity = function () {
        var _this = this;
        if (this.quotationItems) {
            this.quotationItems.forEach(function (itemData) {
                if (itemData.dealProduct) {
                    var offers = itemData.dealProduct.offers;
                    // check product output
                    if (offers != undefined
                        && offers.length > 0
                        && itemData.quantity >= 0
                        && enum_type_1.QuotationItemType.PRODUCT == itemData.itemType) {
                        // sort quantity
                        var length_1 = offers.length;
                        offers.sort(function (n1, n2) {
                            if (n1.productOutput.lot > n2.productOutput.lot) {
                                return 1;
                            }
                            if (n1.productOutput.lot < n2.productOutput.lot) {
                                return -1;
                            }
                            return 0;
                        });
                        //2. check list lot primaryFlag != 1
                        var tmpOffer = undefined;
                        for (var i = 0; i < length_1; i++) {
                            if (itemData.quantity >= offers[i].productOutput.lot) {
                                tmpOffer = offers[i];
                                itemData.submittedPrice = offers[i].unitPrice;
                            }
                        }
                        if (tmpOffer == undefined) {
                            // 2.1 if quantity < lot min then submit price= 0
                            itemData.submittedPrice = 0;
                        }
                        else {
                            // 2.2 if quantity = [A,B) -> submit price = f(A)
                            itemData.submittedPrice = tmpOffer.unitPrice;
                        }
                        itemData.total = format_util_1.FormatUtil.isNaN(itemData.quantity) *
                            format_util_1.FormatUtil.isNaN(itemData.submittedPrice);
                        // emit change calculator and update data parent
                        _this.getChangeCalculator();
                    }
                }
            });
        }
    };
    /*Calculator*/
    SF00303Data.prototype.getChangeCalculator = function () {
        this.totalExcludedTax = 0;
        /*TODO interestRate*/
        // let interestRate = 0;
        for (var i = 0; i < this.quotationItems.length; i++) {
            if (this.quotationItems[i].parentId == null) {
                this.totalExcludedTax += format_util_1.FormatUtil.isNaN(this.quotationItems[i].total);
            }
        }
    };
    /*Update data parent*/
    SF00303Data.prototype.updateDataParent = function () {
        var _this = this;
        this.quotationItems.forEach(function (item) {
            if (item.itemType == enum_type_1.QuotationItemType.SET) {
                var total_1 = 0;
                var quantity_1 = 0;
                var submitted_1 = 0;
                _this.quotationItems.forEach(function (itemChid) {
                    if (itemChid.parentId == item.id) {
                        if (quantity_1 < itemChid.quantity) {
                            quantity_1 = itemChid.quantity;
                        }
                        // submitted
                        submitted_1 += format_util_1.FormatUtil.isNaN(itemChid.submittedPrice);
                        // total
                        total_1 += format_util_1.FormatUtil.isNaN(itemChid.total);
                    }
                });
                // update data item quotation
                item.quantity = quantity_1;
                item.submittedPrice = submitted_1;
                item.total = total_1;
            }
        });
    };
    SF00303Data = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], SF00303Data);
    return SF00303Data;
}());
exports.SF00303Data = SF00303Data;
//# sourceMappingURL=SF00303.data.js.map