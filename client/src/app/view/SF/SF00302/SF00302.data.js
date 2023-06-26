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
var ProductFile_model_1 = require("../../../model/core/ProductFile.model");
var Product_model_1 = require("../../../model/core/Product.model");
var ProductOutput_model_1 = require("../../../model/core/ProductOutput.model");
var Offer_model_1 = require("../../../model/core/Offer.model");
var ProductCommonFee_model_1 = require("../../../model/core/ProductCommonFee.model");
var DealProduct_model_1 = require("../../../model/core/DealProduct.model");
var MstData_1 = require("../../../model/MstData");
var File_model_1 = require("../../../model/core/File.model");
var Deal_model_1 = require("../../../model/core/Deal.model");
var ProductPropertyChangedTracker_1 = require("./helper/ProductPropertyChangedTracker");
var paper_model_1 = require("./model/paper.model");
var message_1 = require("../../../helper/message");
var product_required_item_1 = require("./helper/product-required-item");
var data_util_1 = require("../../../util/data-util");
/** 製品名の最大文字数(CP932 バイト数) */
exports.MAX_PRODUCT_CP932_BYTES = 40;
/**
 * Component class to binding data on SF003-02 screen.
 * @author DungTQ
 */
var SF00302Data = (function () {
    function SF00302Data() {
        /* Decorative Sheet */
        this.DECORATIVE_ID = 98;
        this.ONE_STAGE = 100;
        this.fileUploadInProgress = false;
        /* map object to track property chanaged after dupplicate deal */
        this.highlightedTracker = new ProductPropertyChangedTracker_1.HightlightedPropertyTracker();
        //Check mode view
        this.isView = false;
        /*File*/
        this.file = new File_model_1.File();
        /*Product file*/
        this.productFile = new ProductFile_model_1.ProductFile();
        /*Deal*/
        this.deal = new Deal_model_1.Deal();
        /*Deal product*/
        //TODO: Chỉ dùng id cho delete, xem xét sửa để màn hình nhẹ hơn
        this.dealProduct = new DealProduct_model_1.DealProduct();
        /*Master data*/
        this.mstData = new MstData_1.MstData();
        /*Offers*/
        this.offers = [];
        this.offersOld = [];
        /*Offer used to reset*/
        this.indexOffer = new Offer_model_1.Offer();
        /*Product*/
        this.product = new Product_model_1.Product();
        this.productOld = new Product_model_1.Product();
        /*Product Output used to calculate*/
        this.productOutput = new ProductOutput_model_1.ProductOutput();
        /*Product file*/
        this.productFiles = [];
        /*List Product Output*/
        this.productOutputs = [];
        this.productOutputsOld = [];
        /*Product common fee*/
        this.productCommonFee = new ProductCommonFee_model_1.ProductCommonFee();
        /*Product common fee tmp*/
        this.indexProductCommonFee = new ProductCommonFee_model_1.ProductCommonFee();
        /*Check create product file*/
        this.checkCreateUpload = false;
        /* Index output view */
        this.indexOutput = 0;
        /*Check create dropzone */
        this.checkCreateDropzone = false;
        this.paperNormValue = 0;
        this.paperNormValueOld = 0;
        /* backup Product Lot */
        this.bkProductLots = [];
        /* backup Product Lot */
        this.bkProductOffers = [];
        this.checkInputSave = false;
        this.checkOutputSave = false;
        this.checkCommonSave = false;
        /* Check to display mesage */
        this.checkOverWeight = false;
        /* Paper in modal */
        this.mstPapers = [];
        this.mstPapersHeader = [];
        this.mstPapersBackgroundTab1 = [];
        this.mstPapersBackgroundTab2 = [];
        this.checkPaper2903 = false;
        this.showModal2903 = false;
        // paperTmp lamination
        this.paperTmp1 = new paper_model_1.PaperModel;
        this.paperTmp2 = new paper_model_1.PaperModel;
        this.paperTmp3 = new paper_model_1.PaperModel;
        this.paperTmp4 = new paper_model_1.PaperModel;
        this.paperTmp5 = new paper_model_1.PaperModel;
        this.mstLaminations = [];
        this.mstLaminationsHeader = [];
        //http://fridaynight.vnext.vn/issues/2409
        this.paperModel = new paper_model_1.PaperModel;
        this.paperModelNews = [];
        this.productRequiredItem = new product_required_item_1.ProductRequiredItem;
        // Vùng input
        this.isUpdateAreaOne = false;
        // Vùng product output
        this.isUpdateAreaTwo = false;
        // Vùng common fee
        this.isUpdateAreaThree = false;
        this.checkInit = false;
    }
    // add paperModel to mst data
    SF00302Data.prototype.addPaperModel = function (paperModel, optionPaper, paperType) {
        if (paperType == 1) {
            var factoryID = 1;
            // For normal Staff, factory ID da dc chon factoryID=2
            this.mstData.mstPaperNormal[1][optionPaper] = undefined;
            data_util_1.default.pushData(this.mstData.mstPaperNormal, paperModel.paperName, "name", factoryID, optionPaper, paperModel.basicWeight, paperModel.id);
            data_util_1.default.pushData(this.mstData.mstPaperNormal, paperModel.normValue, "normValue", factoryID, optionPaper, paperModel.basicWeight);
            // For head staff, factory Id dc chon
            this.mstData.mstPaperHead[1][optionPaper] = undefined;
            data_util_1.default.pushData(this.mstData.mstPaperHead, paperModel.normValue, "normValue", factoryID, optionPaper, paperModel.basicWeight);
            data_util_1.default.pushData(this.mstData.mstPaperHead, paperModel.paperName, "name", factoryID, optionPaper, paperModel.basicWeight, paperModel.id);
            factoryID = 2;
            // For normal Staff, factory ID da dc chon factoryID=1
            this.mstData.mstPaperNormal[2][optionPaper] = undefined;
            data_util_1.default.pushData(this.mstData.mstPaperNormal, paperModel.paperName, "name", factoryID, optionPaper, paperModel.basicWeight, paperModel.id);
            data_util_1.default.pushData(this.mstData.mstPaperNormal, paperModel.normValue, "normValue", factoryID, optionPaper, paperModel.basicWeight);
            // For head staff, factory Id dc chon
            this.mstData.mstPaperHead[2][optionPaper] = undefined;
            data_util_1.default.pushData(this.mstData.mstPaperHead, paperModel.normValue, "normValue", factoryID, optionPaper, paperModel.basicWeight);
            data_util_1.default.pushData(this.mstData.mstPaperHead, paperModel.paperName, "name", factoryID, optionPaper, paperModel.basicWeight, paperModel.id);
        }
        else {
            this.mstData.mstLamination[optionPaper] = undefined;
            data_util_1.default.pushData(this.mstData.mstLamination, paperModel.normValue, "throughWage", optionPaper, paperModel.basicWeight);
        }
    };
    //end 2344
    /** @deprecated Unused? */
    SF00302Data.prototype.validateProductName = function () {
        if (!this.product.productName) {
            var $err = $("#productName-error");
            if ($err.length > 0) {
                return false;
            }
            $err = jQuery('<div/>', {
                id: "productName-error",
                text: message_1.MSG.SF00302.ERR013
            })
                .addClass("help-block text-right animated fadeInDown");
            var $productNameCol = $("#productName").parent().parent();
            $productNameCol.append($err);
            $productNameCol.parent().addClass("has-error");
            return false;
        }
        else if (this.product.productName.length > 30) {
            var $err = $("#productName-error");
            if ($err.length > 0) {
                return false;
            }
            $err = jQuery('<div/>', {
                id: "productName-error",
                text: message_1.MSG.SF00302.ERR014
            })
                .addClass("help-block text-right animated fadeInDown");
            var $productNameCol = $("#productName").parent().parent();
            $productNameCol.append($err);
            $productNameCol.parent().addClass("has-error");
            return false;
        }
        else {
            this.clearProductNameErrMsg();
            return true;
        }
    };
    SF00302Data.prototype.clearProductNameErrMsg = function () {
        var errEl = $("#productName-error");
        errEl.parent().parent().removeClass("has-error");
        errEl.remove();
    };
    Object.defineProperty(SF00302Data.prototype, "isCreateNewProduct", {
        get: function () {
            if (!!this.product.id) {
                return false;
            }
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00302Data.prototype, "isRequestDesign", {
        get: function () {
            return this.product.requestDesignFlag == 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00302Data.prototype, "noneFieldBorderCss", {
        // Validation
        get: function () {
            return { style: "", radius: "" };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00302Data.prototype, "defaultFieldBorderCss", {
        get: function () {
            return { style: "solid 2px #5c90d2", radius: "3px" };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF00302Data.prototype, "errFieldBorderCss", {
        get: function () {
            return { style: "solid 2px #FF0000", radius: "3px" };
        },
        enumerable: true,
        configurable: true
    });
    SF00302Data = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], SF00302Data);
    return SF00302Data;
}());
exports.SF00302Data = SF00302Data;
//# sourceMappingURL=SF00302.data.js.map