"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var constants_1 = require("../../../../helper/constants");
var mst_data_type_1 = require("../../../../helper/mst-data-type");
var BaseModel_model_1 = require("../../../../model/core/BaseModel.model");
var MstPaper_model_1 = require("../../../../model/core/MstPaper.model");
var data_util_1 = require("../../../../util/data-util");
var format_util_1 = require("../../../../util/format-util");
/**
 * The common product model based on product entity.
 * @author manhnv
 */
var ProductModel = (function (_super) {
    __extends(ProductModel, _super);
    function ProductModel() {
        _super.apply(this, arguments);
        this.paper = new MstPaper_model_1.MstPaper();
    }
    ProductModel.prototype.setData = function (data) {
        if (!!data) {
            _super.prototype.setData.call(this, data);
            this.productName = data["productName"];
            this.productType = data["productType"];
            this.productCode = data["productCode"];
            this.sizeH = data["sizeH"];
            this.sizeD = data["sizeD"];
            this.sizeW = data["sizeW"];
            this.memo1 = data["memo1"];
            this.memo2 = data["memo2"];
            this.memo3 = data["memo3"];
            this.paperNameId = data["paperNameId"];
            this.paperWeight = data["paperWeight"];
            this.paperSizeH = data["paperSizeH"];
            this.paperSizeW = data["paperSizeW"];
            this.cutPaperSizeH = data["cutPaperSizeH"];
            this.cutPaperSizeW = data["cutPaperSizeW"];
            this.blankPaperSizeH = data["blankPaperSizeH"];
            this.blankPaperSizeW = data["blankPaperSizeW"];
            this.woodenCode = data["woodenCode"];
            this.woodenExpiredDate = data["woodenExpiredDate"];
            this.customerProductCode = data["customerProductCode"];
            this.impositionNumber = data["impositionNumber"];
            this.colorIdF = data["colorIdF"];
            this.colorFSelect = data["colorFSelect"];
            this.specialColorF = data["specialColorF"];
            this.colorIdB = data["colorIdB"];
            this.colorBSelect = data["colorBSelect"];
            this.specialColorB = data["specialColorB"];
            this.factoryId = data["factoryId"];
            this.shapeId = data["shapeId"];
            this.printMethod = data["printMethod"];
            this.surfaceTreatmentIdF = data["surfaceTreatmentIdF"];
            this.surfaceTreatmentIdB = data["surfaceTreatmentIdB"];
            this.cartonShippingType = data["cartonShippingType"];
            this.laminationFlute = data["laminationFlute"];
            this.laminationPaperTypeBack = data["laminationPaperTypeBack"];
            this.laminationPaperTypeMedium = data["laminationPaperTypeMedium"];
            this.laminationPaperTypeA = data["laminationPaperTypeA"];
            this.laminationPaperTypeB = data["laminationPaperTypeB"];
            this.laminationABasicWeight = data["laminationABasicWeight"];
            this.laminationBBasicWeight = data["laminationBBasicWeight"];
            this.laminationPaperTypeFront = data["laminationPaperTypeFront"];
            this.laminationFrontBasicWeight = data["laminationFrontBasicWeight"];
            this.laminationMediumBasicWeight = data["laminationMediumBasicWeight"];
            this.laminationBackBasicWeight = data["laminationBackBasicWeight"];
            this.laminationAId = data["laminationAId"];
            this.laminationBId = data["laminationBId"];
            this.laminationFrontId = data["laminationFrontId"];
            this.laminationBackId = data["laminationBackId"];
            this.laminationMediumId = data["laminationMediumId"];
            this.requestDesignFlag = data["requestDesignFlag"];
            this.requestLot = data["requestLot"];
            this.srcImg = data["srcImg"];
            this.estimatedUnitPrice = data["estimatedUnitPrice"];
            this.quantityStock = data["quantityStock"];
            this.lot = data["lot"];
            this.originalName = data["originalName"];
            this.memo = data["memo"];
            this.unitPrice = data["unitPrice"];
            this.totalCost = data["totalCost"];
            this.requestProduction = data["requestProduction"];
            this.paper = new MstPaper_model_1.MstPaper();
            if (!!data["paper"]) {
                this.paper.setMstPaper(data["paper"]);
            }
        }
    };
    /**
     * Get product's dimension.
     * @return {string|string|string}
     */
    ProductModel.prototype.getDimension = function () {
        //#2519
        if (this.productType == 0 && this.shapeId == 98) {
            // My pham ->  paperSizeW + paperSizeH
            return format_util_1.FormatUtil.formatDimension(constants_1.Constants.X_SEPARATOR, this.paperSizeW, this.paperSizeH);
        }
        else if (this.productType == 1 && this.cartonShippingType == 1) {
            return format_util_1.FormatUtil.formatDimension(constants_1.Constants.X_SEPARATOR, this.blankPaperSizeW, this.blankPaperSizeH);
        }
        return format_util_1.FormatUtil.formatDimension(constants_1.Constants.X_SEPARATOR, this.sizeW, this.sizeD, this.sizeH);
    };
    /**
     * Get product's paper.
     * @see http://fridaynight.vnext.vn/issues/2462
     * @return {string}
     */
    ProductModel.prototype.getPaperName = function (laminations) {
        return format_util_1.FormatUtil.getPaperName(this, laminations);
    };
    ProductModel.prototype.getColor = function () {
        return format_util_1.FormatUtil.formatColorsViaPrintMethod(this);
    };
    ProductModel.prototype.getImposition = function () {
        if (this.impositionNumber != undefined)
            return this.impositionNumber + constants_1.Constants.IMPOSITION_SIGN;
        return null;
    };
    ProductModel.prototype.getSurfaceTreatment = function (side) {
        if (side == undefined)
            return data_util_1.default.getData(mst_data_type_1.SURFACE_TREATMENT, null, this.surfaceTreatmentIdF);
        return data_util_1.default.getData(mst_data_type_1.SURFACE_TREATMENT, null, this.surfaceTreatmentIdB);
    };
    ProductModel.prototype.getPrintMethod = function () {
        if (this.printMethod != undefined)
            return data_util_1.default.getData(mst_data_type_1.PRINT_METHOD, null, this.printMethod);
        return null;
    };
    ProductModel.prototype.getProductDescription = function (laminations) {
        return format_util_1.FormatUtil.formatProductDescription(this, laminations);
    };
    ProductModel.prototype.getFactory = function () {
        return data_util_1.default.getData(mst_data_type_1.FACTORY, null, this.factoryId);
    };
    /* material's product format as 'paperNameId-paperWeight'*/
    ProductModel.prototype.material = function (laminations) {
        return format_util_1.FormatUtil.getPaperName(this, laminations);
    };
    return ProductModel;
}(BaseModel_model_1.BaseModel));
exports.ProductModel = ProductModel;
//# sourceMappingURL=Product.model.js.map