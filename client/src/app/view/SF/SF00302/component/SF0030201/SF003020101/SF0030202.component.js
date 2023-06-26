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
var message_1 = require("../../../../../../helper/message");
var util_1 = require("util");
var router_1 = require("@angular/router");
var validator_util_1 = require("../../../../../../util/validator-util");
var Product_model_1 = require("../../../../../../model/core/Product.model");
var ProductCommonFee_model_1 = require("../../../../../../model/core/ProductCommonFee.model");
var MstWooden_model_1 = require("../../../../../../model/core/MstWooden.model");
var math_util_1 = require("../../../../../../util/math-util");
var data_util_1 = require("../../../../../../util/data-util");
/**
 * 試算表 (紙器・貼合)
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
 * */
var SF0030202Component = (function () {
    function SF0030202Component(sv00302Service, route, router) {
        this.sv00302Service = sv00302Service;
        this.route = route;
        this.router = router;
        this.ix = 0;
    }
    SF0030202Component.prototype.ngAfterViewInit = function () {
        App.initHelpers(['table-tools']);
    };
    Object.defineProperty(SF0030202Component.prototype, "isView", {
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
    SF0030202Component.prototype.saveOutput = function () {
        var _this = this;
        // this.helper.checkChangeDataProduct();
        // this.helper.checkChangeDataProductOutput();
        this.helper.checkChangeDataOffer();
        if (this.helper.validateFormOutput()) {
            this.helper.sf00302Data.checkInputSave = true; //（変更チェックを外す。一旦暫定対応。）
            this.helper.sf00302Data.checkOutputSave = true; //（変更チェックを外す。一旦暫定対応。）
            if (this.helper.sf00302Data.checkInputSave && this.helper.sf00302Data.checkOutputSave) {
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
                product.setProduct(this.helper.sf00302Data.product);
                // Comment fix bug 3057
                /*//Check if select なし, then update data to null
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
                }*/
                var productOutputs = [];
                Object.assign(productOutputs, this.helper.sf00302Data.productOutputs);
                product.productOutputs = productOutputs;
                // push product offer
                for (var i = 0; i < 5; i++) {
                    product.productOutputs[i].offers = [];
                    this.helper.sf00302Data.offers[i].productOutput = undefined;
                    product.productOutputs[i].offers.push(this.helper.sf00302Data.offers[i]);
                }
                var productCommonFee = new ProductCommonFee_model_1.ProductCommonFee();
                product.productCommon = Object.assign(productCommonFee, this.helper.sf00302Data.productCommonFee);
                this.sv00302Service
                    .sv0030203UpdateProduct(product, this.helper.sf00302Data.dealCode)
                    .then(function (data) {
                    // reassign product outputs to display
                    var productOutputs = [];
                    Object.assign(productOutputs, data.product.productOutputs);
                    _this.helper.sf00302Data.productOutputs = productOutputs;
                    // Reassign Wooden
                    var wooden = new MstWooden_model_1.MstWooden();
                    Object.assign(wooden, data.product.wooden);
                    _this.helper.sf00302Data.product.wooden = wooden;
                    // refresh indexing product output
                    var currentTabIndex = $(".tabOutput.active").index();
                    _this.helper.sf00302Data.productOutput = productOutputs[currentTabIndex];
                    // Backup (Used for reset function)
                    // Backup Output
                    _this.helper.sf00302Data.bkProductLots = [];
                    for (var i = 0; i < 5; i++) {
                        if (_this.helper.sf00302Data.product.productOutputs[i] == undefined) {
                            _this.helper.sf00302Data.bkProductLots.push(undefined);
                        }
                        else {
                            _this.helper.sf00302Data.bkProductLots.push(_this.helper.sf00302Data.product.productOutputs[i].lot);
                        }
                    }
                    //Backup Offer
                    _this.helper.sf00302Data.bkProductOffers = [];
                    // init backup data - offer
                    for (var i = 0; i < 5; i++) {
                        if (_this.helper.sf00302Data.offers[i] == undefined) {
                            _this.helper.sf00302Data.bkProductOffers.push(undefined);
                        }
                        else {
                            _this.helper.sf00302Data.bkProductOffers.push(_this.helper.sf00302Data.offers[i].unitPrice);
                        }
                    }
                    //Reassing Product Common Fee
                    var fee = new ProductCommonFee_model_1.ProductCommonFee();
                    Object.assign(fee, data.product.productCommon);
                    _this.helper.sf00302Data.productCommonFee = fee;
                    $.notify({
                        message: message_1.default.get(message_1.MSG.SF00302.INF006)
                    }, {
                        type: 'info'
                    });
                    // reset old data to validate - follow 3057
                    _this.helper.getSF00302Data().productOutputsOld = data_util_1.default.cloneObject(_this.helper.sf00302Data.productOutputs);
                    _this.helper.getSF00302Data().productOld = data_util_1.default.cloneObject(_this.helper.sf00302Data.product);
                    _this.helper.getSF00302Data().offersOld = data_util_1.default.cloneObject(_this.helper.sf00302Data.offers);
                    _this.helper.getSF00302Data().paperNormValueOld = data_util_1.default.cloneObject(_this.helper.sf00302Data.paperNormValue);
                    //Reset Check Input Output
                    _this.helper.getSF00302Data().checkInputSave = false;
                    _this.helper.getSF00302Data().checkOutputSave = false;
                    _this.helper.getSF00302Data().checkCommonSave = false;
                });
            }
            else if (this.helper.sf00302Data.checkOutputSave && !this.helper.sf00302Data.checkInputSave) {
                // Save the current product output
                this.helper.sf00302Data.productOutput.offers = [];
                this.helper.sf00302Data.indexOffer.productOutput = this.helper.sf00302Data.productOutput;
                this.sv00302Service.sv0030211UpdateOffer(this.helper.sf00302Data.indexOffer, this.helper.sf00302Data.dealCode, this.helper.sf00302Data.product.productCode).then(function (data) {
                    //Notify
                    $.notify({ message: message_1.default.get(message_1.MSG.SF00302.INF008) }, { type: 'success' });
                    _this.helper.getSF00302Data().productOutputsOld = data_util_1.default.cloneObject(_this.helper.sf00302Data.productOutputs);
                    _this.helper.getSF00302Data().offersOld = data_util_1.default.cloneObject(_this.helper.sf00302Data.offers);
                    // Backup for reset
                    _this.helper.sf00302Data.bkProductOffers[_this.ix] = _this.unitPrice;
                    _this.helper.sf00302Data.bkProductLots[_this.ix] = _this.helper.sf00302Data.productOutput.lot;
                    _this.helper.sf00302Data.checkOutputSave = false;
                    //Check to reset checking save
                    for (var i = 0; i < 5; i++) {
                        if ((_this.helper.sf00302Data.productOutputs[i].lot !== _this.helper.sf00302Data.bkProductLots[i]) || (_this.helper.sf00302Data.offers[i].unitPrice !== _this.helper.sf00302Data.bkProductOffers[i])) {
                            _this.helper.sf00302Data.checkOutputSave = true;
                        }
                    }
                }).catch(function (err) {
                    $.notify({ message: message_1.default.get(message_1.MSG.SF00302.ERR003) }, { type: 'danger' });
                });
            }
            else {
                $.notify({ message: message_1.default.get(message_1.MSG.SF00302.INF018) }, { type: 'info' });
            }
        }
        else {
            $.notify({ message: message_1.default.get(message_1.MSG.SF00301.ERR015) }, { type: 'danger' });
        }
    };
    Object.defineProperty(SF0030202Component.prototype, "checkProductCreated", {
        /*Check product create*/
        get: function () {
            if (this.helper.sf00302Data.product.id == null) {
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
    SF0030202Component.prototype.pageProductOutput = function (id) {
        // Change product output with index id to the current output
        this.helper.sf00302Data.indexOutput = id;
        this.helper.sf00302Data.productOutput = this.helper.sf00302Data.productOutputs[id];
        // change offer
        this.helper.sf00302Data.indexOffer = this.helper.sf00302Data.offers[id];
        // Change current tab effect
        $(".tabOutput").removeClass("active");
        $("#tab0" + id).parent().addClass("active");
        this.ix = id;
    };
    Object.defineProperty(SF0030202Component.prototype, "lot", {
        get: function () {
            this.helper.getSF00302Data().productOutput.lot = math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.lot);
            return math_util_1.default.checkNaN(this.helper.sf00302Data.productOutput.lot);
        },
        set: function (value) {
            // change lot
            if (validator_util_1.default.isNotEmpty(value)) {
                this.helper.sf00302Data.productOutput.lot = value;
            }
            this.helper.calcThroughNumber();
            this.helper.calcPaperActualWeight();
            this.helper.calcPaperUnitPrice();
            this.helper.calcPaperTotalCost();
            this.helper.calcLaminationUnitPrice();
            this.helper.calcLaminationSheetCost();
            this.helper.calcLaminationTotalCost();
            if (this.helper.sf00302Data.product.printMethod == 2) {
                this.helper.calcDigitalBasicCost();
                this.helper.calcDigitalThroughWage();
            }
            if (this.helper.sf00302Data.product.surfaceTreatmentIdF == 8 || this.helper.sf00302Data.product.surfaceTreatmentIdF == 17 || this.helper.sf00302Data.product.surfaceTreatmentIdF > 18
                || this.helper.sf00302Data.product.printMethod == 1) {
                this.helper.calcColorPlateCost(1);
                this.helper.calcColorPrintLoss(1);
                this.helper.calcColorCostPerPacket(1);
                this.helper.calcColorBasicCost(1);
                this.helper.calcColorThroughWage(1);
                this.helper.calcColorSpecial(1);
                this.helper.calcColorTotalCost(1);
            }
            if (this.helper.sf00302Data.product.surfaceTreatmentIdB == 8 || this.helper.sf00302Data.product.surfaceTreatmentIdB == 17 || this.helper.sf00302Data.product.surfaceTreatmentIdB > 18
                || this.helper.sf00302Data.product.printMethod == 1) {
                this.helper.calcColorPlateCost(2);
                this.helper.calcColorPrintLoss(2);
                this.helper.calcColorCostPerPacket(2);
                this.helper.calcColorBasicCost(2);
                this.helper.calcColorThroughWage(2);
                this.helper.calcColorSpecial(2);
                this.helper.calcColorTotalCost(2);
            }
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030202Component.prototype, "unitPrice", {
        get: function () {
            this.helper.getSF00302Data().indexOffer.unitPrice = math_util_1.default.checkNaN(this.helper.getSF00302Data().indexOffer.unitPrice);
            return math_util_1.default.checkNaN(this.helper.sf00302Data.indexOffer.unitPrice);
        },
        set: function (value) {
            this.helper.sf00302Data.indexOffer.unitPrice = value;
            this.helper.calcSubmittedTotal();
            this.helper.calcEstimateDiff(1);
            this.helper.calcEstimateDiff(2);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030202Component.prototype, "total", {
        get: function () {
            if (this.helper.sf00302Data.indexOffer.total > 999999999) {
                return 999999999;
            }
            //http://fridaynight.vnext.vn/issues/2337
            return math_util_1.default.round(math_util_1.default.checkNaN(this.helper.sf00302Data.indexOffer.total), 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030202Component.prototype, "profitRate", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.sf00302Data.indexOffer.profitRate);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030202Component.prototype, "paperActualWeight", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.sf00302Data.productOutput.paperActualWeight);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030202Component.prototype, "paperUnitPrice", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.sf00302Data.productOutput.paperUnitPrice);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030202Component.prototype, "paperTotalCost", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.sf00302Data.productOutput.paperTotalCost);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030202Component.prototype, "colorPlateCostF", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.sf00302Data.productOutput.colorPlateCostF);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030202Component.prototype, "colorPrintLossF", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.sf00302Data.productOutput.colorPrintLossF);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030202Component.prototype, "colorPrintPerPacketCostF", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.sf00302Data.productOutput.colorPrintPerPacketCostF);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030202Component.prototype, "colorPrintBasicCostF", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.sf00302Data.productOutput.colorPrintBasicCostF);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030202Component.prototype, "colorPrintThroughWageF", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.sf00302Data.productOutput.colorPrintThroughWageF);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030202Component.prototype, "colorPrintSpecialCostF", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.sf00302Data.productOutput.colorPrintSpecialCostF);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030202Component.prototype, "colorPrintTotalCostF", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.sf00302Data.productOutput.colorPrintTotalCostF);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030202Component.prototype, "colorPlateCostB", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.sf00302Data.productOutput.colorPlateCostB);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030202Component.prototype, "colorPrintLossB", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.sf00302Data.productOutput.colorPrintLossB);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030202Component.prototype, "colorPrintPerPacketCostB", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.sf00302Data.productOutput.colorPrintPerPacketCostB);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030202Component.prototype, "colorPrintBasicCostB", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.sf00302Data.productOutput.colorPrintBasicCostB);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030202Component.prototype, "colorPrintThroughWageB", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.sf00302Data.productOutput.colorPrintThroughWageB);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030202Component.prototype, "colorPrintSpecialCostB", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.sf00302Data.productOutput.colorPrintSpecialCostB);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030202Component.prototype, "colorPrintTotalCostB", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.sf00302Data.productOutput.colorPrintTotalCostB);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030202Component.prototype, "surfaceTreatmentBasicCostF", {
        get: function () {
            if (util_1.isNumber(this.helper.sf00302Data.productOutput.surfaceTreatmentBasicCostF)) {
                // Format to number style
                return this.helper.sf00302Data.productOutput.surfaceTreatmentBasicCostF.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
            else if (this.helper.sf00302Data.productOutput.surfaceTreatmentBasicCostF == undefined || this.helper.sf00302Data.productOutput.surfaceTreatmentBasicCostF == "") {
                return "0";
            }
            return this.helper.sf00302Data.productOutput.surfaceTreatmentBasicCostF;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030202Component.prototype, "surfaceTreatmentThroughWageF", {
        get: function () {
            if (util_1.isNumber(this.helper.sf00302Data.productOutput.surfaceTreatmentThroughWageF)) {
                // Format to number style
                return this.helper.sf00302Data.productOutput.surfaceTreatmentThroughWageF.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
            else if (this.helper.sf00302Data.productOutput.surfaceTreatmentThroughWageF == undefined || this.helper.sf00302Data.productOutput.surfaceTreatmentThroughWageF == "") {
                return "0";
            }
            return this.helper.sf00302Data.productOutput.surfaceTreatmentThroughWageF;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030202Component.prototype, "surfaceTreatmentTotalCostF", {
        get: function () {
            return this.helper.sf00302Data.productOutput.surfaceTreatmentTotalCostF;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030202Component.prototype, "surfaceTreatmentBasicCostB", {
        get: function () {
            if (util_1.isNumber(this.helper.sf00302Data.productOutput.surfaceTreatmentBasicCostB)) {
                // Format to number style
                return this.helper.sf00302Data.productOutput.surfaceTreatmentBasicCostB.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
            else if (this.helper.sf00302Data.productOutput.surfaceTreatmentBasicCostB == undefined || this.helper.sf00302Data.productOutput.surfaceTreatmentBasicCostB == "") {
                return "0";
            }
            return this.helper.sf00302Data.productOutput.surfaceTreatmentBasicCostB;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030202Component.prototype, "surfaceTreatmentThroughWageB", {
        get: function () {
            if (util_1.isNumber(this.helper.sf00302Data.productOutput.surfaceTreatmentThroughWageB)) {
                // Format to number style
                return this.helper.sf00302Data.productOutput.surfaceTreatmentThroughWageB.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
            else if (this.helper.sf00302Data.productOutput.surfaceTreatmentThroughWageB == undefined || this.helper.sf00302Data.productOutput.surfaceTreatmentThroughWageB == "") {
                return "0";
            }
            return this.helper.sf00302Data.productOutput.surfaceTreatmentThroughWageB;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030202Component.prototype, "surfaceTreatmentTotalCostB", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.sf00302Data.productOutput.surfaceTreatmentTotalCostB);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030202Component.prototype, "embossingBasicCost", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.sf00302Data.productOutput.embossingBasicCost);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030202Component.prototype, "embossingThroughWage", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.sf00302Data.productOutput.embossingThroughWage);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030202Component.prototype, "embossingTotalCost", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.sf00302Data.productOutput.embossingTotalCost);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030202Component.prototype, "laminationUnitPrice", {
        get: function () {
            if (this.helper.sf00302Data.productOutput.laminationUnitPrice == undefined) {
                this.helper.sf00302Data.productOutput.laminationUnitPrice = 0;
            }
            return math_util_1.default.checkNaN(this.helper.sf00302Data.productOutput.laminationUnitPrice);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030202Component.prototype, "laminationSheetCost", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.sf00302Data.productOutput.laminationSheetCost);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030202Component.prototype, "laminationTotalCost", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.sf00302Data.productOutput.laminationTotalCost);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030202Component.prototype, "dieCuttingLoss", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.sf00302Data.productOutput.dieCuttingLoss);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030202Component.prototype, "dieCuttingBasicCost", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.sf00302Data.productOutput.dieCuttingBasicCost);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030202Component.prototype, "dieCuttingThroughWage", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.sf00302Data.productOutput.dieCuttingThroughWage);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030202Component.prototype, "dieCuttingTotalCost", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.sf00302Data.productOutput.dieCuttingTotalCost);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030202Component.prototype, "stampingBasicCost", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.sf00302Data.productOutput.stampingBasicCost);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030202Component.prototype, "stampingThroughWage", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.sf00302Data.productOutput.stampingThroughWage);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030202Component.prototype, "stampingTotalCost", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.sf00302Data.productOutput.stampingTotalCost);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030202Component.prototype, "windowMaterialFee", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.sf00302Data.productOutput.windowMaterialFee);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030202Component.prototype, "windowTotalCost", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.sf00302Data.productOutput.windowTotalCost);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030202Component.prototype, "pasteLoss", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.sf00302Data.productOutput.pasteLoss);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030202Component.prototype, "pasteBasicCost", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.sf00302Data.productOutput.pasteBasicCost);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030202Component.prototype, "pasteThroughWage", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.sf00302Data.productOutput.pasteThroughWage);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030202Component.prototype, "pasteTotalCost", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.sf00302Data.productOutput.pasteTotalCost);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030202Component.prototype, "inspection", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.sf00302Data.productOutput.inspection);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030202Component.prototype, "packing", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.sf00302Data.productOutput.packing);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030202Component.prototype, "managementCost", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.sf00302Data.productOutput.managementCost);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030202Component.prototype, "fareLineService", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.sf00302Data.productOutput.fareLineService);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030202Component.prototype, "cartonSpecialFare", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.cartonSpecialFare);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030202Component.prototype, "additionalTotalCarton", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.cartonSpecialFare);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030202Component.prototype, "estimatedTotal", {
        get: function () {
            //http://fridaynight.vnext.vn/issues/2337
            return math_util_1.default.round(math_util_1.default.checkNaN(this.helper.sf00302Data.productOutput.estimatedTotal), 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030202Component.prototype, "estimatedUnitPrice", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.sf00302Data.productOutput.estimatedUnitPrice);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030202Component.prototype, "otherFee1", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getProductOutputOtherFee1());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030202Component.prototype, "otherFee2", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getProductOutputOtherFee2());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030202Component.prototype, "otherFee3", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getProductOutputOtherFee3());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030202Component.prototype, "colorPrintTotalCost", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getColorPrintTotalCost());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030202Component.prototype, "isOffsetColor", {
        get: function () {
            if (this.helper.sf00302Data.product.printMethod != 2) {
                return true;
            }
            else {
                return false;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030202Component.prototype, "surfaceTreatmentTotalCost", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSurfaceTreatmentTotalCost());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030202Component.prototype, "inspectionPackingFareLineTotalCost", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getInspectionPackingFareLineTotalCost());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030202Component.prototype, "diaCuttingPasteTotalCost", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getDieCuttingPasteTotalCost());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030202Component.prototype, "otherFeeTotalCost", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getOtherFeeTotalCost());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030202Component.prototype, "otherFeeExpense1", {
        get: function () {
            if (this.helper.sf00302Data.product.otherExpense1 != undefined && this.helper.sf00302Data.product.otherExpense1 != "") {
                return this.helper.sf00302Data.product.otherExpense1;
            }
            else {
                return "（項目名１）";
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030202Component.prototype, "otherFeeExpense2", {
        get: function () {
            if (this.helper.sf00302Data.product.otherExpense2 != undefined && this.helper.sf00302Data.product.otherExpense2 != "") {
                return this.helper.sf00302Data.product.otherExpense2;
            }
            else {
                return "（項目名２）";
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030202Component.prototype, "otherFeeExpense3", {
        get: function () {
            if (this.helper.sf00302Data.product.otherExpense3 != undefined && this.helper.sf00302Data.product.otherExpense3 != "") {
                return this.helper.sf00302Data.product.otherExpense3;
            }
            else {
                return "（項目名３）";
            }
        },
        enumerable: true,
        configurable: true
    });
    SF0030202Component.prototype.resetOffer = function () {
        // reset lot
        this.lot = this.helper.sf00302Data.bkProductLots[this.ix];
        // set product common fee
        this.unitPrice = this.helper.sf00302Data.bkProductOffers[this.ix];
        this.helper.getSF00302Data().checkOutputSave = false;
    };
    Object.defineProperty(SF0030202Component.prototype, "isNotCalculateSurfaceF", {
        get: function () {
            if (this.helper.sf00302Data.product.surfaceTreatmentIdF == 8 || this.helper.sf00302Data.product.surfaceTreatmentIdF == 9) {
                return true;
            }
            else {
                return false;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030202Component.prototype, "isNotCalculateSurfaceB", {
        get: function () {
            if (this.helper.sf00302Data.product.surfaceTreatmentIdB == 8 || this.helper.sf00302Data.product.surfaceTreatmentIdB == 9) {
                return true;
            }
            else {
                return false;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030202Component.prototype, "checkBorderLot", {
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
    Object.defineProperty(SF0030202Component.prototype, "checkBorderUnitPrice", {
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
    Object.defineProperty(SF0030202Component.prototype, "isSpecialSurfaceF", {
        get: function () {
            if (this.helper.getSF00302Data().product.surfaceTreatmentIdF == 8
                || this.helper.getSF00302Data().product.surfaceTreatmentIdF == 17
                || this.helper.getSF00302Data().product.surfaceTreatmentIdF > 18) {
                return true;
            }
            else {
                return false;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030202Component.prototype, "isSpecialSurfaceB", {
        get: function () {
            if (this.helper.getSF00302Data().product.surfaceTreatmentIdB == 8
                || this.helper.getSF00302Data().product.surfaceTreatmentIdB == 17
                || this.helper.getSF00302Data().product.surfaceTreatmentIdB > 18) {
                return true;
            }
            else {
                return false;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030202Component.prototype, "digitalBasicCost", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.sf00302Data.productOutput.digitalBasicCost);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030202Component.prototype, "digitalThroughWage", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.sf00302Data.productOutput.digitalThroughWage);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030202Component.prototype, "digitalTotalCost", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.sf00302Data.productOutput.digitalTotalCost);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030202Component.prototype, "isOverPacketF", {
        get: function () {
            var condition = math_util_1.default.checkNaN(this.helper.sf00302Data.productOutput.colorPrintBasicCostF + (this.helper.sf00302Data.productOutput.colorPrintThroughWageF + this.helper.sf00302Data.productOutput.colorPrintSpecialCostF) * this.calcThroughNumber() + this.helper.sf00302Data.productOutput.colorPrintLossF);
            if (condition > this.helper.sf00302Data.productOutput.colorPrintPerPacketCostF
                || (condition == 0 && math_util_1.default.checkNaN(this.helper.sf00302Data.productOutput.colorPrintPerPacketCostF) == 0)) {
                return true;
            }
            else {
                return false;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030202Component.prototype, "isOverPacketB", {
        get: function () {
            var condition = math_util_1.default.checkNaN(this.helper.sf00302Data.productOutput.colorPrintBasicCostB + (this.helper.sf00302Data.productOutput.colorPrintThroughWageB + this.helper.sf00302Data.productOutput.colorPrintSpecialCostB) * this.calcThroughNumber() + this.helper.sf00302Data.productOutput.colorPrintLossB);
            if (condition > this.helper.sf00302Data.productOutput.colorPrintPerPacketCostB
                || (condition == 0 && math_util_1.default.checkNaN(this.helper.sf00302Data.productOutput.colorPrintPerPacketCostB) == 0)) {
                return true;
            }
            else {
                return false;
            }
        },
        enumerable: true,
        configurable: true
    });
    SF0030202Component.prototype.calcThroughNumber = function () {
        return math_util_1.default.checkNaN(math_util_1.default.ceilDecimal(this.helper.sf00302Data.productOutput.lot / this.helper.sf00302Data.product.dieCuttingThroughNumber, 0));
    };
    Object.defineProperty(SF0030202Component.prototype, "useDieCuttingFlatFee", {
        get: function () {
            return this.calcThroughNumber() <= 1000;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SF0030202Component.prototype, "helper", void 0);
    SF0030202Component = __decorate([
        core_1.Component({
            selector: "sf0030202",
            templateUrl: "SF0030202.component.html"
        }), 
        __metadata('design:paramtypes', [SF00302_service_1.SF00302Service, router_1.ActivatedRoute, router_1.Router])
    ], SF0030202Component);
    return SF0030202Component;
}());
exports.SF0030202Component = SF0030202Component;
//# sourceMappingURL=SF0030202.component.js.map