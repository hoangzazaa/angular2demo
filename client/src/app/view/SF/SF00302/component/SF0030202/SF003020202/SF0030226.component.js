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
var data_util_1 = require("../../../../../../util/data-util");
var SF00302_data_1 = require("../../../SF00302.data");
var SF00302_service_1 = require("../../../SF00302.service");
var router_1 = require("@angular/router");
var math_util_1 = require("../../../../../../util/math-util");
var message_1 = require("../../../../../../helper/message");
var Product_model_1 = require("../../../../../../model/core/Product.model");
var ProductCommonFee_model_1 = require("../../../../../../model/core/ProductCommonFee.model");
var MstWooden_model_1 = require("../../../../../../model/core/MstWooden.model");
var validator_util_1 = require("../../../../../../util/validator-util");
var SF003020202_helper_1 = require("./SF003020202.helper");
var SF0030226Component = (function () {
    function SF0030226Component(sf00302Data, sv00302Service, route, router) {
        this.sf00302Data = sf00302Data;
        this.sv00302Service = sv00302Service;
        this.route = route;
        this.router = router;
        this.ix = 0;
    }
    SF0030226Component.prototype.isHighlighted = function (input) {
        return this.pageData.highlightedTracker.isHighlightedProperty(input);
    };
    Object.defineProperty(SF0030226Component.prototype, "pageData", {
        get: function () {
            return this.helper.getSF00302Data();
        },
        enumerable: true,
        configurable: true
    });
    SF0030226Component.prototype.ngAfterViewInit = function () {
        App.initHelpers(['table-tools']);
    };
    Object.defineProperty(SF0030226Component.prototype, "isView", {
        get: function () {
            return this.helper.getSF00302Data().isView;
        },
        enumerable: true,
        configurable: true
    });
    SF0030226Component.prototype.saveOutput = function () {
        var _this = this;
        // this.helper.checkChangeDataProduct();
        // this.helper.checkChangeDataProductOutput();
        this.helper.checkChangeDataOffer();
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
                // reassign product
                // let product = new Product();
                // product.setProduct(data.product);
                // this.helper.getSF00302Data().product = product;
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
            this.helper.getSF00302Data().productOutput.offers = [];
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
                    if ((_this.helper.getSF00302Data().productOutputs[i].lot !== _this.helper.getSF00302Data().bkProductLots[i]) || (_this.helper.getSF00302Data().offers[i].unitPrice !== _this.helper.getSF00302Data().bkProductOffers[i])) {
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
    SF0030226Component.prototype.pageProductOutput = function (id) {
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
    Object.defineProperty(SF0030226Component.prototype, "lot", {
        get: function () {
            this.helper.getSF00302Data().productOutput.lot = math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.lot);
            return this.helper.getSF00302Data().productOutput.lot;
        },
        set: function (value) {
            // change lot
            if (validator_util_1.default.isNotEmpty(value)) {
                this.helper.getSF00302Data().productOutput.lot = value;
            }
            this.helper.calcShipFareCarton();
            this.helper.calcUsageColorCostCarton();
            this.helper.calcWaterRepellentCarton();
            this.helper.calcDieCuttingThroughWage();
            this.helper.calcPasteBasicCost();
            this.helper.calcPasteThroughWage();
            this.helper.calcTotalCarton();
            this.helper.calcUnitPriceCarton();
            this.helper.calcSubTotal();
            this.helper.calcEstimateDiffCarton(1);
            this.helper.calcEstimateDiffCarton(2);
            this.helper.calcCartonLotGap();
            this.helper.calcAdditionFare();
            this.helper.calcSubmittedTotal();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030226Component.prototype, "unitPrice", {
        get: function () {
            this.helper.getSF00302Data().indexOffer.unitPrice = math_util_1.default.checkNaN(this.helper.getSF00302Data().indexOffer.unitPrice);
            return this.helper.getSF00302Data().indexOffer.unitPrice;
        },
        set: function (value) {
            this.helper.getSF00302Data().indexOffer.unitPrice = value;
            this.helper.calcSubmittedTotal();
            this.helper.calcEstimateDiffCarton(1);
            this.helper.calcEstimateDiffCarton(2);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030226Component.prototype, "checkProductCreated", {
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
    Object.defineProperty(SF0030226Component.prototype, "cartonMaterialCost", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.cartonMaterialCost);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030226Component.prototype, "cartonMaterialLoss", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.cartonMaterialLoss);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030226Component.prototype, "cartonMaterialLamination", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.cartonMaterialLamination);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030226Component.prototype, "cartonMaterialUnitPrice", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.cartonMaterialUnitPrice);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030226Component.prototype, "cartonMaterialTotalCost", {
        /** シート代 (円/㎡) */
        get: function () {
            return math_util_1.default.checkNaN(this.helper.calcMaterialCostCarton());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030226Component.prototype, "cartonShipFare", {
        /** 運賃 (円/㎡) */
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.cartonShipFare);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030226Component.prototype, "cartonAdditionalShipFare", {
        /** 割増運賃 (円/㎡) */
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getAdditionalSipFareCarton());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030226Component.prototype, "cartonShipTotal", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.cartonShipTotal);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030226Component.prototype, "cartonUsageColorCost", {
        /** 印刷 (円/㎡) */
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.cartonUsageColorCost);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030226Component.prototype, "cartonTapeCut", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.cartonTapeCut);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030226Component.prototype, "cartonLinerCut", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.cartonLinerCut);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030226Component.prototype, "cartonHandProcessing", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.cartonHandProcessing);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030226Component.prototype, "cartonWaterRepellent", {
        /** 撥水加工賃 (円/㎡) */
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.cartonWaterRepellent);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030226Component.prototype, "cartonProcessingUnitPrice", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.cartonProcessingUnitPrice);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030226Component.prototype, "cartonProcessingTotalCost", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.cartonProcessingTotalCost);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030226Component.prototype, "calcEstimatedM2PriceCarton", {
        /** 単価 (円/㎡) */
        get: function () {
            return math_util_1.default.checkNaN(this.helper.calcEstimatedM2PriceCarton());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030226Component.prototype, "total", {
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
    Object.defineProperty(SF0030226Component.prototype, "profitRate", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().indexOffer.profitRate);
        },
        enumerable: true,
        configurable: true
    });
    SF0030226Component.prototype.resetOffer = function () {
        // reset lot
        this.lot = this.helper.getSF00302Data().bkProductLots[this.ix];
        // set product common fee
        this.unitPrice = this.helper.getSF00302Data().bkProductOffers[this.ix];
        this.helper.getSF00302Data().checkOutputSave = false;
        this.helper.calcShipFareCarton();
        this.helper.calcUsageColorCostCarton();
        this.helper.calcWaterRepellentCarton();
        this.helper.calcDieCuttingThroughWage();
        this.helper.calcPasteBasicCost();
        this.helper.calcPasteThroughWage();
        this.helper.calcAdditionFare();
        this.helper.calcTotalCarton();
        this.helper.calcUnitPriceCarton();
        this.helper.calcEstimateDiffCarton(1);
        this.helper.calcEstimateDiffCarton(2);
        this.helper.calcSubmittedTotal();
    };
    Object.defineProperty(SF0030226Component.prototype, "estimatedTotal", {
        /** 見積金額合計 (円) */
        get: function () {
            //http://fridaynight.vnext.vn/issues/2337
            return math_util_1.default.round(math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.estimatedTotal), 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030226Component.prototype, "estimatedUnitPrice", {
        /** 単価 (ロット/円) */
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.estimatedUnitPrice);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030226Component.prototype, "checkBorderLot", {
        get: function () {
            if (this.helper.getSF00302Data().yCheck) {
                if (this.helper.getSF00302Data().productRequiredItem.isSaveLot) {
                    return this.helper.getSF00302Data().errFieldBorderCss;
                }
                else {
                    if (this.helper.getSF00302Data().xCheck) {
                        return this.helper.getSF00302Data().defaultFieldBorderCss;
                    }
                    else {
                        return this.helper.getSF00302Data().noneFieldBorderCss;
                    }
                }
            }
            else {
                if (this.helper.getSF00302Data().xCheck) {
                    return this.helper.getSF00302Data().defaultFieldBorderCss;
                }
                else {
                    return this.helper.getSF00302Data().noneFieldBorderCss;
                }
            }
            /*if (ValidatorUtil.isNotEmpty(this.helper.sf00302Data.product.id)) {
             if (this.helper.getSF00302Data().productRequiredItem.isSaveLot) {
             return this.helper.getSF00302Data().errFieldBorderCss;
             } else {
             return this.helper.getSF00302Data().noneFieldBorderCss;
             }
             } else {
             if (this.helper.getSF00302Data().productRequiredItem.isSaveLot) {
             return this.helper.getSF00302Data().errFieldBorderCss;
             } else {
             return this.helper.getSF00302Data().defaultFieldBorderCss;
             }
             }*/
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030226Component.prototype, "checkBorderUnitPrice", {
        get: function () {
            if (this.helper.getSF00302Data().yCheck) {
                if (this.helper.getSF00302Data().productRequiredItem.isSaveSubmittedUnitPrice) {
                    return this.helper.getSF00302Data().errFieldBorderCss;
                }
                else {
                    if (this.helper.getSF00302Data().xCheck) {
                        return this.helper.getSF00302Data().defaultFieldBorderCss;
                    }
                    else {
                        return this.helper.getSF00302Data().noneFieldBorderCss;
                    }
                }
            }
            else {
                if (this.helper.getSF00302Data().xCheck) {
                    return this.helper.getSF00302Data().defaultFieldBorderCss;
                }
                else {
                    return this.helper.getSF00302Data().noneFieldBorderCss;
                }
            }
            /*if (ValidatorUtil.isNotEmpty(this.helper.sf00302Data.product.id)) {
             if (this.helper.getSF00302Data().productRequiredItem.isSaveSubmittedUnitPrice) {
             return this.helper.getSF00302Data().errFieldBorderCss;
             } else {
             return this.helper.getSF00302Data().noneFieldBorderCss;
             }
             } else {
             if (this.helper.getSF00302Data().productRequiredItem.isSaveSubmittedUnitPrice) {
             return this.helper.getSF00302Data().errFieldBorderCss;
             } else {
             return this.helper.getSF00302Data().defaultFieldBorderCss;
             }
             }*/
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030226Component.prototype, "dimension", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.dimension);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030226Component.prototype, "estimatedM2Price", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.calcEstimatedM2PriceCarton());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030226Component.prototype, "dieCuttingLoss", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.sf00302Data.productOutput.dieCuttingLoss);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030226Component.prototype, "dieCuttingBasicCost", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.sf00302Data.productOutput.dieCuttingBasicCost);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030226Component.prototype, "dieCuttingThroughWage", {
        /** 打抜き＋梱包 (円/㎡) */
        get: function () {
            return math_util_1.default.checkNaN(this.helper.sf00302Data.productOutput.dieCuttingThroughWage);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030226Component.prototype, "pasteLoss", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.sf00302Data.productOutput.pasteLoss);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030226Component.prototype, "pasteBasicCost", {
        /** 基本料（案件） (円) */
        get: function () {
            return math_util_1.default.checkNaN(this.helper.sf00302Data.productOutput.pasteBasicCost);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030226Component.prototype, "pasteThroughWage", {
        /** 工賃 (円/製品) */
        get: function () {
            return math_util_1.default.checkNaN(this.helper.sf00302Data.productOutput.pasteThroughWage);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030226Component.prototype, "pasteTotalCost", {
        /** 貼り加工 = 貼り加工代合計（@案件）(円) */
        get: function () {
            return math_util_1.default.checkNaN(this.helper.sf00302Data.productOutput.pasteTotalCost);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030226Component.prototype, "laminationFrontThroughWage", {
        /** 表ライナー (円/kg) */
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().product.laminationFrontThroughWage);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030226Component.prototype, "laminationBThroughWage", {
        /** B中芯 (円/kg) */
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().product.laminationBThroughWage);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030226Component.prototype, "laminationMediumThroughWage", {
        /** 中芯 (円/kg) */
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().product.laminationMediumThroughWage);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030226Component.prototype, "laminationAThroughWage", {
        /** A中芯 (円/kg) */
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().product.laminationAThroughWage);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030226Component.prototype, "laminationBackThroughWage", {
        /** 裏ライナー (円/kg) */
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().product.laminationBackThroughWage);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030226Component.prototype, "packing", {
        /** 梱包代 (円/㎡) */
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.packing);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030226Component.prototype, "largerBlankSize", {
        /** 展開寸法（流れ） (mm) */
        get: function () {
            return this.helper.largerBlankSize;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030226Component.prototype, "directionRange", {
        /** 通方向レンジ */
        get: function () {
            var key = this.helper.getUsingPasteKey();
            return key != null ? key + "\u307E\u3067" : '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030226Component.prototype, "specialPasteBasicCost", {
        /** 割増工賃（基本料）(円/案件) */
        get: function () {
            return this.helper.getSpecialPasteBasicCost();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030226Component.prototype, "specialPasteThroughWage", {
        /** 割増工賃（工賃） (円/製品) */
        get: function () {
            return this.helper.getSpecialPasteThroughWage();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030226Component.prototype, "cartonLotGap", {
        /** ロット格差 (円) */
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.cartonLotGap);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030226Component.prototype, "cartonLotGapPerSheet", {
        /** ロット格差（円/シート）*/
        get: function () {
            var productOutput = this.helper.getSF00302Data().productOutput;
            var numberOfSheets = productOutput.lot / this.helper.dieCuttingThroughNumber;
            return math_util_1.default.checkNaN(productOutput.cartonLotGap / numberOfSheets);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030226Component.prototype, "cartonSpecialFare", {
        /** 特別運賃（助手手当など） (円) */
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.cartonSpecialFare);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030226Component.prototype, "additionalTotalCarton", {
        /** 特別費用 (円) */
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.cartonLotGap) + math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.cartonSpecialFare);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030226Component.prototype, "laminationM2Cost", {
        /** 貼合料 (円/㎡) */
        get: function () {
            return this.helper.laminationM2Cost;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030226Component.prototype, "laminationLoss", {
        /** 貼合ロス% (0.0〜1.0) */
        get: function () {
            return this.helper.laminationLoss;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030226Component.prototype, "getCartonSheetCost", {
        /** シート代合計 (円) */
        get: function () {
            var data = this.helper.getSF00302Data();
            return math_util_1.default.checkNaN(this.helper.cartonSheetCostPerProduct * data.productOutput.lot);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030226Component.prototype, "dieCuttingTotalCost", {
        /** 加工代（基本工賃）= 打抜き＋梱包 (円) */
        get: function () {
            var data = this.helper.getSF00302Data();
            return math_util_1.default.checkNaN(this.helper.dieCuttingTotalCostPerProduct * data.productOutput.lot);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030226Component.prototype, "cartonUsageColorTotal", {
        /** 加工代（印刷）= 印刷代合計 (円) */
        get: function () {
            var data = this.helper.getSF00302Data();
            return math_util_1.default.checkNaN(this.helper.cartonUsageColorCostPerProduct * data.productOutput.lot);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030226Component.prototype, "cartonFareCost", {
        /** 運賃 = 運賃合計 (合計) (円) */
        get: function () {
            var data = this.helper.getSF00302Data();
            return math_util_1.default.checkNaN(data.productOutput.cartonShipTotal);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030226Component.prototype, "cartonWaterRepellentCost", {
        /** 加工代 (撥水加工賃) = 撥水加工代合計 (円) */
        get: function () {
            var data = this.helper.getSF00302Data();
            return math_util_1.default.checkNaN(this.helper.cartonWaterRepellentCostPerProduct * data.productOutput.lot);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030226Component.prototype, "cartonPackingCost", {
        /** 結束・梱包 = 結束・梱包代（特別） (円) */
        get: function () {
            var data = this.helper.getSF00302Data();
            return math_util_1.default.checkNaN(this.helper.cartonPackingCostPerProduct * data.productOutput.lot);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030226Component.prototype, "otherFee1", {
        /** その他 項目1 (円) */
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getProductOutputOtherFee1());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030226Component.prototype, "otherFee2", {
        /** その他 項目2 (円) */
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getProductOutputOtherFee2());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030226Component.prototype, "otherFee3", {
        /** その他 項目3 (円) */
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getProductOutputOtherFee3());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030226Component.prototype, "otherFeeExpense1", {
        /** その他 項目1 項目名 */
        get: function () {
            var product = this.helper.getSF00302Data().product;
            if (product.otherExpense1 != undefined && product.otherExpense1 != "") {
                return product.otherExpense1;
            }
            else {
                return "（項目名１）";
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030226Component.prototype, "otherFeeExpense2", {
        /** その他 項目2 項目名 */
        get: function () {
            var product = this.helper.getSF00302Data().product;
            if (product.otherExpense2 != undefined && product.otherExpense2 != "") {
                return product.otherExpense2;
            }
            else {
                return "（項目名２）";
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030226Component.prototype, "otherFeeExpense3", {
        /** その他 項目3 項目名 */
        get: function () {
            var product = this.helper.getSF00302Data().product;
            if (product.otherExpense3 != undefined && product.otherExpense3 != "") {
                return product.otherExpense3;
            }
            else {
                return "（項目名３）";
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030226Component.prototype, "otherFeeTotalCost", {
        /** その他 合計 (円) */
        get: function () {
            return this.helper.getOtherFeeTotalCost();
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(), 
        __metadata('design:type', SF003020202_helper_1.SF003020202Helper)
    ], SF0030226Component.prototype, "helper", void 0);
    SF0030226Component = __decorate([
        core_1.Component({
            templateUrl: "SF0030226.component.html",
            selector: 'sf0030226'
        }), 
        __metadata('design:paramtypes', [SF00302_data_1.SF00302Data, SF00302_service_1.SF00302Service, router_1.ActivatedRoute, router_1.Router])
    ], SF0030226Component);
    return SF0030226Component;
}());
exports.SF0030226Component = SF0030226Component;
//# sourceMappingURL=SF0030226.component.js.map