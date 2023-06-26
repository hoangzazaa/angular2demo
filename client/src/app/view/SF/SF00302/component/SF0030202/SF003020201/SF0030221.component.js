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
var SF00302_data_1 = require("../../../SF00302.data");
var message_1 = require("../../../../../../helper/message");
var ProductCommonFee_model_1 = require("../../../../../../model/core/ProductCommonFee.model");
var MstWooden_model_1 = require("../../../../../../model/core/MstWooden.model");
var SF00302_service_1 = require("../../../SF00302.service");
var router_1 = require("@angular/router");
var Product_model_1 = require("../../../../../../model/core/Product.model");
var math_util_1 = require("../../../../../../util/math-util");
var validator_util_1 = require("../../../../../../util/validator-util");
var data_util_1 = require("../../../../../../util/data-util");
/**
 * 試算表 (段ボールA式)
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
var SF0030221Component = (function () {
    function SF0030221Component(sf00302Data, sv00302Service, route, router) {
        this.sf00302Data = sf00302Data;
        this.sv00302Service = sv00302Service;
        this.route = route;
        this.router = router;
        this.ix = 0;
    }
    SF0030221Component.prototype.ngAfterViewInit = function () {
        App.initHelpers(['table-tools']);
    };
    Object.defineProperty(SF0030221Component.prototype, "isRequestDesign", {
        get: function () {
            return this.helper.getSF00302Data().isRequestDesign;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030221Component.prototype, "isCreateNewProduct", {
        get: function () {
            return this.helper.getSF00302Data().isCreateNewProduct;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030221Component.prototype, "isView", {
        get: function () {
            if (this.isRequestDesign) {
                return false;
            }
            else {
                return this.helper.getSF00302Data().isView;
            }
        },
        enumerable: true,
        configurable: true
    });
    SF0030221Component.prototype.saveOutput = function () {
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
    SF0030221Component.prototype.pageProductOutput = function (id) {
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
    Object.defineProperty(SF0030221Component.prototype, "lot", {
        get: function () {
            this.helper.getSF00302Data().productOutput.lot = math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.lot);
            return this.helper.getSF00302Data().productOutput.lot;
        },
        set: function (value) {
            // change lot
            if (validator_util_1.default.isNotEmpty(value)) {
                this.helper.getSF00302Data().productOutput.lot = value;
            }
            this.helper.calcMaterialCostTotalCarton();
            this.helper.calcMaterialLossCarton();
            this.helper.calcMaterialLaminationCarton();
            this.helper.calcMaterialUnitPriceCarton();
            this.helper.calcMaterialTotalCostCarton();
            this.helper.calcShipFareCarton();
            this.helper.calcUsageColorCostCarton();
            this.helper.calcTapeCutCarton();
            this.helper.calcLinerCutCarton();
            this.helper.calcCartonHandProcessingCarton();
            this.helper.calcWaterRepellentCarton();
            this.helper.calcProcessingUnitPriceCarton();
            this.helper.calcProcessingTotalCarton();
            this.helper.calcTotalCarton();
            this.helper.calcUnitPriceCarton();
            this.helper.calcSubTotal();
            this.helper.calcEstimateDiffCarton(1);
            this.helper.calcEstimateDiffCarton(2);
            this.helper.calcCartonLotGap();
            this.helper.calcAdditionFare();
            this.helper.calcDimension();
            this.helper.calcSubmittedTotal();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030221Component.prototype, "unitPrice", {
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
    Object.defineProperty(SF0030221Component.prototype, "checkProductCreated", {
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
    Object.defineProperty(SF0030221Component.prototype, "cartonMaterialCost", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.cartonMaterialCost);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030221Component.prototype, "cartonMaterialLoss", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.cartonMaterialLoss);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030221Component.prototype, "cartonMaterialLamination", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.cartonMaterialLamination);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030221Component.prototype, "cartonMaterialUnitPrice", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.cartonMaterialUnitPrice);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030221Component.prototype, "cartonMaterialTotalCost", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.cartonMaterialTotalCost);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030221Component.prototype, "cartonShipFare", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.cartonShipFare);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030221Component.prototype, "cartonAdditionalShipFare", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getAdditionalSipFareCarton());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030221Component.prototype, "cartonShipTotal", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.cartonShipTotal);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030221Component.prototype, "cartonFareCost", {
        get: function () {
            var data = this.helper.getSF00302Data();
            return math_util_1.default.checkNaN(data.productOutput.cartonShipTotal);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030221Component.prototype, "cartonUsageColorCost", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.cartonUsageColorCost);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030221Component.prototype, "cartonTapeCut", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.cartonTapeCut);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030221Component.prototype, "cartonLinerCut", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.cartonLinerCut);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030221Component.prototype, "cartonHandProcessing", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.cartonHandProcessing);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030221Component.prototype, "cartonWaterRepellent", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.cartonWaterRepellent);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030221Component.prototype, "cartonProcessingUnitPrice", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.cartonProcessingUnitPrice);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030221Component.prototype, "cartonProcessingTotalCost", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.cartonProcessingTotalCost);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030221Component.prototype, "calcEstimatedM2PriceCarton", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.calcEstimatedM2PriceCarton());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030221Component.prototype, "cartonSpecialFare", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.cartonSpecialFare);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030221Component.prototype, "additionalTotalCarton", {
        /** @return 特別費用 */
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.cartonLotGap) + math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.cartonSpecialFare);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030221Component.prototype, "total", {
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
    Object.defineProperty(SF0030221Component.prototype, "profitRate", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().indexOffer.profitRate);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030221Component.prototype, "otherFee1", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getProductOutputOtherFee1());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030221Component.prototype, "otherFee2", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getProductOutputOtherFee2());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030221Component.prototype, "otherFee3", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getProductOutputOtherFee3());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030221Component.prototype, "otherFeeExpense1", {
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
    Object.defineProperty(SF0030221Component.prototype, "otherFeeExpense2", {
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
    Object.defineProperty(SF0030221Component.prototype, "otherFeeExpense3", {
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
    SF0030221Component.prototype.resetOffer = function () {
        // reset lot
        this.lot = this.helper.getSF00302Data().bkProductLots[this.ix];
        // set product common fee
        this.unitPrice = this.helper.getSF00302Data().bkProductOffers[this.ix];
        this.helper.getSF00302Data().checkOutputSave = false;
    };
    Object.defineProperty(SF0030221Component.prototype, "estimatedTotal", {
        /** @return 見積金額合計 */
        get: function () {
            //http://fridaynight.vnext.vn/issues/2337
            return math_util_1.default.round(math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.estimatedTotal), 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030221Component.prototype, "estimatedUnitPrice", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.estimatedUnitPrice);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030221Component.prototype, "otherFeeTotalCost", {
        get: function () {
            return this.helper.getOtherFeeTotalCost();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030221Component.prototype, "checkBorderLot", {
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
    Object.defineProperty(SF0030221Component.prototype, "checkBorderUnitPrice", {
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
    Object.defineProperty(SF0030221Component.prototype, "squareMeter", {
        /** @return 才数 (運賃計算に使用する) */
        get: function () {
            // 展開寸法で計算
            return math_util_1.default.checkNaN(this.helper.calcMaterialSizeCarton());
            /*
            // 実寸法で計算する場合は
            return MathUtil.checkNaN(this.helper.getSF00302Data().productOutput.dimension);
            */
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030221Component.prototype, "estimatedM2Price", {
        get: function () {
            return math_util_1.default.checkNaN(this.helper.calcEstimatedM2PriceCarton());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030221Component.prototype, "cartonLotGap", {
        /** @return ロット格差 */
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.cartonLotGap);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030221Component.prototype, "cartonLotGapPerLot", {
        /**
         * ロット格差（＠ロット）
         */
        get: function () {
            return math_util_1.default.checkNaN(this.helper.getSF00302Data().productOutput.cartonLotGap / this.helper.getSF00302Data().productOutput.lot);
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SF0030221Component.prototype, "helper", void 0);
    SF0030221Component = __decorate([
        core_1.Component({
            selector: "sf0030221",
            templateUrl: "SF0030221.component.html"
        }), 
        __metadata('design:paramtypes', [SF00302_data_1.SF00302Data, SF00302_service_1.SF00302Service, router_1.ActivatedRoute, router_1.Router])
    ], SF0030221Component);
    return SF0030221Component;
}());
exports.SF0030221Component = SF0030221Component;
//# sourceMappingURL=SF0030221.component.js.map