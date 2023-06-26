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
var SF00302_service_1 = require("../../../SF00302.service");
var router_1 = require("@angular/router");
var message_1 = require("../../../../../../helper/message");
var Product_model_1 = require("../../../../../../model/core/Product.model");
var ProductCommonFee_model_1 = require("../../../../../../model/core/ProductCommonFee.model");
var MstWooden_model_1 = require("../../../../../../model/core/MstWooden.model");
var math_util_1 = require("../../../../../../util/math-util");
var validator_util_1 = require("../../../../../../util/validator-util");
/**
 * 試算表 (片段)
 *
 * <pre>
 * 各製品の試算表は
 * Component                    内容
 * --------------------------------------------------------------------------------
 * sf0030202                    試算表 (紙器・貼合)
 * sf0030216                    試算表 (美粧)
 * sf0030221                    試算表 (段ボールA式)
 * sf0030224                    試算表 (片段)
 * </pre>
 */
var SF0030224Component = (function () {
    function SF0030224Component(sv00302Service, route, router) {
        this.sv00302Service = sv00302Service;
        this.route = route;
        this.router = router;
        this.ix = 0;
    }
    SF0030224Component.prototype.ngAfterViewInit = function () {
        App.initHelpers(['table-tools']);
    };
    /**
     * Chane the current product output displaying in page
     * @param {number} id: The index of product output
     */
    SF0030224Component.prototype.pageProductOutput = function (id) {
        // Change product output with index id to the current output
        this.helper.getSF00302Data().indexOutput = id;
        this.helper.getSF00302Data().productOutput = this.helper.getSF00302Data().productOutputs[id];
        // change offer
        this.helper.getSF00302Data().indexOffer = this.helper.getSF00302Data().offers[id];
        // Change current tab effect
        $(".tabOutput").removeClass("active");
        $("#tab0" + id).parent().addClass("active");
        this.ix = id;
    };
    SF0030224Component.prototype.saveOutput = function () {
        var _this = this;
        this.helper.getSF00302Data().checkInputSave = true; //（変更チェックを外す。一旦暫定対応。）
        this.helper.getSF00302Data().checkOutputSave = true; //（変更チェックを外す。一旦暫定対応。）
        if (this.helper.getSF00302Data().checkInputSave && this.helper.getSF00302Data().checkOutputSave) {
            if (this.helper.getSF00302Data().checkInputSave) {
                if (this.helper.validateForm()) {
                    this.helper.getSF00302Data().xCheck = false;
                    this.helper.getSF00302Data().yCheck = false;
                }
                else {
                    this.helper.getSF00302Data().yCheck = true;
                    $.notify({ message: message_1.default.get(message_1.MSG.SF00301.ERR015) }, { type: 'danger' });
                    return;
                }
            }
            var product = new Product_model_1.Product();
            product.setProduct(this.helper.getSF00302Data().product);
            if (product.pasteId == 0) {
                product.pasteId = null;
            }
            if (product.stampingId == 0) {
                product.stampingId = null;
            }
            if (product.paperId == 0) {
                product.paperId = null;
            }
            if (product.surfaceTreatmentIdF == 0) {
                product.surfaceTreatmentIdF = null;
            }
            if (product.surfaceTreatmentIdB == 0) {
                product.surfaceTreatmentIdB = null;
            }
            if (product.packingId == 0) {
                product.packingId = null;
            }
            if (product.shippingCostId == 0) {
                product.shippingCostId = null;
            }
            // TODO: need to update with edited productOutputs instead of existing ones
            var productOutputs = [];
            Object.assign(productOutputs, this.helper.getSF00302Data().productOutputs);
            product.productOutputs = productOutputs;
            // push product offer
            for (var i = 0; i < 5; i++) {
                product.productOutputs[i].offers = [];
                this.helper.getSF00302Data().offers[i].productOutput = undefined;
                product.productOutputs[i].offers.push(this.helper.getSF00302Data().offers[i]);
            }
            var productCommonFee = new ProductCommonFee_model_1.ProductCommonFee();
            product.productCommon = Object.assign(productCommonFee, this.helper.getSF00302Data().productCommonFee);
            this.sv00302Service
                .sv0030203UpdateProduct(product, this.helper.getSF00302Data().dealCode)
                .then(function (data) {
                // rassign product outputs
                var productOutputs = [];
                Object.assign(productOutputs, data.product.productOutputs);
                _this.helper.getSF00302Data().productOutputs = productOutputs;
                var wooden = new MstWooden_model_1.MstWooden();
                Object.assign(wooden, data.product.wooden);
                _this.helper.getSF00302Data().product.wooden = wooden;
                // refresh indexing product output
                var currentTabIndex = $(".tabOutput.active").index();
                _this.helper.getSF00302Data().productOutput = productOutputs[currentTabIndex];
                _this.helper.getSF00302Data().bkProductLots = [];
                for (var i = 0; i < 5; i++) {
                    if (_this.helper.getSF00302Data().product.productOutputs[i] == undefined) {
                        _this.helper.getSF00302Data().bkProductLots.push(undefined);
                    }
                    else {
                        _this.helper.getSF00302Data().bkProductLots.push(_this.helper.getSF00302Data().product.productOutputs[i].lot);
                    }
                }
                _this.helper.getSF00302Data().bkProductOffers = [];
                // init backup data - offer
                for (var i = 0; i < 5; i++) {
                    if (_this.helper.getSF00302Data().offers[i] == undefined) {
                        _this.helper.getSF00302Data().bkProductOffers.push(undefined);
                    }
                    else {
                        _this.helper.getSF00302Data().bkProductOffers.push(_this.helper.getSF00302Data().offers[i].unitPrice);
                    }
                }
                var fee = new ProductCommonFee_model_1.ProductCommonFee();
                Object.assign(fee, data.product.productCommon);
                _this.helper.getSF00302Data().productCommonFee = fee;
                $.notify({
                    message: message_1.default.get(message_1.MSG.SF00302.INF006)
                }, {
                    type: 'info'
                });
                _this.helper.getSF00302Data().checkInputSave = false;
                _this.helper.getSF00302Data().checkOutputSave = false;
                _this.helper.getSF00302Data().checkCommonSave = false;
            });
        }
        else if (this.helper.getSF00302Data().checkOutputSave && !this.helper.getSF00302Data().checkInputSave) {
            // Save the current product output
            this.helper.getSF00302Data().indexOffer.productOutput = this.helper.getSF00302Data().productOutput;
            this.sv00302Service.sv0030211UpdateOffer(this.helper.getSF00302Data().indexOffer, this.helper.getSF00302Data().dealCode, this.helper.getSF00302Data().product.productCode).then(function (data) {
                $.notify({ message: message_1.default.get(message_1.MSG.SF00302.INF008) }, { type: 'success' });
                _this.helper.getSF00302Data().bkProductOffers[_this.ix] = _this.unitPrice;
                _this.helper.getSF00302Data().bkProductLots[_this.ix] = _this.helper.getSF00302Data().productOutput.lot;
                _this.helper.getSF00302Data().checkOutputSave = false;
                for (var i = 0; i < 5; i++) {
                    if ((math_util_1.default.checkNaN(_this.helper.getSF00302Data().productOutputs[i].lot) != math_util_1.default.checkNaN(_this.helper.getSF00302Data().bkProductLots[i])) || (math_util_1.default.checkNaN(_this.helper.getSF00302Data().offers[i].unitPrice) != math_util_1.default.checkNaN(_this.helper.getSF00302Data().bkProductOffers[i]))) {
                        _this.helper.getSF00302Data().checkOutputSave = true;
                    }
                }
            }).catch(function (err) {
                $.notify({ message: message_1.default.get(message_1.MSG.SF00302.ERR003) }, { type: 'danger' });
            });
        }
    };
    Object.defineProperty(SF0030224Component.prototype, "checkProductCreated", {
        /*Check product create*/
        get: function () {
            if (this.helper.getSF00302Data().product.id == null) {
                return false;
            }
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030224Component.prototype, "lot", {
        get: function () {
            this.helper.getSF00302Data().productOutput.lot = math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.lot);
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.lot);
        },
        set: function (value) {
            // change lot
            if (validator_util_1.default.isNotEmpty(value)) {
                this.helper.getSF00302Data().productOutput.lot = value;
            }
            if (this.helper.getSF00302Data().product.shapeId == this.helper.getSF00302Data().ONE_STAGE) {
                this.helper.calcThroughNumber();
                this.helper.calcPaperTotalCost();
                this.helper.calcLaminationSize();
                this.helper.calcLaminationUnitPrice();
                this.helper.calcLaminationTotalCost();
                this.helper.calcStampingPointsNumber();
                this.helper.calcStampingBasicCost();
                this.helper.calcStampingThroughWage();
                this.helper.calcStampingTotalCost();
                this.helper.calcWindowTotalCost();
                this.helper.calcDieCuttingWeight();
                this.helper.calcDieCuttingLoss();
                this.helper.calcDieCuttingBasicCost();
                this.helper.calcDieCuttingThroughWage();
                this.helper.calcDieCuttingTotalCost();
                this.helper.calcPasteLoss();
                this.helper.calcPasteThroughWage();
                this.helper.calcPasteBasicCost();
                this.helper.calccartonMaterialLoss();
                this.helper.calcPasteStepWage();
                this.helper.calcPasteThroughWage();
                this.helper.calclaminationSheetCost();
                this.helper.calcOtherFee();
                this.helper.calcInspection();
                this.helper.calcPacking();
                this.helper.calcShippingCost();
                this.helper.calcSubTotal();
                this.helper.calcManagementCost();
                this.helper.calcEstimateTotal();
                this.helper.calcEstimateUnitPrice();
                this.helper.calcSubmittedTotal();
                this.helper.calcEstimateDiff(1);
                this.helper.calcEstimateDiff(2);
            }
            //this.helper.validateForm();
            this.helper.getSF00302Data().checkOutputSave = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030224Component.prototype, "unitPrice", {
        get: function () {
            this.helper.getSF00302Data().indexOffer.unitPrice = math_util_1.default.checkNaN(this.helper.getSF00302Data().indexOffer.unitPrice);
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().indexOffer.unitPrice);
        },
        set: function (value) {
            this.helper.getSF00302Data().indexOffer.unitPrice = value;
            this.helper.calcSubmittedTotal();
            this.helper.calcEstimateDiff(1);
            this.helper.calcEstimateDiff(2);
            //this.helper.validateForm();
            this.helper.getSF00302Data().checkOutputSave = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030224Component.prototype, "total", {
        get: function () {
            if (this.helper.getSF00302Data().indexOffer.total > 999999999) {
                return 999999999;
            }
            //http://fridaynight.vnext.vn/issues/2337
            return math_util_1.default.round(math_util_1.default.checkNaN(this.helper.sf00302Data.indexOffer.total), 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030224Component.prototype, "profitRate", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().indexOffer.profitRate);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030224Component.prototype, "laminationTotalCost", {
        get: function () {
            if (this.helper.getSF00302Data().productOutput.laminationTotalCost == undefined) {
                this.helper.getSF00302Data().productOutput.laminationTotalCost = 0;
            }
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.laminationTotalCost);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030224Component.prototype, "paperTotalCost", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.paperTotalCost);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030224Component.prototype, "laminationSize", {
        get: function () {
            if (this.helper.getSF00302Data().productOutput.laminationSize == undefined) {
                this.helper.getSF00302Data().productOutput.laminationSize = 0;
            }
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.laminationSize);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030224Component.prototype, "laminationUnitPrice", {
        get: function () {
            if (this.helper.getSF00302Data().productOutput.laminationUnitPrice == undefined) {
                this.helper.getSF00302Data().productOutput.laminationUnitPrice = 0;
            }
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.laminationUnitPrice);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030224Component.prototype, "cartonMaterialLoss", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.cartonMaterialLoss);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030224Component.prototype, "pasteStepWage", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.pasteStepWage);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030224Component.prototype, "laminationSheetCost", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.laminationSheetCost);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030224Component.prototype, "stampingBasicCost", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.stampingBasicCost);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030224Component.prototype, "stampingThroughWage", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.stampingThroughWage);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030224Component.prototype, "stampingTotalCost", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.stampingTotalCost);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030224Component.prototype, "dieCuttingLoss", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.dieCuttingLoss);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030224Component.prototype, "dieCuttingBasicCost", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.dieCuttingBasicCost);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030224Component.prototype, "dieCuttingThroughWage", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.dieCuttingThroughWage);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030224Component.prototype, "dieCuttingTotalCost", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.dieCuttingTotalCost);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030224Component.prototype, "inspection", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.inspection);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030224Component.prototype, "packing", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.packing);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030224Component.prototype, "fareLineService", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.fareLineService);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030224Component.prototype, "cartonSpecialFare", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.cartonSpecialFare);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030224Component.prototype, "additionalTotalCarton", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.cartonSpecialFare);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030224Component.prototype, "otherFee1", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getProductOutputOtherFee1());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030224Component.prototype, "otherFee2", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getProductOutputOtherFee2());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030224Component.prototype, "otherFee3", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getProductOutputOtherFee3());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030224Component.prototype, "otherFeeExpense1", {
        get: function () {
            if (this.helper.getSF00302Data().product.otherExpense1 != undefined && this.helper.getSF00302Data().product.otherExpense1 != "") {
                return this.helper.getSF00302Data().product.otherExpense1;
            }
            else {
                return "（項目名１）";
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030224Component.prototype, "otherFeeExpense2", {
        get: function () {
            if (this.helper.getSF00302Data().product.otherExpense2 != undefined && this.helper.getSF00302Data().product.otherExpense2 != "") {
                return this.helper.getSF00302Data().product.otherExpense2;
            }
            else {
                return "（項目名２）";
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030224Component.prototype, "otherFeeExpense3", {
        get: function () {
            if (this.helper.getSF00302Data().product.otherExpense3 != undefined && this.helper.getSF00302Data().product.otherExpense3 != "") {
                return this.helper.getSF00302Data().product.otherExpense3;
            }
            else {
                return "（項目名３）";
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030224Component.prototype, "managementCost", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.managementCost);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030224Component.prototype, "estimatedTotal", {
        get: function () {
            //http://fridaynight.vnext.vn/issues/2337
            return math_util_1.default.round(math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.estimatedTotal), 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030224Component.prototype, "estimatedUnitPrice", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.estimatedUnitPrice);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030224Component.prototype, "isView", {
        get: function () {
            return this.helper.getSF00302Data().isView;
        },
        enumerable: true,
        configurable: true
    });
    SF0030224Component.prototype.resetOffer = function () {
        // reset lot
        this.lot = this.helper.getSF00302Data().bkProductLots[this.ix];
        // set product common fee
        this.unitPrice = this.helper.getSF00302Data().bkProductOffers[this.ix];
        this.helper.getSF00302Data().checkOutputSave = true;
    };
    Object.defineProperty(SF0030224Component.prototype, "checkBorderLot", {
        get: function () {
            if (validator_util_1.default.isNotEmpty(this.helper.sf00302Data.product.id)) {
                if (this.helper.getSF00302Data().productRequiredItem.isSaveLot) {
                    return this.helper.getSF00302Data().errFieldBorderCss;
                }
                else {
                    return this.helper.getSF00302Data().noneFieldBorderCss;
                }
            }
            else {
                if (this.helper.getSF00302Data().productRequiredItem.isSaveLot) {
                    return this.helper.getSF00302Data().errFieldBorderCss;
                }
                else {
                    return this.helper.getSF00302Data().defaultFieldBorderCss;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030224Component.prototype, "checkBorderUnitPrice", {
        get: function () {
            if (validator_util_1.default.isNotEmpty(this.helper.sf00302Data.product.id)) {
                if (this.helper.getSF00302Data().productRequiredItem.isSaveSubmittedUnitPrice) {
                    return this.helper.getSF00302Data().errFieldBorderCss;
                }
                else {
                    return this.helper.getSF00302Data().noneFieldBorderCss;
                }
            }
            else {
                if (this.helper.getSF00302Data().productRequiredItem.isSaveSubmittedUnitPrice) {
                    return this.helper.getSF00302Data().errFieldBorderCss;
                }
                else {
                    return this.helper.getSF00302Data().defaultFieldBorderCss;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030224Component.prototype, "inspectionPackingFareLineTotalCost", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getInspectionPackingFareLineTotalCost());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030224Component.prototype, "otherFeeTotalCost", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getOtherFeeTotalCost());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030224Component.prototype, "dieCuttingPasteTotalCost", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getDieCuttingPasteTotalCost());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030224Component.prototype, "pasteLoss", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.sf00302Data.productOutput.pasteLoss);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030224Component.prototype, "pasteBasicCost", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.sf00302Data.productOutput.pasteBasicCost);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030224Component.prototype, "pasteThroughWage", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.sf00302Data.productOutput.pasteThroughWage);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030224Component.prototype, "pasteTotalCost", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.sf00302Data.productOutput.pasteTotalCost);
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SF0030224Component.prototype, "helper", void 0);
    SF0030224Component = __decorate([
        core_1.Component({
            selector: "sf0030224",
            templateUrl: "SF0030224.component.html"
        }), 
        __metadata('design:paramtypes', [SF00302_service_1.SF00302Service, router_1.ActivatedRoute, router_1.Router])
    ], SF0030224Component);
    return SF0030224Component;
}());
exports.SF0030224Component = SF0030224Component;
//# sourceMappingURL=SF0030224.component.js.map