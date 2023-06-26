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
var router_1 = require("@angular/router");
var util_1 = require("util");
var message_1 = require("../../../../../../helper/message");
var MstWooden_model_1 = require("../../../../../../model/core/MstWooden.model");
var Product_model_1 = require("../../../../../../model/core/Product.model");
var ProductCommonFee_model_1 = require("../../../../../../model/core/ProductCommonFee.model");
var format_util_1 = require("../../../../../../util/format-util");
var math_util_1 = require("../../../../../../util/math-util");
var validator_util_1 = require("../../../../../../util/validator-util");
var SF00302_service_1 = require("../../../SF00302.service");
var data_util_1 = require("../../../../../../util/data-util");
/**
 * 試算表 (美粧)
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
 *
 * @author DungTQ
 */
var SF0030216Component = (function () {
    function SF0030216Component(sv00302Service, route, router) {
        this.sv00302Service = sv00302Service;
        this.route = route;
        this.router = router;
        this.ix = 0;
    }
    SF0030216Component.prototype.ngAfterViewInit = function () {
        App.initHelpers(['table-tools']);
    };
    SF0030216Component.prototype.saveOutput = function () {
        var _this = this;
        // this.helper.checkChangeDataProduct();
        // this.helper.checkChangeDataProductOutput();
        this.helper.checkChangeDataOffer();
        this.helper.sf00302Data.checkInputSave = true; //（変更チェックを外す。一旦暫定対応。）
        this.helper.sf00302Data.checkOutputSave = true; //（変更チェックを外す。一旦暫定対応。）
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
            // Comment to fix bug 3057
            /*if (product.pasteId == 0) {
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
            }*/
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
                // reset old data to validate - follow 3057
                _this.helper.getSF00302Data().productOutputsOld = data_util_1.default.cloneObject(_this.helper.sf00302Data.productOutputs);
                _this.helper.getSF00302Data().productOld = data_util_1.default.cloneObject(_this.helper.sf00302Data.product);
                _this.helper.getSF00302Data().offersOld = data_util_1.default.cloneObject(_this.helper.sf00302Data.offers);
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
                // reset old data to validate - follow 3057
                _this.helper.getSF00302Data().productOutputsOld = data_util_1.default.cloneObject(_this.helper.sf00302Data.productOutputs);
                _this.helper.getSF00302Data().offersOld = data_util_1.default.cloneObject(_this.helper.sf00302Data.offers);
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
        else {
            $.notify({ message: message_1.default.get(message_1.MSG.SF00302.INF018) }, { type: 'info' });
        }
    };
    Object.defineProperty(SF0030216Component.prototype, "checkProductCreated", {
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
    /**
     * Chane the current product output displaying in page
     * @param {number} id: The index of product output
     */
    SF0030216Component.prototype.pageProductOutput = function (id) {
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
    Object.defineProperty(SF0030216Component.prototype, "lot", {
        get: function () {
            this.helper.getSF00302Data().productOutput.lot = math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.lot);
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.lot);
        },
        set: function (value) {
            // change lot
            if (validator_util_1.default.isNotEmpty(value)) {
                this.helper.getSF00302Data().productOutput.lot = value;
            }
            if (this.helper.getSF00302Data().product.shapeId == this.helper.getSF00302Data().DECORATIVE_ID) {
                this.helper.calcThroughNumber();
                this.helper.calcPaperUnitPrice();
                this.helper.calcLaminationSize();
                this.helper.calcLaminationUnitPrice();
                this.helper.calcLaminationTotalCost();
                this.helper.calcColorPlateCost(1);
                this.helper.calcColorPrintLoss(1);
                this.helper.calcColorCostPerPacket(1);
                this.helper.calcColorBasicCost(1);
                this.helper.calcColorThroughWage(1);
                this.helper.calcColorSpecial(1);
                this.helper.calcColorTotalCost(1);
                this.helper.calcColorPlateCost(2);
                this.helper.calcColorPrintLoss(2);
                this.helper.calcColorCostPerPacket(2);
                this.helper.calcColorBasicCost(2);
                this.helper.calcColorThroughWage(2);
                this.helper.calcColorSpecial(2);
                this.helper.calcColorTotalCost(2);
                this.helper.calcSurfaceBasicCost(1);
                this.helper.calcSurfaceThroughWage(1);
                this.helper.calcSurfaceTotalCost(1);
                this.helper.calcSurfaceBasicCost(2);
                this.helper.calcSurfaceThroughWage(2);
                this.helper.calcSurfaceTotalCost(2);
                this.helper.calcSurfaceBasicCost(3);
                this.helper.calcSurfaceThroughWage(3);
                this.helper.calcSurfaceTotalCost(3);
                this.helper.calcStampingPointsNumber();
                this.helper.calcStampingBasicCost();
                this.helper.calcStampingThroughWage();
                this.helper.calcStampingTotalCost();
                this.helper.calcWindowMaterialFee();
                this.helper.calcWindowTotalCost();
                this.helper.calcDieCuttingWeight();
                this.helper.calcDieCuttingLoss();
                this.helper.calcDieCuttingBasicCost();
                this.helper.calcDieCuttingThroughWage();
                this.helper.calcDieCuttingTotalCost();
                this.helper.calcPasteLoss();
                this.helper.calcPasteBasicCost();
                this.helper.calcPasteThroughWage();
                this.helper.calcPasteTotalCost();
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
                this.helper.calcAdditionFare();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030216Component.prototype, "unitPrice", {
        get: function () {
            this.helper.getSF00302Data().indexOffer.unitPrice = math_util_1.default.checkNaN(this.helper.getSF00302Data().indexOffer.unitPrice);
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().indexOffer.unitPrice);
        },
        set: function (value) {
            this.helper.getSF00302Data().indexOffer.unitPrice = value;
            this.helper.calcSubmittedTotal();
            this.helper.calcEstimateDiff(1);
            this.helper.calcEstimateDiff(2);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030216Component.prototype, "total", {
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
    Object.defineProperty(SF0030216Component.prototype, "profitRate", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().indexOffer.profitRate);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030216Component.prototype, "paperUnitPrice", {
        /** 原紙代単価 */
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.paperUnitPrice);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030216Component.prototype, "paperTotalCost", {
        /** 原紙代合計 (材料合計) */
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.paperTotalCost);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030216Component.prototype, "colorPlateCostF", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.colorPlateCostF);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030216Component.prototype, "colorPrintLossF", {
        /** 印刷ロス */
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.colorPrintLossF);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030216Component.prototype, "colorPrintPerPacketCostF", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.colorPrintPerPacketCostF);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030216Component.prototype, "colorPrintBasicCostF", {
        /** 印刷基本料 */
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.colorPrintBasicCostF);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030216Component.prototype, "colorPrintThroughWageF", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.colorPrintThroughWageF);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030216Component.prototype, "colorPrintSpecialCostF", {
        /** 印刷 割増/割引工賃 */
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.colorPrintSpecialCostF);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030216Component.prototype, "colorPrintTotalCostF", {
        /** 印刷合計 */
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.colorPrintTotalCostF);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030216Component.prototype, "colorPlateCostB", {
        /** @deprecated 美粧では使用しない */
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.colorPlateCostB);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030216Component.prototype, "colorPrintLossB", {
        /** @deprecated 美粧では使用しない */
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.colorPrintLossB);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030216Component.prototype, "colorPrintPerPacketCostB", {
        /** @deprecated 美粧では使用しない */
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.colorPrintPerPacketCostB);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030216Component.prototype, "colorPrintBasicCostB", {
        /** @deprecated 美粧では使用しない */
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.colorPrintBasicCostB);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030216Component.prototype, "colorPrintThroughWageB", {
        /** @deprecated 美粧では使用しない */
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.colorPrintThroughWageB);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030216Component.prototype, "colorPrintSpecialCostB", {
        /** @deprecated 美粧では使用しない */
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.colorPrintSpecialCostB);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030216Component.prototype, "colorPrintTotalCostB", {
        /** @deprecated 美粧では使用しない */
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.colorPrintTotalCostB);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030216Component.prototype, "surfaceTreatmentBasicCostF", {
        /** @deprecated 美粧では使用しない */
        get: function () {
            if (util_1.isNumber(this.helper.getSF00302Data().productOutput.surfaceTreatmentBasicCostF)) {
                return this.helper.getSF00302Data().productOutput.surfaceTreatmentBasicCostF.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
            else if (this.helper.getSF00302Data().productOutput.surfaceTreatmentBasicCostF == undefined || this.helper.getSF00302Data().productOutput.surfaceTreatmentBasicCostF == "") {
                return "0";
            }
            return this.helper.getSF00302Data().productOutput.surfaceTreatmentBasicCostF;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030216Component.prototype, "surfaceTreatmentThroughWageF", {
        /** @deprecated 美粧では使用しない */
        get: function () {
            if (util_1.isNumber(this.helper.getSF00302Data().productOutput.surfaceTreatmentThroughWageF)) {
                return this.helper.getSF00302Data().productOutput.surfaceTreatmentThroughWageF.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
            else if (this.helper.getSF00302Data().productOutput.surfaceTreatmentThroughWageF == undefined || this.helper.getSF00302Data().productOutput.surfaceTreatmentThroughWageF == "") {
                return "0";
            }
            return this.helper.getSF00302Data().productOutput.surfaceTreatmentThroughWageF;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030216Component.prototype, "surfaceTreatmentTotalCostF", {
        /** @deprecated 美粧では使用しない */
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.surfaceTreatmentTotalCostF);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030216Component.prototype, "surfaceTreatmentBasicCostB", {
        /** @deprecated 美粧では使用しない */
        get: function () {
            if (util_1.isNumber(this.helper.getSF00302Data().productOutput.surfaceTreatmentBasicCostB)) {
                return this.helper.getSF00302Data().productOutput.surfaceTreatmentBasicCostB.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
            else if (this.helper.getSF00302Data().productOutput.surfaceTreatmentBasicCostB == undefined || this.helper.getSF00302Data().productOutput.surfaceTreatmentBasicCostB == "") {
                return "0";
            }
            return this.helper.getSF00302Data().productOutput.surfaceTreatmentBasicCostB;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030216Component.prototype, "surfaceTreatmentThroughWageB", {
        /** @deprecated 美粧では使用しない */
        get: function () {
            if (util_1.isNumber(this.helper.getSF00302Data().productOutput.surfaceTreatmentThroughWageB)) {
                return this.helper.getSF00302Data().productOutput.surfaceTreatmentThroughWageB.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
            else if (this.helper.getSF00302Data().productOutput.surfaceTreatmentThroughWageB == undefined || this.helper.getSF00302Data().productOutput.surfaceTreatmentThroughWageB == "") {
                return "0";
            }
            return this.helper.getSF00302Data().productOutput.surfaceTreatmentThroughWageB;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030216Component.prototype, "surfaceTreatmentTotalCostB", {
        /** @deprecated 美粧では使用しない */
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.surfaceTreatmentTotalCostB);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030216Component.prototype, "embossingBasicCost", {
        /** @deprecated 美粧では使用しない */
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.embossingBasicCost);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030216Component.prototype, "embossingThroughWage", {
        /** @deprecated 美粧では使用しない */
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.embossingThroughWage);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030216Component.prototype, "embossingTotalCost", {
        /** @deprecated 美粧では使用しない */
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.embossingTotalCost);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030216Component.prototype, "laminationUnitPrice", {
        /** 貼合 シート代単価 (円/㎡） */
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.laminationUnitPrice);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030216Component.prototype, "laminationWage", {
        /** 貼合工賃 */
        get: function () {
            return this.helper.laminationWage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030216Component.prototype, "laminationLoss", {
        /** 貼合ロス */
        get: function () {
            return this.helper.laminationLoss;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030216Component.prototype, "laminationTotalCost", {
        /** 貼合代合計 */
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.laminationTotalCost);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030216Component.prototype, "dieCuttingLoss", {
        /** 打抜・貼り工程 打抜き 打抜き一律 */
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.dieCuttingLoss);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030216Component.prototype, "dieCuttingBasicCost", {
        /** 打抜・貼り工程 打抜き 一律=基本料 */
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.dieCuttingBasicCost);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030216Component.prototype, "dieCuttingThroughWage", {
        /** 打抜・貼り工程 打抜き 通工賃 */
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.dieCuttingTotalCost / this.helper.throughNumber);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030216Component.prototype, "dieCuttingTotalCost", {
        /** 打抜・貼り工程 打抜き合計 */
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.dieCuttingTotalCost);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030216Component.prototype, "stampingBasicCost", {
        /** 型出し・箔押し加工 基本料 */
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.stampingBasicCost);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030216Component.prototype, "stampingThroughWage", {
        /** 型出し・箔押し加工 工賃 */
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.stampingThroughWage);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030216Component.prototype, "stampingTotalCost", {
        /** 型出し・箔押し加工合計 = 箔押し代 */
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.stampingTotalCost);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030216Component.prototype, "windowMaterialFee", {
        /** 窓貼り加工 材料代 */
        get: function () {
            if (this.helper.getSF00302Data().productOutput.windowMaterialFee == undefined) {
                this.helper.getSF00302Data().productOutput.windowMaterialFee = 0;
            }
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.windowMaterialFee);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030216Component.prototype, "windowTotalCost", {
        /** 窓貼り加工 = 窓貼代計 */
        get: function () {
            if (this.helper.getSF00302Data().productOutput.windowTotalCost == undefined) {
                this.helper.getSF00302Data().productOutput.windowTotalCost = 0;
            }
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.windowTotalCost);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030216Component.prototype, "pasteLoss", {
        /** 打抜・貼り工程 貼り 貼りロス */
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.pasteLoss);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030216Component.prototype, "pasteBasicCost", {
        /** 打抜・貼り工程 貼り 基本料 */
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.pasteBasicCost);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030216Component.prototype, "pasteThroughWage", {
        /** 打抜・貼り工程 貼り 工賃 */
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.pasteThroughWage);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030216Component.prototype, "pasteTotalCost", {
        /** 打抜・貼り工程 貼り合計 */
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.pasteTotalCost);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030216Component.prototype, "inspection", {
        /** 検品 */
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.inspection);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030216Component.prototype, "packing", {
        /** 梱包 */
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.packing);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030216Component.prototype, "managementCost", {
        /** 販売管理費 */
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.managementCost);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030216Component.prototype, "fareLineService", {
        /** 運賃 */
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.fareLineService);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030216Component.prototype, "cartonSpecialFare", {
        /** 特別費用 特別運賃（助手手当など) */
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.cartonSpecialFare);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030216Component.prototype, "additionalTotalCarton", {
        /** 特別費用合計 */
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.cartonSpecialFare);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030216Component.prototype, "estimatedTotal", {
        /** 見積金額 合計 */
        get: function () {
            //http://fridaynight.vnext.vn/issues/2337
            return math_util_1.default.round(math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.estimatedTotal), 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030216Component.prototype, "estimatedUnitPrice", {
        /** 見積金額 単価 */
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.estimatedUnitPrice);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030216Component.prototype, "otherFee1", {
        /** その他1 金額 */
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getProductOutputOtherFee1());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030216Component.prototype, "otherFee2", {
        /** その他2 金額 */
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getProductOutputOtherFee2());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030216Component.prototype, "otherFee3", {
        /** その他3 金額 */
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getProductOutputOtherFee3());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030216Component.prototype, "colorPrintTotalCost", {
        /** 印刷合計 */
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getColorPrintTotalCost());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030216Component.prototype, "isOffsetColor", {
        get: function () {
            if (this.helper.getSF00302Data().product.printMethod == 1) {
                return true;
            }
            else {
                return false;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030216Component.prototype, "isView", {
        get: function () {
            if (this.helper.getSF00302Data().isRequestDesign) {
                return false;
            }
            else {
                return this.helper.getSF00302Data().isView;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030216Component.prototype, "isCreateNewProduct", {
        get: function () {
            return this.helper.getSF00302Data().isCreateNewProduct;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030216Component.prototype, "surfaceTreatmentTotalCost", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSurfaceTreatmentTotalCost());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030216Component.prototype, "inspectionPackingFareLineTotalCost", {
        /** 検品・梱包・配送代合計 */
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getInspectionPackingFareLineTotalCost());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030216Component.prototype, "diaCuttingPasteTotalCost", {
        /** 打抜・貼り工程合計 */
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getDieCuttingPasteTotalCost());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030216Component.prototype, "otherFeeTotalCost", {
        /** その他合計 */
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getOtherFeeTotalCost());
        },
        enumerable: true,
        configurable: true
    });
    SF0030216Component.prototype.resetOffer = function () {
        // reset lot
        this.lot = this.helper.getSF00302Data().bkProductLots[this.ix];
        // set product common fee
        this.unitPrice = this.helper.getSF00302Data().bkProductOffers[this.ix];
        this.helper.getSF00302Data().checkOutputSave = false;
    };
    Object.defineProperty(SF0030216Component.prototype, "isNotCalculateSurfaceF", {
        get: function () {
            if (this.helper.getSF00302Data().product.surfaceTreatmentIdF == 8 || this.helper.getSF00302Data().product.surfaceTreatmentIdF == 9) {
                return true;
            }
            else {
                return false;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030216Component.prototype, "isNotCalculateSurfaceB", {
        get: function () {
            if (this.helper.getSF00302Data().product.surfaceTreatmentIdB == 8 || this.helper.getSF00302Data().product.surfaceTreatmentIdB == 9) {
                return true;
            }
            else {
                return false;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030216Component.prototype, "otherFeeExpense1", {
        /** その他1 項目名 */
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
    Object.defineProperty(SF0030216Component.prototype, "otherFeeExpense2", {
        /** その他2 項目名 */
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
    Object.defineProperty(SF0030216Component.prototype, "otherFeeExpense3", {
        /** その他3 項目名 */
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
    Object.defineProperty(SF0030216Component.prototype, "checkBorderLot", {
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
    Object.defineProperty(SF0030216Component.prototype, "checkBorderUnitPrice", {
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
    Object.defineProperty(SF0030216Component.prototype, "isFlexo", {
        get: function () {
            if (this.helper.getSF00302Data().product.printMethod == 3) {
                return true;
            }
            else {
                return false;
            }
        },
        enumerable: true,
        configurable: true
    });
    //#2710
    SF0030216Component.prototype.isDecorative = function () {
        var product = {
            productType: this.helper.getSF00302Data().product.productType,
            shapeId: this.helper.getSF00302Data().product.shapeId
        };
        return format_util_1.FormatUtil.isMakeupSheet(product);
    };
    Object.defineProperty(SF0030216Component.prototype, "useDieCuttingFlatFee", {
        get: function () {
            return (this.helper.getSF00302Data().productOutput.lot / this.helper.getSF00302Data().product.dieCuttingThroughNumber <= 1000);
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SF0030216Component.prototype, "helper", void 0);
    SF0030216Component = __decorate([
        core_1.Component({
            selector: "sf0030216",
            templateUrl: "SF0030216.component.html"
        }), 
        __metadata('design:paramtypes', [SF00302_service_1.SF00302Service, router_1.ActivatedRoute, router_1.Router])
    ], SF0030216Component);
    return SF0030216Component;
}());
exports.SF0030216Component = SF0030216Component;
//# sourceMappingURL=SF0030216.component.js.map